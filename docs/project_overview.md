# ECサイト プロジェクト概要

## プロジェクト構成

### 現在の構成

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

### 理想の構成

```
ec-site-v5/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── schemas.py
│   ├── routers/
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── products.py
│   │   └── payments.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   ├── styles/
│   │   ├── assets/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── docs/
│   └── project_overview.md
├── .gitignore
├── README.md
└── ...
```
**説明:**

- `backend/`: Pythonで記述されたバックエンドのコードを格納します。
    - `app.py`: アプリケーションのエントリーポイントです。
    - `models.py`: データベースのモデルを定義します。
    - `schemas.py`: リクエストとレスポンスのデータ構造を定義します。
    - `routers/`: APIのエンドポイントを定義するモジュールを格納します。
    - `requirements.txt`: プロジェクトの依存ライブラリをリストします。
    - `Dockerfile`: コンテナ化のための設定ファイルです。
- `frontend/`: Reactで記述されたフロントエンドのコードを格納します。
    - `public/`: 静的アセットを格納します。
    - `src/`: Reactのコンポーネント、スタイル、アセットなどを格納します。
    - `package.json`: フロントエンドの依存関係とスクリプトを管理します。
    - `vite.config.ts`: ビルドツールViteの設定ファイルです。
- `docs/`: プロジェクトのドキュメントを格納します。
    - `project_overview.md`: プロジェクトの概要を説明するドキュメントです。
- `.gitignore`: Gitの管理対象から除外するファイルを指定します。
- `README.md`: プロジェクトの概要やセットアップ方法などを記述します。

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

## バックエンドとフロントエンドの統合

- フロントエンド (React) からバックエンド (FastAPI) のAPIエンドポイントを呼び出して連携します。
- APIの呼び出しには、`fetch` APIまたは `axios` などのHTTPクライアントライブラリを使用します。
- 認証が必要なAPIエンドポイントを呼び出す際には、JWTをリクエストヘッダーに含めます。
- バックエンドAPIのベースURLは、環境変数などで管理します。
