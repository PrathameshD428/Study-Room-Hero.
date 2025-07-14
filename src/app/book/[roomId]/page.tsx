"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useApp } from '@/contexts/AppContext';
import { rooms, timeSlots } from '@/lib/data';
import type { Room } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, MapPin, CheckCircle, ArrowLeft, CalendarIcon, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function BookRoomPage() {
  const router = useRouter();
  const params = useParams();
  const { user, addBooking } = useApp();
  const { toast } = useToast();

  const [room, setRoom] = useState<Room | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    const roomId = params.roomId as string;
    const foundRoom = rooms.find(r => r.id === roomId);
    if (foundRoom) {
      setRoom(foundRoom);
    } else {
      router.push('/');
    }
  }, [params.roomId, router, user]);

  const handleBooking = () => {
    if (!room || !date || !selectedTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select a date and a time slot.',
        variant: 'destructive',
      });
      return;
    }
    addBooking({ room, date, timeSlot: selectedTime });
    router.push('/my-bookings');
  };

  if (!room) {
    return <div className="text-center py-10">Loading room details...</div>;
  }

  return (
    <div>
        <Button variant="ghost" asChild className="mb-6">
            <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Rooms</Link>
        </Button>
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={room.imageUrl}
                        alt={room.name}
                        fill
                        className="object-cover"
                        data-ai-hint="study room modern"
                    />
                </div>
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <div className="text-lg text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{room.location}</span>
                </div>
                <div className="text-lg text-muted-foreground flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Capacity: {room.capacity} people</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {room.features.map(feature => (
                        <Badge key={feature} variant="outline" className="text-base py-1 px-3">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            {feature}
                        </Badge>
                    ))}
                </div>
            </div>
            
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl">Book Your Slot</CardTitle>
                    <CardDescription>Select a date and time to reserve this room.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><CalendarIcon className="h-5 w-5"/> Select Date</h3>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border p-0"
                            disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Clock className="h-5 w-5"/> Select Time Slot</h3>
                        <Select onValueChange={setSelectedTime} value={selectedTime}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose an available time" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map(slot => (
                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleBooking} className="w-full text-lg py-6" size="lg">Confirm Booking</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
