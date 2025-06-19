export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    uri: process.env.DATABASE_URI,
  },
  server: {
    port: process.env.PORT,
  },
});
