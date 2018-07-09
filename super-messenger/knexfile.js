
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/super-messenger'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_USE
    }
};