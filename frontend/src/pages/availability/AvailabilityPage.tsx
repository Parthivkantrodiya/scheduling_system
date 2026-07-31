import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import AvailabilityForm from "./AvailabilityForm";
import AvailabilityList from "./AvailabilityList";
import { getAvailability } from "../../service/availabilityApi";
import { setAvailabilityItems } from "../../store/slice/hostSlice";

const AvailabilityPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await getAvailability();
        const fetchedItems = response?.data ?? [];
        dispatch(setAvailabilityItems(fetchedItems));
      } catch (error) {
        console.error("Failed to load availability", error);
      }
    };

    loadItems();
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Availability</h1>
        <p className="text-gray-500">Manage your available booking slots</p>
      </div>

      <AvailabilityForm />

      <AvailabilityList />
    </div>
  );
};

export default AvailabilityPage;
