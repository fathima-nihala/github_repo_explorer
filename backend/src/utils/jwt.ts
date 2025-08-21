// import jwt from 'jsonwebtoken';

// export const generateToken = (payload: object): string => {
//   return jwt.sign(payload, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRE || '7d'
//   });
// };

// export const verifyToken = (token: string): any => {
//   return jwt.verify(token, process.env.JWT_SECRET!);
// };

import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';

// ensure we always have a valid secret
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'changeme';

export interface JwtPayloadCustom {
  id: string;
  username: string;
  email: string;
}

export const generateToken = (payload: JwtPayloadCustom): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRE as SignOptions['expiresIn']) || '7d'
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayloadCustom => {
  return jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
};
