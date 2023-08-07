import jwt from "jsonwebtoken";
import env from "../config/env.config";
import {
  IJwtOptions,
  IJwtPayload,
  JwtVerified,
} from "../interfaces/jwt.interface";

 class WebToken {
  sign(user: IJwtPayload, options: IJwtOptions,email:string) {
    return jwt.sign(
      {
        id: user.id,
        email
      },
      options.secret,
      {
        expiresIn: options.expiresIn,
      },
      
    );
  }

  verify<T extends JwtVerified>(token: string, secret: string) {
    return jwt.verify(token, secret) as T;
  }

 

  generateTokens(user: IJwtPayload,email:string) {
    const accessToken = this.sign(
      user,
      {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
        secret: env.ACCESS_TOKEN_SECRET,
      },
      email
    );
    const refreshToken = this.sign(
      user,
      {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
        secret: env.REFRESH_TOKEN_SECRET,
      },
    email
    );
    return { accessToken, refreshToken };
  }
}

export default new WebToken()