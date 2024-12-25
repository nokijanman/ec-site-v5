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
