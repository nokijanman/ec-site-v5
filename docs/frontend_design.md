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

## Supabaseとの連携

フロントエンドは、Supabaseクライアントライブラリを使用して、直接Supabaseと連携します。

### スキーマ

主な連携で利用する可能性のあるデータ構造の例：

#### Product

```typescript
interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  status: 'Available' | 'OutOfStock' | 'Hidden';
  condition: 'New' | 'Used';
  stock_quantity: number;
  created_at: string;
  updated_at: string;
  product_media: ProductMedia[];
}
```

#### ProductMedia

```typescript
interface ProductMedia {
  id: number;
  product_id: number;
  image_url: string;
  external_link?: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}
```

#### Cart

```typescript
interface Cart {
  id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  cart_items: CartItem[];
}
```

#### CartItem

```typescript
interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product; // 商品情報を結合する場合
}
```

#### Order

```typescript
interface Order {
  id: string;
  user_id: string;
  order_number: string;
  order_date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total_amount: number;
  items: OrderItem[];
  shipping_address?: ShippingAddress;
  created_at: string;
}
```

#### OrderItem

```typescript
interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}
```

#### Profile

```typescript
interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  country?: string;
  address?: {
    [key: string]: any; // JSON形式の住所
  };
  created_at: string;
  updated_at: string;
}
```

#### ShippingAddress

```typescript
interface ShippingAddress {
  id: string;
  user_id: string;
  name?: string;
  postal_code?: string;
  prefecture?: string;
  city?: string;
  line1?: string;
  line2?: string;
  phone?: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}
```

これらのインターフェースは、フロントエンドでSupabaseから取得するデータや、Supabaseに送信するデータの構造を定義するために使用されます。必要に応じて、これらの定義を拡張または変更することがあります。
