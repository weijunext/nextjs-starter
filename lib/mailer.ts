import { render } from '@react-email/render';
import * as React from 'react';

export interface SendEmailOptions {
  to: string;
  from?: string;
  subject: string;
  react?: React.ComponentType<any> | React.ReactElement;
  reactProps?: Record<string, any>;
  html?: string;
  text?: string;
  headers?: Record<string, string>;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

type ProviderType = 'resend' | 'cloudflare';

function getProvider(): ProviderType {
  const provider = process.env.EMAIL_PROVIDER;
  if (provider === 'cloudflare') return 'cloudflare';
  return 'resend';
}

function getReactElement(
  react: React.ComponentType<any> | React.ReactElement,
  reactProps?: Record<string, any>
): React.ReactElement {
  if (React.isValidElement(react)) {
    return react;
  }
  return React.createElement(
    react as React.ComponentType<any>,
    reactProps || {}
  );
}

// ---------------------------------------------------------------------------
// Resend Provider
// ---------------------------------------------------------------------------
async function sendWithResend(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'RESEND_API_KEY is not configured' };
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const from = options.from || process.env.ADMIN_EMAIL;
    if (!from) {
      return { success: false, error: 'Sender email (from) is required' };
    }

    let reactElement: React.ReactElement | undefined;
    if (options.react) {
      reactElement = getReactElement(options.react, options.reactProps);
    }

    // Resend's CreateEmailOptions is a discriminated union requiring exactly
    // one content field (react | html | text). Build the payload with only the
    // content that is actually provided so it matches a single union member.
    const content = reactElement
      ? { react: reactElement }
      : options.html != null
        ? { html: options.html }
        : { text: options.text ?? '' };

    const { data, error } = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      headers: options.headers,
      ...content,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Resend email send failed',
    };
  }
}

// ---------------------------------------------------------------------------
// Cloudflare Email Provider (REST API)
// ---------------------------------------------------------------------------
async function sendWithCloudflare(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  try {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return {
        success: false,
        error:
          'CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN is not configured',
      };
    }

    let html = options.html;
    let text = options.text;

    if (options.react && !html) {
      const reactElement = getReactElement(options.react, options.reactProps);
      html = await render(reactElement);
      if (!text) {
        text = await render(reactElement, { plainText: true });
      }
    }

    const from = options.from || process.env.ADMIN_EMAIL;
    if (!from) {
      return { success: false, error: 'Sender email (from) is required' };
    }

    // Cloudflare REST API uses { address, name } for object form (NOT { email, name })
    // See: https://developers.cloudflare.com/email-service/api/send-emails/rest-api/
    function parseFromField(raw: string): string | { address: string; name?: string } {
      const match = raw.match(/^(.*?)\s*<(.+?)>\s*$/);
      if (match) {
        const name = match[1].trim();
        const address = match[2].trim();
        return name ? { name, address } : address;
      }
      return raw;
    }

    const body: Record<string, any> = {
      to: options.to,
      from: parseFromField(from),
      subject: options.subject,
    };
    if (html) body.html = html;
    if (text) body.text = text;
    if (options.headers && Object.keys(options.headers).length > 0) {
      body.headers = options.headers;
    }

    console.log('[Cloudflare Email] Request body:', JSON.stringify(body, null, 2));

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    console.log('[Cloudflare Email] Response:', JSON.stringify(result, null, 2));

    if (!response.ok || !result.success) {
      const errorMessage =
        result.errors?.[0]?.message ||
        `Cloudflare API error: ${response.status}`;
      return { success: false, error: errorMessage };
    }

    // Cloudflare REST API returns per-recipient delivery status instead of a
    // messageId. A top-level `success: true` already means the send was
    // accepted; the delivered/queued arrays are often empty even on success,
    // so the only outcome that should be treated as a failure is a permanent
    // bounce with nothing delivered or queued.
    const delivered = result.result?.delivered || [];
    const queued = result.result?.queued || [];
    const bounces = result.result?.permanent_bounces || [];

    if (
      bounces.length > 0 &&
      delivered.length === 0 &&
      queued.length === 0
    ) {
      return {
        success: false,
        error: `Email bounced: ${bounces.join(', ')}`,
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Cloudflare Email] Exception:', err);
    return {
      success: false,
      error: err?.message || 'Cloudflare email send failed',
    };
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export async function sendEmail(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  const provider = getProvider();

  if (provider === 'cloudflare') {
    return sendWithCloudflare(options);
  }

  return sendWithResend(options);
}
