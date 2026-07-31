import express from "express";
import * as publicBookingController from "../controllers/publicBookingController.js";

const router = express.Router();

router.get("/:slug", publicBookingController.getPublicBookingAvailability);
router.post("/:slug/book", publicBookingController.bookPublicSlot);

export default router;
