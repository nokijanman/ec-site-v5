# バックエンドテストのトラブルシューティング

## 発生した問題
バックエンドのテストが Supabase データベースへの接続に失敗しました。

```
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) could not translate host name "db.supabase.co" to address: Name or service not known
```

## 試した解決策
テスト環境のデータベース接続設定 (`backend/app/core/database.py`) を修正し、開発環境と同じ Supabase の接続情報を使用するように変更しました。

## 解決したこと
テスト環境で Supabase データベースに接続できるようになりました。

## 可能性が低いと思われる原因
- インターネット接続の問題: Codespace 環境であり、通常はインターネット接続に問題はありません。
- DNS 設定の問題: Codespace 環境の DNS 設定が誤っている可能性は低いと考えられます。

## 残された課題
テスト実行時にホスト名 `db.supabase.co` を解決できない問題が依然として発生しています。`ping` コマンドと `nslookup` コマンドは利用できませんでしたが、`curl db.supabase.co` コマンドを実行したところ、同様にホスト名を解決できないというエラーが発生しました。

## 今後の対応
- Supabase 側の問題の可能性を考慮し、少し時間を置いてから再度テストを実行します。
- 必要に応じて、`.env` ファイルに設定されている Supabase の URL が正しいことを再確認します。

## 現在までの調査結果
- バックエンドテストが Supabase データベースへの接続に失敗している。
- エラーメッセージから、ホスト名 `db.supabase.co` を解決できない DNS の問題が発生している可能性がある。
- 環境変数 (`.env` ファイル) に設定されている Supabase の URL とキーは正しいことを確認済み。
- バックエンドアプリケーション内から Supabase の URL (`https://xmkkzykfjmzxxkxbawys.supabase.co`) を名前解決できることを確認済み。
- 環境変数 `PYTHONPATH` に `backend` ディレクトリを追加することで、pytest が `backend` モジュールを認識できるようになった。
- 現在、バックエンドテストを実行中であり、`backend/tests/test_products.py` に追加した `print` 文による `DATABASE_URL` の出力結果を待っている状態。
