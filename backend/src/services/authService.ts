import type { RegisterInput } from "../schemas/auth.js";
import { findUserByEmail        , createUser } from "../repository/userRepository.js";
import { ConflictError } from "../errors/ConflictError.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwtService.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

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

export async function login(user: { email: string; password: string }) {
    const existingUser = await findUserByEmail(user.email);
    const foundUser = existingUser[0];
    if (!foundUser) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = generateToken({ sub: foundUser.id });

    const { password, ...userNew } = foundUser;
    return { user: userNew, token };
}