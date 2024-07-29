import { getDbConnection } from "./db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<void> {
  const db = await getDbConnection();

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  await db.run("INSERT INTO users (name, email, password, id) VALUES (?, ?, ?, ?)", [
    name,
    email,
    hashedPassword,
    id
  ]);
}

export async function findUserByEmail(email: string): Promise<any> {
  const db = await getDbConnection();
  const user = await db.get("SELECT * FROM users WHERE email = ?", email);
  return user;
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<boolean> {
  const user = await findUserByEmail(email);
  if (!user) return false;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}
