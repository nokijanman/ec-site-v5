# ECサイト プロジェクト概要

## プロジェクト構成

現在のプロジェクトディレクトリ構成は以下の通りです。

```
.gitignore
eslint.config.js
index.html
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
src/
src/App.tsx
src/index.css
src/main.tsx
src/vite-env.d.ts
src/components/
src/components/LanguageSwitch.tsx
src/components/ProductCard.tsx
src/components/auth/
src/components/auth/LoginForm.tsx
src/components/header/
src/components/header/Header.tsx
src/components/home/
src/components/home/CategorySection.tsx
src/components/home/FeaturedAnime.tsx
src/components/home/HeroSection.tsx
src/components/home/NewsSection.tsx
src/data/
src/data/products.ts
src/types/
src/types/index.ts
```

## 今後の工程

- バックエンド（Python）の統合
- データベース（Supabase）との連携
- 決済フローの構築
- ログイン機能の実装（Googleログイン、フォームログイン）

## 必要なファイル

- `backend/`: バックエンドのコードを格納するディレクトリ
- `backend/app.py`: バックエンドのエントリーポイント
- `backend/models.py`: データベースモデルの定義
- `backend/schemas.py`: リクエスト/レスポンスのスキーマ定義
- `backend/routers/`: APIエンドポイントの定義
- `src/components/auth/GoogleLoginButton.tsx`: Googleログインボタンのコンポーネント
- `src/components/payment/`: 決済関連のコンポーネント

## 必要要件

- ユーザー情報管理
- カード情報管理
- Googleログイン機能
- ログインフォームからのログイン機能

## 決済フロー

1. **カート確認:** ユーザーがカートの内容を確認します。
2. **配送方法選択:** ユーザーが配送方法を選択します。
3. **決済方法選択:** ユーザーがクレジットカード、代金引換などの決済方法を選択します。
4. **カード情報入力 (クレジットカード決済の場合):** ユーザーがカード情報を入力します。
5. **注文確定:** ユーザーが注文内容を確認し、確定します。
6. **決済処理:** 選択された決済方法で決済処理を行います。
7. **注文完了:** 注文が完了し、ユーザーに通知が送信されます。

## 課題

- [ ] バックエンドの基本構造を構築する (Issue #7)
- [ ] Supabaseとの接続設定を行う (Issue #8)
- [ ] ユーザー認証機能を実装する（Googleログイン、フォームログイン） (Issue #9)
- [ ] ユーザー情報管理機能を実装する (Issue #10)
- [ ] カード情報管理機能を実装する (Issue #11)
- [ ] 決済フローを実装する (Issue #12)
- [ ] フロントエンドとバックエンドを連携させる (Issue #13)
