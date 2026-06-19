# HopeBridge — Multi-Channel Climate Resilience & Disaster Relief

HopeBridge is a modern, high-fidelity community resilience and disaster recovery web application. It connects survivors with vetted aid programs, physical shelters, financial grants, mutual-aid support networks, and step-by-step recovery resources. 

To showcase how critical aid reaches offline and disconnected rural communities, HopeBridge includes a fully interactive **USSD Mobile phone simulator** alongside the core web portal.

---

## 🏆 Live Hackathon & Demo Sandbox (Zero-Setup Required)

The application features a built-in global **Demo Panel** (floating trigger at the bottom-right of the viewport) designed to showcase complex disaster flows instantly without requiring third-party API keys, SMS gateway configurations, or live database setups:

*   **USSD Feature Phone Simulator**:
    *   Simulates a feature phone dialer interface running standard network codes (dial `*483*111#`).
    *   **Auto-Play Script Demos**: Contains 4 one-click simulated flows:
        1.  *1. Report Damage*: Dials ➔ selects damage report ➔ submits ➔ dispatches automated **USSD Alert Gateway** SMS.
        2.  *2. Get Supplies*: Requests clean water/food ➔ submits ➔ dispatches **HopeBridge Logistics** confirmation ticket SMS.
        3.  *3. Find Shelter*: Searches shelters in `Kisumu` key-by-key ➔ returns capacity/calls ➔ dispatches shelter directory SMS.
        4.  *4. Talk to Chief*: Connects helpline ➔ dispatches Chief Nelson's advice SMS.
    *   **Backdrop Blur Dismissal**: Clicking outside the simulator modal blurs the screen and returns to the app. A red **`← Back to App`** button is also available inside the dialer.
*   **Animated Autofill Scenarios**:
    *   **Nyando Flood** / **Turkana Drought**: Automatically redirects to the report page and triggers a typewriter-like animation that fills in coordinates, descriptions, and categories, then submits it.
*   **SMS Toast Notification Engine**:
    *   Displays floating simulated mobile push alerts (e.g., warnings from local chiefs, logistics updates, or USSD gateway outputs) with high z-index stacking to overlay the screen.
*   **M-Pesa STK Push Payment**:
    *   When donating on the relief campaigns page, typing pin `1234` triggers a processing animation, registers success, and displays an inline confirmation box.

---

## 🚀 Key Features

*   **Offline-First USSD Reporting**: Empowers users without smartphones or internet access to dial local codes to submit hazard reports or request water/food/shelter.
*   **Assistance Map (Interactive Leaflet Map)**: Displays real-time locations of temporary shelters, distribution centers, and hazard locations. Features pulsing, scale-animated red hazard zones in active regions (e.g., Nyando, Lodwar).
*   **Vetted Aid & Relief Directory**: Search and filter NGOs, government programs, local community funds, and donor organizations accepting active applications.
*   **Mutual Aid & Community Groups**: Connects survivors with local groups to coordinate volunteer labor, share tools, or distribute community-funded supplies.
*   **Step-by-Step Recovery Guides**: Provides multi-chapter emergency manuals (housing, safety, medical, document recovery) tailored for Kenyan counties.
*   **Personalized Status Dashboard**: Let survivors track the stage of their submitted damage reports from verification to resolution.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend Framework**: React 19, [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Vite + Nitro SSR)
*   **Routing**: TanStack Router (Typesafe file-based routing)
*   **State & Query Management**: TanStack Query (React Query)
*   **Styling**: Tailwind CSS v4 (designed with a premium, custom dark-green "Compassionate Sage" color palette, Outfit & Fraunces fonts, and subtle micro-animations)
*   **Mapping**: Leaflet JS with custom map layers and animated CSS pulse markers
*   **AI Integration**: TanStack Start server functions (pre-configured for Gemini model recommendations)

---

## 💻 Getting Started

### Prerequisites
*   Node.js (v20+ recommended)
*   npm

### Environment Setup
1.  Clone this repository.
2.  Install packages:
    ```bash
    npm install
    ```
3.  *(Optional)* Create a `.env` file in the root directory if you want to plug in active databases/APIs:
    ```env
    SUPABASE_URL="your_supabase_url"
    SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_key"
    GEMINI_API_KEY="your_gemini_api_key"
    ```

### Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) or [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📁 Database Schema References
If deployed with a live database backend, the schemas map to:
*   `disaster_reports`: User-submitted coordinate damage metrics.
*   `aid_organizations`: Directory listings of vetted aid programs.
*   `assistance_centers`: Shelter capacity coordinates.
*   `support_groups`: Mutual-aid coordination threads.
*   `relief_updates`: Multi-channel broadcast alerts.
