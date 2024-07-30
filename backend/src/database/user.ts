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
  try {
    console.log('Connecting to database...');
    const db = await getDbConnection();
    console.log('Connected. Querying user with email:', email);
    
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    console.log('Query result:', user);
    
    return user;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error; 
  }
}


export async function verifyPassword(email: string, password: string): Promise<boolean> {
  try {
    const user = await findUserByEmail(email);
    
    if (user.length==0) {
      console.error('User not found');
      return false;
    }

    console.log('User object retrieved:', user);

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

