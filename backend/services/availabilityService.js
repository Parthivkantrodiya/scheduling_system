import Availability from "../model/availabilityModel.js";

const toMinutes = (timeValue) => {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return hours * 60 + minutes;
};

const hasTimeOverlap = (existingItem, incomingItem) => {
  const existingStart = toMinutes(existingItem.startTime);
  const existingEnd = toMinutes(existingItem.endTime);
  const incomingStart = toMinutes(incomingItem.startTime);
  const incomingEnd = toMinutes(incomingItem.endTime);

  return incomingStart < existingEnd && incomingEnd > existingStart;
};

const generateSlots = (startTime, endTime, duration) => {
  const slots = [];
  let current = new Date(`2024-01-01T${startTime}`);
  const end = new Date(`2024-01-01T${endTime}`);

  while (current < end) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + duration);

    const nextTime = slotEnd > end ? end : slotEnd;

    if (nextTime > slotStart) {
      slots.push({
        startTime: slotStart.toTimeString().slice(0, 5),
        endTime: nextTime.toTimeString().slice(0, 5),
      });
    }

    current = nextTime;
  }

  return slots;
};

export const createAvailability = async (
  userId,
  availabilityData
) => {
  const existingItems = await Availability.find({
    user: userId,
    date: availabilityData.date,
  });

  const overlaps = existingItems.some((existingItem) =>
    hasTimeOverlap(existingItem, availabilityData)
  );

  if (overlaps) {
    throw new Error("This time slot overlaps with an existing availability");
  }

  const payload = {
    ...availabilityData,
    slots: availabilityData.slots?.length
      ? availabilityData.slots
      : generateSlots(
          availabilityData.startTime,
          availabilityData.endTime,
          availabilityData.duration,
        ),
  };

  const availability = await Availability.create({
    user: userId,
    ...payload,
  });

  const today = new Date().toISOString().split("T")[0];


  const allAvailability = await Availability.find({
    user: userId,
    date: {
      $gte: today,
    },
  }).sort({
    date: 1,
  });

  return allAvailability;
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