# HopeBridge — Recover After Disaster, Together

HopeBridge is a modern, high-quality community resilience and disaster recovery web application. Its goal is to streamline recovery efforts after natural disasters (such as floods, storms, wildfires, earthquakes, droughts, and landslides) by connecting survivors with vetted aid, financial grants, interactive maps of shelter/supply locations, community support groups, and a step-by-step recovery resource hub.

## 🌟 Key Features

*   **Damage Reporting & Tracking**: Users can submit disaster reports detailing the damage and their specific needs. A personalized dashboard tracks the status of their recovery journey from "Submitted" to "Resolved".
*   **AI Recovery Assistant**: An intelligent assistant that takes a user's specific situation and matches them with the most relevant local aid programs, grants, and support resources using Gemini.
*   **Verified Aid Directory**: A searchable and filterable directory of vetted NGOs, government programs, local community funds, and donors.
*   **Interactive Assistance Map**: Displays real-time locations of temporary shelters, supply distribution points, and recovery hubs with status and directions.
*   **Donations & Crowdfunding**: Showcases active community crowdfunding campaigns for rebuilding efforts and highlights available financial assistance programs.
*   **Community Support Groups**: Connects survivors with local support networks for sharing resources, finding emotional support, and coordinating volunteers.
*   **Recovery Resource Hub**: Provides plain-language, step-by-step guides for every stage of recovery (safety, filing claims, finding housing) along with live emergency updates.

## 🛠️ Tech Stack & Architecture

*   **Frontend**: React 19, [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Nitro + Vite), TypeScript
*   **Routing**: TanStack Router (File-based routing)
*   **Data Fetching**: TanStack Query (React Query)
*   **Styling**: Tailwind CSS v4 featuring a custom "Compassionate Sage" design system (OKLCH colors, Inter & Fraunces fonts)
*   **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Google OAuth, Email/Password)
*   **AI Integration**: TanStack Start server functions integrating with Gemini AI models.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v20+ recommended)
*   npm or bun
*   A Supabase project

### Environment Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables. Ensure the following are present in your `.env` file (see `.env.example` if available):
    ```env
    SUPABASE_URL="your_supabase_url"
    SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_key"
    GEMINI_API_KEY="your_gemini_api_key"
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🗄️ Database Structure

The application relies on several core Supabase tables:
*   `disaster_reports`: Tracks user-submitted damage reports and needs.
*   `aid_organizations`: Directory of vetted relief programs.
*   `assistance_centers`: Physical locations for shelters and supplies.
*   `support_groups`: Forums for community connection.
*   `relief_updates`: Live emergency alerts and notices.
*   `profiles`: User profile data linked to authentication.
