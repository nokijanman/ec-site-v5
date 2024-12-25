# データベース設定 (Supabase)

## データベース構造

### 1. cart_items

カートに含まれるアイテムを管理するテーブル。

| カラム名     | データ型                  | 説明                       |
|------------|---------------------------|----------------------------|
| id         | integer                   | ユニークなID                 |
| cart_id    | integer                   | カートを参照するID           |
| product_id | integer                   | 商品を参照するID             |
| quantity   | integer                   | アイテムの数量               |
| created_at | timestamp with time zone  | レコード作成日時             |
| updated_at | timestamp with time zone  | レコード更新日時             |

### 2. carts

ユーザーのカートを管理するテーブル。

| カラム名     | データ型                  | 説明                       |
|------------|---------------------------|----------------------------|
| id         | integer                   | ユニークなID                 |
| user_id    | uuid                      | ユーザーを参照するID         |
| created_at | timestamp with time zone  | レコード作成日時             |
| updated_at | timestamp with time zone  | レコード更新日時             |
| expires_at | timestamp with time zone  | カートの有効期限             |

### 3. favorites

ユーザーのお気に入り商品を管理するテーブル。

| カラム名     | データ型                  | 説明                       |
|------------|---------------------------|----------------------------|
| id         | uuid                      | ユニークなID                 |
| user_id    | uuid                      | ユーザーを参照するID         |
| product_id | integer                   | 商品を参照するID             |
| created_at | timestamp with time zone  | レコード作成日時             |

### 4. product_media

商品のメディア情報（画像や動画）を管理するテーブル。

| カラム名      | データ型                  | 説明                         |
|-------------|---------------------------|-----------------------------|
| id          | integer                   | ユニークなID                   |
| product_id  | integer                   | 商品を参照するID               |
| image_url   | text                      | 商品画像のURL                 |
| external_link | text                      | 外部リンク（例: 商品説明動画） |
| is_primary  | boolean                   | プライマリ画像かどうか         |
| created_at  | timestamp with time zone  | レコード作成日時               |
| updated_at  | timestamp with time zone  | レコード更新日時               |

### 5. orders

注文情報を管理するテーブル。

| カラム名         | データ型                  | 説明                         |
|----------------|---------------------------|-----------------------------|
| id             | uuid                      | ユニークなID                   |
| user_id        | uuid                      | ユーザーを参照するID           |
| order_number   | text                      | 注文番号                     |
| order_date     | timestamp with time zone  | 注文日                       |
| status         | text                      | 注文のステータス               |
| total_amount   | numeric                   | 合計金額                     |
| items          | jsonb                     | 注文アイテムの詳細（JSON形式） |
| shipping_address | jsonb                     | 配送先住所（JSON形式）         |
| created_at     | timestamp with time zone  | レコード作成日時               |

### 6. products

商品情報を管理するテーブル。

| カラム名       | データ型                  | 説明             |
|--------------|---------------------------|-----------------|
| id           | integer                   | ユニークなID       |
| name         | varchar                   | 商品名           |
| description  | text                      | 商品説明         |
| price        | numeric                   | 商品価格         |
| status       | varchar                   | ステータス         |
| condition    | varchar                   | 商品の状態       |
| stock_quantity | integer                   | 在庫数           |
| created_at   | timestamp with time zone  | レコード作成日時   |
| updated_at   | timestamp with time zone  | レコード更新日時   |

### 7. profiles

ユーザーのプロフィール情報を管理するテーブル。

| カラム名     | データ型                  | 説明               |
|------------|---------------------------|--------------------|
| id         | uuid                      | ユニークなID         |
| email      | text                      | メールアドレス       |
| full_name  | text                      | 氏名               |
| phone_number | text                      | 電話番号             |
| country    | text                      | 国名               |
| address    | jsonb                     | 住所（JSON形式）     |
| created_at | timestamp with time zone  | レコード作成日時     |
| updated_at | timestamp with time zone  | レコード更新日時     |

### 8. shipping_addresses

配送先住所を管理するテーブル。

| カラム名     | データ型                  | 説明                           |
|------------|---------------------------|--------------------------------|
| id         | uuid                      | ユニークなID                     |
| user_id    | uuid                      | ユーザーを参照するID             |
| name       | text                      | 配送先の名称（例：自宅、会社）   |
| postal_code| text                      | 郵便番号                         |
| prefecture | text                      | 都道府県                         |
| city       | text                      | 市区町村                         |
| line1      | text                      | 番地                           |
| line2      | text                      | 建物名・部屋番号（任意）         |
| phone      | text                      | 電話番号                         |
| is_default | boolean                   | デフォルトの配送先かどうか       |
| created_at | timestamp with time zone  | レコード作成日時                 |
| updated_at | timestamp with time zone  | レコード更新日時                 |

## Supabase のセットアップ

### ステップ 1: Supabase のアカウントを作成

1. [Supabase公式サイト](https://supabase.com/) にアクセスします。
2. 「Sign Up」ボタンをクリックして、アカウントを作成します。
3. 必要事項（メールアドレス、パスワード）を入力します。
4. 登録後、メール認証を行います。

### ステップ 2: 新しいプロジェクトを作成

1. ログイン後、「New Project」ボタンをクリックします。
2. プロジェクトの情報を入力します。
    *   Organization: 所属する組織（またはデフォルトの個人組織）。
    *   Project Name: プロジェクト名を入力。
    *   Database Password: データベース用のパスワードを設定。
3. 「Create New Project」をクリックすると、数分でプロジェクトが作成されます。

### ステップ 3: Supabase ダッシュボードにアクセス

1. プロジェクト作成後、ダッシュボードにリダイレクトされます。
2. 左側メニューの「Database」セクションをクリックします。
3. 「SQL Editor」を選択します。

### ステップ 4: データベースを構築

1. **SQL Editor でテーブル作成**
    *   「SQL Editor」を開きます。
    *   以下のコードを貼り付けます。

```sql
-- cart_items テーブル
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- carts テーブル
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- favorites テーブル
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    product_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- product_media テーブル
CREATE TABLE product_media (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    external_link TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- orders テーブル
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    order_number TEXT NOT NULL,
    order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    items JSONB NOT NULL,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- products テーブル
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    status VARCHAR NOT NULL,
    condition VARCHAR NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- profiles テーブル
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    country TEXT,
    address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE shipping_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  postal_code TEXT,
  prefecture TEXT,
  city TEXT,
  line1 TEXT,
  line2 TEXT,
  phone TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shipping_addresses_user_id ON shipping_addresses(user_id);
```

    *   「Run」ボタンをクリックしてSQLを実行します。
2. **SQL 実行後の確認**
    *   左側メニューの「Table Editor」を選択します。
    *   作成したテーブルが一覧表示されることを確認します。
    *   必要に応じて各テーブルをクリックし、カラムやデータ型を確認します。

### ステップ 5: データを挿入する（オプション）

1. **方法 1: SQLで挿入**
    *   再度「SQL Editor」にアクセスします。
    *   以下のようなSQLを実行して、テストデータを挿入します。

```sql
-- products テーブルにサンプルデータを挿入
INSERT INTO products (name, description, price, status, condition, stock_quantity)
VALUES
    ('Product A', 'Description for product A', 100.0, 'Available', 'New', 10),
    ('Product B', 'Description for product B', 200.0, 'Out of Stock', 'Used', 0);
```

2. **方法 2: Table Editor を使用**
    *   左メニューの「Table Editor」を開きます。
    *   各テーブルを選択し、「Insert Row」をクリックして手動でデータを挿入します。

### ステップ 6: リアルタイム機能の有効化（オプション）

1. 左メニューから「Table Editor」を開きます。
2. 各テーブルを選択し、「Realtime Enabled」を有効化します。

### ステップ 7: テストとデバッグ

1. 各テーブルにデータを挿入し、データ構造やリレーションが意図したとおりに動作するか確認します。
2. 必要に応じて外部キー制約を追加することで、データの整合性を保つことができます。

## Row Level Security (RLS) の設定

Supabaseでは、データベーステーブルに対してポリシー（RLS: Row Level Security）を設定することが推奨されます。ポリシーを設定することで、各ユーザーがアクセスできるデータを制限でき、セキュリティを強化できます。

### RLS の有効化

以下のSQLを各テーブルに対して実行します。

```sql
ALTER TABLE [テーブル名] ENABLE ROW LEVEL SECURITY;
```

例：favorites テーブルの場合

```sql
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
```

### ポリシーの作成例

#### favorites テーブル

```sql
-- 自分のデータだけを閲覧可能にするポリシー
CREATE POLICY "Allow user to read their favorites"
ON favorites
FOR SELECT
USING (user_id = auth.uid());

-- 自分のデータだけを追加可能にするポリシー
CREATE POLICY "Allow user to insert their favorites"
ON favorites
FOR INSERT
WITH CHECK (user_id = auth.uid());
```

#### carts テーブル

```sql
-- 自分のカートデータのみ閲覧可能
CREATE POLICY "Allow user to read their carts"
ON carts
FOR SELECT
USING (user_id = auth.uid());

-- 自分のカートにデータを追加可能
CREATE POLICY "Allow user to insert into their carts"
ON carts
FOR INSERT
WITH CHECK (user_id = auth.uid());
```

#### orders テーブル

```sql
-- 自分の注文データのみ閲覧可能
CREATE POLICY "Allow user to read their orders"
ON orders
FOR SELECT
USING (user_id = auth.uid());

-- 自分の注文を作成可能
CREATE POLICY "Allow user to insert their orders"
ON orders
FOR INSERT
WITH CHECK (user_id = auth.uid());
```

#### profiles テーブル

```sql
-- 自分のプロフィールのみ閲覧・編集可能
CREATE POLICY "Allow user to read their profile"
ON profiles
FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Allow user to update their profile"
ON profiles
FOR UPDATE
USING (id = auth.uid());
```

#### cart_items テーブル

```sql
-- 自分のカートアイテムのみ閲覧可能
CREATE POLICY "Allow user to read their cart items"
ON cart_items
FOR SELECT
USING (cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid()));

-- 自分のカートにアイテムを追加可能
CREATE POLICY "Allow user to insert cart items"
ON cart_items
FOR INSERT
WITH CHECK (cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid()));
```

#### product_media テーブル

`product_media` テーブルは一般公開されることが多いので、ポリシーは不要な場合があります。

### RLS のテスト

RLSが正しく設定されているかを確認するには、SupabaseのSQL EditorやAPIを利用して、他のユーザーのデータにアクセスできないこと、自分のデータは正しく読み書きできることを確認します。

## 配送先住所管理の設定

### 1. テーブルの作成

```sql
CREATE TABLE shipping_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  postal_code TEXT,
  prefecture TEXT,
  city TEXT,
  line1 TEXT,
  line2 TEXT,
  phone TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. インデックスの作成

```sql
CREATE INDEX idx_shipping_addresses_user_id ON shipping_addresses(user_id);
```

### 3. RLSポリシーの設定

```sql
-- 読み取りポリシー（自分の配送先のみ）
CREATE POLICY "Users can view their own shipping addresses"
ON shipping_addresses FOR SELECT
USING (auth.uid() = user_id);

-- 作成ポリシー
CREATE POLICY "Users can create their own shipping addresses"
ON shipping_addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 更新ポリシー（自分の配送先のみ）
CREATE POLICY "Users can update their own shipping addresses"
ON shipping_addresses FOR UPDATE
USING (auth.uid() = user_id);

-- 削除ポリシー（自分の配送先のみ）
CREATE POLICY "Users can delete their own shipping addresses"
ON shipping_addresses FOR DELETE
USING (auth.uid() = user_id);
```

### 4. デフォルト住所管理のトリガー設定

```sql
-- デフォルト住所を管理するトリガー関数
CREATE OR REPLACE FUNCTION manage_default_address()
RETURNS TRIGGER AS $$
BEGIN
  -- 新しい住所がデフォルトとして設定される場合
  IF NEW.is_default THEN
    -- 同じユーザーの他の住所のデフォルト設定を解除
    UPDATE shipping_addresses
    SET is_default = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーの作成
CREATE TRIGGER manage_default_address_trigger
BEFORE INSERT OR UPDATE ON shipping_addresses
FOR EACH ROW
EXECUTE FUNCTION manage_default_address();
```

### 主な機能

- ユーザーごとの複数配送先管理
- デフォルト配送先の自動管理
- セキュアなアクセス制御
- 配送先の追加・編集・削除機能
