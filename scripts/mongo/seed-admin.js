const bcrypy = require('bcrypt');
const chalk = require('chalk')
const MongoLib = require('../../lib/mongo');
const config = require('../../config');

// Build admin user strcuture
const buildAdminUser = (password) => {
  return {
    password,
    username: config.auth.adminUsername,
    email: config.auth.adminEmail,
  }
};

// Return true if the current admin already exist
const hasAdminUser = async (mongoDB) => {
  const adminUser = await mongoDB.getAll('users', {
    username: config.auth.adminUsername,
  });

  return adminUser && adminUser.length;
};

// Insert a new admin at DB
const createAdminUser = async (mongoDB) => {
  const hashedPassword = await bcrypy.hash(config.auth.adminPassword, 10);
  const userId = await mongoDB.create('users', buildAdminUser(hashedPassword));

  return userId;
};

// Create a new admin only if already does not exists
const seedAdmin = async () => {
  try {
    const mongoDB = new MongoLib();

    if (await hasAdminUser(mongoDB)) {
      console.log(chalk.yellowBright('Admin user already exists'));
      return process.exit(1);
    }

    const adminUserId = await createAdminUser(mongoDB);
    console.log(chalk.greenBright(`Admin user created with ID: ${adminUserId}`));
    return process.exit(0);
  } catch (error) {
    console.error(chalk.red(`[script:seed-admin] Error -> ${error}`));
    process.exit(1);
  }
};

seedAdmin();
