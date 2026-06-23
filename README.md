# HopeBridge — Climate Finance & Community Resilience Platform

HopeBridge is a modern, high-fidelity web application and offline-first USSD gateway designed to bridge the gap between climate-disaster recovery needs, community resilience, and active funding pipelines in Kenya.

The platform is designed around a core thesis: **Climate disasters happen. Recovery funding exists. HopeBridge connects the two.** It serves as a unified marketplace for climate grants, mutual aid, step-by-step recovery plans, interactive hazard maps, and a fully featured operations portal for NGOs and local governments.

To showcase how critical aid reaches offline and disconnected rural communities, HopeBridge includes a fully interactive **USSD Mobile phone simulator** alongside the core web portal.

---

## Live Hackathon & Demo Sandbox (Zero-Setup Required)

The application features a built-in global **Demo Panel** (floating trigger at the bottom-right of the viewport) designed to showcase complex disaster and funding flows instantly without requiring third-party API keys, SMS gateway configurations, or live database setups:

*   **USSD Feature Phone Simulator**:
    *   Simulates a feature phone dialer interface running standard network codes (dial `*483*111#`).
    *   **Auto-Play Script Demos**: Contains 5 one-click simulated flows:
        1.  *1. Report Damage*: Dials ➔ selects damage report ➔ submits ➔ dispatches automated **USSD Alert Gateway** SMS.
        2.  *2. Get Supplies*: Requests clean water/food ➔ submits ➔ dispatches **HopeBridge Logistics** confirmation ticket SMS.
        3.  *3. Climate Grants* (New): Opens the climate grants flow ➔ selects grant ➔ verifies county ➔ submits ➔ dispatches a grant reference SMS.
        4.  *4. Find Shelter*: Searches shelters in `Kisumu` key-by-key ➔ returns capacity/calls ➔ dispatches shelter directory SMS.
        5.  *5. Talk to Chief*: Connects helpline ➔ dispatches Chief Nelson's advice SMS.
    *   **Backdrop Dismissal & Navigation**: Clicking outside the simulator blurs the screen and returns to the app. A red **`← Back to App`** button is also available inside the dialer.
*   **Animated Autofill Scenarios**:
    *   **Nyando Flood** / **Turkana Drought**: Automatically redirects to the report page and triggers a typewriter-like animation that fills in coordinates, descriptions, and categories, then submits it.
*   **SMS Toast Notification Engine**:
    *   Displays floating simulated mobile push alerts (e.g., warnings from local chiefs, logistics updates, grant application confirmations, and M-Pesa STK success alerts) with high z-index stacking to overlay the screen.
*   **M-Pesa STK Push Payment**:
    *   When donating to relief campaigns or simulating beneficiary disbursements, typing PIN `1234` triggers a processing animation, registers success, and displays an inline confirmation box.

---

## Key Features

*   **Climate Finance & Aid Marketplace** (`src/routes/funding.tsx`):
    *   *Resilience & Adaptation Grants*: A centralized registry of active public/private grant opportunities in Kenya. Users can search and filter by 6 funding types (e.g., Cash Transfer, Rebuilding Grant, Adaptation Subsidy).
    *   *Application Pipeline*: Direct application modal that verifies eligibility criteria, generates realistic submission records, and dispatches automated SMS confirmation notifications.
    *   *Community Aid Campaigns*: Peer-to-peer mutual aid campaigns with a functional M-Pesa STK push simulation for secure community giving.
*   **NGO & County Operations Portal** (`src/routes/operations.tsx`):
    *   *Beneficiary Pipeline*: A queue-based manager for organization coordinators to track applicants from ingestion to verification and resolution. Offers actionable buttons to "Verify", "Disburse Funds" (triggering an M-Pesa push simulation), and "Resolve".
    *   *Impact & Finance Analytics*: Interactive charts showing overall funds disbursed, active caseloads, regional fund distribution, and the ingestion channel split (USSD vs. Web).
    *   *SaaS Pricing & Packages*: Commercial plans tailored for local NGOs (NGO Suite) and regional governments (County Enterprise License), including marketplace fee splits to ensure long-term platform sustainability.
*   **Offline-First USSD Integration**: Enables offline or disconnected rural communities (e.g., Budalangi, Turkana) to request emergency supplies or apply directly for adaptation/recovery grants using basic feature phones.
*   **Assistance Map (Interactive Leaflet Map)** (`src/routes/map.tsx`): Displays real-time locations of temporary shelters, distribution centers, and hazard locations. Features pulsing, scale-animated red hazard zones in active regions (e.g., Nyando, Lodwar).
*   **Climate Recovery Blueprints** (`src/routes/_authenticated/dashboard.tsx`): Provides customized, step-by-step checklist action plans based on the user's local disaster risk (flooding, droughts, landslides, storms, etc.), immediately pairing them with active climate grants they qualify for.
*   **Mutual Aid & Community Groups** (`src/routes/community.tsx`): Connects survivors with local community groups to coordinate volunteer labor, share tools, or distribute community-funded supplies.
*   **Emergency Resource Guides** (`src/routes/resources.tsx`): Provides multi-chapter emergency manuals (housing, safety, medical, document recovery) tailored for Kenyan counties.

---

## Data Registry & Schemas

### Climate Finance Registry
Vetted funding opportunities are maintained in a structured static registry at [climateData.ts](file:///c:/Users/Tosh/Desktop/Climate%20Program/community-resilience-net/src/lib/climateData.ts). It includes 13 realistic Kenyan programs such as:
*   *NDMA Hunger Safety Net Programme (HSNP)* — Cash transfers for drought-affected households in Turkana, Marsabit, Mandera, and Wajir.
*   *Budalangi Flood Recovery Fund* — Grants for home rebuilding in Busia County.
*   *Safaricom Foundation MSME Resilience Grant* — Emergency recovery funding for small businesses hit by climate shocks.
*   *KENAFF Climate-Smart Seed Recovery Kit* — Adaptation subsidies providing drought-resistant seed kits to farmers.
*   *WFP Lean Season Cash Assistance* — Food security relief cash for dry rural zones.

### Database Schemas (Supabase Integration)
If deployed with a live database backend, the schemas map to:
*   `disaster_reports`: User-submitted damage metrics, severity ratings, and GPS coordinates.
*   `aid_organizations`: Directory listings of vetted aid programs and NGO profiles.
*   `assistance_centers`: Shelter coordinates, capacity numbers, and contact details.
*   `support_groups`: Mutual-aid coordination threads and volunteer groups.
*   `relief_updates`: Multi-channel broadcast alerts (SMS and Web notifications).

---

## Tech Stack & Architecture

*   **Frontend Framework**: React 19, [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Vite + Nitro SSR)
*   **Routing**: TanStack Router (Typesafe file-based routing)
*   **State & Query Management**: TanStack Query (React Query)
*   **Styling**: Tailwind CSS v4 (designed with a premium, custom dark-green "Compassionate Sage" color palette using Outfit and Fraunces fonts, oklch colors, and subtle micro-animations)
*   **Mapping**: Leaflet JS with custom map layers and animated CSS pulse markers
*   **AI Integration**: TanStack Start server functions (pre-configured for Gemini model recommendations)

---

## Getting Started

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
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Production
Validate correctness and compile the production bundle:
    ```bash
    npm run build
    ```
