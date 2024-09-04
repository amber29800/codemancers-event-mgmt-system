import { MouseEvent, MouseEventHandler } from "react";
import { SubmitHandler } from "react-hook-form";

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
  handleViewDetails(id: string): void;
}

export interface SelectedEvents {
  id: string;
  eventName: string;
  dateAndTime: Date;
  location: string;
  description: string;
  capacity: number;
}

export type EventInformationModalType = {
  closeEventInformationPopUpModal: MouseEventHandler<HTMLButtonElement>;
  selectedEvent: SelectedEvents | null;
  formatDate(dateString?: Date): string;
  formatTime(dateString?: Date): string;
  handleUpdateClick: MouseEventHandler<HTMLButtonElement>;
  handleDeleteEvent(e:MouseEvent):void;
};
