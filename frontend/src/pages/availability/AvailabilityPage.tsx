import React, { useState } from "react";

import AvailabilityForm from "./AvailabilityForm";
import AvailabilityList from "./AvailabilityList";
import type { AvailabilityItem } from "../../service/availabilityApi";

const AvailabilityPage: React.FC = () => {
  const [availabilityList, setAvailabilityList] = useState<AvailabilityItem[]>([]);

  const handleAddAvailability = (items: AvailabilityItem[]) => {
    const uniqueItems = items.filter((item) => {
      const id = item._id;
      return !id || !availabilityList.some((existing) => existing._id === id);
    });

    setAvailabilityList((prev) => [...uniqueItems, ...prev]);
  };

  const handleDeleteAvailability = (id?: string) => {
    if (!id) return;

    setAvailabilityList((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Availability</h1>
        <p className="text-gray-500">Manage your available booking slots</p>
      </div>

      <AvailabilityForm onSaved={handleAddAvailability} />

      <AvailabilityList items={availabilityList} onDelete={handleDeleteAvailability} />
    </div>
  );
};

export default AvailabilityPage;
