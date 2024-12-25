-- RLSを有効化
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- 自分のデータだけを閲覧可能にするポリシー
CREATE POLICY "Allow user to read their favorites" ON favorites
FOR SELECT
USING (user_id = auth.uid());

-- 自分のデータだけを追加可能にするポリシー
CREATE POLICY "Allow user to insert their favorites" ON favorites
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- 自分のカートデータのみ閲覧可能
CREATE POLICY "Allow user to read their carts" ON carts
FOR SELECT
USING (user_id = auth.uid());
-- 自分のカートにデータを追加可能
CREATE POLICY "Allow user to insert into their carts" ON carts
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- 自分の注文データのみ閲覧可能
CREATE POLICY "Allow user to read their orders" ON orders
FOR SELECT
USING (user_id = auth.uid());
-- 自分の注文を作成可能
CREATE POLICY "Allow user to insert their orders" ON orders
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- 自分のプロフィールのみ閲覧・編集可能
CREATE POLICY "Allow user to read their profile" ON profiles
FOR SELECT
USING (id = auth.uid());
CREATE POLICY "Allow user to update their profile"
ON profiles
FOR UPDATE
USING (id = auth.uid());

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

-- 読み取りポリシー(自分の配送先のみ)
CREATE POLICY "Users can view their own shipping addresses" ON shipping_addresses FOR SELECT
USING (auth.uid() = user_id);
-- 作成ポリシー
CREATE POLICY "Users can create their own shipping addresses" ON shipping_addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);
-- 更新ポリシー(自分の配送先のみ)
CREATE POLICY "Users can update their own shipping addresses" ON shipping_addresses FOR UPDATE
USING (auth.uid() = user_id);
-- 削除ポリシー(自分の配送先のみ)
CREATE POLICY "Users can delete their own shipping addresses" ON shipping_addresses FOR DELETE
USING (auth.uid() = user_id);

-- デフォルト住所を管理するトリガー関数
CREATE OR REPLACE FUNCTION manage_default_address() RETURNS TRIGGER AS $$
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
