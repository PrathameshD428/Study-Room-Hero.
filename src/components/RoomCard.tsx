import Link from 'next/link';
import Image from 'next/image';
import type { Room } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, ChevronRight, CheckCircle } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image
                src={room.imageUrl}
                alt={room.name}
                fill
                className="object-cover"
                data-ai-hint="study room interior"
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-3">
        <CardTitle className="text-lg">{room.name}</CardTitle>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{room.location}</span>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Capacity: {room.capacity}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
            {room.features.map(feature => (
                <Badge key={feature} variant="secondary" className="font-normal">
                    <CheckCircle className="h-3 w-3 mr-1.5 text-green-500" />
                    {feature}
                </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <Button asChild className="w-full">
          <Link href={`/book/${room.id}`}>
            Book Now <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
