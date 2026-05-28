import { Client, Databases, Users } from "node-appwrite";

const serverClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

export const serverDatabases = new Databases(serverClient);
export const serverUsers = new Users(serverClient);
export default serverClient;
