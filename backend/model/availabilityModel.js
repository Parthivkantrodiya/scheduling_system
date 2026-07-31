import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const availabilitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    slots: [slotSchema],
  },
  {
    timestamps: true,
  }
);

availabilitySchema.index(
  {
    user: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Availability", availabilitySchema);