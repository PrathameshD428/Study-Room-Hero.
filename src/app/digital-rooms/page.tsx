"use client";

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Video, PlusCircle, ExternalLink } from 'lucide-react';

export default function DigitalRoomsPage() {
  const { user, digitalRooms, addDigitalRoom } = useApp();
  const router = useRouter();

  const [topic, setTopic] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && url) {
      try {
        new URL(url); // Validate URL
        addDigitalRoom({ topic, url });
        setTopic('');
        setUrl('');
      } catch (error) {
        alert('Please enter a valid URL (e.g., https://meet.google.com/...)');
      }
    }
  };

  if (!user) {
    return <div className="text-center py-10">Redirecting to login...</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-1 space-y-8 sticky top-24">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Digital Rooms</h1>
            <p className="text-muted-foreground">Create or join virtual study sessions.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create a New Digital Room</CardTitle>
            <CardDescription>Share a meeting link for a virtual study session.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Physics Midterm Prep" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="url">Meeting URL (Zoom, Meet, etc.)</Label>
                <Input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." required />
              </div>
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-semibold">Live Digital Rooms</h2>
        {digitalRooms.length === 0 ? (
           <Alert className="flex flex-col items-center text-center p-8">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Video className="h-8 w-8 text-primary" />
            </div>
            <AlertTitle className="text-xl">It's Quiet In Here...</AlertTitle>
            <AlertDescription className="mt-2">
              No digital rooms are active right now. Why not create one?
            </AlertDescription>
           </Alert>
        ) : (
          <div className="space-y-4">
            {digitalRooms.map(room => (
              <Card key={room.id}>
                <CardHeader>
                  <CardTitle>{room.topic}</CardTitle>
                  <CardDescription>Created by {room.createdBy}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild className="w-full">
                        <a href={room.url} target="_blank" rel="noopener noreferrer">
                            Join Session <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
