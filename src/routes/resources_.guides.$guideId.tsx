import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Phone,
  FileText,
  Home,
  Coins,
  HeartPulse,
  BookOpen,
  Waves,
  Sun,
  Mountain,
  Wind,
  Flame,
} from "lucide-react";

export const Route = createFileRoute("/resources_/guides/$guideId")({
  component: GuideDetail,
});

const guidesData: Record<string, any> = {
  safety: {
    title: "Immediately After a Disaster",
    icon: AlertTriangle,
    content: (
      <>
        <p className="text-muted-foreground mb-8 text-lg">
          The first few hours and days following a climate disaster are critical for saving lives and ensuring long-term recovery. Select your specific disaster situation below to access immediate emergency action steps, safety protocols, and vital local contacts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          {[
            {
              id: "safety-floods",
              title: "Floods & Flash Floods",
              desc: "What to do during and immediately after rising water levels or flash floods.",
              icon: Waves,
              color: "text-blue-500 bg-blue-500/10 border-blue-500/20 dark:bg-blue-950/30 dark:border-blue-900/50",
            },
            {
              id: "safety-droughts",
              title: "Droughts & Dry Spells",
              desc: "Managing severe water shortages, heat exhaustion, and securing livestock.",
              icon: Sun,
              color: "text-amber-500 bg-amber-500/10 border-amber-500/20 dark:bg-amber-950/30 dark:border-amber-900/50",
            },
            {
              id: "safety-landslides",
              title: "Landslides & Mudslides",
              desc: "Evacuation alerts, assessing soil movement, and reporting trapped persons.",
              icon: Mountain,
              color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-900/50",
            },
            {
              id: "safety-storms",
              title: "Storms & Strong Winds",
              desc: "Immediate steps during lightning storms, strong winds, and power failures.",
              icon: Wind,
              color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20 dark:bg-cyan-950/30 dark:border-cyan-900/50",
            },
            {
              id: "safety-wildfires",
              title: "Wildfires & Bushfires",
              desc: "Evacuation routes, dealing with thick smoke, and assessing burning hotspots.",
              icon: Flame,
              color: "text-orange-500 bg-orange-500/10 border-orange-500/20 dark:bg-orange-950/30 dark:border-orange-900/50",
            },
          ].map((d) => (
            <Link
              key={d.id}
              to="/resources/guides/$guideId"
              params={{ guideId: d.id }}
              className="group flex flex-col p-6 rounded-2xl border border-border bg-card hover:bg-card hover:border-brand-500/30 transition-all duration-300 text-left hover:shadow-soft"
            >
              <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl border ${d.color}`}>
                <d.icon className="size-6 transition-transform group-hover:scale-110" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-brand-500 transition-colors">
                {d.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {d.desc}
              </p>
              <span className="mt-4 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:underline flex items-center gap-1">
                View Safety Guide <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </>
    )
  },
  "safety-floods": {
    title: "Floods & Flash Floods Safety",
    icon: Waves,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Actions After Flooding</h2>
          <p className="text-muted-foreground mb-4">When floodwaters begin to recede, or immediately after a flash flood, follow these critical safety steps:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Avoid Moving Water:</strong> Do not walk or drive through floodwaters. Just 15cm of fast-moving water can knock you down, and 30cm can float or sweep away most vehicles.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Inspect for Gas/Power Hazards:</strong> Do not turn on electricity or use electrical appliances if your house is wet or standing in water. Check for broken gas lines or electrical cables.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Boil and Treat Water:</strong> Floodwaters contaminate local wells, pipes, and water tables. Boil all water for drinking, cooking, and brushing teeth for at least 1 full minute, or treat it with chlorine tablets (e.g., Aquatabs).</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Document Damage First:</strong> Before you begin cleaning up, take clear, timestamped photos of your property, structure, and ruined belongings for county relief or insurance claims.</span></li>
          </ul>
        </section>
        
        <section className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2"><Phone className="size-5" /> Emergency Contacts</h2>
          <ul className="space-y-2 text-red-900 dark:text-red-200">
            <li><strong>Kenya Red Cross Society (Toll-Free Helpline):</strong> 1199</li>
            <li><strong>National Disaster Operations Centre:</strong> 020 2215105</li>
            <li><strong>St John Ambulance (Emergency Dispatch):</strong> 0721 225 285</li>
            <li><strong>Police Emergency Line:</strong> 999 / 112</li>
          </ul>
        </section>
      </>
    )
  },
  "safety-droughts": {
    title: "Drought & Water Scarcity Safety",
    icon: Sun,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Actions During Severe Droughts</h2>
          <p className="text-muted-foreground mb-4">When a dry spell turns severe, local communities must coordinate to ensure water safety and health preservation:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Strict Water Allocation:</strong> Reserve clean, fresh water strictly for drinking and hygiene. Implement greywater recycling (use laundry or kitchen water to flush toilets and support kitchen gardens).</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Monitor Vulnerable Persons:</strong> Watch young children, the elderly, and livestock for signs of severe dehydration, heat stroke, or malnutrition. Protect skin from extreme sunlight.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Register for Aid & Food Programs:</strong> Visit the local Chief's office or Huduma Center to verify registration for the Hunger Safety Net Programme (HSNP) cash transfers or NGO food distributions.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Cover Open Water Sources:</strong> Keep all community water pans, boreholes, and tanks covered or shaded to minimize evaporation and prevent contamination from wild animals.</span></li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-2"><Phone className="size-5" /> Drought & Food Relief Contacts</h2>
          <ul className="space-y-2 text-amber-900 dark:text-amber-200">
            <li><strong>National Drought Management Authority (NDMA):</strong> 020 2227496</li>
            <li><strong>World Food Programme (WFP) Kenya:</strong> 020 7622040</li>
            <li><strong>Kenya Red Cross Relief Services:</strong> 1199</li>
            <li><strong>County Water Department Kiosks:</strong> Contact your local sub-county water officer.</li>
          </ul>
        </section>
      </>
    )
  },
  "safety-landslides": {
    title: "Landslide & Mudslide Safety",
    icon: Mountain,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Actions During & After Landslides</h2>
          <p className="text-muted-foreground mb-4">In hilly areas (such as Murang'a, West Pokot, or parts of Rift Valley) heavy rainfall can trigger sudden soil collapse:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Evacuate Immediately:</strong> If you hear rumbling, trees cracking, or see sudden mud/rocks moving, leave the structure immediately. Move out of the direct path of the landslide.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Stay Clear of the Slide Area:</strong> Avoid entering the slide zone. Additional landslides, slope failures, or mudflows can occur hours or days after the initial collapse.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Report Trapped Persons:</strong> Immediately contact the local administration or Kenya Red Cross if neighbors are unaccounted for or suspected to be trapped in mud debris.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Check for Broken Utilities:</strong> Look for and report damaged water pipes, sewage lines, or cracked electrical poles to avoid subsequent hazards.</span></li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2"><Phone className="size-5" /> Mudslide Emergency Contacts</h2>
          <ul className="space-y-2 text-emerald-900 dark:text-emerald-200">
            <li><strong>Kenya Red Cross Emergency Response:</strong> 1199</li>
            <li><strong>National Disaster Management Unit (NDMU):</strong> 020 2210851</li>
            <li><strong>Police Dispatch (Toll-Free):</strong> 999 / 112</li>
            <li><strong>Local Administration Hotline:</strong> Contact your Sub-Location Assistant Chief.</li>
          </ul>
        </section>
      </>
    )
  },
  "safety-storms": {
    title: "Storms & Strong Winds Safety",
    icon: Wind,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Actions During & After Storms</h2>
          <p className="text-muted-foreground mb-4">Severe windstorms, cyclones, and lightning strikes require immediate precautionary measures:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Seek Indoor Shelter:</strong> Go indoors immediately. Stay away from windows, glass doors, and outer walls. Avoid sheltering under tall, isolated trees or electrical poles.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Unplug Electronic Devices:</strong> Power surges from lightning strikes can ruin equipment and cause electrical fires. Disconnect major appliances during storms.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Avoid Downed Power Lines:</strong> Never approach or touch fallen utility lines. Assume they are live and dangerous. Report them immediately to Kenya Power (KPLC).</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Clear Structural Hazards:</strong> Secure loose iron sheets or timber in your homestead. Ensure that gutters and drains are clear of debris to prevent overflow.</span></li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2"><Phone className="size-5" /> Storm and Power Contacts</h2>
          <ul className="space-y-2 text-cyan-900 dark:text-cyan-200">
            <li><strong>Kenya Power (KPLC) Emergency Line:</strong> 97771 or 0703 070 707</li>
            <li><strong>St John Ambulance Emergency Hotline:</strong> 0721 225 285</li>
            <li><strong>Kenya Meteorological Department (KMD):</strong> meteo.go.ke (for active storm warnings)</li>
          </ul>
        </section>
      </>
    )
  },
  "safety-wildfires": {
    title: "Wildfire & Bushfire Safety",
    icon: Flame,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Actions During & After Wildfires</h2>
          <p className="text-muted-foreground mb-4">In dry grasslands or forests (such as Mount Kenya or Mau Forest buffer zones), wildfires can spread rapidly due to dry winds:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Evacuate Early:</strong> Evacuate in the direction opposite to the fire's movement. Do not wait for an official order if you see heavy smoke or approaching flames.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Protect Air Quality:</strong> Cover your nose and mouth with a wet, thick cloth or mask to filter smoke and ash particles. Close doors, windows, and fireplace dampers.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Clear Defensible Space:</strong> Clear dry branches, leaves, and firewood at least 10 meters from structures. Wet your roof and walls with water if you have supply.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Monitor Smoldering Embers:</strong> After the fire passes, check rooftops, wooden fences, and crop borders for hidden ember hotspots that could reignite.</span></li>
          </ul>
        </section>

        <section className="mb-8 p-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2"><Phone className="size-5" /> Forest & Bushfire Contacts</h2>
          <ul className="space-y-2 text-orange-900 dark:text-orange-200">
            <li><strong>Kenya Forest Service (KFS) Fire Hotline:</strong> 020 2385311</li>
            <li><strong>Kenya Wildlife Service (KWS) (Parks/Buffers):</strong> 0800 597 000 (Toll-free)</li>
            <li><strong>Kenya Red Cross Society (Evacuations/Medical):</strong> 1199</li>
            <li><strong>National Disaster Operations Centre:</strong> 020 2215105</li>
          </ul>
        </section>
      </>
    )
  },
  paperwork: {
    title: "Navigating Insurance & Grants",
    icon: FileText,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Documenting Damage</h2>
          <p className="text-muted-foreground mb-4">Before cleaning up, document everything for local insurance or county relief claims:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Take clear, timestamped photos and videos of all damaged property and structures.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Make an inventory list of lost or ruined items. Include purchase receipts if available.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Obtain a Police Abstract if requested by your insurance provider (e.g., Jubilee, Britam) for significant property loss.</span></li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Applying for County Assistance</h2>
          <p className="text-muted-foreground mb-4">Many county governments provide emergency stipends or relief kits.</p>
          <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
            <li>Visit your local Chief's office to register as an affected person.</li>
            <li>Bring your original National ID and copies.</li>
            <li>Fill out the Disaster Needs Assessment form provided by the county officials or Red Cross volunteers.</li>
          </ol>
        </section>
      </>
    )
  },
  housing: {
    title: "Finding Temporary Local Shelter",
    icon: Home,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Shelter Options</h2>
          <p className="text-muted-foreground mb-4">If your home is uninhabitable, consider these options:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Evacuation Centers:</strong> Check our Assistance Map for active Red Cross camps, social halls, and schools currently acting as shelters.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Host Families:</strong> Reach out to community groups on HopeBridge. Many locals open their doors to displaced neighbors.</span></li>
          </ul>
        </section>
        <section className="mb-8 p-6 bg-brand-50 border border-brand-200 dark:bg-brand-950/30 dark:border-brand-800 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Long-term Relocation</h2>
          <p className="text-sm text-muted-foreground mb-4">If you need to rent a new place, look for government resettlement stipends. Contact the Ministry of Lands, Public Works, Housing and Urban Development for long-term housing initiatives.</p>
        </section>
      </>
    )
  },
  funding: {
    title: "Community Funding & M-Pesa Campaigns",
    icon: Coins,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Crowdsourcing via Paybills</h2>
          <p className="text-muted-foreground mb-4">Setting up a transparent M-Pesa Paybill is the fastest way to gather funds from well-wishers across Kenya.</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Register a dedicated M-Changa account or acquire a Safaricom Paybill/Till number for your community group.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Share the Paybill on HopeBridge and social media with a clear breakdown of how funds will be used (e.g., buying maize flour, blankets, iron sheets).</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Keep receipts and update your donors regularly.</span></li>
          </ul>
        </section>
      </>
    )
  },
  wellbeing: {
    title: "Community Chamas & Support",
    icon: HeartPulse,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Tapping into Local Chamas & Harambees</h2>
          <p className="text-muted-foreground mb-4">In Kenya, community-led mutual aid is often the fastest way to mobilize resources after a disaster. Connect with local networks:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Chama Recovery Funds:</strong> Many women-led and neighborhood self-help groups (chamas) pivot to emergency cash transfers or rotating credit to help affected members buy food and basic household items.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Organizing a Harambee:</strong> Coordinate with community elders and local administration to set up a digital or physical fund drive for severe cases (medical bills, rebuilding houses).</span></li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Emotional & Mental Wellbeing</h2>
          <p className="text-muted-foreground mb-4">Disasters cause significant emotional trauma. Do not neglect your mental health:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Talk to peers and neighbors in local community circles. Sharing your experiences helps reduce feelings of isolation.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Keep a regular routine where possible, focusing on adequate rest, water, and nutritious food.</span></li>
          </ul>
        </section>
        <section className="mb-8 p-6 bg-brand-50 border border-brand-200 dark:bg-brand-950/30 dark:border-brand-800 rounded-2xl">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><HeartPulse className="size-5 text-brand-500" /> Professional Counselling Resources</h2>
          <p className="text-sm text-muted-foreground mb-3">If you or your family members are experiencing severe stress, depression, or sleep problems, reach out for free professional counselling:</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><strong>Kenya Red Cross Society (24/7 Psychosocial Support helpline):</strong> Call 1199</li>
            <li><strong>Befrienders Kenya (Suicide Prevention & Crisis Line):</strong> Call +254 722 178 177</li>
            <li><strong>County Referral Hospitals:</strong> Visit the department of mental health or social work at your nearest Level 4 or Level 5 hospital.</li>
          </ul>
        </section>
      </>
    )
  },
  rebuilding: {
    title: "Rebuilding Stronger & Resilient Agriculture",
    icon: BookOpen,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Climate-Resilient Construction</h2>
          <p className="text-muted-foreground mb-4">When rebuilding homes in disaster-prone zones, incorporate these structural safety measures:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Flood Plains (e.g., Budalangi, Nyando):</strong> Build raised foundation plinths (at least 1 meter above historic high-water marks) or build houses on reinforced concrete pillars. Use water-resistant building materials on lower walls.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Storm & Wind Zones:</strong> Secure roofs with heavy-duty metal strapping (hurricane clips) rather than just nails. Ensure proper roof pitch (between 30 to 45 degrees) to reduce wind lift forces.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Landslide-Prone Areas:</strong> Rebuild away from steep slopes and runout paths. Construct retaining walls or implement terracing to secure loose soil.</span></li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Drought-Resilient Agriculture & Land Management</h2>
          <p className="text-muted-foreground mb-4">Recover and protect your shamba from droughts and soil degradation:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Soil Moisture Conservation:</strong> Apply thick organic mulch (straw, leaves, maize stalks) around crops to prevent water evaporation. Implement minimal tillage to maintain soil structure.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Drought-Tolerant Crops:</strong> Transition to farming certified early-maturing or drought-tolerant seed varieties (e.g., sorghum, millet, green grams, cassava, drought-resistant maize).</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span><strong>Water Harvesting:</strong> Dig farm ponds (water pans) or install gutters and tanks for rainwater collection during the short rains.</span></li>
          </ul>
        </section>
        <section className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2"><BookOpen className="size-5" /> Resilient Rebuilding Contacts</h2>
          <p className="text-sm text-emerald-900 dark:text-emerald-200">
            For advice on resilient construction and agricultural extension services, contact:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-emerald-900 dark:text-emerald-200">
            <li><strong>National Construction Authority (NCA):</strong> nca.go.ke (for certified contractors and building codes)</li>
            <li><strong>Ministry of Agriculture Extension Services:</strong> Visit your local Sub-County Agricultural Officer's office.</li>
            <li><strong>KALRO (Kenya Agricultural & Livestock Research Organization):</strong> kalro.go.ke (for drought-resistant seeds advice)</li>
          </ul>
        </section>
      </>
    )
  }
};

function GuideDetail() {
  const { guideId } = Route.useParams();
  const guide = guidesData[guideId] || {
    title: `${guideId.replace("-", " ")} Guide`,
    icon: FileText,
    content: (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-6">This comprehensive recovery guide is currently being finalized by our disaster response experts. Please check back soon.</p>
      </div>
    )
  };

  const Icon = guide.icon;
  const isSubSafety = guideId.startsWith("safety-");

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          {isSubSafety ? (
            <Link
              to="/resources/guides/$guideId"
              params={{ guideId: "safety" }}
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="size-4 mr-2" /> Back to Safety Guides
            </Link>
          ) : (
            <Link
              to="/resources"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="size-4 mr-2" /> Back to Resources
            </Link>
          )}
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center dark:bg-brand-950 dark:text-brand-300">
              <Icon className="size-8" />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-foreground capitalize">
              {guide.title}
            </h1>
          </div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none bg-card border border-border p-8 md:p-12 rounded-3xl">
          {guide.content}
        </div>
      </div>
    </PageShell>
  );
}
