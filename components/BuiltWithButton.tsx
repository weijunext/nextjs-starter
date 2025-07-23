import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Nexty.dev Affiliate Link: https://affiliates.nexty.dev/
// sign up and use your affiliate link on BuiltWithButton to earn money

export default function BuiltWithButton() {
  return (
    <Link
      href="https://nexty.dev"
      title="Built with Nexty.dev"
      prefetch={false}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "px-4 rounded-md bg-transparent border-gray-500 hover:bg-gray-950 text-white hover:text-gray-100"
      )}
    >
      <span>Built with</span>
      <span>
        <LogoNexty className="size-4 rounded-full" />
      </span>
      <span className="font-bold text-base-content flex gap-0.5 items-center tracking-tight">
        Nexty.dev
      </span>
    </Link>
  );
}

function LogoNexty({ className }: { className?: string }) {
  return (
    <img
      src="/logo_nexty.png"
      alt="Logo"
      title="Logo"
      loading="lazy"
      width={96}
      height={96}
      className={cn("size-8 rounded-md", className)}
    />
  );
}
