import * as db from 'mssql';

const config: db.config = {
  server: process.env.DB_SERVER ?? '',
  database: process.env.DB_DATABASE ?? '',
  user: process.env.DB_USER ?? '',
  password: process.env.DB_PASSWORD ?? '',
  port: parseInt(process.env.DB_PORT ?? '1433'),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const database = new db.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('SQL Server Connected Successfully!');
    return pool;
  })
  .catch((err: unknown) => {
    console.error(
      'Error connecting to SQL Server:',
      err instanceof Error ? err.message : String(err),
    );
    throw err;
  });

export default database;
