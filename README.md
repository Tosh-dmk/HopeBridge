# HopeBridge — Climate Finance & Community Resilience Platform

**Live Deployment:** [https://hope-bridge-ten.vercel.app/](https://hope-bridge-ten.vercel.app/)

HopeBridge is a modern, high-fidelity web application and offline-first USSD gateway designed to bridge the gap between climate-disaster recovery needs, community resilience, and active funding pipelines in Kenya.

The platform is designed around a core thesis: **Climate disasters happen. Recovery funding exists. HopeBridge connects the two.** It serves as a unified marketplace for climate grants, mutual aid, step-by-step recovery plans, interactive hazard maps, and a fully featured operations portal for NGOs and local governments.

To showcase how critical aid reaches offline and disconnected rural communities, HopeBridge includes a fully interactive **USSD Mobile phone simulator** alongside the core web portal.

## Key Features

- **Climate Finance & Aid Marketplace** (`src/routes/funding.tsx`):
  - _Resilience & Adaptation Grants_: A centralized registry of active public/private grant opportunities in Kenya. Users can search and filter by 6 funding types (e.g., Cash Transfer, Rebuilding Grant, Adaptation Subsidy).
  - _Application Pipeline_: Direct application modal that verifies eligibility criteria, generates realistic submission records, and dispatches automated SMS confirmation notifications.
  - _Community Aid Campaigns_: Peer-to-peer mutual aid campaigns with a functional M-Pesa STK push simulation for secure community giving.
- **NGO & County Operations Portal** (`src/routes/operations.tsx`):
  - _Beneficiary Pipeline_: A queue-based manager for organization coordinators to track applicants from ingestion to verification and resolution. Offers actionable buttons to "Verify", "Disburse Funds" (triggering an M-Pesa push simulation), and "Resolve".
  - _Impact & Finance Analytics_: Interactive charts showing overall funds disbursed, active caseloads, regional fund distribution, and the ingestion channel split (USSD vs. Web).
  - _SaaS Pricing & Packages_: Commercial plans tailored for local NGOs (NGO Suite) and regional governments (County Enterprise License), including marketplace fee splits to ensure long-term platform sustainability.
- **Offline-First USSD Integration**: Enables offline or disconnected rural communities (e.g., Budalangi, Turkana) to request emergency supplies or apply directly for adaptation/recovery grants using basic feature phones.
- **Assistance Map (Interactive Leaflet Map)** (`src/routes/map.tsx`): Displays real-time locations of temporary shelters, distribution centers, and hazard locations. Features pulsing, scale-animated red hazard zones in active regions (e.g., Nyando, Lodwar).
- **Climate Recovery Blueprints** (`src/routes/_authenticated/dashboard.tsx`): Provides customized, step-by-step checklist action plans based on the user's local disaster risk (flooding, droughts, landslides, storms, etc.), immediately pairing them with active climate grants they qualify for.
- **Mutual Aid & Community Groups** (`src/routes/community.tsx`): Connects survivors with local community groups to coordinate volunteer labor, share tools, or distribute community-funded supplies.
- **Emergency Resource Guides** (`src/routes/resources.tsx`): Provides multi-chapter emergency manuals (housing, safety, medical, document recovery) tailored for Kenyan counties.

---

## Data Registry & Schemas

### Climate Finance Registry

Vetted funding opportunities are maintained in a structured static registry at [climateData.ts](file:///c:/Users/Tosh/Desktop/Climate%20Program/community-resilience-net/src/lib/climateData.ts). It includes 13 realistic Kenyan programs such as:

- _NDMA Hunger Safety Net Programme (HSNP)_ — Cash transfers for drought-affected households in Turkana, Marsabit, Mandera, and Wajir.
- _Budalangi Flood Recovery Fund_ — Grants for home rebuilding in Busia County.
- _Safaricom Foundation MSME Resilience Grant_ — Emergency recovery funding for small businesses hit by climate shocks.
- _KENAFF Climate-Smart Seed Recovery Kit_ — Adaptation subsidies providing drought-resistant seed kits to farmers.
- _WFP Lean Season Cash Assistance_ — Food security relief cash for dry rural zones.

### Database Schemas (Supabase Integration)

If deployed with a live database backend, the schemas map to:

- `disaster_reports`: User-submitted damage metrics, severity ratings, and GPS coordinates.
- `aid_organizations`: Directory listings of vetted aid programs and NGO profiles.
- `assistance_centers`: Shelter coordinates, capacity numbers, and contact details.
- `support_groups`: Mutual-aid coordination threads and volunteer groups.
- `relief_updates`: Multi-channel broadcast alerts (SMS and Web notifications).

---

## Tech Stack & Architecture

- **Frontend Framework**: React 19, [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Vite + Nitro SSR)
- **Routing**: TanStack Router (Typesafe file-based routing)
- **State & Query Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS v4 (designed with a premium, custom dark-green "Compassionate Sage" color palette using Outfit and Fraunces fonts, oklch colors, and subtle micro-animations)
- **Mapping**: Leaflet JS with custom map layers and animated CSS pulse markers
- **AI Integration**: TanStack Start server functions (pre-configured for Gemini model recommendations)

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Environment Setup

1.  Clone this repostory.
2.  Install packages:
    ```bash
    npm install
    ```
3.  _(Optional)_ Create a `.env` file in the root directory if you want to plug in active databases/APIs:
    ```env
    SUPABASE_URL="your_supabase_url"
    SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_key"
    GEMINI_API_KEY="your_gemini_api_key"
    ```

### Run Locally

Start the development server:
`bash
    npm run dev
    `
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

Validate correctness and compile the production bundle:
`bash
    npm run build
    `
