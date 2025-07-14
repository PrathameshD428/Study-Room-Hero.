"use client";

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { smartRoomRecommendations, SmartRoomRecommendationsOutput, SmartRoomRecommendationsInput } from '@/ai/flows/smart-room-recommendations';
import { RecommendedRoomCard } from '@/components/RecommendedRoomCard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from 'lucide-react';

export function Recommendations() {
  const { user, bookings } = useApp();
  const [recommendations, setRecommendations] = useState<SmartRoomRecommendationsOutput>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && bookings.length > 0) {
      const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
          const pastBookingsForAI = bookings.map(b => ({
            roomId: b.room.id,
            location: b.room.location,
            capacity: b.room.capacity,
            dateTime: b.date.toISOString(),
          }));
          
          const input: SmartRoomRecommendationsInput = {
            pastBookings: pastBookingsForAI,
          };

          const result = await smartRoomRecommendations(input);
          setRecommendations(result);
        } catch (e) {
          setError("Could not fetch recommendations at this time.");
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchRecommendations();
    }
  }, [user, bookings]);

  if (!user) {
    return (
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertTitle>Log in for recommendations!</AlertTitle>
        <AlertDescription>
          Log in and book a room to start seeing personalized recommendations here.
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center rounded-lg border p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating smart recommendations...</p>
        </div>
    );
  }

  if (error) {
    return <Alert variant="destructive">{error}</Alert>;
  }

  if (bookings.length === 0) {
    return (
       <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertTitle>Book a room to get started!</AlertTitle>
        <AlertDescription>
          Once you have some booking history, we'll show you personalized recommendations.
        </AlertDescription>
      </Alert>
    )
  }

  if (recommendations.length === 0 && !loading) {
    return (
       <Alert>
        <AlertTitle>No recommendations found</AlertTitle>
        <AlertDescription>
          We couldn't find any specific recommendations for you right now. Try exploring all rooms below!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map(rec => (
        <RecommendedRoomCard key={rec.roomId} recommendation={rec} />
      ))}
    </div>
  );
}
