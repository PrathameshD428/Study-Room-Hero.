import type { Room as RoomData } from './data';

export interface User {
  name: string;
  id: string;
}

export interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  imageUrl: string;
  features: string[];
}

export interface Booking {
  id: string;
  room: Room;
  user: User;
  date: Date;
  timeSlot: string;
}

export interface DigitalRoom {
    id: string;
    topic: string;
    url: string;
    createdBy: string;
}

export interface AppContextType {
  user: User | null;
  bookings: Booking[];
  digitalRooms: DigitalRoom[];
  login: (user: User) => void;
  logout: () => void;
  addBooking: (booking: { room: Room; date: Date; timeSlot: string; }) => void;
  cancelBooking: (bookingId: string) => void;
  addDigitalRoom: (room: Omit<DigitalRoom, 'id' | 'createdBy'>) => void;
}
