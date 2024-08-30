import { EventListProps } from "../utils/types";

const EventsList: React.FC<EventListProps> = ({events, handleViewDetails}) => {

  return (
    <div className="grid grid-cols-2 gap-2 py-2 sm:grid-cols-3 xl:grid-cols-4">
    {events?.map((item) => {
      return(
        <div className="transition-all flex flex-col gap-1 bg-white h-min p-2 pt-1 shadow-md rounded-md hover:translate-y-[2px]" key={item.id}>
            <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl line-clamp-2 break-words">{item.eventName}</h2>
            <p className="text-[12px] sm:text-sm lg:text-base text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">{item.description}</p>
            <button className="text-[10px] sm:text-[12px] lg:text-sm font-semibold w-fit text-blue-700 hover:text-blue-500" onClick={() => handleViewDetails(item.id)}>View Details</button>
        </div>
      )
    })} 
    </div>
  )
}

export default EventsList;