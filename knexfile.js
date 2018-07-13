
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/super-messenger'
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://fwiamkqaghseau:f0462177274209aade871aa476eb1984232c3e97ef6b4519dbde4c22a3b3a89b@ec2-107-22-169-45.compute-1.amazonaws.com:5432/d1l145i8dgm6op'
    }
};