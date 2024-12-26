import sql from './db.js';

async function main() {
  try {
    const result = await sql`SELECT 1`;
    console.log('データベース接続成功:', result);
  } catch (error) {
    console.error('データベース接続エラー:', error);
  }
}

main();
