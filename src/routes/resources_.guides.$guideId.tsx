import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ArrowLeft, CheckCircle2, AlertTriangle, Phone, FileText, Home, Coins, HeartPulse, BookOpen } from "lucide-react";

export const Route = createFileRoute("/resources_/guides/$guideId")({
  component: GuideDetail,
});

const guidesData: Record<string, any> = {
  safety: {
    title: "Flash Flood & Emergency Safety",
    icon: AlertTriangle,
    content: (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Immediate Actions During Flooding</h2>
          <p className="text-muted-foreground mb-4">When flash floods hit urban areas like Nairobi or river basins like Nyando and Tana, act quickly:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Move to higher ground immediately. Avoid walking or driving through floodwaters. Just 15cm of fast-moving water can knock you down.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Turn off main power switches and disconnect electrical appliances if water enters your home.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" /> <span>Keep important documents (ID, Title Deeds, NHIF cards) in waterproof bags.</span></li>
          </ul>
        </section>
        <section className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2"><Phone className="size-5" /> Emergency Contacts</h2>
          <ul className="space-y-2 text-red-900 dark:text-red-200">
            <li><strong>Kenya Red Cross Society:</strong> Toll-Free 1199</li>
            <li><strong>St John Ambulance:</strong> 0721 225 285</li>
            <li><strong>National Disaster Operations Centre:</strong> 020 2215105</li>
            <li><strong>Police Emergency:</strong> 999 / 112</li>
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

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link to="/resources" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4 mr-2" /> Back to Resources
          </Link>
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center">
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
