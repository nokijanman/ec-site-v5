// 環境変数を適用する
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const main = async () => {
  console.log(process.env);
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("環境変数が設定されていません");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("carts")
    .select('id, user_id, created_at')
    .eq("user_id", "f8c8c8c8-c8c8-4c8c-8c8c-c8c8c8c8c8c8");

  if (error) {
    console.error("データの取得に失敗しました:", error);
    return;
  }

  console.log("取得したデータ:", data);
};

main();
