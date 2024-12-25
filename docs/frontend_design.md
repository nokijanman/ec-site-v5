# フロントエンド設計

## 技術選定

- **フレームワーク:** React
- **言語:** TypeScript
- **バンドラー:** Vite
- **状態管理:** Zustand
- **UIライブラリ:** Tailwind CSS
- **ルーティング:** React Router
- **フォーム:** React Hook Form
- **HTTPクライアント:**  fetch API または axios

## ディレクトリ構成

```
frontend/
├── public/                # 静的アセット
├── src/                   # ソースコード
│   ├── assets/            # 画像やアイコンなどのアセット
│   ├── components/        # Reactコンポーネント
│   │   ├── common/        # 汎用的なコンポーネント
│   │   ├── auth/          # 認証関連のコンポーネント
│   │   ├── header/        # ヘッダーコンポーネント
│   │   ├── home/          # ホーム画面のコンポーネント
│   │   ├── product/       # 商品関連のコンポーネント
│   │   ├── cart/          # カート関連のコンポーネント
│   │   ├── payment/       # 決済関連のコンポーネント
│   │   └── ...
│   ├── contexts/          # Context APIによる状態管理
│   ├── data/              # モックデータやAPIレスポンスの型定義
│   ├── hooks/             # カスタムフック
│   ├── pages/             # ページコンポーネント
│   │   ├── Home.tsx
│   │   ├── ProductList.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ...
│   ├── routes/            # ルーティング定義
│   │   └── index.tsx
│   ├── services/          # API連携処理
│   ├── styles/            # CSSスタイル
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── types/             # TypeScriptの型定義
│   ├── utils/             # ユーティリティ関数
│   ├── App.tsx            # アプリケーションのエントリーポイント
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html             # HTMLのエントリーポイント
├── package.json           # 依存ライブラリ
├── tsconfig.json          # TypeScriptの設定ファイル
├── vite.config.ts         # Viteの設定ファイル
└── ...
```

## 主要コンポーネント

- **Header:**  ナビゲーション、ログインボタンなどを表示
- **Footer:**  フッター情報
- **ProductCard:** 商品一覧で各商品を表示するコンポーネント
- **ProductDetail:** 商品詳細ページ
- **LoginForm:** ログインフォーム
- **RegisterForm:** 登録フォーム
- **Cart:** カートページ
- **Checkout:** 決済ページ

## 状態管理

- **Zustand:**  グローバルな状態管理に利用
- **Context API:**  ThemeProviderなど、特定のコンポーネントツリーで共有する状態に利用

## API連携

- `fetch` API または `axios` を使用してバックエンドAPIと通信
- APIエンドポイントのURLは環境変数で管理
- 認証が必要なAPIリクエストには、JWTをAuthorizationヘッダーに含める
