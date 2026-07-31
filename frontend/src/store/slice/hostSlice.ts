import { createSlice } from "@reduxjs/toolkit";
import type { AvailabilityItem } from "../../service/availabilityApi";

interface HostState {
  availabilityItems: AvailabilityItem[];
}

const initialState: HostState = {
  availabilityItems: [],
};

const hostSlice = createSlice({
  name: "hosts",
  initialState,
  reducers: {
    setAvailabilityItems: (state, action: { payload: AvailabilityItem[] }) => {
      state.availabilityItems = action.payload;
    },
    addAvailabilityItem: (state, action: { payload: AvailabilityItem }) => {
      state.availabilityItems = [action.payload, ...state.availabilityItems];
    },
    removeAvailabilityItem: (state, action) => {
  state.availabilityItems = state.availabilityItems.filter(
    (item) => item._id !== action.payload
  );
},
  },
});

export const { setAvailabilityItems, addAvailabilityItem ,removeAvailabilityItem} = hostSlice.actions;

export default hostSlice.reducer;