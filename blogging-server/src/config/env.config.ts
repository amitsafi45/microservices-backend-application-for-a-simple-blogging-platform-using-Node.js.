import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default class EnvironmentConfiguration {
  static NODE_ENV = process.env.NODE_ENV;
  static APP_NAME = process.env.APP_NAME;
  static PORT = +process.env.PORT!;
  static BASE_URL = process.env.BASE_URL;
 static MAIN_SERVER_URL=process.env.MAIN_SERVER_URL
  // Database configuration
 

  


  // pagination
  static DEFAULT_PER_PAGE = +process.env.DEFAULT_PER_PAGE!;
}