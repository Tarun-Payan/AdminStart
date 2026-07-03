import express from "express";
import { register } from "../controller/authController.js";
import { validateBody } from "../middleware/validation.js"
import { RegisterSchema } from "../schemas/auth.js";

const router = express.Router();

router.post('/register', validateBody(RegisterSchema), register)

export { router };