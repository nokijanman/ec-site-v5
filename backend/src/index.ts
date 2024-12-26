import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import * as dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('TypeORMデータベースに接続しました');
  })
  .catch((error) => console.log('データベース接続エラー', error));
