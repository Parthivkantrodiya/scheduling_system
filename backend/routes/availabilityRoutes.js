import express from "express";

import * as availabilityController from "../controllers/availabilityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
  "/",
  authMiddleware,
  availabilityController.createAvailability
);

router.get(
  "/",
  authMiddleware,
  availabilityController.getAvailability
);


router.put(
  "/:id",
  authMiddleware,
  availabilityController.updateAvailability
);

router.delete(
  "/:id",
  authMiddleware,
  availabilityController.deleteAvailability
);

export default router;