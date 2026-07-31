import React, { useState } from "react";

import Card from "../../components/common/Card";
import { deleteAvailability, type AvailabilityItem } from "../../service/availabilityApi";
import { generateBookingLink } from "../../service/userApi";

interface AvailabilityListProps {
  items: AvailabilityItem[];
  onDelete?: (id?: string) => void;
}

const AvailabilityList: React.FC<AvailabilityListProps> = ({ items, onDelete }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [bookingLink, setBookingLink] = useState("");
  const [loading, setLoading] = useState(false);

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

      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleGenerateLink = async () => {
    try {
      setLoading(true);

      const response = await generateBookingLink();

      setBookingLink(response.data.bookinglink);
    } catch (error) {
      console.error(error);

      alert("Failed to generate booking link");
    } finally {
      setLoading(false);
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
      <div className="mt-5 mb-5 flex justify-end">
        <button
          onClick={handleGenerateLink}
          disabled={loading}
          className="
    bg-blue-600
    text-white
    px-5
    py-2
    rounded-lg
    hover:bg-blue-700
    disabled:opacity-50
  "
        >
          {loading ? "Generating..." : "Generate Booking Link"}
        </button>

        {bookingLink && (
          <div
            className="
mt-4
p-4
bg-gray-100
rounded-lg
"
          >
            <p className="font-semibold">Your Booking Link</p>

            <div
              className="
flex
gap-3
items-center
mt-2
"
            >
              <input
                readOnly
                value={bookingLink}
                className="
flex-1
border
rounded
px-3
py-2
"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(bookingLink);
                  alert("Copied!");
                }}
                className="
bg-gray-800
text-white
px-4
py-2
rounded
"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AvailabilityList;
