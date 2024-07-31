import { getDbConnection } from "./db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

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

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const db = await getDbConnection();
    const query = "SELECT * FROM users WHERE email = ?";
    const user = await db.get<User>(query, [email]);

    if (!user) {
      console.log('User not found');
      return null;
    }

    return user;

  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
}

export async function verifyPassword(email: string, password: string): Promise<boolean> {
  try {
    const user = await findUserByEmail(email);
    
    if (!user) {
      console.error('User not found');
      return false;
    }

    const hashedPassword = user.password;
    if (!hashedPassword) {
      console.error('User found but no password stored', user);
      return false;
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    
    return isMatch;
  } catch (error) {
    console.error('Error during password verification:', error);
    return false;
  }
}

