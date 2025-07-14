import type { Room } from './types';

export const rooms: Room[] = [
  {
    id: 'lr-1',
    name: 'Main Library - Room 1A',
    location: 'Main Library, 1st Floor',
    capacity: 4,
    imageUrl: 'https://placehold.co/600x400.png',
    features: ['Whiteboard', 'Projector'],
  },
  {
    id: 'lr-2',
    name: 'Main Library - Room 1B',
    location: 'Main Library, 1st Floor',
    capacity: 6,
    imageUrl: 'https://placehold.co/600x400.png',
    features: ['Whiteboard', 'Large Monitor'],
  },
  {
    id: 'eng-1',
    name: 'Engineering Hub - Collab Space',
    location: 'Engineering Building, 3rd Floor',
    capacity: 8,
    imageUrl: 'https://placehold.co/600x400.png',
    features: ['Whiteboard', 'Projector', 'Conference Phone'],
  },
  {
    id: 'sci-1',
    name: 'Science Center - Quiet Pod',
    location: 'Science Center, 2nd Floor',
    capacity: 2,
    imageUrl: 'https://placehold.co/600x400.png',
    features: ['Power Outlets'],
  },
  {
    id: 'art-1',
    name: 'Arts & Humanities - Group Studio',
    location: 'Arts Building, Ground Floor',
    capacity: 10,
    imageUrl: 'https://placehold.co/600x400.png',
    features: ['Whiteboard', 'Easel', 'Projector'],
  },
    {
    id: 'bus-1',
    name: 'Business School - Meeting Room',
    location: 'Business School, 5th Floor',
    capacity: 6,
    imageUrl: 'https://placehold.co/600x400.png',
    features: ['Whiteboard', 'Video Conferencing'],
  },
];

export const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
];
