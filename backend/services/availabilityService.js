import Availability from "../model/availabilityModel.js";

export const createAvailability = async (
  userId,
  availabilityData
) => {
  const existing = await Availability.findOne({
    user: userId,
    date: availabilityData.date,
  });

  if (existing) {
    throw new Error("Availability already exists for this date");
  }

  const availability = await Availability.create({
    user: userId,
    ...availabilityData,
  });

  return availability;
};

export const getAvailability = async (userId) => {
  return await Availability.find({ user: userId }).sort({
    date: 1,
  });
};


export const updateAvailability = async (
  availabilityId,
  userId,
  data
) => {
  const availability = await Availability.findOne({
    _id: availabilityId,
    user: userId,
  });

  if (!availability) {
    throw new Error("Availability not found.");
  }

  availability.date = data.date;
  availability.startTime = data.startTime;
  availability.endTime = data.endTime;
  availability.duration = data.duration;
  availability.slots = data.slots;

  await availability.save();

  return availability;
};

export const deleteAvailability = async (
  availabilityId,
  userId
) => {
  const availability = await Availability.findOne({
    _id: availabilityId,
    user: userId,
  });

  if (!availability) {
    throw new Error("Availability not found.");
  }

  await availability.deleteOne();

  return {
    message: "Availability deleted successfully.",
  };
};