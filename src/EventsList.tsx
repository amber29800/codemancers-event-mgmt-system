import { EventListProps } from "./types";

const EventsList: React.FC<EventListProps> = ({events}) => {

  return (
    <div className="grid grid-cols-3 gap-2 overflow-auto">
    {events?.map((item) => {
      return(
        <div className="flex flex-col gap-1 bg-white p-2 pt-1 shadow-md rounded-md" key={item.id}>
            <h2 className="text-xl pr-2 break-words">{item.eventName}</h2>
            <p className="text-[12px] text-gray-500">{item.description}</p>
            <button className="text-[10px] font-semibold w-fit text-blue-700 hover:text-blue-500">View Details</button>
        </div>
      )
    })} 
    </div>
  )
}

export default EventsList;