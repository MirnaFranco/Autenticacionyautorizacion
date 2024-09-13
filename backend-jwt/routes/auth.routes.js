import {Router} from "express";
import {loginUser,logoutUser,usuario,sessionUser} from '../Controllers/auth.controller.js';
import { validarjwt } from "../middlewares/validar-jwt.js";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register",usuario);
userRouter.post("/logout",logoutUser);
userRouter.get("/session",validarjwt,sessionUser);

export {userRouter}