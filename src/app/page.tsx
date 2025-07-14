import { rooms } from '@/lib/data';
import { RoomCard } from '@/components/RoomCard';
import { Recommendations } from '@/components/Recommendations';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Recommended For You</h1>
        <p className="text-muted-foreground mb-6">AI-powered suggestions based on your booking history.</p>
        <Recommendations />
      </section>

      <Separator />

      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Available Study Rooms</h1>
        <p className="text-muted-foreground mb-6">Browse all available spaces across campus.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
}
