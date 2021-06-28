const env = {
  database: 'ratatouille',
  username: 'admin',
  password: 'rr02WoSIkKVfDjl0M01MTgpr2kE3Es7Yf8hV6mN8vHJoH3QRp7',
  //host: 'ratatouille-mariadb',
  //port: '3306',
  host: '188.68.53.181',
  port: 7414,
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;
