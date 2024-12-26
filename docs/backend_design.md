# バックエンド設計

## 技術選定

- **言語:** TypeScript
- **フレームワーク:** NestJS
- **データベース:** Supabase (PostgreSQL)
- **認証:** JWT (JSON Web Token)
- **API ドキュメント:** OpenAPI (Swagger UI)

## ディレクトリ構成

```
backend/
├── src/
│   ├── main.ts       # アプリケーションのエントリーポイント
│   ├── app.module.ts # アプリケーションのルートモジュール
│   ├── controllers/  # APIエンドポイント
│   │   ├── auth.controller.ts
│   │   ├── users.controller.ts
│   │   ├── products.controller.ts
│   │   └── payments.controller.ts
│   ├── services/     # ビジネスロジック
│   │   ├── auth.service.ts
│   │   ├── users.service.ts
│   │   ├── products.service.ts
│   │   └── payments.service.ts
│   ├── entities/     # データベースエンティティ (TypeORM)
│   │   ├── user.entity.ts
│   │   ├── product.entity.ts
│   │   ├── order.entity.ts
│   │   └── payment.entity.ts
│   ├── dtos/         # リクエスト/レスポンスのデータ転送オブジェクト
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── modules/      # 機能ごとのモジュール
│   │   ├── auth.module.ts
│   │   ├── users.module.ts
│   │   ├── products.module.ts
│   │   └── payments.module.ts
│   ├── core/         # 共通処理、設定
│   │   ├── config/
│   │   │   ├── configuration.ts
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   ├── data-source.ts
│   │   ├── auth/
│   │   │   ├── jwt.strategy.ts
│   ├── tests/        # テストコード
│   │   ├── auth.controller.spec.ts
│   │   ├── users.controller.spec.ts
│   │   └── products.controller.spec.ts
├── package.json      # 依存ライブラリ
├── tsconfig.json     # TypeScript設定ファイル
```

## API エンドポイント設計

### 認証 (auth)

- `POST /auth/register`: ユーザー登録
- `POST /auth/login`: ログイン (JWT発行)
- `POST /auth/google`: Google ログイン
- `POST /auth/refresh`: JWTリフレッシュ

### ユーザー (users)

- `GET /users/me`: ログインユーザー情報の取得
- `PATCH /users/me`: ログインユーザー情報の更新

### 商品 (products)

- `GET /products`: 商品一覧の取得
- `GET /products/:id`: 特定の商品の取得

### 決済 (payments)

- `POST /payments/sessions`: 決済セッションの作成
- `POST /payments/confirm`: 決済の確認

## データベース連携

- Supabase (PostgreSQL) を使用
- TypeORM を使用してデータベース操作

## 認証・認可

- JWT (JSON Web Token) ベースの認証
- 認可はロールベース (RBAC) を検討

## Supabaseとの連携

バックエンドは、 `@supabase/supabase-js` を使用して Supabase と連携します。

### スキーマ

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
  user_id: string; // UUID
  created_at: string;
  updated_at: string;
  expires_at?: string;
  // カートアイテムは、リレーションを通じて取得
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
}
```

#### Order

```typescript
interface Order {
  id: string; // UUID
  user_id: string; // UUID
  order_number: string;
  order_date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total_amount: number;
  items: any[]; // JSONとして保存
  shipping_address?: any; // JSONとして保存
  created_at: string;
}
```

#### Profile

```typescript
interface Profile {
  id: string; // UUID
  email: string;
  full_name: string;
  phone_number?: string;
  country?: string;
  address?: any; // JSONとして保存
  created_at: string;
  updated_at: string;
}
```

#### ShippingAddress

```typescript
interface ShippingAddress {
  id: string; // UUID
  user_id: string; // UUID
  name?: string;
  postal_code?: string;
  prefecture?: string;
  city?: string;
  line1: string;
  line2?: string;
  phone?: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}
