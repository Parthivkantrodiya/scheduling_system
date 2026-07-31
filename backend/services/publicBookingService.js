import User from "../model/userModel.js";
import Availability from "../model/availabilityModel.js";
import Booking from "../model/bookingModel.js";

const parseSlug = (slug) => {
  const match = slug.match(/^(.*)-([A-Za-z0-9]+)$/);
  return match ? { username: match[1], publicBookingId: match[2] } : null;
};

export const getPublicBookingAvailability = async (slug) => {
  const parsed = parseSlug(slug);

  if (!parsed) {
    throw new Error("Invalid booking link");
  }

  const user = await User.findOne({ publicBookingId: parsed.publicBookingId }).select("name");

  if (!user) {
    throw new Error("Invalid booking link");
  }

  const availability = await Availability.find({ user: user._id }).sort({ date: 1 });

  return availability.map((item) => ({
    ...item.toObject(),
    slots: item.slots.map((slot) => ({
      ...slot.toObject(),
      isBooked: slot.isBooked,
    })),
  }));
};

export const bookPublicSlot = async (slug, payload) => {
  const parsed = parseSlug(slug);

  if (!parsed) {
    throw new Error("Invalid booking link");
  }

  const user = await User.findOne({ publicBookingId: parsed.publicBookingId }).select("_id");

  if (!user) {
    throw new Error("Invalid booking link");
  }

  const availability = await Availability.findOne({
    user: user._id,
    date: payload.date,
  });

  if (!availability) {
    throw new Error("No availability found for this date");
  }

  const slot = availability.slots.find(
    (item) => item.startTime === payload.startTime && item.endTime === payload.endTime && !item.isBooked
  );

  if (!slot) {
    throw new Error("Selected slot is no longer available");
  }

  slot.isBooked = true;
  await availability.save();

  await Booking.create({
    user: user._id,
    availabilityId: availability._id,
    date: availability.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    visitor: payload.visitor,
  });

  return { message: "Booking created successfully" };
};
