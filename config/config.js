module.exports = {
  development: {
    username: "root",
    password: null,
    database: "ad-management",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "postgres",
    password: "password",
    database: "testdb",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
