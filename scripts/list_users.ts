
import { getDb } from "../server/db";
import { users } from "../drizzle/schema";

async function listUsers() {
    const db = await getDb();
    if (!db) {
        console.error("Failed to connect to database");
        process.exit(1);
    }

    const allUsers = await db.select().from(users);
    console.log("Users found:", allUsers.length);
    allUsers.forEach(u => {
        console.log(`- ID: ${u.id}, Email: ${u.email}, Role: ${u.role}, Name: ${u.name}`);
    });
    process.exit(0);
}

listUsers();
