// All copy and settings for the site live here.
// Every person and company in the sample leads is invented. The engagement averages are real
// (measured on watched LinkedIn posts); nothing else here comes from real lead data.
// Search for "PLACEHOLDER" and "TODO" to find what still needs real values.

/** Working name. Change it here and it changes everywhere. */
export const PRODUCT_NAME = "Heatseeker";

/** PLACEHOLDER: the site's final address (used for canonical links). */
export const SITE_URL = "https://linkedin-leads-site.vercel.app";

/** PLACEHOLDER: the app's signup page, where the free lead sample starts. */
export const SIGNUP_URL = "https://app.example.com/signup";

/** PLACEHOLDER: the app's login page. */
export const LOGIN_URL = "https://app.example.com/login";

/** PLACEHOLDER: the booking link shown on /welcome after payment. */
export const BOOKING_URL = "https://example.com/book-setup-call";

/** PLACEHOLDER: support email shown on /welcome. */
export const SUPPORT_EMAIL = "hello@example.com";

/** The niche that / shows. Each key of `niches` gets its own page at /<key>. */
export const DEFAULT_NICHE = "agencies";

export const CTA_LABEL = "Get your free lead sample";

export const currency = { symbol: "€", locale: "en-IE" };

export function money(amount: number): string {
  return `${currency.symbol}${amount.toLocaleString(currency.locale)}`;
}

// ---------------------------------------------------------------------------
// Shared across niches: pricing, bonuses, guarantee
// ---------------------------------------------------------------------------

export type Plan = {
  id: string;
  name: string;
  badge?: string;
  /** Shown struck through when set. */
  priceWas?: number;
  price: number;
  period: string;
  sources: number;
  peoplePerMonth: number;
  /** For limited plans: "X of Y spots left". */
  spots?: { left: number; total: number };
  highlight?: boolean;
};

export const pricing = {
  eyebrow: "Pricing",
  title: "One yearly price. Everything included.",
  // Prices and limits will likely go up: change them here.
  plans: [
    {
      id: "founding",
      name: "Founding",
      badge: "Founding members",
      priceWas: 990,
      price: 490,
      period: "/year",
      sources: 5,
      peoplePerMonth: 1500,
      spots: { left: 7, total: 10 }, // PLACEHOLDER: update "left" as spots are taken
      highlight: true,
    },
    {
      id: "standard",
      name: "Standard",
      price: 990,
      period: "/year",
      sources: 10,
      peoplePerMonth: 3000,
    },
  ] satisfies Plan[],
  included: [
    "Scored leads with the AI's reason",
    "Data collection, AI and hosting",
    "All five bonuses below",
  ],
  anchor: "Cheaper than one week of an SDR researching leads by hand.",
  billingNote: "Billed yearly.", // PLACEHOLDER: add VAT wording once billing is set up
};

export const bonuses = {
  eyebrow: "Included bonuses",
  title: "Five things we do with you, at no extra cost.",
  // PLACEHOLDER: every € value below
  items: [
    {
      name: "Competitor Audience Map",
      value: 290,
      body: "We find the competitors and influencers whose audience matches your buyers, and set them up as sources.",
    },
    {
      name: "20-Minute Launch Call",
      value: 150,
      body: "We set everything up with you, live. You leave the call with the first run started.",
    },
    {
      name: "ICP Sharpener",
      value: 190,
      body: "We turn “who we sell to” into precise criteria the AI scores against, including who is a clear no.",
    },
    {
      name: "Warm DM Playbook",
      value: 90,
      body: "First messages that mention what the person engaged with, so your opener isn't cold.",
    },
    {
      name: "Daily Hot-Lead Digest",
      value: 190,
      body: "Every morning, the new leads worth contacting, straight to your inbox.",
    },
  ],
  totalLabel: "Total value",
  includedLabel: "Included in every plan",
};

export const guarantee = {
  title: "The 50 Warm Leads Promise",
  promise: "At least 50 warm leads that match your ideal client.",
  // TODO: write the real conditions (time window, minimum sources, what happens if we miss).
  conditions:
    "[TODO: conditions — e.g. within the first N days, with at least N sources watched and your ideal client agreed on the setup call; and what we do if we miss.]",
};

// ---------------------------------------------------------------------------
// Niche pages
// ---------------------------------------------------------------------------

export type Lead = {
  score: number;
  name: string;
  role: string;
  company: string;
  engagement: string;
  reason: string;
};

export type Niche = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string[];
    subline: string;
    note: string;
    digestTitle: string;
    digestMeta: string;
  };
  outcome: { eyebrow: string; title: string; body: string; points: string[] };
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    windowTitle: string;
    tabs: string[];
    leads: Lead[];
    stats: { value: string; label: string }[];
    statsNote: string;
    footnote: string;
  };
  speed: {
    eyebrow: string;
    title: string;
    body: string;
    steps: { when: string; title: string; body: string }[];
  };
  effort: { eyebrow: string; title: string; body: string; nots: string[]; included: string[] };
  sources: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string; example: string }[];
    note: string;
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  finalCta: { title: string; note: string };
};

const agencies: Niche = {
  meta: {
    title: `${PRODUCT_NAME} for B2B agencies: warm leads from your competitors' audience`,
    description:
      "We watch your page, your competitors and the influencers in your niche, score everyone who engages against your ideal client, and send you the warm leads. Everything included.",
  },
  hero: {
    eyebrow: "For B2B agencies",
    headline: ["Warm leads from", "your competitors'", "audience."],
    subline:
      "The people who like, comment on and share your competitors' LinkedIn posts are shopping for what you sell. We find them, score them against your ideal client, and send you the best ones.",
    note: "Free sample: your email, one competitor's page, who you sell to.",
    digestTitle: "Hot leads today",
    digestMeta: "3 new · from 2 competitor posts",
  },
  outcome: {
    eyebrow: "The outcome",
    title: "Booked calls with people already interested in what you sell.",
    body: "Every lead has just engaged with a post about the problem you solve. Your first message picks up that thread instead of starting cold.",
    points: ["They raised their hand in public", "You know what they care about", "You reach out first"],
  },
  proof: {
    eyebrow: "What you get",
    title: "Every lead scored, with the reason.",
    body: "The AI reads each profile against your ideal client and scores it from 1 to 10. You see why, before you reach out.",
    windowTitle: "Leads",
    tabs: ["New since yesterday", "All leads"],
    leads: [
      {
        score: 9,
        name: "Clara Lindqvist",
        role: "VP Marketing",
        company: "Brightloop Software",
        engagement: "Comment",
        reason: "Leads marketing at a 120-person B2B SaaS firm; commented that their current agency misses deadlines.",
      },
      {
        score: 9,
        name: "Daniel Okafor",
        role: "Head of Growth",
        company: "Tessellate Payments",
        engagement: "Comment, 2 reactions",
        reason: "Owns pipeline at a Series A fintech; asked who runs paid social well for B2B.",
      },
      {
        score: 8,
        name: "Mira Hoffmann",
        role: "CMO",
        company: "Polaris Freight Tech",
        engagement: "Reshare",
        reason: "CMO at a 300-person logistics software company; reshared a post on agency ROI.",
      },
      {
        score: 8,
        name: "Arjun Mehra",
        role: "Founder & CEO",
        company: "Ledgerline",
        engagement: "3 reactions",
        reason: "Founder of a 40-person B2B startup with no marketing lead; engaged with three posts.",
      },
      {
        score: 7,
        name: "Sofia Brandt",
        role: "Demand Gen Manager",
        company: "Corvane Health",
        engagement: "Comment",
        reason: "Runs demand gen in health tech; the comment shows the problem, budget unclear.",
      },
      {
        score: 4,
        name: "Tomás Reyes",
        role: "Freelance designer",
        company: "Self-employed",
        engagement: "Reaction",
        reason: "Freelancer; more likely a peer than a buyer.",
      },
      {
        score: 2,
        name: "Lena Vogt",
        role: "Account Manager",
        company: "Northbeam Studio",
        engagement: "Reaction",
        reason: "Works at a competing agency.",
      },
    ],
    stats: [
      { value: "27.5", label: "reactions per post" },
      { value: "3.5", label: "comments per post" },
      { value: "1.9", label: "reshares per post" },
      { value: "~23", label: "new people per post" },
    ],
    statsNote: "Averages measured on real LinkedIn posts we watched.",
    footnote: "Sample data. Every name and company in this table is invented.",
  },
  speed: {
    eyebrow: "Speed",
    title: "First leads within 24 hours.",
    body: "The first run looks back over the last two weeks of posts, so you don't wait for anyone to post something new.",
    steps: [
      { when: "Day 0", title: "Setup call", body: "20 minutes. We agree who your ideal client is and pick your sources." },
      { when: "Same day", title: "First run", body: "We collect two weeks of engagement and score everyone." },
      { when: "Next morning", title: "First leads", body: "Your scored leads, best first, in the app and your inbox." },
    ],
  },
  effort: {
    eyebrow: "Effort",
    title: "Everything included.",
    body: "20-minute setup call, we do it with you.",
    nots: ["No Apify account", "No API keys", "No extra bills"],
    included: ["Data collection", "AI scoring", "Profile lookups", "Hosting and updates"],
  },
  sources: {
    eyebrow: "Where leads come from",
    title: "We watch your own page, your competitors and the influencers in your niche.",
    items: [
      {
        title: "Your own page",
        body: "People who already engage with you. Often the warmest leads nobody follows up.",
        example: "linkedin.com/company/your-agency",
      },
      {
        title: "Your competitors",
        body: "People who follow agencies like yours. They are shopping, or about to.",
        example: "linkedin.com/company/rival-agency",
      },
      {
        title: "Niche influencers",
        body: "People learning about the problem you solve, from voices they trust.",
        example: "linkedin.com/in/b2b-growth-voice",
      },
    ],
    note: "One competitor posting three times a week brings about 70 new people a week to check.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions.",
    items: [
      {
        q: "Will my LinkedIn get banned?",
        a: "No. We never use your LinkedIn account. We don't log in as you, and we never post, like or message anything. We only read public engagement on public posts.",
      },
      {
        q: "What about GDPR?",
        a: "Names and job titles on public profiles are still personal data. You decide how you contact people, so you are the data controller. We process the data for you on servers in the EU, under a data processing agreement with you. You can delete any lead, or your whole account, at any time.",
      },
      {
        q: "What happens when I hit my limit?",
        a: "We stop analyzing new people until your monthly allowance resets. Every lead already found stays in your account. If you hit the limit every month, move to the bigger plan.",
      },
      {
        q: "How does setup work?",
        a: "After you sign up, you book a 20-minute call. We agree who your ideal client is, pick your sources together and start the first run during the call. Your first leads arrive within 24 hours.",
      },
      {
        q: "What is the free lead sample?",
        a: "Give us your email, one competitor's LinkedIn page and a few lines on who you sell to. We analyze that page's recent audience once and show you the scored leads. No card and no call needed.",
      },
      {
        q: "Do you message people for me?",
        a: "No. You reach out yourself, from your own account, in your own words. The Warm DM Playbook helps with the first message.",
      },
      {
        q: "What counts as a person analyzed?",
        a: "Each new person who engaged with a watched post and was checked by the AI. People we have already analyzed don't count again.",
      },
    ],
  },
  finalCta: {
    title: "Your next clients are already engaging with your competitors.",
    note: "Free sample. No card, no call.",
  },
};

export const niches: Record<string, Niche> = { agencies };

export const welcome = {
  meta: { title: `Welcome to ${PRODUCT_NAME}` },
  eyebrow: "Payment received",
  title: "You're in.",
  body: "One step left: book your 20-minute setup call. We set everything up with you, and your first leads arrive within 24 hours of the call.",
  cta: "Book your setup call",
  steps: [
    { title: "Book your call", body: "Pick a time that suits you." },
    { title: "Set up together", body: "Ideal client, sources and the first run, in 20 minutes." },
    { title: "Get your first leads", body: "Within 24 hours, in the app and your inbox." },
  ],
  help: "Questions before the call? Email",
};

export const nav = {
  links: [
    { label: "Sources", href: "#sources" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  login: "Log in",
  ctaShort: "Free lead sample",
};

export const footer = {
  line: "Not affiliated with LinkedIn.",
};
