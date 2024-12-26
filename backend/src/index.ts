import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in the environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getTableNames() {
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (error) {
      console.error('Error fetching table names:', error);
      return [];
    }

    return data.map(table => table.table_name);
  } catch (error) {
    console.error('Error getting table names:', error);
    return [];
  }
}

async function getTableDetails(tableName: string) {
  try {
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', tableName)
      .eq('table_schema', 'public');

    if (error) {
      console.error(`Error fetching details for table ${tableName}:`, error);
      return [];
    }
    return data;
  } catch (error) {
    console.error(`Error getting details for table ${tableName}:`, error);
    return [];
  }
}

async function runTest() {
  const tableNames = await getTableNames();
  console.log('取得したテーブル名:', tableNames);

  for (const tableName of tableNames) {
    const tableDetails = await getTableDetails(tableName);
    console.log(`テーブル ${tableName} の詳細:`, tableDetails);
  }
}

AppDataSource.initialize()
  .then(async () => {
    console.log('TypeORMデータベースに接続しました');
    await runTest();
  })
  .catch((error) => console.log('データベース接続エラー', error));
