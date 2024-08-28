import { SubmitHandler } from 'react-hook-form';

export interface Inputs {
    eventName: string;
    dateAndTime: Date;
    location: string;
    description: string;
    capacity: number;
  }

  export interface Events extends Inputs {
    id: string;
  }

  export interface EventFormProps {
    handleFormSubmit: SubmitHandler<Events>;
    handleCloseCreateEvent(): void;
  }

  export interface EventListProps {
    events: Events[];
  } 