import express from "express";

import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import availabilityRoutes from "./availabilityRoutes.js";
import publicBookingRoutes from "./publicBookingRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/availability", availabilityRoutes);
router.use("/booking", publicBookingRoutes);


export default router;