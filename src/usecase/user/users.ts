import { findAllUsers } from "../../repositories/userRepository";


export const getAllUser = async () => {
 
  const users = await findAllUsers();
  return users;
};
