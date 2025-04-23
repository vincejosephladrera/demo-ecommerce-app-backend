import prisma from '../../db'
import { Response } from 'express';

import { SignInRequestType, SignUpRequestType } from "./admin.model";
import { hashPassword, createJWT } from "../../utils/auth";



async function signUp(req: SignUpRequestType, res: Response) {
  const hash = await hashPassword(req.body.password)

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (existingAdmin) {
    return void (res.status(401).json({
      error: {
        message: "Email was already taken.",
        status: 401
      }
    }))
  }

  const admin = await prisma.admin.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    },
  });

  const token = createJWT({ role: "admin", ...admin });

  return void (res.status(200).json({ token }))
}

async function signIn(req: SignInRequestType, res: Response) {
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email: req.body.email
    }
  })

  if (!existingAdmin) {
    return void (res.status(401).json({
      error: {
        message: "Admin not found.",
        status: 401
      }
    }))
  }

  const token = createJWT({ role: 'admin', ...existingAdmin })

  return void (res.status(200).json({ token }))
}

export { signIn, signUp }