import { DataSource } from 'typeorm';
import { AppDataSource } from '../ormconfig';

describe('Database Connection', () => {
  let connection: DataSource;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should connect to the database', async () => {
    expect(connection.isInitialized).toBe(true);
  });
});
