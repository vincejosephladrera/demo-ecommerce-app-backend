import { Router } from "express";
import { signIn, signUp } from "./admin.controller";

const adminRouter = Router();

adminRouter.post('/', signIn)

adminRouter.post('/signup', signUp)

export default adminRouter