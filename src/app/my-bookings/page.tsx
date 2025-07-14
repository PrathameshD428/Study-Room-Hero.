"use client";

import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Calendar, Clock, MapPin, X, BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export default function MyBookingsPage() {
  const { user, bookings, cancelBooking } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div className="text-center py-10">Redirecting to login...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming study sessions.</p>
      </div>

      {bookings.length === 0 ? (
        <Alert className="max-w-lg mx-auto flex flex-col items-center text-center p-8">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
                <BookOpenCheck className="h-8 w-8 text-primary" />
            </div>
          <AlertTitle className="text-xl">No Bookings Yet!</AlertTitle>
          <AlertDescription className="mt-2">
            You haven't booked any rooms. Find a space to get started.
          </AlertDescription>
           <Button asChild className="mt-4">
             <Link href="/">Browse Rooms</Link>
           </Button>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => (
            <Card key={booking.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{booking.room.name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 pt-1">
                    <MapPin className="h-4 w-4"/> {booking.room.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow">
                <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-muted-foreground"/>
                    <span>{new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-muted-foreground"/>
                    <span>{booking.timeSlot}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                    <Users className="h-5 w-5 text-muted-foreground"/>
                    <span>Capacity: {booking.room.capacity}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => cancelBooking(booking.id)}>
                  <X className="mr-2 h-4 w-4"/>
                  Cancel Booking
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
