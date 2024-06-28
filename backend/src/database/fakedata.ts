import { v4 as uuidv4 } from "uuid";

interface IUser {
  email: string;
  password: string;
  name: string;
  uuid: string;
}

const users: IUser[] = [
  {
    email: "test@test.ca",
    password: "abc123",
    name: "Test User",
    uuid: uuidv4(),
  },
];

export const addUser = (email: string, password: string, name: string): void => {
  const newUser: IUser = {
    email,
    password,
    name,
    uuid: uuidv4(),
  };

  users.push(newUser);
};
  

export default users;
