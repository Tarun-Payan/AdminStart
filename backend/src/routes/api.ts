import express from "express";
import { register, login } from "../controller/authController.js";
import { validateBody } from "../middleware/validation.js"
import { RegisterSchema, LoginSchema } from "../schemas/auth.js";

const router = express.Router();

router.post('/register', validateBody(RegisterSchema), register);
router.post('/login', validateBody(LoginSchema), login);

export { router };