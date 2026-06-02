import { Redis } from '@upstash/redis';

export interface AudienceResult {
  success: boolean;
  error?: string;
}

export interface ListContactsResult {
  success: boolean;
  data?: Array<{ email: string; [key: string]: any }>;
  error?: string;
}

type AudienceProviderType = 'resend' | 'redis' | 'none';

const REDIS_CONTACTS_KEY = 'email:contacts';

function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

function getAudienceProvider(): AudienceProviderType {
  // When EMAIL_PROVIDER=cloudflare, fall back to Redis for audience storage
  // because Cloudflare Email does not provide contact/audience management.
  // Redis is optional, though: if it isn't configured we simply skip recording
  // contacts so that sending email still works without forcing a Redis setup.
  if (process.env.EMAIL_PROVIDER === 'cloudflare') {
    return isRedisConfigured() ? 'redis' : 'none';
  }
  return 'resend';
}

function getRedis(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('Upstash Redis is not configured');
  }
  return new Redis({ url, token });
}

// ---------------------------------------------------------------------------
// Resend Audience Provider
// ---------------------------------------------------------------------------
async function addContactResend(email: string): Promise<AudienceResult> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'RESEND_API_KEY is not configured' };
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.contacts.create({ email });
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to add contact to Resend audience',
    };
  }
}

async function removeContactResend(email: string): Promise<AudienceResult> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'RESEND_API_KEY is not configured' };
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.contacts.remove({ email });
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to remove contact from Resend audience',
    };
  }
}

async function listContactsResend(): Promise<ListContactsResult> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'RESEND_API_KEY is not configured' };
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const list = await resend.contacts.list();
    return { success: true, data: list.data?.data || [] };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to list Resend contacts',
    };
  }
}

// ---------------------------------------------------------------------------
// Redis Audience Provider (fallback for Cloudflare Email)
// ---------------------------------------------------------------------------
async function addContactRedis(email: string): Promise<AudienceResult> {
  try {
    const redis = getRedis();
    await redis.sadd(REDIS_CONTACTS_KEY, email);
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to add contact to Redis',
    };
  }
}

async function removeContactRedis(email: string): Promise<AudienceResult> {
  try {
    const redis = getRedis();
    await redis.srem(REDIS_CONTACTS_KEY, email);
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to remove contact from Redis',
    };
  }
}

async function listContactsRedis(): Promise<ListContactsResult> {
  try {
    const redis = getRedis();
    const contacts = await redis.smembers(REDIS_CONTACTS_KEY);
    return {
      success: true,
      data: (contacts || []).map((email: string) => ({ email })),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to list Redis contacts',
    };
  }
}

// ---------------------------------------------------------------------------
// Factory Exports
// ---------------------------------------------------------------------------
export async function addContactToAudience(
  email: string
): Promise<AudienceResult> {
  const provider = getAudienceProvider();
  // No audience storage configured (Cloudflare without Redis): skip silently.
  if (provider === 'none') {
    return { success: true };
  }
  if (provider === 'redis') {
    return addContactRedis(email);
  }
  return addContactResend(email);
}

export async function removeContactFromAudience(
  email: string
): Promise<AudienceResult> {
  const provider = getAudienceProvider();
  if (provider === 'none') {
    return { success: true };
  }
  if (provider === 'redis') {
    return removeContactRedis(email);
  }
  return removeContactResend(email);
}

export async function getContactsFromAudience(): Promise<ListContactsResult> {
  const provider = getAudienceProvider();
  // No audience storage: return no data (not an empty list) so callers skip
  // the "is this email subscribed?" check instead of rejecting every email.
  if (provider === 'none') {
    return { success: true };
  }
  if (provider === 'redis') {
    return listContactsRedis();
  }
  return listContactsResend();
}
