// Climate Finance Opportunities — Static seed data for HopeBridge marketplace
// All programs are realistic representations of actual Kenyan climate finance instruments.

export interface ClimateOpportunity {
  id: string;
  title: string;
  provider: string;
  type:
    | "Cash Transfer"
    | "Rebuilding Grant"
    | "Adaptation Subsidy"
    | "Livelihood Recovery"
    | "Emergency Aid"
    | "Equity Finance";
  amount: string;
  coverage: string;
  description: string;
  tags: string[];
  eligibility: string;
  deadline: string;
  ussd: boolean; // Can be accessed via *483*111#
}

export const CLIMATE_FINANCE_OPPORTUNITIES: ClimateOpportunity[] = [
  // ── CASH TRANSFERS ──────────────────────────────────────────────────────────
  {
    id: "ndma-hsnp",
    title: "NDMA Hunger Safety Net Programme (HSNP)",
    provider: "National Drought Management Authority",
    type: "Cash Transfer",
    amount: "KES 5,400 / quarter",
    coverage: "Turkana, Marsabit, Mandera, Wajir",
    description:
      "Unconditional biannual cash transfers to the most vulnerable households in Kenya's arid and semi-arid lands. Registered families receive M-Pesa disbursements directly, with no need for bank accounts.",
    tags: ["drought", "ASAL", "M-Pesa", "pastoral"],
    eligibility: "Households in ASAL counties on the NDMA vulnerability register",
    deadline: "Rolling — quarterly disbursements",
    ussd: true,
  },
  {
    id: "krcs-emergency-cash",
    title: "Kenya Red Cross Emergency Cash Assistance",
    provider: "Kenya Red Cross Society",
    type: "Cash Transfer",
    amount: "KES 8,000 – 15,000 per household",
    coverage: "National (disaster-declared areas)",
    description:
      "Rapid emergency cash transfers deployed within 72 hours of a disaster declaration. Funds are disbursed via M-Pesa to eligible households in flood, landslide, and storm-hit areas to cover immediate needs.",
    tags: ["flood", "emergency", "M-Pesa", "landslide", "storm"],
    eligibility: "Households in NDPC-declared disaster zones",
    deadline: "Ongoing — post-disaster deployment",
    ussd: true,
  },
  {
    id: "wfp-lean-season",
    title: "WFP Kenya Lean Season Support",
    provider: "World Food Programme Kenya",
    type: "Cash Transfer",
    amount: "KES 2,200 / month (3–5 months)",
    coverage: "Kilifi, Kwale, Tana River, Isiolo, Baringo",
    description:
      "Seasonal cash transfers bridging the agricultural lean season gap for smallholder families in climate-vulnerable counties. Transfers are timed to planting and pre-harvest periods.",
    tags: ["drought", "food security", "agriculture", "seasonal"],
    eligibility: "Smallholder farming households in target counties",
    deadline: "Next disbursement: October 2026",
    ussd: false,
  },

  // ── REBUILDING GRANTS ───────────────────────────────────────────────────────
  {
    id: "ministry-roofing",
    title: "Ministry of Devolution Iron Sheet Distribution",
    provider: "Ministry of Devolution & ASALs",
    type: "Rebuilding Grant",
    amount: "30–60 iron sheets per household",
    coverage: "National (post-flood and post-landslide areas)",
    description:
      "Government-provided building materials (iron sheets, timber poles, treated mosquito nets) distributed through county disaster relief coordinators to households whose roofing was destroyed by flooding or landslides.",
    tags: ["flood", "housing", "materials", "landslide"],
    eligibility: "Verified damage report submitted through HopeBridge or local chief",
    deadline: "Ongoing — batch distributions",
    ussd: true,
  },
  {
    id: "safaricom-msme-rebuild",
    title: "Safaricom Foundation MSME Rebuild Grant",
    provider: "Safaricom Foundation",
    type: "Rebuilding Grant",
    amount: "Up to KES 100,000",
    coverage: "National",
    description:
      "Rebuilding grants for Micro, Small and Medium Enterprises (MSMEs) whose business premises or inventory were destroyed by climate disasters. Includes toolkits, materials budgets, and advisory support.",
    tags: ["business", "SME", "grants", "flood", "storm"],
    eligibility: "Registered MSMEs (active M-Pesa Lipa Na Mpesa paybill) in disaster-hit areas",
    deadline: "December 31, 2026",
    ussd: false,
  },
  {
    id: "budalangi-rebuild",
    title: "Budalangi Community Rebuild Fund",
    provider: "Budalangi Community Elders Council",
    type: "Rebuilding Grant",
    amount: "KES 25,000 – 60,000 per household",
    coverage: "Busia County",
    description:
      "A crowdfunded community grant pool for purchasing local building materials (timber, cement, roofing sheets). Administered by elected community elders with transparent disbursement records published weekly.",
    tags: ["flood", "housing", "community", "materials"],
    eligibility: "Registered Budalangi constituency residents with verified flood damage",
    deadline: "Ongoing — applications reviewed monthly",
    ussd: true,
  },

  // ── ADAPTATION SUBSIDIES ─────────────────────────────────────────────────────
  {
    id: "kcep-cral",
    title: "KCEP-CRAL Climate Adaptation Subsidy",
    provider: "IFAD / Government of Kenya",
    type: "Adaptation Subsidy",
    amount: "Up to KES 80,000 in inputs & training",
    coverage: "Nakuru, Baringo, Elgeyo Marakwet, Nyandarua, Siaya, Kisumu",
    description:
      "The Kenya Climate Smart Agriculture Project provides certified drought-resistant seed varieties, soil health inputs, rainwater harvesting kits, and training to smallholder farmers building climate resilience.",
    tags: ["agriculture", "climate smart", "seeds", "water harvesting", "training"],
    eligibility:
      "Smallholder farmers (≤5 acres) in target counties — farmer group membership required",
    deadline: "Annual — January intake",
    ussd: false,
  },
  {
    id: "world-bank-solar",
    title: "Kenya Off-Grid Solar Resilience Grant",
    provider: "World Bank / REREC Kenya",
    type: "Adaptation Subsidy",
    amount: "50–80% subsidy on solar home systems",
    coverage: "Arid & Semi-Arid counties (ASAL)",
    description:
      "Subsidized solar home systems for off-grid households in ASAL counties, reducing reliance on diesel generators and building energy resilience during and after climate disasters.",
    tags: ["solar", "energy", "ASAL", "infrastructure"],
    eligibility: "Off-grid households without grid electricity connection",
    deadline: "Rolling applications — funded until Dec 2027",
    ussd: false,
  },

  // ── LIVELIHOOD RECOVERY ──────────────────────────────────────────────────────
  {
    id: "actionaid-livelihood",
    title: "ActionAid Livelihood Recovery Grant",
    provider: "ActionAid Kenya",
    type: "Livelihood Recovery",
    amount: "Up to KES 50,000",
    coverage: "Coastal Region, Kilifi, Kwale, Mombasa",
    description:
      "Direct cash transfers and rebuilding material packages focused on women-headed households and child-headed households. Includes psychosocial support, legal documentation assistance, and business restart support.",
    tags: ["women", "youth", "coastal", "housing", "flood"],
    eligibility:
      "Women-headed or child-headed households in Coastal counties affected by climate events",
    deadline: "Ongoing",
    ussd: false,
  },
  {
    id: "equity-recovery-loans",
    title: "Equity Foundation Climate Recovery Facility",
    provider: "Equity Group Foundation",
    type: "Livelihood Recovery",
    amount: "KES 50,000 – 500,000",
    coverage: "Rift Valley, Western, Nyanza",
    description:
      "Low-interest rehabilitation credit and agricultural input grants for smallholder farmers and agribusinesses affected by floods, drought, or landslides. Grace periods of up to 6 months before repayment begins.",
    tags: ["agriculture", "business", "loans", "farmers", "low interest"],
    eligibility: "Existing Equity Bank account holders with a verified climate shock record",
    deadline: "December 31, 2026",
    ussd: false,
  },
  {
    id: "kenaff-seed-fund",
    title: "KENAFF Kenya Farmers Seed Recovery Fund",
    provider: "Kenya National Farmers Federation",
    type: "Livelihood Recovery",
    amount: "Seed kits valued KES 8,000 – 18,000",
    coverage: "Rift Valley (Nakuru, Baringo, Nandi, Uasin Gishu)",
    description:
      "Emergency certified seed distribution kits for farmers who lost seed stock due to floods, drought-induced crop failure, or pests. Kits include maize, beans, sorghum, and drought-tolerant varieties.",
    tags: ["seeds", "agriculture", "drought", "flood", "farmers"],
    eligibility: "Registered KENAFF member farmers in target counties",
    deadline: "Planting-season aligned — March & October intakes",
    ussd: true,
  },

  // ── EMERGENCY AID ────────────────────────────────────────────────────────────
  {
    id: "unicef-wash",
    title: "UNICEF Kenya WASH Emergency Response",
    provider: "UNICEF Kenya",
    type: "Emergency Aid",
    amount: "Water & sanitation kits (in-kind)",
    coverage: "National (disaster-hit areas)",
    description:
      "Emergency water purification tablets, jerricans, hygiene kits, and temporary latrine construction for communities affected by floods or disease outbreaks linked to climate events.",
    tags: ["water", "sanitation", "hygiene", "flood", "health"],
    eligibility: "Communities in areas declared public health emergencies following climate events",
    deadline: "Deployed within 72h of disaster declaration",
    ussd: false,
  },
  {
    id: "plan-international-shelter",
    title: "Plan International Emergency Shelter Support",
    provider: "Plan International Kenya",
    type: "Emergency Aid",
    amount: "Tent + NFI kit per household",
    coverage: "Tana River, Garissa, West Pokot, Muranga",
    description:
      "Emergency tents, blankets, and non-food item (NFI) kits for families who have lost their homes to floods or landslides and are in temporary evacuation centers.",
    tags: ["shelter", "tents", "flood", "landslide", "emergency"],
    eligibility: "Households confirmed displaced by current disaster event",
    deadline: "Ongoing — active disaster response",
    ussd: true,
  },
];
