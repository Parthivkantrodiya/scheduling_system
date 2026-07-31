import express from "express";

// import  {
//  registerUser,

// }  from "../controllers/userControllers.js";
import { registerUser ,  getUsers,
  getUserById,
  updateUser,
  deleteUser} from "../controllers/userControllers.js";
const router = express.Router();

// Register User
router.post("/register", registerUser);

// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);


export default router;