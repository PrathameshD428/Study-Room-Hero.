"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, Booking, DigitalRoom, AppContextType, Room } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [digitalRooms, setDigitalRooms] = useState<DigitalRoom[]>([]);
  const { toast } = useToast();

  const login = (userData: User) => {
    setUser(userData);
    toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
  };

  const addBooking = (bookingData: { room: Room, date: Date, timeSlot: string }) => {
    if (!user) {
        toast({
            title: "Login Required",
            description: "Please log in to book a room.",
            variant: "destructive",
        });
        return;
    }
    const newBooking: Booking = {
      id: `booking-${new Date().getTime()}`,
      user,
      ...bookingData,
    };
    setBookings(prev => [...prev, newBooking]);
    toast({
        title: "Booking Confirmed!",
        description: `Room ${bookingData.room.name} booked for ${bookingData.date.toDateString()} at ${bookingData.timeSlot}.`,
    });
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    toast({
        title: "Booking Canceled",
        description: "Your booking has been successfully canceled.",
    });
  };

  const addDigitalRoom = (roomData: Omit<DigitalRoom, 'id' | 'createdBy'>) => {
    if(!user) return;
    const newDigitalRoom: DigitalRoom = {
        id: `digital-${new Date().getTime()}`,
        createdBy: user.name,
        ...roomData
    };
    setDigitalRooms(prev => [newDigitalRoom, ...prev]);
    toast({
        title: "Digital Room Created!",
        description: "Your digital study room is now live.",
    });
  };
  
  return (
    <AppContext.Provider value={{ user, bookings, digitalRooms, login, logout, addBooking, cancelBooking, addDigitalRoom }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
