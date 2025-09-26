const baseDir = __dirname;

const Config = {
  PORT: process.env.PORT,
  BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
  BASE_DIR: baseDir,
  FILE_LINK_EXPIRY_IN_MINUTES: process.env.FILE_LINK_EXPIRY_IN_MINUTES,
  CRYPTR_TOKEN: process.env.CRYPTR_TOKEN,
  ADMIN_USER: process.env.ADMIN_USER,
  ADMIN_PASS: process.env.ADMIN_PASS,
  SECRET: process.env.SECRET,
};

module.exports = {
  Config,
};
