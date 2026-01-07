import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../../repositories/userRepository";
import { generateToken } from "../../utils/jwt";

/* ================= REGISTER ================= */
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    token,
  };
};

/* ================= LOGIN ================= */
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    token,
  };
};
