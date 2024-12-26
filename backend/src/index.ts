import 'reflect-metadata';
import { AppDataSource } from './ormconfig';

AppDataSource.initialize()
  .then(() => {
    console.log('データベースに接続しました');
  })
  .catch((error) => console.log('データベース接続エラー', error));
