// 'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing smart study room recommendations based on user preferences.
 *
 * - smartRoomRecommendations - A function that handles the room recommendation process.
 * - SmartRoomRecommendationsInput - The input type for the smartRoomRecommendations function.
 * - SmartRoomRecommendationsOutput - The return type for the smartRoomRecommendations function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartRoomRecommendationsInputSchema = z.object({
  pastBookings: z.array(
    z.object({
      roomId: z.string().describe('The ID of the room booked.'),
      location: z.string().describe('The location of the room.'),
      capacity: z.number().describe('The capacity of the room.'),
      dateTime: z.string().describe('The date and time of the booking (ISO format).'),
    })
  ).describe('An array of the user\'s past study room bookings.'),
  currentSearch: z.object({
    location: z.string().optional().describe('The location being searched (if any).'),
    capacity: z.number().optional().describe('The capacity being searched (if any).'),
    dateTime: z.string().optional().describe('The date and time being searched (if any) (ISO format).'),
  }).optional().describe('The current search parameters, if any.'),
});

export type SmartRoomRecommendationsInput = z.infer<typeof SmartRoomRecommendationsInputSchema>;

const SmartRoomRecommendationsOutputSchema = z.array(
  z.object({
    roomId: z.string().describe('The ID of the recommended room.'),
    location: z.string().describe('The location of the recommended room.'),
    capacity: z.number().describe('The capacity of the recommended room.'),
    dateTime: z.string().describe('The date and time of the booking (ISO format).'),
    reason: z.string().describe('The reason why this room is recommended.')
  })
);

export type SmartRoomRecommendationsOutput = z.infer<typeof SmartRoomRecommendationsOutputSchema>;

export async function smartRoomRecommendations(input: SmartRoomRecommendationsInput): Promise<SmartRoomRecommendationsOutput> {
  return smartRoomRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartRoomRecommendationsPrompt',
  input: {schema: SmartRoomRecommendationsInputSchema},
  output: {schema: SmartRoomRecommendationsOutputSchema},
  prompt: `You are a study room recommendation expert. Given a user's past bookings and current search parameters, recommend suitable study rooms.

Past Bookings:
{{#each pastBookings}}
- Room ID: {{this.roomId}}, Location: {{this.location}}, Capacity: {{this.capacity}}, Date/Time: {{this.dateTime}}
{{/each}}

Current Search Parameters:
{{#if currentSearch}}
  {{#if currentSearch.location}}Location: {{currentSearch.location}}{{/if}}
  {{#if currentSearch.capacity}}Capacity: {{currentSearch.capacity}}{{/if}}
  {{#if currentSearch.dateTime}}Date/Time: {{currentSearch.dateTime}}{{/if}}
{{else}}
  None
{{/if}}

Based on this information, recommend study rooms that the user might find suitable. For each recommendation, include a reason why you are recommending it.

Ensure that all recommendations adhere to the schema and include a detailed reason for the recommendation.

Consider the current search parameters to narrow down recommendations.
`,
});

const smartRoomRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartRoomRecommendationsFlow',
    inputSchema: SmartRoomRecommendationsInputSchema,
    outputSchema: SmartRoomRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
