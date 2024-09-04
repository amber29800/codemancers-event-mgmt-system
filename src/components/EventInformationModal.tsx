import { EventInformationModalType } from "../utils/types";
import { X } from "lucide-react";

const EventInformationModal = ({
  closeEventInformationPopUpModal,
  selectedEvent,
  formatDate,
  formatTime,
  handleUpdateClick,
  handleDeleteEvent,
}: EventInformationModalType) => {
  return (
    <div>
      <div className="w-full min-h-full absolute top-0 z-[1000] bg-[#000] opacity-60"></div>
      <div className="min-w-full min-h-full absolute top-0 z-[1050]">
        <div className="flex flex-col gap-1 sm:gap-2 w-11/12 xsm:w-9/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-white h-[75%] m-auto p-1 sm:p-2 mt-32 rounded-md">
          <div className="flex items-center justify-between bg-gray-400 p-1 rounded-md">
            <h1 className="text-xl xsm:text-2xl xl:text-3xl font-semibold">
              EVENT INFORMATION
            </h1>
            <button
              className="p-1 rounded-full hover:shadow-md"
              onClick={closeEventInformationPopUpModal}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" color="#4a4a4a" />
            </button>
          </div>
          <div className="flex flex-col gap-1 max-h-72 overflow-auto">
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-semibold w-4/12 xsm:w-3/12 sm:w-1/4 text-sm sm:text-base">
                  Event Name:
                </p>
                <p className="w-3/4 pl-1 text-sm sm:text-base">
                  {selectedEvent?.eventName}
                </p>
              </div>
              <div className="border-[0.2px] border-solid border-[#acacac]"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-semibold w-4/12 xsm:w-3/12 sm:w-1/4 text-sm sm:text-base">
                  Date:
                </p>
                <p className="w-3/4 pl-1 text-sm sm:text-base">
                  {formatDate(selectedEvent?.dateAndTime)}
                </p>
              </div>
              <div className="border-[0.2px] border-solid border-[#acacac]"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-semibold w-4/12 xsm:w-3/12 sm:w-1/4 text-sm sm:text-base">
                  Time:
                </p>
                <p className="w-3/4 pl-1 text-sm sm:text-base">
                  {formatTime(selectedEvent?.dateAndTime)}
                </p>
              </div>
              <div className="border-[0.2px] border-solid border-[#acacac]"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-semibold w-4/12 xsm:w-3/12 sm:w-1/4 text-sm sm:text-base">
                  Location:
                </p>
                <p className="w-3/4 pl-1 text-sm sm:text-base">
                  {selectedEvent?.location}
                </p>
              </div>
              <div className="border-[0.2px] border-solid border-[#acacac]"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-semibold w-4/12 xsm:w-3/12 sm:w-1/4 text-sm sm:text-base">
                  Description
                </p>
                <p className="w-3/4 pl-1 text-sm sm:text-base">
                  {selectedEvent?.description}
                </p>
              </div>
              <div className="border-[0.2px] border-solid border-[#acacac]"></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <p className="font-semibold w-4/12 xsm:w-3/12 sm:w-1/4 text-sm sm:text-base">
                  Capacity
                </p>
                <p className="w-3/4 pl-1 text-sm sm:text-base">
                  {selectedEvent?.capacity}
                </p>
              </div>
              <div className="border-[0.2px] border-solid border-[#acacac]"></div>
            </div>
          </div>
          <div className="flex justify-center gap-1">
            <button
              className="transition delay-[50ms] bg-yellow-600 text-sm md:text-base lg:text-lg text-white rounded-[5px] px-5 sm:px-7 py-[2px] sm:py-1 hover:bg-yellow-500"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            <button
              className="transition delay-[50ms] bg-red-600 text-sm md:text-base lg:text-lg text-white rounded-[5px] px-5 sm:px-7 py-[2px] sm:py-1 hover:bg-red-500 "
              onClick={handleDeleteEvent}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInformationModal;
