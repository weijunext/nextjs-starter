"use client";

import { Button } from "@/components/ui/button";
import { Link as I18nLink, LOCALE_NAMES, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocaleStore } from "@/stores/localeStore";
import { ArrowRight, Globe, X } from "lucide-react";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export function LanguageDetectionAlert() {
  const [countdown, setCountdown] = useState(10); // countdown 10s and dismiss
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();
  const [detectedLocale, setDetectedLocale] = useState<string | null>(null);
  const {
    showLanguageAlert,
    setShowLanguageAlert,
    dismissLanguageAlert,
    getLangAlertDismissed,
  } = useLocaleStore();

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      dismissLanguageAlert();
    }, 300);
  }, [dismissLanguageAlert]);

  const handleSwitchLanguage = useCallback(() => {
    dismissLanguageAlert();
  }, [dismissLanguageAlert]);

  useEffect(() => {
    const detectedLang = navigator.language; // Get full language code, e.g., zh_HK
    const storedDismiss = getLangAlertDismissed();

    if (!storedDismiss) {
      let supportedLang = routing.locales.find((l) => l === detectedLang);

      if (!supportedLang) {
        const mainLang = detectedLang.split("-")[0];
        supportedLang = routing.locales.find((l) => l.startsWith(mainLang));
      }

      if (supportedLang && supportedLang !== locale) {
        setDetectedLocale(supportedLang);
        setShowLanguageAlert(true);
        setTimeout(() => setIsVisible(true), 100);
      }
    }
  }, [locale, getLangAlertDismissed, setShowLanguageAlert]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showLanguageAlert && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showLanguageAlert, countdown]);

  useEffect(() => {
    if (countdown === 0 && showLanguageAlert) {
      handleDismiss();
    }
  }, [countdown, showLanguageAlert, handleDismiss]);

  if (!showLanguageAlert || !detectedLocale) return null;

  const messages = require(`@/i18n/messages/${detectedLocale}.json`);
  const alertMessages = messages.LanguageDetection;

  return (
    <div
      className={cn(
        "fixed top-16 right-4 z-50 max-w-sm w-full mx-4 sm:mx-0 sm:w-96",
        "transform transition-all duration-300 ease-in-out",
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
      role="banner"
      aria-live="polite"
      aria-label="Language detection alert"
    >
      <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg p-4 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-6 w-6 opacity-50 hover:opacity-100"
          onClick={handleDismiss}
          aria-label="Dismiss language suggestion"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="pr-8">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-sm text-foreground">
              {alertMessages.title}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            {alertMessages.description}
          </p>

          <div className="flex items-center justify-between">
            <Button asChild onClick={handleSwitchLanguage}>
              <I18nLink
                href="/"
                title={`${alertMessages.switchTo} ${LOCALE_NAMES[detectedLocale]}`}
                locale={detectedLocale as any}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "text-sm font-medium transition-colors",
                  "group focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
                aria-label={`${alertMessages.switchTo} ${LOCALE_NAMES[detectedLocale]}`}
              >
                <span>
                  {alertMessages.switchTo} {LOCALE_NAMES[detectedLocale]}
                </span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </I18nLink>
            </Button>

            <span className="text-xs text-muted-foreground">{countdown}s</span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent pointer-events-none opacity-50" />
      </div>
    </div>
  );
}
