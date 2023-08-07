export interface IJwtOptions {
    secret: string;
    expiresIn: string;
  }
  export interface IJwtPayload {
    id: string;
    email: string;
  }
  
  export interface JwtVerified {
    id: string;
    email: string;
    iat: number;
    exp: number;
  }