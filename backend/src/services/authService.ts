import type { RegisterInput } from "../schemas/auth.js";
import { findUserByEmail        , createUser } from "../repository/userRepository.js";
import { ConflictError } from "../errors/ConflictError.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwtService.js";

export async function register(user: RegisterInput) {
    // check if user already exists
    const existingUser = await findUserByEmail(user.email);
    if (existingUser.length > 0) {
        throw new ConflictError("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: RegisterInput = {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        ...(user.age !== undefined ? { age: user.age } : {})
    };

    const createdUser = await createUser(newUser);

    if (!createdUser) {
        throw new Error("Error occurred while creating user");
    }

    const token = generateToken({ sub: createdUser.id });

    const { password, ...userNew } = createdUser;
    return { user: userNew, token };
}