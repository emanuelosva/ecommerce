require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    Name: dbName,
    URI: `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`,
  },
  env: {
    node_env: process.env.NODE_ENV || 'development',
    dev: process.env.NODE_ENV !== 'production',
  },
  auth: {
    adminUsername: process.env.AUTH_ADMIN_USERNAME || 'admin',
    adminPassword: process.env.AUTH_ADMIN_PASSWORD || 'pass',
    adminEmail: process.env.AUTH_ADMIN_EMAIL || 'admin@mail.com',
    jwtSecret: process.env.AUTH_JWT_SECRET || 'secret',
    githubId: process.env.GITHUB_ID || 'clientId',
    githubSecret: process.env.GITHUB_SECRET || 'secret',
  },
};
