import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default class EnvironmentConfiguration {
  static NODE_ENV = process.env.NODE_ENV;
  static APP_NAME = process.env.APP_NAME;
  static PORT = +process.env.PORT!;
  static MAIN_SERVER_URL=process.env.MAIN_SERVER_URL

  // Database configuration
 

  // JWT configuration
  static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  static ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN!;
  static REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
  static REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN!;



  // pagination
  static DEFAULT_PER_PAGE = +process.env.DEFAULT_PER_PAGE!;
}