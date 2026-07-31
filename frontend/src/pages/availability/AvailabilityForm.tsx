import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import {
  createAvailability,
  type AvailabilityItem,
  type AvailabilityPayload,
} from "../../service/availabilityApi";
import { addAvailabilityItem } from "../../store/slice/hostSlice";

const AvailabilityForm: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const [startTime, setStartTime] = useState("09:00");

  const [endTime, setEndTime] = useState("10:00");

  const [duration, setDuration] = useState("30");

  const isToday = selectedDate?.isSame(dayjs(), "day");

  const minStartTime = isToday
    ? dayjs().add(1, "minute").format("HH:mm")
    : "00:00";

  const generateSlots = (
    startTime: string,
    endTime: string,
    duration: number,
  ) => {
    const slots = [];

    let start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);

    while (start < end) {
      const slotStart = new Date(start);

      start.setMinutes(start.getMinutes() + duration);

      if (start <= end) {
        slots.push({
          startTime: slotStart.toTimeString().slice(0, 5),
          endTime: start.toTimeString().slice(0, 5),
        });
      }
    }

    return slots;
  };

  const handleSave = async () => {
    const now = dayjs();

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (selectedDate.isBefore(now, "day")) {
      alert("Past dates are not allowed.");
      return;
    }

    if (
      selectedDate.isSame(now, "day") &&
      dayjs(`${selectedDate.format("YYYY-MM-DD")} ${startTime}`).isBefore(now)
    ) {
      alert("Start time must be greater than the current time.");
      return;
    }

    if (
      dayjs(`${selectedDate.format("YYYY-MM-DD")} ${endTime}`).isSame(
        dayjs(`${selectedDate.format("YYYY-MM-DD")} ${startTime}`),
      ) ||
      dayjs(`${selectedDate.format("YYYY-MM-DD")} ${endTime}`).isBefore(
        dayjs(`${selectedDate.format("YYYY-MM-DD")} ${startTime}`),
      )
    ) {
      alert("End time must be greater than the start time.");
      return;
    }
    const slots = generateSlots(startTime, endTime, Number(duration));

    const data: AvailabilityPayload = {
      date: selectedDate?.format("YYYY-MM-DD")!,
      duration: Number(duration),
      startTime: startTime,
      endTime: endTime,
      slots,
    };

    const confirmed = window.confirm(
      `Create ${slots.length} slots?\n\n${slots
        .map((slot) => `${slot.startTime} - ${slot.endTime}`)
        .join("\n")}`,
    );

    if (!confirmed) return;

    try {
      const response = await createAvailability(data);
      const savedItem = response?.data ?? {
        ...data,
        createdAt: new Date().toISOString(),
      };

      dispatch(addAvailabilityItem(savedItem as AvailabilityItem));
      alert("Availability created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create availability.");
    }
  };

  return (
    <Card title="Add Availability">
      <div
        className="
      grid
      lg:grid-cols-[1fr_1fr]
      gap-10
      p-6
    "
      >
        {/* LEFT - CALENDAR */}

        <div
          className="
        flex
        flex-col
        items-center
        border-r
        pr-8
      "
        >
          <h3
            className="
          text-lg
          font-semibold
          text-gray-800
          mb-6
        "
          >
            Select Date
          </h3>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              disablePast
              sx={{
                "& .MuiPickersDay-root": {
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 500,
                },

                "& .Mui-selected": {
                  backgroundColor: "#2563eb !important",
                  color: "#fff",
                },

                "& .MuiPickersCalendarHeader-label": {
                  fontSize: "20px",
                  fontWeight: 700,
                },

                "& .MuiDayCalendar-weekDayLabel": {
                  fontWeight: 600,
                  color: "#64748b",
                },
              }}
            />
          </LocalizationProvider>
        </div>

        {/* RIGHT - SETTINGS */}

        <div
          className="
        flex
        flex-col
        justify-center
        gap-5
      "
        >
          {/* Start Time */}

          <div className="flex flex-row items-center gap-3">
            <label
              className="
              w-[100px]
            block
            text-sm
            font-semibold
            text-gray-700
            mb-2
          "
            >
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              min={minStartTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-300
            px-4
            text-gray-700
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
            />
          </div>

          {/* End Time */}

          <div className="flex flex-row items-center gap-3">
            <label
              className="
              w-[100px]
          block
          text-sm
          font-semibold
          text-gray-700
          mb-2
          "
            >
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              min={startTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-300
            px-4
            text-gray-700
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
            />
          </div>

          {/* Duration */}

          <div className="flex flex-row items-center gap-3">
            <label
              className="
              w-[100px]
          block
          text-sm
          font-semibold
          text-gray-700
          mb-2
          "
            >
              Duration
            </label>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="
            w-full
            h-12
            rounded-xl
            border
            border-gray-300
            px-4
            text-gray-700
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
            >
              <option value="15">15 Minutes</option>

              <option value="30">30 Minutes</option>

              <option value="45">45 Minutes</option>

              <option value="60">60 Minutes</option>
            </select>
          </div>

          {/* Button */}

          <div
            className="
          pt-3
        "
          >
            <Button
              onClick={handleSave}
              className="
            w-full
            h-12
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
          "
            >
              Save Slot
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AvailabilityForm;
