import React from "react";

import { useFormContext } from "react-hook-form";
import { EventFormProps, Events } from "./types";

import { X } from "lucide-react";

const EventForm: React.FC<EventFormProps> = ({
  handleFormSubmit,
  handleCloseCreateEvent,
}) => {
  const { register, watch, handleSubmit } = useFormContext<Events>();

  watch("eventName");
  watch("dateAndTime");
  watch("location");
  watch("description");
  watch("capacity");

  return (
    <form
      className="bg-white p-2 rounded-lg"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex justify-between mb-2">
        <p className="text-2xl font-semibold">Create a new event</p>
        <button
          className="p-1 rounded-full hover:shadow-md"
          onClick={handleCloseCreateEvent}
        >
          <X color="#4a4a4a" />
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-2 mb-2">
        <div className="flex flex-col">
          <label className="font-semibold">Event Name</label>
          <input
            type="text"
            className="border-[1px] border-solid border-gray-400 p-1 rounded-sm focus:outline-none"
            placeholder="Enter Event Name"
            {...register("eventName", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Date and Time</label>
          <input
            type="datetime-local"
            className="border-[1px] border-solid border-gray-400 p-1 rounded-sm focus:outline-none"
            placeholder="Enter date and time"
            {...register("dateAndTime", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Location</label>
          <input
            type="text"
            className="border-[1px] border-solid border-gray-400 p-1 rounded-sm focus:outline-none"
            placeholder="Enter location"
            {...register("location", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Description</label>
          <input
            type="text"
            className="border-[1px] border-solid border-gray-400 p-1 rounded-sm focus:outline-none"
            placeholder="Enter description"
            {...register("description", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Capacity</label>
          <input
            type="number"
            className="border-[1px] border-solid border-gray-400 p-1 rounded-sm focus:outline-none"
            placeholder="Enter capacity"
            {...register("capacity", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-900 text-white rounded-[5px] px-7 py-1 hover:bg-blue-800">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventForm;
