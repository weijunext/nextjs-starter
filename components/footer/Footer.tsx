import BuiltWithButton from "@/components/BuiltWithButton";
import Badges from "@/components/footer/Badges";
import { Newsletter } from "@/components/footer/Newsletter";
import { TwitterX } from "@/components/social-icons/icons";
import { siteConfig } from "@/config/site";
import { Link as I18nLink } from "@/i18n/routing";
import { FooterLink } from "@/types/common";
import { GithubIcon, MailIcon } from "lucide-react";
import { getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
import { SiBluesky, SiDiscord } from "react-icons/si";

export default async function Footer() {
  const messages = await getMessages();

  const t = await getTranslations("Home");
  const tFooter = await getTranslations("Footer");

  const footerLinks: FooterLink[] = tFooter.raw("Links.groups");
  footerLinks.forEach((group) => {
    const pricingLink = group.links.find((link) => link.id === "pricing");
    if (pricingLink) {
      pricingLink.href = process.env.NEXT_PUBLIC_PRICING_PATH!;
    }
  });

  return (
    <div className="bg-gray-900 text-gray-300">
      <footer className="py-2 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-12 lg:grid-cols-6">
            <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-4 col-span-full md:col-span-2">
              <div className="space-y-4 flex-1">
                <div className="items-center space-x-2 flex">
                  <h2 className="highlight-text text-2xl font-bold">
                    {t("title")}
                  </h2>
                </div>

                <p className="text-sm p4-4 md:pr-12">{t("tagLine")}</p>

                <div className="flex items-center gap-2">
                  {siteConfig.socialLinks?.github && (
                    <Link
                      href={siteConfig.socialLinks.github}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="GitHub"
                      title="View on GitHub"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      <GithubIcon className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                  {siteConfig.socialLinks?.discord && (
                    <Link
                      href={siteConfig.socialLinks.discord}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Discord"
                      title="Join Discord"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      <SiDiscord className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                  {siteConfig.socialLinks?.twitter && (
                    <Link
                      href={siteConfig.socialLinks.twitter}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Twitter"
                      title="View on Twitter"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      <TwitterX className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                  {siteConfig.socialLinks?.bluesky && (
                    <Link
                      href={siteConfig.socialLinks.bluesky}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Blue Sky"
                      title="View on Bluesky"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      <SiBluesky className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                  {siteConfig.socialLinks?.email && (
                    <Link
                      href={`mailto:${siteConfig.socialLinks.email}`}
                      prefetch={false}
                      target="_blank"
                      rel="noreferrer nofollow noopener"
                      aria-label="Email"
                      title="Email"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      <MailIcon className="w-4 h-4" />
                    </Link>
                  )}
                </div>

                <BuiltWithButton />
              </div>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title} className="flex-1">
                <h3 className="text-white text-lg font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("/") && !link.useA ? (
                        <I18nLink
                          href={link.href}
                          title={link.name}
                          prefetch={false}
                          className="hover:text-white transition-colors"
                          target={link.target || ""}
                          rel={link.rel || ""}
                        >
                          {link.name}
                        </I18nLink>
                      ) : (
                        <Link
                          href={link.href}
                          title={link.name}
                          prefetch={false}
                          className="hover:text-white transition-colors"
                          target={link.target || ""}
                          rel={link.rel || ""}
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {messages.Footer.Newsletter && (
              <div className="w-full flex-1">
                <Newsletter />
              </div>
            )}
          </div>

          <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {tFooter("Copyright", {
                year: new Date().getFullYear(),
                name: siteConfig.name,
              })}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <I18nLink
                href="/privacy-policy"
                title={tFooter("PrivacyPolicy")}
                prefetch={false}
                className="text-gray-400 hover:text-white text-sm"
              >
                {tFooter("PrivacyPolicy")}
              </I18nLink>
              <I18nLink
                href="/terms-of-service"
                title={tFooter("TermsOfService")}
                prefetch={false}
                className="text-gray-400 hover:text-white text-sm"
              >
                {tFooter("TermsOfService")}
              </I18nLink>
            </div>
          </div>
        </div>

        <Badges />
      </footer>
    </div>
  );
}
