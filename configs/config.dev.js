module.exports = {
  DB_ADDRESS : process.env.DB_ADDRESS || "mongodb://localhost:27017/bayaweb",
  JWT_SECRET : process.env.JWT_SECRET || "your secret key to encrypt jwt tokens",
  APP_PORT   : process.env.APP_PORT   || "80",
}