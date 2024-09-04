import React from 'react';
import { CirclePlus } from 'lucide-react';
import { MouseEventHandler } from 'react';

const Header = ({handleOpenCreateEvent}: {handleOpenCreateEvent: MouseEventHandler<HTMLButtonElement> | undefined}) => {
  return (
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
  )
}

export default Header