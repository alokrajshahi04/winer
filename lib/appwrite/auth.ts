import { account } from "./config";
import { ID } from "appwrite";

export async function signUp(email: string, password: string, name: string) {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    await signIn(email, password);
    return user;
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Sign in failed:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Sign out failed:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}
