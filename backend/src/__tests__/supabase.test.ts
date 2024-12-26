import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

describe('Supabase Connection and Table Info', () => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing in the environment.');
  }

  const supabase = createClient(`${supabaseUrl}`, `${supabaseAnonKey}`);

  it('should connect to Supabase and retrieve table names', async () => {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
  });

  it('should retrieve column names for each table', async () => {
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    expect(tableError).toBeNull();

    if (tables) {
      for (const table of tables) {
        const { data: columns, error: columnError } = await supabase
          .from('information_schema.columns')
          .select('column_name')
          .eq('table_name', table.table_name)
          .eq('table_schema', 'public');

        expect(columnError).toBeNull();
        expect(columns?.length).toBeGreaterThan(0);
      }
    }
  });
});
