const MySQLAdapter = require("./mysql");
 /**
 * Declaramos las conexiones de MySQL
 */
const adapterDB = new MySQLAdapter({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  database: process.env.MYSQL_DB_NAME,
  password: process.env.MYSQL_DB_PASSWORD,
  port: process.env.MYSQL_DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 15000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  createTimeoutMillis: 3000, 
  acquireTimeoutMillis: 30000, 
  idleTimeoutMillis: 15000, 
  reapIntervalMillis: 500, 
  createRetryIntervalMillis: 100
})
 

module.exports = { adapterDB };
