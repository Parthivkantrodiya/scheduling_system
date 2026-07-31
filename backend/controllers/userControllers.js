import * as userService from "../services/userServices.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
console.log("Received user registration data:", { name, email, password });
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }


    const user = await userService.createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User By ID
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};


export const generateBookingLink = async (req, res) => {
  try {
const bookinglink = await    userService.generateBookingLink(req)
    console.log(req.user);
    res.status(200).json({ message: "Booking link generated successfully", bookinglink });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};