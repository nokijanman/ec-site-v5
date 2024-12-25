# バックエンド設計

## 技術選定

- **言語:** Python 3.x
- **フレームワーク:** FastAPI
- **データベース:** Supabase (PostgreSQL)
- **認証:** JWT (JSON Web Token)
- **API ドキュメント:** OpenAPI (Swagger UI)

## ディレクトリ構成

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py       # アプリケーションのエントリーポイント
│   ├── models/       # データベースモデル
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   └── payment.py
│   ├── schemas/      # リクエスト/レスポンスのスキーマ (Pydantic)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── product.py
│   │   ├── order.py
│   │   └── payment.py
│   ├── routers/      # APIエンドポイント
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── products.py
│   │   └── payments.py
│   ├── core/         # 共通処理、設定
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   └── tests/        # テストコード
│       ├── __init__.py
│       ├── conftest.py
│       ├── test_auth.py
│       ├── test_users.py
│       └── test_products.py
├── requirements.txt  # 依存ライブラリ
└── Dockerfile        # Docker設定ファイル
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
- `GET /products/{product_id}`: 特定の商品の取得

### 決済 (payments)

- `POST /payments/sessions`: 決済セッションの作成
- `POST /payments/confirm`: 決済の確認

## データベース連携

- Supabase (PostgreSQL) を使用
- SQLAlchemy (またはSQLAlchemy Core) を使用してデータベース操作

## 認証・認可

- JWT (JSON Web Token) ベースの認証
- 認可はロールベース (RBAC) を検討

## Supabaseとの連携

バックエンドは、Supabase Pythonクライアントライブラリを使用してSupabaseと連携します。

### スキーマ

**注意:** 日付型は `datetime` オブジェクトとして記述されていますが、APIとのデータ交換時にはISO 8601形式などの統一されたフォーマットを使用します。

主な連携で利用する可能性のあるデータ構造の例：

#### Product

```python
class Product(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    status: Literal['Available', 'OutOfStock', 'Hidden']
    condition: Literal['New', 'Used']
    stock_quantity: int
    created_at: datetime
    updated_at: datetime
```

#### ProductMedia

```python
class ProductMedia(BaseModel):
    id: int
    product_id: int
    image_url: str
    external_link: Optional[str] = None
    is_primary: bool
    created_at: datetime
    updated_at: datetime
```

#### Cart

```python
class Cart(BaseModel):
    id: int
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    expires_at: Optional[datetime] = None
    # カートアイテムは、データベースのリレーションシップを通じてアクセスします。
```

#### CartItem

```python
class CartItem(BaseModel):
    id: int
    cart_id: int
    product_id: int
    quantity: int
    created_at: datetime
    updated_at: datetime
```

#### Order

```python
class Order(BaseModel):
    id: UUID
    user_id: UUID
    order_number: str
    order_date: datetime
    status: Literal['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    total_amount: float
    items: List[Dict]  # JSONとして保存される
    shipping_address: Optional[Dict] = None  # JSONとして保存される
    created_at: datetime
```

#### Profile

```python
class Profile(BaseModel):
    id: UUID
    email: str
    full_name: str
    phone_number: Optional[str] = None
    country: Optional[str] = None
    address: Optional[Dict] = None  # JSONとして保存される
    created_at: datetime
    updated_at: datetime
```

#### ShippingAddress

```python
class ShippingAddress(BaseModel):
    id: UUID
    user_id: UUID
    name: Optional[str] = None
    postal_code: Optional[str] = None
    prefecture: Optional[str] = None
    city: Optional[str] = None
    line1: str
    line2: Optional[str] = None
    phone: Optional[str] = None
    is_default: bool = False
    created_at: datetime
    updated_at: datetime
