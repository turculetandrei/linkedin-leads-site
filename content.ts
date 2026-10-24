// All copy for the site lives here. Every name, company and number in the demo is invented.

/** Placeholder: replace with the final product name. */
export const PRODUCT_NAME = "Warmlist";

/** Placeholder: replace with the real checkout link. */
export const CHECKOUT_URL = "https://example.com/checkout";

/** Placeholder: replace with the real one-time price. */
export const PRICE = "$149";

export const site = {
  title: `${PRODUCT_NAME} — leads from the people who engage with LinkedIn posts`,
  description:
    "Collects the people who react to, comment on or reshare chosen LinkedIn posts, scores each one against your ideal customer, and gives you a sorted list. Runs on your computer.",
};

export const nav = {
  links: [
    { label: "How it works", href: "#how" },
    { label: "Demo", href: "#demo" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Buy",
};

export const hero = {
  headline: ["Your next clients", "already liked", "your post."],
  subline:
    "It collects everyone who engages with the LinkedIn posts you choose, scores each person against your ideal customer, and hands you a sorted list.",
  cta: `Buy once · ${PRICE}`,
  note: "Runs on your computer. Bring your own keys.",
};

export const how = {
  eyebrow: "How it works",
  title: "Four steps. Every day.",
  steps: [
    {
      title: "Watch",
      body: "Pick company pages and profiles. Yours, a partner's, anyone your buyers follow.",
      detail: "linkedin.com/company/northwind-labs",
    },
    {
      title: "Collect",
      body: "Each new post's reactions, comments and reshares, once it is two days old.",
      detail: "84 reactions · 17 comments · 4 reshares",
    },
    {
      title: "Score",
      body: "AI reads each profile and scores it 1–10 against your ideal customer, with a reason.",
      detail: "9 · Runs RevOps at a 200-person firm",
    },
    {
      title: "Contact",
      body: "One spreadsheet, best first. You decide who to reach out to, and how.",
      detail: "output/leads-master.csv",
    },
  ],
};

export const terminal = {
  file: "PowerShell",
  command: "npm run dev -- watch run",
  lines: [
    "checking 2 source(s), budget $2.00, $0.02 reserved for AI",
    "",
    "---------- watch summary ----------",
    "northwind-labs: new posts 2 | scraped this run 3 | new reactions 84, comments 17, reshares 4 | new people 71",
    "dana-whitfield: new posts 1 | scraped this run 1 | new reactions 23, comments 5, reshares 0 | new people 21",
    "people: screened 92 (selected 38) | enriched 20, 18 queued | classified 20 | ICP YES 6 (score >= 7)",
    "master CSV: 214 leads (31 statuses carried over) -> output/leads-master.csv",
    "new leads this run: 20 -> output/leads-new-2026-10-24.csv",
    "budget used: $0.8020 of $2.00 (estimated)",
  ],
};

export type Lead = {
  score: number;
  name: string;
  role: string;
  company: string;
  engagement: string;
  reason: string;
};

export const leads: Lead[] = [
  {
    score: 9,
    name: "Maren Holt",
    role: "Head of Revenue Operations",
    company: "Fieldline Logistics",
    engagement: "2 comments",
    reason: "Runs RevOps at a 200-person logistics firm and asked how the setup handles inbound.",
  },
  {
    score: 9,
    name: "Tomás Ferreira",
    role: "VP Sales",
    company: "Quillstack",
    engagement: "Comment, reaction",
    reason: "Leads a 15-rep B2B SaaS sales team; commented on outbound cost per meeting.",
  },
  {
    score: 8,
    name: "Priya Nandakumar",
    role: "Founder & CEO",
    company: "Ledgerly",
    engagement: "Reshare",
    reason: "Founder of a seed-stage fintech selling to CFOs; company size fits.",
  },
  {
    score: 8,
    name: "Jonas Eklund",
    role: "Growth Lead",
    company: "Northpeak Analytics",
    engagement: "3 reactions",
    reason: "Owns pipeline at a 60-person analytics vendor; engaged with three posts.",
  },
  {
    score: 7,
    name: "Aisha Bello",
    role: "Marketing Director",
    company: "Corvid Health",
    engagement: "Comment",
    reason: "Senior marketing buyer in health tech; comment shows the problem, budget unclear.",
  },
  {
    score: 5,
    name: "Liam Okafor",
    role: "Account Executive",
    company: "Brightwave Media",
    engagement: "Reaction",
    reason: "Sales role, but an individual contributor rather than a buyer.",
  },
  {
    score: 2,
    name: "Sofia Marchetti",
    role: "MSc Marketing student",
    company: "—",
    engagement: "Reaction",
    reason: "Student with no buying role.",
  },
  {
    score: 1,
    name: "Ben Carver",
    role: "Sales Director",
    company: "Leadhawk",
    engagement: "Reaction",
    reason: "Works at a competitor.",
  },
];

export const demo = {
  eyebrow: "Demo",
  title: "One command. One list.",
  body: "This is a daily run, replayed. The scheduled task does it for you.",
  tableFile: "leads-master.csv",
  tableColumns: ["Score", "Name", "Role", "Company", "Engagement", "Reason"],
  minScore: 7,
  footnote: "Example data. Every name and company here is invented.",
};

export const facts = {
  eyebrow: "What it is, and is not",
  title: "No surprises.",
  items: [
    { title: "Sends nothing", body: "No messages, connection requests or emails. You do the outreach." },
    { title: "Never logs in as you", body: "Your LinkedIn account is not used. The data comes from public pages." },
    { title: "No emails collected", body: "It does not look up email addresses or phone numbers." },
    { title: "Runs on your computer", body: "Your leads stay in local files. Nothing goes through us." },
    { title: "Your own keys", body: "Bring your Apify and OpenRouter accounts. You pay them directly." },
    { title: "About 1–2¢ per lead", body: "Collecting, AI and profile lookups included. A daily budget caps each run." },
    { title: `One-time · ${PRICE}`, body: "Pay once. No subscription, no seats." },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions.",
  items: [
    {
      q: "What do I need?",
      a: "Windows 10 or 11 for the daily schedule (the tool itself also runs on macOS and Linux), Node.js 22, an Apify account and an OpenRouter account with a few dollars of credit. A setup check tells you what is missing.",
    },
    {
      q: "When do I see the first leads?",
      a: "Usually on the second or third daily run. Reactions are collected once a post is two days old, because most people react in the first days.",
    },
    {
      q: "What does it cost to run?",
      a: "About $4 a month per watched page with a dozen posts a month, paid to Apify and OpenRouter. In our test that came to about 2 cents per lead. You set a budget per run, and it stops there.",
    },
    {
      q: "How good is the scoring?",
      a: "Strict on purpose: 7 or more needs evidence in the profile. Every score comes with a one-sentence reason. Treat it as a starting point and check the profile before you reach out.",
    },
    {
      q: "Where does the data go?",
      a: "It stays in files on your computer. It is sent only to Apify, to collect it, and to OpenRouter and the AI provider behind your chosen model, to score it.",
    },
    {
      q: "Is this allowed?",
      a: "Public profiles are still personal data under the GDPR, and you are the data controller: you need a lawful basis, must say where you got the data when you first contact someone, and must delete it on request. LinkedIn's terms prohibit automated scraping. The data is collected by Apify, not through your account, but using it is your decision and your responsibility.",
    },
  ],
};

export const finalCta = {
  title: "Start with the people who already noticed you.",
  cta: `Buy once · ${PRICE}`,
  note: "You install it yourself, with your own keys.",
};

export const footer = {
  line: "Not affiliated with LinkedIn, Apify or OpenRouter.",
};
