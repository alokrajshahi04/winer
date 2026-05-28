import { Client, Account, Databases, Storage } from "appwrite";

const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  databaseId: process.env.APPWRITE_DATABASE_ID || "winer_db",
  usersCollectionId: process.env.APPWRITE_USERS_COLLECTION_ID || "users",
  projectsCollectionId: process.env.APPWRITE_PROJECTS_COLLECTION_ID || "projects",
  conversationsCollectionId: process.env.APPWRITE_CONVERSATIONS_COLLECTION_ID || "conversations",
  contextCollectionId: process.env.APPWRITE_CONTEXT_COLLECTION_ID || "user_context",
} as const;

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { appwriteConfig };
export default client;
