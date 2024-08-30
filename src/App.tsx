import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Events, SelectedEvents } from "./utils/types";
import EventForm from "./components/EventForm";
import EventsList from "./components/EventsList";

import { CirclePlus, Frown, X } from "lucide-react";

const App = () => {
  const [events, setEvents] = useState<Events[]>(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [showEventForm, setShowEventForm] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvents | null>();
  const [showDetailsModal, setSHowDetailsModal] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const methods = useForm<Events>({ mode: "onChange" });

  const { reset, setValue } = methods;

  const handleOpenCreateEvent = (): void => {
    setShowEventForm(true);
  };

  const handleCloseCreateEvent = (): void => {
    setShowEventForm(false);
    setEditId("");

    if (isUpdate) {
      setIsUpdate(false);
    }

    reset();
  };

  const handleUpdateClick = (): void => {
    setShowEventForm(true);
    setIsUpdate(true);

    const selectedEvent = events.filter((item) => item.id === editId)[0]; // gets the data of seleted event after clicking update

    setValue("eventName", selectedEvent.eventName);
    setValue("dateAndTime", selectedEvent.dateAndTime);
    setValue("location", selectedEvent.location);
    setValue("description", selectedEvent.description);
    setValue("capacity", selectedEvent.capacity);

    localStorage.setItem("toUpdateEvent", JSON.stringify(selectedEvent));
    localStorage.setItem("editId", JSON.stringify(editId));

    setSHowDetailsModal(false);
  };

  const handleDeleteEvent = (): void => {
    if (confirm("Are you sure, you want to delete this event?")) {
      const updatedEvents = events?.filter((item) => item.id !== editId); //removes event from events array

      setEvents(updatedEvents);

      setShowEventForm(false);
      setEditId("");
      setSHowDetailsModal(false);
      reset();
    }
  };

  const handleViewDetails = (id: string): void => {
    setEditId(id);
    setSHowDetailsModal(true);
  };

  const handleFormSubmit: SubmitHandler<Events> = (data) => {
    const storedEditId = localStorage.getItem("editId");
    const storedToUpdateEvent = localStorage.getItem("toUpdateEvent");

    let parsedEditId: string = "";
    let parsedToUpdateEvent = {};

    if (storedEditId && storedToUpdateEvent) {
      parsedEditId = JSON.parse(storedEditId);
      parsedToUpdateEvent = JSON.parse(storedToUpdateEvent);
    }

    if (showEventForm && parsedEditId && parsedToUpdateEvent) {
      const updatedEvents: Events[] = events?.map((item) => {
        return item.id === parsedEditId
          ? {
              ...item,
              eventName: data.eventName,
              dateAndTime: data.dateAndTime,
              location: data.location,
              description: data.description,
              capacity: data.capacity,
            }
          : item;
      });

      setEvents(updatedEvents);
      setEditId("");
      setShowEventForm(false);
      setIsUpdate(false);
      reset();

      localStorage.removeItem("editId");
      localStorage.removeItem("toUpdateEvent");

      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        id: uuidv4(),
        eventName: data.eventName,
        dateAndTime: data.dateAndTime,
        location: data.location,
        description: data.description,
        capacity: data.capacity,
      },
    ]);
    setShowEventForm(false);
    reset();
  };

  const closeEventInformationPopUpModal = () => {
    setSHowDetailsModal(false);
    setSelectedEvent(null);
    setEditId("");
  };

  function formatDate(dateString?: Date): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString();
  }

  function formatTime(dateString?: Date): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Invalid time"
      : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  useEffect(() => {
    localStorage.removeItem("editId");
    localStorage.removeItem("toUpdateEvent");
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (editId !== "") {
      const dummyEvent = events?.filter((item) => item.id === editId)[0];
      setSelectedEvent(dummyEvent);
    }
  }, [editId]);

  return (
    <FormProvider {...methods}>
      {showDetailsModal &&
        selectedEvent &&
        createPortal(
          <div className="w-full min-h-full absolute top-0 z-[1000] bg-[#000] opacity-60"></div>,
          document.body
        )}
      {showDetailsModal &&
        selectedEvent &&
        createPortal(
          <div className="min-w-full min-h-full absolute top-0 z-[1050]">
            <div className="flex flex-col gap-1 sm:gap-2 w-11/12 xsm:w-9/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-white h-[75%] m-auto p-1 sm:p-2 mt-32 rounded-md">
              <div className="flex items-center justify-between bg-gray-400 p-1 rounded-md">
                <h1 className="text-xl xsm:text-2xl xl:text-3xl font-semibold">EVENT INFORMATION</h1>
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteEvent();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      <div className="bg-blue-900 h-[100vh] w-[100%] p-3 sm:p-6 md:p-10 xl:px-14">
        <div className="flex flex-col gap-3 h-[100%] bg-gray-200 shadow-2xl rounded-xl p-2">
          <div className="flex justify-between p-1 sm:p-2 bg-gray-400 rounded-lg">
            <p className="text-xl tracking-wide xsm:tracking-wider xsm:text-2xl sm:text-3xl font-semibold">
              EVENT PORTAL
            </p>
            <button
              className="flex items-center justify-center gap-1 bg-blue-950 text-[12px] xsm:text-sm sm:text-base text-white px-2 py-1 sm:py-2 rounded-lg hover:bg-blue-900"
              onClick={handleOpenCreateEvent}
            >
              <CirclePlus
                className="h-4 w-4 xsm:w-5 xsm:h-5 sm:w-6 sm:h-6"
                color="#ffffff"
                size={24}
              />
              <p className="leading-[14px]">Create Event</p>
            </button>
          </div>
          <div className="overflow-auto">
            {showEventForm && (
              <EventForm
                showEventForm={showEventForm}
                isUpdate={isUpdate}
                handleFormSubmit={handleFormSubmit}
                handleCloseCreateEvent={handleCloseCreateEvent}
              />
            )}
            {events.length > 0 ? (
              <EventsList
                events={events}
                handleViewDetails={handleViewDetails}
              />
            ) : (
              <div className="flex flex-col gap-1 justify-center items-center">
                <p className="text-[#4f4f4f]">So Empty!!</p>{" "}
                <Frown color="#4f4f4f" />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default App;
