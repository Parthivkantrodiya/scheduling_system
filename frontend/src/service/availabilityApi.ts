import api from "../api/axios";

export interface Slot {
  startTime: string;
  endTime: string;
}

export interface AvailabilityPayload {
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
  slots: Slot[];
}

export interface AvailabilityItem {
  _id?: string;
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
  slots: Slot[];
  createdAt?: string;
  updatedAt?: string;
}

export const createAvailability = async (data: AvailabilityPayload) => {
  const response = await api.post("/availability", data);
  return response.data;
};

export const getAvailability = async () => {
  const response = await api.get("/availability");
  return response.data;
};

export const updateAvailability = (
  id: string,
  data: AvailabilityPayload
) => api.put(`/availability/${id}`, data);

export const deleteAvailability = (id: string) =>
  api.delete(`/availability/${id}`);