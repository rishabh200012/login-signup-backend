import { Router } from "express";
import { userRegister, userLogin } from "../controller/user.controller.js";

const userRoutes = Router();

userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);

export default userRoutes;
