import { findUserByEmail } from "../../repositories/userRepository";
import { generateToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";


/* ================= LOGIN ================= */
export const loginUser = async (email: string, password: string) => {
  email = email.trim();
  password = password.trim();

  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return { user, token };
};
