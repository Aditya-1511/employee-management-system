import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const jwt = {
  secret_key: 'reactNestjs',
  login_token: '1d',
};

export const cfg = {
  port,
  dbUrl,
  jwt,
};
