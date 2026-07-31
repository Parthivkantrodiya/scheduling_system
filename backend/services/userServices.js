import User from "../model/userModel.js";
import bcrypt from "bcrypt";

// Create User
export const createUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });
  console.log("Creating user with data:", { name, email, password });

  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  }); 
  user.password = undefined; // Exclude password from the response
  return user;
};

// Get All Users
export const getUsers = async () => {
  return await User.find();
};

// Get User By ID
export const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Update User
export const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Delete User
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
