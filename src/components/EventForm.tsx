import React, { memo } from "react";
import { useFormContext } from "react-hook-form";

import { EventFormProps, Events } from "../utils/types";

import { X } from "lucide-react";

const EventForm: React.FC<EventFormProps> = ({
  isUpdate,
  handleFormSubmit,
  handleCloseCreateEvent,
}) => {
  const { register, watch, handleSubmit, formState: {errors} } = useFormContext<Events>();

  watch("eventName");
  watch("dateAndTime");
  watch("location");
  watch("description");
  watch("capacity");

  const getCurrentDateTime = (): string => {                   
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const checkKeyDown = (e: any) => {
    if(e.code === "Enter") e.preventDefault();
  }

  return (
    <form
      className="bg-white p-1 sm:p-2 rounded-lg"
      onSubmit={handleSubmit(handleFormSubmit)}
      onKeyDown={(e) => checkKeyDown(e)}
    >
      <div className="flex justify-between mb-1">
        <p className="text-xl sm:text-2xl font-semibold">
          {!isUpdate ? "Create a new event" : "Update your event"}
        </p>
        <button
          className="p-1 rounded-full hover:shadow-md"
          onClick={handleCloseCreateEvent}
        >
          <X className="w-5 h-5 sm:h-6 sm:w-6" color="#4a4a4a" />
        </button>
      </div>
      <div className="border-[1px] border-solid border-[#6e6e6e] mb-1"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 mb-2">
        <div className="flex flex-col">
          <label className="text-sm sm:text-base font-semibold">Event Name</label>
          <input
            type="text"
            className="border-[1px] border-solid border-gray-400 text-sm sm:text-base p-[2px] sm:p-1 rounded-sm focus:outline-none"
            placeholder="Enter Event Name"
            {...register("eventName", {
              required: {
                value: true,
                message: "Required"
              },
            })}
          />
          {errors.eventName && <p className="text-sm text-red-600 font-semibold">{errors.eventName.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-sm sm:text-base">Date and Time</label>
          <input
            type="datetime-local"
            className="border-[1px] border-solid border-gray-400 text-sm sm:text-base p-[2px] sm:p-1 rounded-sm focus:outline-none"
            placeholder="Enter date and time"
            {...register("dateAndTime", {
              required: {
                value: true,
                message: "Required"
              },
              // validate: (value) => {
              //   const selectedDate = new Date(value);
              //   const currentDate = new Date();
              //   return selectedDate >= currentDate || 'Date and time must be in the future';
              // },
              min: {value: getCurrentDateTime(), message: 'Invalid date or time'}
            })}
            // readOnly={editId !== "" && !updateClick ? true : false}
          />
          {errors.dateAndTime && <p className="text-sm text-red-600 font-semibold">{errors.dateAndTime.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-sm sm:text-base">Location</label>
          <input
            type="text"
            className="border-[1px] border-solid border-gray-400 text-sm sm:text-base p-[2px] sm:p-1 rounded-sm focus:outline-none"
            placeholder="Enter location"
            {...register("location", {
              required: {
                value: true,
                message: "Required"
              },
            })}
            />
            {errors?.location && <p className="text-sm text-red-600 font-semibold">{errors?.location?.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-sm sm:text-base">Description</label>
          <input
            type="text"
            className="border-[1px] border-solid border-gray-400 text-sm sm:text-base p-[2px] sm:p-1 rounded-sm focus:outline-none"
            placeholder="Enter description"
            {...register("description", {
              required: {
                value: true,
                message: "Required"
              },
            })}
            />
            {errors?.description && <p className="text-sm text-red-600 font-semibold">{errors?.description?.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-sm sm:text-base">Capacity</label>
          <input
            type="number"
            className="border-[1px] border-solid border-gray-400 text-sm sm:text-base p-[2px] sm:p-1 rounded-sm focus:outline-none"
            placeholder="Enter capacity"
            {...register("capacity", {
              required: {
                value: true,
                message: "Required"
              },
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Capacity must be 1 or greater',
              }
            })}
          />
          {errors?.capacity && <p className="text-sm text-red-600 font-semibold">{errors?.capacity?.message}</p>}
        </div>
      </div>
      <div className="flex justify-center">
        {!isUpdate ? (
          <button type="submit" className="transition delay-[50ms] bg-blue-900 text-sm md:text-base lg:text-lg text-white rounded-[5px] px-5 sm:px-7 py-[2px] sm:py-1 hover:bg-blue-800">
            Submit
          </button>
        ) : (
          <div>
              <button type="submit" className="transition delay-[50ms] bg-blue-900 text-sm md:text-base lg:text-lg text-white rounded-[5px] px-5 sm:px-7 py-[2px] sm:py-1 hover:bg-blue-800">
                Save
              </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default memo(EventForm);
