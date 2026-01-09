import { siteConfig } from '@/config/site';
import * as React from 'react';

interface NewsletterWelcomeEmailProps {
  email: string;
  unsubscribeLink: string;
}

const styles = {
  container: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f8fafc',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center' as const,
    marginBottom: '16px',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#475569',
    marginBottom: '16px',
  },
  footer: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center' as const,
  },
  unsubscribeLink: {
    color: '#3b82f6',
    textDecoration: 'underline',
  },
};

export const NewsletterWelcomeEmail: React.FC<
  Readonly<NewsletterWelcomeEmailProps>
> = ({ unsubscribeLink }) => (
  <div style={styles.container}>
    <div style={styles.card}>
      <div style={styles.logo}>
        <img
          src={`${siteConfig.url}/logo.png`}
          alt={siteConfig.name}
          width={60}
          height={60}
        />
      </div>

      <h1 style={styles.headerTitle}>Welcome to {siteConfig.name}</h1>

      <p style={styles.paragraph}>
        Thank you for subscribing to our newsletter. You will receive the latest
        updates and news about {siteConfig.name}.
      </p>

      <p style={styles.paragraph}>
        We're excited to have you on board!
      </p>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          If you wish to unsubscribe,{' '}
          <a href={unsubscribeLink} style={styles.unsubscribeLink}>
            click here
          </a>
        </p>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

export default NewsletterWelcomeEmail;

