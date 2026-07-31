import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/common/Card";
import type { RootState } from "../../store/store";

import { deleteAvailability } from "../../service/availabilityApi";

import { removeAvailabilityItem } from "../../store/slice/hostSlice";

const AvailabilityList: React.FC = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const items = useSelector(
    (state: RootState) => state.hosts.availabilityItems,
  );
  const dispatch = useDispatch();

  if (!items.length) {
    return (
      <Card title="Your Availability">
        <p className="text-gray-500">No availability saved yet.</p>
      </Card>
    );
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this availability?")) return;

    try {
      setDeletingId(id);

      await deleteAvailability(id);

      dispatch(removeAvailabilityItem(id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card title="Your Availability">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item._id ?? `${item.date}-${index}`}
            className="border rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-medium text-left">
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p className="text-gray-500">
                {item.startTime} - {item.endTime}
              </p>

              <p className="text-sm text-gray-400 text-left">
                {item.slots.length} slot{item.slots.length === 1 ? "" : "s"}
              </p>
            </div>

            <button
              disabled={deletingId === item._id}
              className="text-red-500"
              onClick={() => item._id && handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AvailabilityList;
