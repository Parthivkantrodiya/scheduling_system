import api from "../api/axios";


export const generateBookingLink = () => {
  return api.get("/users/generate-link");
};