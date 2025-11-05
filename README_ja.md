---
Nexty で SaaS を迅速に立ち上げよう - ビジュアル料金ダッシュボード、AI プレイグラウンド、エンタープライズレベル CMS を備えた唯一の Next.js ボイラープレート。多言語対応、認証、決済、メール機能、SEO 最適化も完備。

[Nexty.dev を今すぐ試す](https://nexty.dev?utm_source=github-nextjs-starter)
---

[<img src="/public/try-nexty.webp">](https://nexty.dev?utm_source=github-nextjs-starter)

🌍 *[English](README.md) ∙ [简体中文](README_zh.md) ∙ [日本語](README_ja.md)*

# Next Forge - 多言語対応 Next.js 16 スターター

グローバル対応のウェブサイトを素早く構築するための、機能豊富なNext.js 15多言語スターターテンプレートです。

- [👉 ソースコード](https://github.com/weijunext/nextjs-starter)
- [👉 デモサイト](https://nextforge.dev/)

**🚀 多機能で使いやすいフルスタックの起動テンプレートをお探しですか？ ぜひ、当社の[アドバンス版](https://nexty.dev)をお試しください。**

## ✨ 主な機能

- 🌐 多言語対応（英語・中国語・日本語）
- 🎨 Tailwind CSSによるモダンなUI
- 🌙 ダーク/ライトテーマ切り替え
- 📱 レスポンシブデザイン
- 📝 MDXブログシステム 
- 🔍 SEO最適化
- 📊 アナリティクスツール統合
  - Google Analytics
  - Baidu Analytics
  - Google Adsense
  - Vercel Analytics

## 🚀 クイックスタート

### 必要な環境

- Node.js 20.9 以上
- pnpm 9.0 以上（推奨）

> **注意**: プロジェクトには `packageManager` フィールドが設定されており、最適な体験のために pnpm の使用を推奨しています。

### インストール手順

1. リポジトリのクローン：
```bash
git clone https://github.com/weijunext/nextjs-starter.git
cd nextjs-starter
```

2. Corepack の有効化（推奨）：
```bash
corepack enable
```

3. 依存関係のインストール：
```bash
pnpm install
# または他のパッケージマネージャーを使用
npm install
yarn
```

4. 環境変数の設定：
```bash
cp .env.example .env
```

5. 開発サーバーの起動：
```bash
pnpm dev
# または npm run dev
```

http://localhost:3000 にアクセスして確認できます。

## ⚙️ 設定方法

1. 基本設定
   - `config/site.ts`でウェブサイト情報を編集
   - `public/`内のアイコンとロゴを更新
   - `app/sitemap.ts`でサイトマップを設定
   - `app/robots.ts`でrobots.txtを更新

2. 多言語設定
   - `i18n/messages/`内の言語ファイルを追加/編集
   - `i18n/routing.ts`でサポートする言語を設定
   - `middleware.ts`で多言語ルーティングを設定
   - `app/[locale]/`配下にページを作成
   - Next.jsデフォルトの代わりに`i18n/routing.ts`の`Link`コンポーネントを使用

## 📝 コンテンツ管理

### ブログ投稿
`blog/[locale]`にMDXファイルを以下のフォーマットで作成：

```markdown
---
title: 投稿タイトル
description: 投稿の説明
image: /image.png
slug: /url-path
tags: tag1,tag2
date: 2025-02-20
visible: published
pin: true
---

投稿内容...
```

対応フィールドについては`types/blog.ts`を参照してください。

### 静的ページ
`content/[page]/[locale].mdx`で静的ページのコンテンツを管理します。

## 🔍 SEO最適化

包括的なSEO機能を搭載：
   - サーバーサイドレンダリングと静的生成
   - sitemap.xml自動生成
   - robots.txt設定
   - 最適化されたメタデータ
   - OGP対応
   - 多言語SEOサポート

## 📊 アナリティクス

`.env`にIDを追加して有効化：
```
NEXT_PUBLIC_GOOGLE_ANALYTICS=
NEXT_PUBLIC_BAIDU_TONGJI=
NEXT_PUBLIC_GOOGLE_ADSENSE=
```

## 📁 プロジェクト構成

```
nextjs-starter/
├── app/                      # アプリディレクトリ
│   ├── [locale]/            # 多言語ルート
│   │   ├── about/           # Aboutページ
│   │   ├── blog/           # ブログページ
│   │   └── ...              # その他のページ
│   ├── api/                 # APIルート
│   └── globals/             # グローバルコンポーネント
├── blog/                   # ブログコンテンツ（MDX）
│   ├── en/                  # 英語ブログ
│   ├── ja/                  # 日本語ブログ
│   └── zh/                  # 中国語ブログ
├── components/              # 再利用可能なコンポーネント
│   ├── ui/                  # ベースUIコンポーネント
│   ├── header/              # ヘッダーコンポーネント
│   ├── footer/              # フッターコンポーネント
│   └── ...                  # その他のコンポーネント
├── config/                  # 設定ファイル
├── content/                 # 静的コンテンツ（MDX）
├── i18n/                    # 国際化設定
│   ├── messages/            # 翻訳ファイル
│   ├── routing.ts           # ルーティング設定
│   └── request.ts           # リクエスト設定
├── lib/                     # ユーティリティ関数
├── public/                  # 静的アセット
└── types/                   # 型定義
```

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + Shadcn/ui
- **国際化**: next-intl
- **コンテンツ**: MDX
- **状態管理**: Zustand
- **デプロイ**: Vercel
- **パッケージマネージャー**: pnpm（推奨）

## 🚀 デプロイ

### ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/weijunext/nextjs-starter&project-name=&repository-name=nextjs-starter&demo-title=NextjsStarter&demo-description=Nextjs%2015%20starter.&demo-url=https://nextforge.dev&demo-image=https://nextforge.dev/og.png)

### Vercelへの手動デプロイ

1. GitHubにコードをプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ

### その他のプラットフォーム

```bash
# プロダクション用ビルド
pnpm build

# プロダクションサーバーを起動
pnpm start
```

## 💡 開発のベストプラクティス

### パッケージマネージャー使用

- プロジェクトは `packageManager: "pnpm@10.12.4"` で設定済み
- Corepack を有効化: `corepack enable`
- チームメンバーは同じ pnpm バージョンを使用すべき

### コード品質

```bash
# コードリント
pnpm lint

# 型チェック
pnpm type-check
```

### 多言語開発

1. 新しい言語サポートの追加：
   - `i18n/messages/` に新しい言語ファイルを追加
   - `i18n/routing.ts` 設定を更新
   - `blog/` と `content/` に対応する言語ディレクトリを作成

2. 翻訳の使用：
```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('title')}</h1>;
}
```

## 🔧 トラブルシューティング

### よくある問題

**1. パッケージマネージャーのバージョン不一致**
```bash
# node_modules と lockfile を削除
rm -rf node_modules pnpm-lock.yaml
# 再インストール
pnpm install
```

**2. MDXファイルが表示されない**
- ファイルパスが正しいか確認
- frontmatter のフォーマットが正しいか確認
- `visible` フィールドが `published` に設定されているか確認

**3. 多言語ルーティングの問題**
- `i18n/routing.ts` の `Link` コンポーネントを使用
- `middleware.ts` の設定を確認

**4. スタイルが効かない**
- Tailwind CSS のクラス名が正しいか確認
- 開発サーバーの再起動を試す

### 環境変数の問題

`.env` ファイルに必要な設定が含まれていることを確認：
```bash
# サンプル設定をコピー
cp .env.example .env
# 必要に応じて設定を変更
```

## 📄 ライセンス

MIT

## 🤝 コントリビューション

Issue、PRは大歓迎です！

## 作者について

Next.jsのフルスタックスペシャリストとして、プロジェクト開発、パフォーマンス最適化、SEO改善のエキスパートサービスを提供しています。

コンサルティングやトレーニングについては、 weijunext@gmail.com までご連絡ください。

- [Github](https://github.com/weijunext)
- [Bento](https://bento.me/weijunext)
- [Twitter/X](https://twitter.com/judewei_dev)

<a href="https://www.buymeacoffee.com/weijunext" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/G2G6TWWMG)