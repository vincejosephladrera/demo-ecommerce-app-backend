import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

import bcrypt from 'bcrypt';


export function comparePasswords(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 5)
}


type CombinedUser = {
  email: string,
  id: string
  role?: 'user' | 'admin'
}


export const createJWT = ({ email, id, role = "user" }: CombinedUser) => {

  const token = jwt.sign(
    { email, id, role },
    process.env.JWT_SECRET!
  );

  return token;
};


type UserPayload = { email: string, password: string, role: string };
type AuthenticatedRequest = Request & { user?: UserPayload };


export const protect = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;


  if (!bearer) {
    res.status(401).send("Not Authorized")
    return
  }

  const [, token] = bearer!.split(" ");


  if (!token) {
    res.status(401).send("Not Authorized")
    return
  }




  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    req.user = payload
    console.log(payload);
    next();

  } catch (e) {
    console.error(e);
    res.status(401).send("Not Authorized")
    return
  }
};

export const requireRole = (role: "admin" | "user") => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      res.status(403).send("Forbidden: Access denied");
    }
    next();
  };
};
