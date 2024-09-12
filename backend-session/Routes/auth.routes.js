import {Router} from "express";
import {loginUser,logoutUser,usuario,sessionUser} from '../controllers/auth.controller.js';


export const userRouter = Router();

userRouter.post("/login/", loginUser);
userRouter.post("/register",usuario);
userRouter.post("/logout",logoutUser);
userRouter.get("/session",sessionUser);
