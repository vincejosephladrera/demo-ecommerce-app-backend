import { Request } from "express"


type SignUpRequestType = Request & {
  body: {
    name: string
    email: string
    password: string
  }
}

type SignInRequestType = Request & {
  body: {
    email: string
    password: string
  }
}

export { type SignUpRequestType, type SignInRequestType }