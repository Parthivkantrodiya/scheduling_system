import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

interface VisitorForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface Slot {
  startTime: string;
  endTime: string;
  isBooked?: boolean;
}

interface AvailabilityItem {
  _id?: string;
  date: string;
  startTime: string;
  endTime: string;
  slots: Slot[];
}

const PublicBookingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [items, setItems] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [visitorForm, setVisitorForm] = useState<VisitorForm>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        const response = await api.get(`/booking/${slug}`);
        const availability = response.data?.data ?? [];

        setItems(availability);

        if (availability.length > 0) {
          setSelectedDate(availability[0].date);
        }
      } catch (error) {
        setMessage("This booking link is invalid or has not been generated yet.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadAvailability();
    }
  }, [slug]);

  const selectedAvailability = useMemo(() => {
    return items.find((item) => item.date === selectedDate) ?? null;
  }, [items, selectedDate]);

  const availableDates = useMemo(() => {
    return items.filter((item) => item.slots.some((slot) => !slot.isBooked));
  }, [items]);

  const availableSlots = useMemo(() => {
    return (selectedAvailability?.slots ?? []).filter((slot) => !slot.isBooked);
  }, [selectedAvailability]);

  useEffect(() => {
    if (!availableDates.length) {
      setSelectedDate("");
      setSelectedSlot(null);
      return;
    }

    if (!availableDates.some((item) => item.date === selectedDate)) {
      setSelectedDate(availableDates[0].date);
    }
  }, [availableDates, selectedDate]);

  const handleBook = async () => {
    if (!selectedAvailability || !selectedSlot) return;

    setShowModal(true);
  };

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAvailability || !selectedSlot) return;

    try {
      await api.post(`/booking/${slug}/book`, {
        date: selectedAvailability.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        visitor: visitorForm,
      });

      setItems((prev) =>
        prev.map((item) => {
          if (item.date !== selectedAvailability.date) return item;

          return {
            ...item,
            slots: item.slots.map((slot) =>
              slot.startTime === selectedSlot.startTime && slot.endTime === selectedSlot.endTime
                ? { ...slot, isBooked: true }
                : slot
            ),
          };
        })
      );

      setMessage("Booking successful.");
      setSelectedSlot(null);
      setShowModal(false);
      setVisitorForm({ firstName: "", lastName: "", phone: "", email: "" });
    } catch (error) {
      setMessage("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading booking page...</div>;
  }

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold">Booking unavailable</h1>
          <p className="mt-3 text-gray-600">{message || "No availability has been shared for this link yet."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">Book a time</h1>
        <p className="mt-2 text-gray-600">Select a date and a free slot below.</p>

        {message ? <p className="mt-4 text-sm text-green-600">{message}</p> : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="font-semibold">Available dates</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {availableDates.map((item) => (
                <button
                  key={item.date}
                  onClick={() => setSelectedDate(item.date)}
                  className={`rounded-full px-3 py-2 text-sm ${selectedDate === item.date ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold">Available time slots</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {availableSlots.length ? (
                availableSlots.map((slot) => (
                  <button
                    key={`${slot.startTime}-${slot.endTime}`}
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-full px-3 py-2 text-sm ${selectedSlot?.startTime === slot.startTime && selectedSlot?.endTime === slot.endTime ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No available slots for this date.</p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleBook}
          disabled={!selectedSlot}
          className="mt-6 rounded-xl bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Book
        </button>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Enter your details</h2>
            <p className="mt-1 text-sm text-gray-500">We’ll use this to confirm your booking.</p>

            <form className="mt-4 space-y-3" onSubmit={submitBooking}>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="rounded-lg border px-3 py-2"
                  placeholder="First name"
                  value={visitorForm.firstName}
                  onChange={(e) => setVisitorForm({ ...visitorForm, firstName: e.target.value })}
                  required
                />
                <input
                  className="rounded-lg border px-3 py-2"
                  placeholder="Last name"
                  value={visitorForm.lastName}
                  onChange={(e) => setVisitorForm({ ...visitorForm, lastName: e.target.value })}
                  required
                />
              </div>

              <input
                className="w-full rounded-lg border px-3 py-2"
                placeholder="Phone"
                value={visitorForm.phone}
                onChange={(e) => setVisitorForm({ ...visitorForm, phone: e.target.value })}
                required
              />

              <input
                className="w-full rounded-lg border px-3 py-2"
                placeholder="Email"
                type="email"
                value={visitorForm.email}
                onChange={(e) => setVisitorForm({ ...visitorForm, email: e.target.value })}
                required
              />

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="rounded-lg border px-3 py-2" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-white">
                  Confirm booking
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PublicBookingPage;
