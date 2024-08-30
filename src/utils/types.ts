import { SubmitHandler } from 'react-hook-form';

  export interface Events {
    id: string;
    eventName: string;
    dateAndTime: Date;
    location: string;
    description: string;
    capacity: number;
  }

  export interface EventFormProps {
    showEventForm: boolean;
    isUpdate: boolean;
    handleFormSubmit: SubmitHandler<Events>;
    handleCloseCreateEvent(): void;
  }

  export interface EventListProps {
    events: Events[];
    handleViewDetails(id: string): void
  } 

  export interface SelectedEvents {
    id: string;
    eventName: string;
    dateAndTime: Date;
    location: string;
    description: string;
    capacity: number;
  }