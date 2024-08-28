import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Events } from "./types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import EventForm from "./EventForm";
import EventsList from "./EventsList";

const App = () => {
  const [events, setEvents] = useState<Events[]>(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const [showEventForm, setShowEventForm] = useState<boolean>(false);

  const methods = useForm<Events>();

  console.log("Events", events);

  const { getValues, reset } = methods;

  console.log(getValues());

  const handleOpenCreateEvent = () => {
    setButtonClick(!buttonClick);
    setShowEventForm(true);
  };

  const handleCloseCreateEvent = () => {
    setShowEventForm(false)
  }

  const handleFormSubmit: SubmitHandler<Events> = (data) => {
    const newDateAndTime = new Date(data.dateAndTime);
    console.log(newDateAndTime);
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

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <FormProvider {...methods}>
      <div className="bg-blue-900 h-[100vh] w-[100%] p-6 md:p-10 xl:p-14">
        <div className="flex flex-col gap-3 min-h-[100%] bg-gray-200 shadow-2xl rounded-xl p-2">
          <div className="flex justify-between p-2 bg-gray-400 rounded-lg">
            <p className="text-3xl tracking-wider">EVENT PORTAL</p>
            <button
              className="flex items-center justify-center gap-1 bg-blue-950 text-white p-2 rounded-lg hover:bg-blue-900"
              onClick={handleOpenCreateEvent}
            >
              <CirclePlus color="#ffffff" size={24} /> Create Event
            </button>
          </div>
          {showEventForm && <EventForm handleFormSubmit={handleFormSubmit} handleCloseCreateEvent={handleCloseCreateEvent}/>}
          <EventsList events={events} />
        </div>
      </div>
    </FormProvider>
  );
};

export default App;

{
  /* {buttonClick &&
  createPortal(
    <div className=" bg-[] absolute top-0 min-w-full min-h-screen z-[1]">
      <p className="">Hello EveryOne</p>
    </div>,
    document.body
  )} */
}
