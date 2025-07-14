import Link from 'next/link';
import { rooms } from '@/lib/data';
import type { SmartRoomRecommendationsOutput } from '@/ai/flows/smart-room-recommendations';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, ChevronRight, Sparkles, Lightbulb } from 'lucide-react';

interface RecommendedRoomCardProps {
  recommendation: SmartRoomRecommendationsOutput[0];
}

export function RecommendedRoomCard({ recommendation }: RecommendedRoomCardProps) {
  const room = rooms.find(r => r.id === recommendation.roomId);

  if (!room) {
    return null;
  }

  return (
    <Card className="flex flex-col overflow-hidden border-2 border-accent/50 bg-accent/10 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-4 space-y-0">
         <div className="flex justify-between items-start">
            <CardTitle className="text-lg mb-1">{room.name}</CardTitle>
            <Badge variant="outline" className="bg-accent/80 border-accent text-accent-foreground">
                <Sparkles className="mr-2 h-4 w-4" />
                Recommended
            </Badge>
         </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{room.location}</span>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Capacity: {recommendation.capacity}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="mt-2 text-sm bg-background/50 p-3 rounded-md border">
            <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <p className="text-muted-foreground">{recommendation.reason}</p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/20">
        <Button asChild className="w-full">
          <Link href={`/book/${room.id}`}>
            Book Now <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
