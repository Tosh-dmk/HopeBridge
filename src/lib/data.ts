import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Organization = Tables<"aid_organizations">;
export type SupportGroup = Tables<"support_groups">;
export type ReliefUpdate = Tables<"relief_updates">;
export type AssistanceCenter = Tables<"assistance_centers">;
export type DisasterReport = Tables<"disaster_reports">;

// ============ KENYAN FALLBACK DATA ============
const KENYAN_ORGS: Organization[] = [
  {
    id: "607aec41-f3d9-451b-b7d9-551112268eb4",
    name: "Kenya Red Cross Society (KRCS)",
    category: "non_profit",
    description: "Emergency rescue, first aid, temporary tents, water purification, and survival kit distribution across flood and landslide hit counties.",
    region: "National",
    amount_label: "Emergency Aid",
    deadline: "Ongoing",
    verified: true,
    website: "https://www.redcross.or.ke",
    tags: ["emergency", "shelter", "first_aid", "flood"],
    created_at: new Date().toISOString(),
  },
  {
    id: "d469be28-bbf0-4eff-bf9a-088984949e16",
    name: "NDMA Drought Cash Transfers",
    category: "government",
    description: "Cash disbursements via the Hunger Safety Net Programme (HSNP) to registered vulnerable families in Arid and Semi-Arid Land (ASAL) counties.",
    region: "National",
    amount_label: "Up to KES 20,000",
    deadline: "Rolling",
    verified: true,
    website: "https://www.ndma.go.ke",
    tags: ["drought", "grants", "agriculture"],
    created_at: new Date().toISOString(),
  },
  {
    id: "4db6356c-bad5-4abc-87b2-4f1b8d7a9188",
    name: "Safaricom Foundation Disaster Grant",
    category: "donor",
    description: "Support for local community groups, reconstruction of schools and hospitals, and mobile money aid transfers.",
    region: "National",
    amount_label: "Varies",
    deadline: "Ongoing",
    verified: true,
    website: "https://www.safaricomfoundation.org",
    tags: ["grants", "rebuilding", "medical"],
    created_at: new Date().toISOString(),
  },
  {
    id: "ministry-devolution",
    name: "Ministry of Devolution and ASALs Relief",
    category: "government",
    description: "Government food distribution networks, iron sheets for roofing rebuilds, and direct relief supplies.",
    region: "National",
    amount_label: "In-kind support",
    deadline: "Ongoing",
    verified: true,
    website: null,
    tags: ["food", "materials", "emergency"],
    created_at: new Date().toISOString(),
  },
  {
    id: "equity-foundation",
    name: "Equity Group Foundation Recovery Loans",
    category: "non_profit",
    description: "Rehabilitation loans and agricultural inputs grants for smallholder farmers and businesses affected by climate shocks.",
    region: "Rift Valley",
    amount_label: "Up to KES 500,000",
    deadline: "Dec 31",
    verified: true,
    website: "https://equitygroupfoundation.com",
    tags: ["loans", "grants", "agriculture"],
    created_at: new Date().toISOString(),
  },
  {
    id: "budalangi-rebuild",
    name: "Budalangi Flood Rebuild Fund",
    category: "community",
    description: "Crowdfunded local building materials pool (timber, cement, roofing sheets) managed by community elders.",
    region: "Western Region",
    amount_label: "Available now",
    deadline: "Ongoing",
    verified: true,
    website: null,
    tags: ["materials", "rebuilding", "flood"],
    created_at: new Date().toISOString(),
  },
  {
    id: "actionaid-livelihood",
    name: "ActionAid Kenya Livelihood Grants",
    category: "non_profit",
    description: "Direct recovery cash transfers and rebuilding materials focusing on vulnerable women and child-headed households.",
    region: "Coastal Region",
    amount_label: "Up to KES 50,000",
    deadline: "Ongoing",
    verified: true,
    website: "https://kenya.actionaid.org",
    tags: ["grants", "housing", "community"],
    created_at: new Date().toISOString(),
  },
  {
    id: "farmers-mutual",
    name: "Kenya Farmers Mutual Aid Chama",
    category: "community",
    description: "Grassroots mutual support coordinating seed distribution, tractor sharing, and soil recovery volunteers.",
    region: "Rift Valley",
    amount_label: "Volunteer-led",
    deadline: "Ongoing",
    verified: true,
    website: null,
    tags: ["community", "volunteers", "food", "drought"],
    created_at: new Date().toISOString(),
  },
];

const KENYAN_GROUPS: SupportGroup[] = [
  {
    id: "g1",
    name: "Flood Survivors - Budalangi & Nyando",
    description: "A chama-style support circle for those rebuilding after floods in Busia, Kisumu, and Tana River.",
    topic: "Flood Recovery",
    region: "Western Region",
    member_count: 1420,
    created_at: new Date().toISOString(),
  },
  {
    id: "g2",
    name: "Drought Resilience ASAL Network",
    description: "Connect with pastoralists and dryland farmers sharing water management tips and NDMA relief updates.",
    topic: "Drought",
    region: "Northern Kenya",
    member_count: 945,
    created_at: new Date().toISOString(),
  },
  {
    id: "g3",
    name: "Landslide Support - West Pokot & Muranga",
    description: "Community help, contractor references, and mutual aid for land restoration in landslide-prone hilly areas.",
    topic: "Landslide",
    region: "Rift Valley",
    member_count: 388,
    created_at: new Date().toISOString(),
  },
  {
    id: "g4",
    name: "Nairobi Urban Flood Help",
    description: "Coordination of rescue, volunteer cleanups, and emergency shelter sharing in Nairobi estates.",
    topic: "Storm",
    region: "Nairobi",
    member_count: 2105,
    created_at: new Date().toISOString(),
  },
  {
    id: "g5",
    name: "Volunteers & Helpers Kenya Hub",
    description: "For volunteers offering M-Pesa donations, transport, construction skills, and sorting relief items.",
    topic: "Volunteering",
    region: "National",
    member_count: 3560,
    created_at: new Date().toISOString(),
  },
  {
    id: "g6",
    name: "Community Mental Health & Support Kenya",
    description: "A safe, compassionate counseling and trauma recovery space led by local mental health volunteers.",
    topic: "Wellbeing",
    region: "National",
    member_count: 1224,
    created_at: new Date().toISOString(),
  },
];

const KENYAN_UPDATES: ReliefUpdate[] = [
  {
    id: "u1",
    title: "Severe Flood Warning - Tana River Basin",
    body: "Water levels in the Tana River have reached critical thresholds. Residents in Garissa and Tana River lowlands are urged to move to higher ground immediately.",
    region: "Coastal Region",
    severity: "high",
    created_at: new Date().toISOString(),
  },
  {
    id: "u2",
    title: "NDMA Drought Cash Transfers Disbursed",
    body: "The Hunger Safety Net Programme (HSNP) funds for this quarter have been released to banks and mobile money agents. Check Huduma Centers for updates.",
    region: "Northern Kenya",
    severity: "info",
    created_at: new Date().toISOString(),
  },
  {
    id: "u3",
    title: "Free Building Iron Sheets Distribution",
    body: "Kenya Red Cross is distributing roofing iron sheets, poles, and treated mosquito nets in Budalangi and Nyando this week.",
    region: "Western Region",
    severity: "info",
    created_at: new Date().toISOString(),
  },
  {
    id: "u4",
    title: "Safaricom Foundation MSME Grants Extended",
    body: "Rebuilding grants applications for local shops and traders affected by landslide or flood debris extended to October 30.",
    region: "National",
    severity: "medium",
    created_at: new Date().toISOString(),
  },
];

const KENYAN_CENTERS: AssistanceCenter[] = [
  {
    id: "19740132-f151-4793-a4e9-f7658ac645b7",
    name: "Nairobi Central Relief Station",
    address: "Huduma Centre GPO, Nairobi",
    region: "Nairobi",
    services: ["Water", "Hot Meals", "Power Charging", "Wifi", "Information"],
    is_open: true,
    phone: "0800-555-111",
    lat: -1.2847,
    lng: 36.8244,
    created_at: new Date().toISOString(),
  },
  {
    id: "e9623f2e-4fd5-4bf7-bc90-70346e9699ff",
    name: "Garissa Drought Relief Hub",
    address: "NDMA Office, Garissa-Mombasa Road",
    region: "Northern Kenya",
    services: ["Water", "Food", "Livestock Feed", "First Aid"],
    is_open: true,
    phone: "0800-555-222",
    lat: -0.456,
    lng: 39.6405,
    created_at: new Date().toISOString(),
  },
  {
    id: "c7afdf59-464d-4f65-8299-d345a9e0a76c",
    name: "Budalangi Flood Rescue Hall",
    address: "Budalangi Primary School Hall, Busia",
    region: "Western Region",
    services: ["Shelter", "First Aid", "Supplies", "Pet Care"],
    is_open: true,
    phone: "0800-555-333",
    lat: 0.1205,
    lng: 34.051,
    created_at: new Date().toISOString(),
  },
  {
    id: "kisumu-center",
    name: "Nyando Relief Distribution Point",
    address: "Ahero Multipurpose Center, Kisumu",
    region: "Nyanza",
    services: ["Water", "Food", "Supplies", "Tools"],
    is_open: true,
    phone: "0800-555-444",
    lat: -0.174,
    lng: 34.92,
    created_at: new Date().toISOString(),
  },
  {
    id: "west-pokot-center",
    name: "Kapenguria Landslide Support Center",
    address: "Kapenguria District Hospital Annexe, West Pokot",
    region: "Rift Valley",
    services: ["First Aid", "Shelter", "Food", "Mental Health"],
    is_open: false,
    phone: "0800-555-555",
    lat: 1.239,
    lng: 35.122,
    created_at: new Date().toISOString(),
  },
];

export const organizationsQuery = () =>
  queryOptions({
    queryKey: ["aid_organizations"],
    queryFn: async (): Promise<Organization[]> => {
      try {
        const { data, error } = await supabase
          .from("aid_organizations")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) throw error;
        if (!data || data.length === 0 || data.some((o) => o.name.includes("FEMA"))) {
          return KENYAN_ORGS;
        }
        return data;
      } catch (err) {
        console.warn("Database select failed, falling back to Kenyan Orgs.", err);
        return KENYAN_ORGS;
      }
    },
  });

export const supportGroupsQuery = () =>
  queryOptions({
    queryKey: ["support_groups"],
    queryFn: async (): Promise<SupportGroup[]> => {
      try {
        const { data, error } = await supabase
          .from("support_groups")
          .select("*")
          .order("member_count", { ascending: false });
        if (error) throw error;
        if (!data || data.length === 0 || data.some((g) => g.name.includes("Flood Survivors Together"))) {
          return KENYAN_GROUPS;
        }
        return data;
      } catch (err) {
        console.warn("Database select failed, falling back to Kenyan Groups.", err);
        return KENYAN_GROUPS;
      }
    },
  });

export const reliefUpdatesQuery = () =>
  queryOptions({
    queryKey: ["relief_updates"],
    queryFn: async (): Promise<ReliefUpdate[]> => {
      try {
        const { data, error } = await supabase
          .from("relief_updates")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (!data || data.length === 0 || data.some((u) => u.title.includes("FEMA"))) {
          return KENYAN_UPDATES;
        }
        return data;
      } catch (err) {
        console.warn("Database select failed, falling back to Kenyan Updates.", err);
        return KENYAN_UPDATES;
      }
    },
  });

export const assistanceCentersQuery = () =>
  queryOptions({
    queryKey: ["assistance_centers"],
    queryFn: async (): Promise<AssistanceCenter[]> => {
      try {
        const { data, error } = await supabase
          .from("assistance_centers")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) throw error;
        if (
          !data ||
          data.length === 0 ||
          data.some((c) => c.name.includes("Asheville") || c.region === "Western Region")
        ) {
          return KENYAN_CENTERS;
        }
        return data;
      } catch (err) {
        console.warn("Database select failed, falling back to Kenyan Centers.", err);
        return KENYAN_CENTERS;
      }
    },
  });

export const myReportsQuery = (userId: string | undefined) =>
  queryOptions({
    queryKey: ["disaster_reports", userId],
    enabled: !!userId,
    queryFn: async (): Promise<DisasterReport[]> => {
      const { data, error } = await supabase
        .from("disaster_reports")
        .select("*")
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
