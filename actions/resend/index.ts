'use server';

import { siteConfig } from '@/config/site';
import resend from '@/lib/resend';
import * as React from 'react';

interface SendEmailProps {
  email: string;
  subject: string;
  react: React.ComponentType<any> | React.ReactElement;
  reactProps?: Record<string, any>;
}

export async function sendEmail({
  email,
  subject,
  react,
  reactProps,
}: SendEmailProps) {
  try {
    if (!email) {
      console.error('Email is required');
      return { success: false, error: 'Email is required' };
    }

    if (!resend) {
      console.error('Resend API key is not set');
      return { success: false, error: 'Resend is not configured' };
    }

    const from = `${siteConfig.name} <${process.env.ADMIN_EMAIL}>`;

    // Build unsubscribe link for email headers
    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeLink = `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    // Handle React template: support component type or rendered element
    const emailContent = reactProps
      ? React.createElement(react as React.ComponentType<any>, reactProps)
      : (react as React.ReactElement);

    await resend.emails.send({
      from,
      to: email,
      subject,
      react: emailContent,
      headers: {
        'List-Unsubscribe': `<${unsubscribeLink}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// Add contact to audience
export async function addContactToAudience(email: string) {
  try {
    if (!email || !resend) {
      return { success: false };
    }

    await resend.contacts.create({
      email,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to add contact to audience:', error);
    return { success: false };
  }
}

// Remove contact from audience
export async function removeContactFromAudience(email: string) {
  try {
    if (!email || !resend) {
      return { success: false };
    }

    await resend.contacts.remove({
      email,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to remove contact from audience:', error);
    return { success: false };
  }
}

// List contacts in audience (for checking if email exists)
export async function getContactsFromAudience() {
  try {
    if (!resend) {
      return { success: false, data: null };
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      return { success: true, data: null };
    }

    const list = await resend.contacts.list({ audienceId });
    return { success: true, data: list.data?.data || [] };
  } catch (error) {
    console.error('Failed to get contacts from audience:', error);
    return { success: false, data: null };
  }
}

