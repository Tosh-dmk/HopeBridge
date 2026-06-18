import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const Input = z.object({
  situation: z.string().trim().min(1, "Please describe your situation").max(2000),
});

export type RecommendedOrg = {
  id: string;
  name: string;
  category: Database["public"]["Enums"]["org_category"];
  description: string;
  amount_label: string | null;
  region: string;
};

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }): Promise<{ message: string; recommended: RecommendedOrg[] }> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("The assistant is not configured yet.");

    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );

    const { data: orgs } = await supabase
      .from("aid_organizations")
      .select("id,name,category,description,amount_label,region,tags");

    // Fallback to Kenyan catalog if DB is not seeded or has US data
    const activeOrgs =
      orgs && orgs.length > 0 && !orgs.some((o) => o.name.includes("FEMA"))
        ? orgs
        : [
            {
              id: "607aec41-f3d9-451b-b7d9-551112268eb4",
              name: "Kenya Red Cross Society (KRCS)",
              category: "non_profit",
              description:
                "Emergency rescue, first aid, temporary tents, water purification, and survival kit distribution across flood and landslide hit counties.",
              amount_label: "Emergency Aid",
              region: "National",
              tags: ["emergency", "shelter"],
            },
            {
              id: "d469be28-bbf0-4eff-bf9a-088984949e16",
              name: "NDMA Drought Cash Transfers",
              category: "government",
              description:
                "Cash disbursements via the Hunger Safety Net Programme (HSNP) to registered vulnerable families in Arid and Semi-Arid Land (ASAL) counties.",
              amount_label: "Up to KES 20,000",
              region: "National",
              tags: ["drought", "grants"],
            },
            {
              id: "4db6356c-bad5-4abc-87b2-4f1b8d7a9188",
              name: "Safaricom Foundation Disaster Grant",
              category: "donor",
              description:
                "Support for local community groups, reconstruction of schools and hospitals, and mobile money aid transfers.",
              amount_label: "Varies",
              region: "National",
              tags: ["grants", "rebuilding"],
            },
            {
              id: "ministry-devolution",
              name: "Ministry of Devolution and ASALs Relief",
              category: "government",
              description:
                "Government food distribution networks, iron sheets for roofing rebuilds, and direct relief supplies.",
              amount_label: "In-kind support",
              region: "National",
              tags: ["food", "materials"],
            },
            {
              id: "equity-foundation",
              name: "Equity Group Foundation Recovery Loans",
              category: "non_profit",
              description:
                "Rehabilitation loans and agricultural inputs grants for smallholder farmers and businesses affected by climate shocks.",
              amount_label: "Up to KES 500,000",
              region: "Rift Valley",
              tags: ["loans", "grants"],
            },
            {
              id: "budalangi-rebuild",
              name: "Budalangi Flood Rebuild Fund",
              category: "community",
              description:
                "Crowdfunded local building materials pool (timber, cement, roofing sheets) managed by community elders.",
              amount_label: "Available now",
              region: "Western Region",
              tags: ["materials", "rebuilding"],
            },
            {
              id: "actionaid-livelihood",
              name: "ActionAid Kenya Livelihood Grants",
              category: "non_profit",
              description:
                "Direct recovery cash transfers and rebuilding materials focusing on vulnerable women and child-headed households.",
              amount_label: "Up to KES 50,000",
              region: "Coastal Region",
              tags: ["grants", "housing"],
            },
            {
              id: "farmers-mutual",
              name: "Kenya Farmers Mutual Aid Chama",
              category: "community",
              description:
                "Grassroots mutual support coordinating seed distribution, tractor sharing, and soil recovery volunteers.",
              amount_label: "Volunteer-led",
              region: "Rift Valley",
              tags: ["community", "volunteers"],
            },
          ];

    const catalog = activeOrgs
      .map(
        (o) =>
          `- [${o.id}] ${o.name} (${o.category}, ${o.region}) — ${o.description} Tags: ${o.tags?.join(", ")}`,
      )
      .join("\n");

    const system = `You are the HopeBridge recovery assistant — warm, calm, and reassuring. You help people in Kenya affected by natural disasters (floods, droughts, landslides, storms, wildfires) find relevant aid.

Rules:
- Be compassionate and concise. Acknowledge their situation in one short sentence, then guide them.
- Recommend ONLY programs from the provided list that genuinely fit their needs. Pick 2 to 4.
- Never invent programs or program IDs. Use exact IDs from the list.
- Keep the message to 2 short paragraphs. Plain, supportive language. No legal or medical guarantees.
- Focus on Kenyan counties, resources, and terminology (e.g., M-Pesa, chamas, Harambee).
- Always respond with valid JSON only, matching: {"message": string, "recommendedIds": string[]}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `My situation: ${data.situation}\n\nAvailable programs:\n${catalog}` }],
          },
        ],
        systemInstruction: {
          parts: [{ text: system }],
        },
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    if (res.status === 429)
      throw new Error("The assistant is busy right now. Please try again in a moment.");
    if (res.status === 402)
      throw new Error("AI usage limit reached. Please add credits to keep using the assistant.");
    if (res.status === 403) {
      throw new Error(
        "Your GEMINI_API_KEY has been disabled/blocked by Google as leaked. Please generate a new key at Google AI Studio and update the GEMINI_API_KEY in your local .env file."
      );
    }
    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API Error:", errText);
      throw new Error("The assistant could not respond. Please try again.");
    }

    const json = await res.json();
    const content = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    let parsed: { message?: string; recommendedIds?: string[] } = {};
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = { message: content };
    }

    const ids = Array.isArray(parsed.recommendedIds) ? parsed.recommendedIds : [];
    const recommended: RecommendedOrg[] = activeOrgs
      .filter((o) => ids.includes(o.id))
      .map((o) => ({
        id: o.id,
        name: o.name,
        category: o.category as Database["public"]["Enums"]["org_category"],
        description: o.description,
        amount_label: o.amount_label ?? null,
        region: o.region,
      }));

    return {
      message:
        parsed.message?.trim() ||
        "Here are some programs that may be able to help with your situation.",
      recommended,
    };
  });
