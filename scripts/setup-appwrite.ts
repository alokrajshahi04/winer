/**
 * WINER — Appwrite Setup Script
 *
 * Creates the database, collections, and attributes needed for Winer.
 * Run: APPWRITE_API_KEY=xxx npm run setup:appwrite
 */

import { Client, Databases, ID } from "node-appwrite";
import "dotenv/config";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const DB_ID = process.env.APPWRITE_DATABASE_ID || "winer_db";

async function setup() {
  console.log("\n🍷 Winer Appwrite Setup\n");

  // Create database
  try {
    await databases.create(DB_ID, "Winer DB");
    console.log("✅ Database created: winer_db");
  } catch (e: any) {
    if (e.code === 409) console.log("ℹ️  Database already exists");
    else throw e;
  }

  // Users collection
  try {
    await databases.createCollection(DB_ID, "users", "Users");
    console.log("✅ Collection created: users");
    await databases.createStringAttribute(DB_ID, "users", "name", 255, true);
    await databases.createStringAttribute(DB_ID, "users", "email", 255, true);
    await databases.createStringAttribute(DB_ID, "users", "avatarUrl", 2048, false);
    await databases.createStringAttribute(DB_ID, "users", "bio", 5000, false);
    await databases.createStringAttribute(DB_ID, "users", "skills", 5000, false);
    await databases.createStringAttribute(DB_ID, "users", "goals", 5000, false);
    console.log("   ✅ Users attributes created");
  } catch (e: any) {
    if (e.code === 409) console.log("ℹ️  Users collection already exists");
    else throw e;
  }

  // Projects collection
  try {
    await databases.createCollection(DB_ID, "projects", "Projects");
    console.log("✅ Collection created: projects");
    await databases.createStringAttribute(DB_ID, "projects", "userId", 255, true);
    await databases.createStringAttribute(DB_ID, "projects", "name", 255, true);
    await databases.createStringAttribute(DB_ID, "projects", "description", 5000, false);
    await databases.createEnumAttribute(DB_ID, "projects", "status", ["idea", "building", "launched", "scaling"], true);
    await databases.createStringAttribute(DB_ID, "projects", "stack", 5000, false);
    await databases.createStringAttribute(DB_ID, "projects", "milestones", 10000, false);
    console.log("   ✅ Projects attributes created");
  } catch (e: any) {
    if (e.code === 409) console.log("ℹ️  Projects collection already exists");
    else throw e;
  }

  // Conversations collection
  try {
    await databases.createCollection(DB_ID, "conversations", "Conversations");
    console.log("✅ Collection created: conversations");
    await databases.createStringAttribute(DB_ID, "conversations", "userId", 255, true);
    await databases.createStringAttribute(DB_ID, "conversations", "projectId", 255, false);
    await databases.createStringAttribute(DB_ID, "conversations", "messages", 100000, false);
    await databases.createStringAttribute(DB_ID, "conversations", "summary", 5000, false);
    console.log("   ✅ Conversations attributes created");
  } catch (e: any) {
    if (e.code === 409) console.log("ℹ️  Conversations collection already exists");
    else throw e;
  }

  // User Context collection
  try {
    await databases.createCollection(DB_ID, "user_context", "User Context");
    console.log("✅ Collection created: user_context");
    await databases.createStringAttribute(DB_ID, "user_context", "userId", 255, true);
    await databases.createEnumAttribute(DB_ID, "user_context", "source", ["manual", "notion", "import", "ai_generated"], true);
    await databases.createEnumAttribute(DB_ID, "user_context", "category", ["background", "project", "preference", "skill", "goal"], true);
    await databases.createStringAttribute(DB_ID, "user_context", "content", 50000, true);
    console.log("   ✅ User context attributes created");
  } catch (e: any) {
    if (e.code === 409) console.log("ℹ️  User context collection already exists");
    else throw e;
  }

  console.log("\n🎉 Appwrite setup complete!\n");
}

setup().catch((e) => {
  console.error("❌ Setup failed:", e);
  process.exit(1);
});
