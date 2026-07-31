import * as publicBookingService from "../services/publicBookingService.js";

export const getPublicBookingAvailability = async (req, res) => {
  try {
    const data = await publicBookingService.getPublicBookingAvailability(req.params.slug);
    res.json({ success: true, data });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const bookPublicSlot = async (req, res) => {
  try {
    const result = await publicBookingService.bookPublicSlot(req.params.slug, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
