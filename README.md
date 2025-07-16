# Study Room Hero

Study Room Hero is a modern, AI-powered application designed to streamline the process of booking study rooms at a university. It provides a user-friendly interface for students to find, reserve, and manage physical study spaces, as well as create and join virtual study sessions. The standout feature is its AI-driven recommendation engine, which suggests rooms based on a user's past booking patterns.

## Features

- **User Authentication**: Simple and quick sign-in process for students.
- **Browse Rooms**: View a comprehensive list of all available study rooms across different campus locations.
- **Detailed Room Info**: Get specifics for each room, including capacity, location, and available amenities like whiteboards or projectors.
- **AI Recommendations**: Receive personalized room suggestions powered by Genkit and Google AI, based on your booking history.
- **Seamless Booking**: Easily select a date and time to book a room.
- **My Bookings**: A dedicated section to view and manage all your upcoming reservations.
- **Digital Rooms**: Create or join virtual study sessions by sharing meeting links (e.g., Google Meet, Zoom).
- **Responsive Design**: Fully accessible and functional on both desktop and mobile devices.

## Use Cases

- **Individual Study**: A student needs to find a small, quiet room to prepare for an upcoming exam.
- **Group Projects**: A team of students needs to book a larger room equipped with a whiteboard for a collaborative session.
- **Personalized Discovery**: A student who frequently books rooms in the science building wants to quickly see similar available spaces.
- **Virtual Collaboration**: A study group wants to organize an online review session and needs a central place to share the meeting link.

## Technology Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) with the [Google AI (Gemini)](https://ai.google.dev/) plugin
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```
    GEMINI_API_KEY=REPLACE_WITH_YOUR_API_KEY
    ```
    You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    The application and the Genkit AI flows run on separate processes.

    - **Start the Next.js app:**
      ```bash
      npm run dev
      ```
      The application will be available at `http://localhost:9002`.

    - **Start the Genkit server:**
      In a separate terminal, run:
      ```bash
      npm run genkit:dev
      ```
      This starts the Genkit development server, which your Next.js app will communicate with for AI features.

Now you can open your browser and navigate to the application to start using it!
