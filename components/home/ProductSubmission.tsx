"use client";

import { submitProduct } from "@/actions/submission";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  Loader2,
  Rocket,
  Send,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ProductSubmission() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const t = useTranslations("Submission");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setStatus("loading");
      setErrorMessage("");

      const result = await submitProduct(formData);

      if (!result.success) {
        throw new Error(result.error || t("errorMessage"));
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("errorMessage")
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
              <Rocket className="w-4 h-4" />
              {t("badge")}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-white/80 max-w-lg">{t("description")}</p>
          </div>

          {/* Right form */}
          <div className="w-full lg:w-[420px]">
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 min-h-[220px] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="productUrl"
                    className="block text-sm font-medium text-white/90 mb-2"
                  >
                    {t("productUrlLabel")}{" "}
                    <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="url"
                    id="productUrl"
                    name="productUrl"
                    placeholder="https://your-awesome-site.com"
                    required
                    className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-12 bg-white hover:bg-white/90 text-indigo-600 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("submitting")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t("submit")}
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center min-h-12">
                  {status === "success" && (
                    <div className="flex items-start gap-2 text-green-300 text-sm bg-green-500/20 px-4 py-2 rounded-xl w-full">
                      <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-left">{t("successMessage")}</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-start gap-2 text-red-300 text-sm bg-red-500/20 px-4 py-2 rounded-xl w-full">
                      <AlertCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-left break-words w-full">
                        {errorMessage}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
