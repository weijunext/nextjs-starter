'use server';

import { siteConfig } from '@/config/site';
import { sendEmail as sendEmailUniversal } from '@/lib/mailer';
import {
  addContactToAudience as addContactUniversal,
  removeContactFromAudience as removeContactUniversal,
  getContactsFromAudience as getContactsUniversal,
} from '@/lib/audience';
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

    const from = `${siteConfig.name} <${process.env.ADMIN_EMAIL}>`;

    // Build unsubscribe link for email headers
    const unsubscribeToken = Buffer.from(email).toString('base64');
    const unsubscribeLink = `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

    // Handle React template: support component type or rendered element
    const emailContent = reactProps
      ? React.createElement(react as React.ComponentType<any>, reactProps)
      : (react as React.ReactElement);

    const result = await sendEmailUniversal({
      to: email,
      from,
      subject,
      react: emailContent,
      headers: {
        'List-Unsubscribe': `<${unsubscribeLink}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });

    if (!result.success) {
      console.error('Failed to send email:', result.error);
      return { success: false, error: result.error || 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// Add contact to audience
export async function addContactToAudience(email: string) {
  try {
    if (!email) {
      return { success: false };
    }

    const result = await addContactUniversal(email);
    return { success: result.success };
  } catch (error) {
    console.error('Failed to add contact to audience:', error);
    return { success: false };
  }
}

// Remove contact from audience
export async function removeContactFromAudience(email: string) {
  try {
    if (!email) {
      return { success: false };
    }

    const result = await removeContactUniversal(email);
    return { success: result.success };
  } catch (error) {
    console.error('Failed to remove contact from audience:', error);
    return { success: false };
  }
}

// List contacts in audience (for checking if email exists)
export async function getContactsFromAudience() {
  try {
    const result = await getContactsUniversal();
    return { success: result.success, data: result.data || null };
  } catch (error) {
    console.error('Failed to get contacts from audience:', error);
    return { success: false, data: null };
  }
}
