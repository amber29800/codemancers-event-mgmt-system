import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Events, SelectedEvents } from "./utils/types";
import EventForm from "./components/EventForm";
import EventsList from "./components/EventsList";

import { Frown } from "lucide-react";
import Header from "./components/Header";
import EventInformationModal from "./components/EventInformationModal";

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

  const handleOpenCreateEvent = () => {
    setShowEventForm(true);
  };

  const handleCloseCreateEvent = () => {
    setShowEventForm(false);
    setEditId("");

    if (isUpdate) {
      setIsUpdate(false);
    }

    reset();
  };

  const handleUpdateClick = () => {
    setShowEventForm(true);
    setIsUpdate(true);

    const selectedEvent = events.find((item) => item.id === editId); // gets the data of seleted event after clicking update

    if (selectedEvent) {
      setValue("eventName", selectedEvent.eventName);
      setValue("dateAndTime", selectedEvent.dateAndTime);
      setValue("location", selectedEvent.location);
      setValue("description", selectedEvent.description);
      setValue("capacity", selectedEvent.capacity);
    }

    localStorage.setItem("toUpdateEvent", JSON.stringify(selectedEvent));
    localStorage.setItem("editId", JSON.stringify(editId));

    setSHowDetailsModal(false);
  };

  const handleDeleteEvent = (e: MouseEvent) => {
    e.preventDefault();
    if (confirm("Are you sure, you want to delete this event?")) {
      const updatedEvents = events?.filter((item) => item.id !== editId); //removes event from events array

      setEvents(updatedEvents);

      setShowEventForm(false);
      setEditId("");
      setSHowDetailsModal(false);
      // reset();
    }
  };

  const handleViewDetails = (id: string) => {
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
      const dummyEvent = events?.find((item) => item.id === editId);
      if(dummyEvent){
        setSelectedEvent(dummyEvent);
      }
    }
  }, [editId]);

  return (
    <FormProvider {...methods}>
      {showDetailsModal &&
        selectedEvent &&
        createPortal(
          <EventInformationModal
            closeEventInformationPopUpModal={closeEventInformationPopUpModal}
            selectedEvent={selectedEvent}
            formatDate={formatDate}
            formatTime={formatTime}
            handleUpdateClick={handleUpdateClick}
            handleDeleteEvent={handleDeleteEvent}
          />,
          document.body
        )}
      <div className="bg-blue-900 h-[100vh] w-[100%] p-3 sm:p-6 md:p-10 xl:px-14">
        <div className="flex flex-col gap-3 h-[100%] bg-gray-200 shadow-2xl rounded-xl p-2">
          <Header handleOpenCreateEvent={handleOpenCreateEvent} />
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
