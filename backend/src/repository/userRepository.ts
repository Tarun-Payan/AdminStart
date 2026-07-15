import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema.js';
import type { RegisterInput } from '../schemas/auth.js';
import { db } from '../db/index.js';

export async function findUserByEmail(email: string) {
    return db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(user: RegisterInput) {
    const [createdUser] = await db.insert(usersTable).values(user).returning();
    return createdUser;
}
