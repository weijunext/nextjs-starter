import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

// initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const REDIS_RATE_LIMIT_KEY = 'newsletter:rate-limit';
const DAY_MAX_SUBMISSIONS = parseInt(process.env.DAY_MAX_SUBMISSIONS || '10');

// create rate limiter
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(DAY_MAX_SUBMISSIONS, '1d'),
  prefix: REDIS_RATE_LIMIT_KEY,
});

// Shared rate limit check
export async function checkRateLimit() {
  const headersList = await headers();
  const ip = headersList.get('x-real-ip') ||
    headersList.get('x-forwarded-for') ||
    'unknown';

  const { success } = await limiter.limit(ip);
  if (!success) {
    throw new Error('Too many submissions, please try again later');
  }
}

