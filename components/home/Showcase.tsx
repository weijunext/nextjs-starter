import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpRightIcon, Trophy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

interface ShowcaseItem {
  name: string;
  url: string;
}

// Hardcoded showcase data - add your products here
const showcaseItems: ShowcaseItem[] = [
  {
    name: "submitnow",
    url: "https://www.submitnow.dev/",
  },
  {
    name: "OG Image Generator",
    url: "https://myogimage.com",
  },
  {
    name: "Black's Screen",
    url: "https://www.blacksscreen.com/",
  },
  {
    name: "Pinpoint Answer",
    url: "https://pinpointanswer.today/",
  },
  {
    name: "Dead Pixel Test",
    url: "https://deadpixelstest.com/",
  },
  {
    name: "Ouke Machinery",
    url: "https://www.oukemac.com/",
  },
  {
    name: "Ouke Machinery",
    url: "https://oukepoultry.com/",
  },
  {
    name: "Robot Apex",
    url: "https://ai-apex.top/",
  },
  {
    name: "PicArt - Online Puzzle Tool",
    url: "https://www.puzzletool.online/",
  },
  {
    name: "Escape From Duckov Wiki",
    url: "https://www.escapefromduckov.io/",
  },
  {
    name: "FileMerges",
    url: "https://filemerges.net/",
  },
  {
    name: "Khuzama Valley Investment",
    url: "https://khuzamainv.com/",
  },
];

export default function Showcase() {
  const t = useTranslations("Showcase");
  const locale = useLocale();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-gray-200 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t("description")}
        </p>

        {locale === "zh" && (
          <div className="mt-8 flex justify-center px-4">
            <Alert className="max-w-3xl text-left bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 shadow-sm">
              <Trophy className="h-5 w-5 text-amber-500 mt-0.5" />
              <AlertTitle className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
                冠军的选择
              </AlertTitle>
              <AlertDescription className="text-slate-700 dark:text-slate-300 space-y-2">
                <p>
                  SEO专家哥飞的社群2025年网站比赛，冠军产品（年度流量Top1）使用的就是这套模板。
                </p>
                <div className="mt-2">
                  <span className="font-medium text-slate-900 dark:text-slate-200 block mb-1">
                    相关报道：
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    <li>
                      <a
                        href="https://mp.weixin.qq.com/s/R-8KTmo6Wj6vUWNIueFI5A"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline decoration-blue-300 underline-offset-2 transition-colors"
                      >
                        2025年度网站比赛出炉，冠军5个月拿下526万独立访客
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://m.okjike.com/originalPosts/695fee6d800201ac6838a173?s=ewoidSI6ICI1OGExMWY0ODg4ZjNkYjAwMTYxMDJlNWEiCn0="
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline decoration-blue-300 underline-offset-2 transition-colors"
                      >
                        冠军介绍模板
                      </a>
                    </li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showcaseItems.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="flex-grow min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-gray-200 truncate pr-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {new URL(item.url).hostname}
              </p>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowUpRightIcon className="w-5 h-5 text-blue-500" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
