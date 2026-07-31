import * as availabilityService from "../services/availabilityService.js";

export const createAvailability = async (req, res) => {
  try {
    const availability =
      await availabilityService.createAvailability(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const availability =
      await availabilityService.getAvailability(req.user.id);

    res.json({
      success: true,
      data: availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateAvailability = async (req, res) => {
  try {
    const availability =
      await availabilityService.updateAvailability(
        req.params.id,
        req.user.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      data: availability,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteAvailability = async (req, res) => {
  try {
    const result =
      await availabilityService.deleteAvailability(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};