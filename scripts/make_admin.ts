
import 'dotenv/config';
import { getDb, createUser } from "../server/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function makeAdmin(email: string) {
    const db = await getDb();
    if (!db) {
        console.error("Failed to connect to database");
        process.exit(1);
    }

    let userList = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (userList.length === 0) {
        console.log(`User with email ${email} not found. Creating user...`);
        try {
            // Create user with default password "123456"
            const newUser = await createUser(email, "123456", "Admin User");
            console.log(`User created with password "123456".`);
            // Refetch to get the full user object (though createUser returns it, ensure format matches)
            userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
        } catch (e) {
            console.error("Failed to create user:", e);
            process.exit(1);
        }
    }

    if (userList.length === 0) {
        console.error("Failed to retrieve user after creation attempt.");
        process.exit(1);
    }

    const user = userList[0];
    await db.update(users).set({ role: 'admin' }).where(eq(users.id, user.id));
    console.log(`User ${email} (ID: ${user.id}) is now an admin.`);
    process.exit(0);
}

const email = process.argv[2];
if (!email) {
    console.error("Please provide an email address.");
    process.exit(1);
}

makeAdmin(email);
