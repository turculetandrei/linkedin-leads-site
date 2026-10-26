'use client';

import { useEffect, useState } from 'react';
import s from './Landing.module.css';

/* Glowlist landing — ported 1:1 from the Claude Design canvas.
   Bilingual (EN/RO), lead cards with a working filter. All people shown are invented. */

const ACCENT = '#e2531c';

// Links still to be filled in before launch
const LINKS = { sample: '#sample', login: '#login', privacy: '#privacy', terms: '#terms' };

type Lang = 'en' | 'ro';
type Filter = 'all' | 'hot' | 'commented';
type Kind = 'c' | 'r' | 's' | 'l'; // comment, reactions, reshare, like
type Hair = 'short' | 'long' | 'bun' | 'curly';
type L10n = Record<Lang, string>;

const T = {
  en: {
    navPricing: 'Pricing', navLogin: 'Log in', navSample: 'Free sample',
    badge: 'For B2B agencies',
    h1: "Your competitors' audience, scored and ready to call.",
    sub: "We watch who likes, comments and reshares in your niche. AI tells you who's worth a call.",
    inputLabel: 'Competitor LinkedIn page', cta: 'Get your free lead sample',
    ctaNote: 'No card. No call. First leads in 24h.',
    previewLabel: 'Product preview', people: 'people', last7: 'last 7 days',
    tAll: 'All', tHot: 'Hot 8+', tCom: 'Commented',
    example: 'Example data. Names are invented.',
    howTitle: 'Add a page once. Leads show up every morning.',
    watching: 'Watching', p312: '312 people', p188: '188 people', p97: '97 people',
    s1t: '1. Pick who to watch', s1d: 'Your rivals, your page, the voices in your niche.',
    postQuote: '“Cold outreach is dead. Here’s what we do instead →”',
    reactions: 'Reactions', comments: 'Comments', reshares: 'Reshares',
    s2t: '2. We collect every signal', s2d: 'Every new post, every person who engaged.',
    mayaReason: 'Runs a 12-person agency and asked which outbound tools actually work.',
    s3t: '3. AI scores. You call.', s3d: 'A score and the reason, for every person.',
    n275: '27.5', st1: 'reactions per post', st2: 'new people per post', st3: 'to your first leads', st4: 'logins to your LinkedIn',
    priceTitle: 'One price a year. Everything included.',
    priceSub: 'No Apify account, no API keys, no extra bills.',
    spots: '7 of 10 spots left', perYear: '/ year',
    f1: '5 sources watched', f2: '1,500 people analyzed / month',
    st1Plan: '10 sources watched', st2Plan: '3,000 people analyzed / month',
    bonus: 'All bonuses included (€910 value)',
    promise: 'Backed by the 50 Warm Leads Promise. [Guarantee conditions — to be written]',
    faqTitle: 'Questions',
    faq: [
      { q: 'Will my LinkedIn get banned?', a: 'No. We never log in as you.' },
      { q: 'What about GDPR?', a: 'EU servers, a data processing agreement, and delete-anytime.' },
      { q: 'What if I hit my monthly limit?', a: 'Collection pauses until next month. Your leads stay.' },
    ],
    finalTitle: "See who's already interested.",
    privacy: 'Privacy', terms: 'Terms', score: 'Score',
    hot: 'Hot', warm: 'Warm', cold: 'Cold', why: 'Why',
  },
  ro: {
    navPricing: 'Prețuri', navLogin: 'Intră în cont', navSample: 'Mostră gratuită',
    badge: 'Pentru agenții B2B',
    h1: 'Publicul competitorilor tăi, punctat și gata de sunat.',
    sub: 'Urmărim cine apreciază, comentează și distribuie în nișa ta. AI-ul îți spune pe cine merită să suni.',
    inputLabel: 'Pagina de LinkedIn a unui competitor', cta: 'Primește mostra gratuită',
    ctaNote: 'Fără card. Fără apel. Primele leads în 24h.',
    previewLabel: 'Previzualizare produs', people: 'persoane', last7: 'ultimele 7 zile',
    tAll: 'Toți', tHot: 'Fierbinți 8+', tCom: 'Au comentat',
    example: 'Date de exemplu. Numele sunt inventate.',
    howTitle: 'Adaugi o pagină o dată. Leads noi în fiecare dimineață.',
    watching: 'Urmărite', p312: '312 persoane', p188: '188 persoane', p97: '97 persoane',
    s1t: '1. Alegi pe cine urmărim', s1d: 'Competitorii, pagina ta, vocile din nișa ta.',
    postQuote: '„Cold outreach-ul a murit. Uite ce facem în schimb →”',
    reactions: 'Reacții', comments: 'Comentarii', reshares: 'Distribuiri',
    s2t: '2. Colectăm fiecare semnal', s2d: 'Fiecare postare nouă, fiecare om care a interacționat.',
    mayaReason: 'Conduce o agenție de 12 oameni și a întrebat ce unelte de outbound chiar funcționează.',
    s3t: '3. AI-ul dă scorul. Tu suni.', s3d: 'Un scor și motivul, pentru fiecare persoană.',
    n275: '27,5', st1: 'reacții pe postare', st2: 'persoane noi pe postare', st3: 'până la primele leads', st4: 'logări în LinkedIn-ul tău',
    priceTitle: 'Un preț pe an. Totul inclus.',
    priceSub: 'Fără cont Apify, fără chei API, fără costuri în plus.',
    spots: '7 din 10 locuri rămase', perYear: '/ an',
    f1: '5 surse urmărite', f2: '1.500 persoane analizate / lună',
    st1Plan: '10 surse urmărite', st2Plan: '3.000 persoane analizate / lună',
    bonus: 'Toate bonusurile incluse (valoare €910)',
    promise: 'Garantat prin 50 Warm Leads Promise. [Condițiile garanției — de scris]',
    faqTitle: 'Întrebări',
    faq: [
      { q: 'Îmi poate fi blocat contul de LinkedIn?', a: 'Nu. Nu ne logăm niciodată în contul tău.' },
      { q: 'Ce e cu GDPR?', a: 'Servere în UE, acord de prelucrare a datelor și ștergere oricând.' },
      { q: 'Ce se întâmplă dacă ating limita lunară?', a: 'Colectarea se oprește până luna viitoare. Leads-urile rămân.' },
    ],
    finalTitle: 'Vezi cine e deja interesat.',
    privacy: 'Confidențialitate', terms: 'Termeni', score: 'Scor',
    hot: 'Fierbinte', warm: 'Cald', cold: 'Rece', why: 'De ce',
  },
} as const;

const HAIR: Record<Hair, string> = {
  short: 'M18.5 22c0-7 4.5-11 9.5-11s9.5 4 9.5 11c-1.5-3-4-5-9.5-5s-8 2-9.5 5z',
  long: 'M17 38V23c0-8 5-12.5 11-12.5S39 15 39 23v15c-2 0-3-1-3-3V22c-2-3-5-4-8-4s-6 1-8 4v13c0 2-1 3-3 3z',
  bun: 'M18.5 22c0-7 4.5-11 9.5-11s9.5 4 9.5 11c-1.5-3-4-5-9.5-5s-8 2-9.5 5zM28 4a4.5 4.5 0 1 1 0 9a4.5 4.5 0 1 1 0-9z',
  curly: 'M17 24c-2-9 4-14 11-14s13 5 11 14c-1-4-3-6-5-6.5-2 1.5-4 1.5-6 0-2 1.5-4 1.5-6 0-2 .5-4 2.5-5 6.5z',
};

type Look = { bg: string; skin: string; hair: string; hs: Hair; shirt: string };
type Lead = {
  name: string; co: string; role: string; city: string; k: Kind; score: number; days: number;
  look: Look; ctx: L10n; quote: L10n; why: L10n;
};

const POST: L10n = { en: T.en.postQuote, ro: T.ro.postQuote };

const LEADS: Lead[] = [
  { name: 'Maya Lindqvist', co: 'N', role: 'Founder · Northpeak Studio', city: 'Stockholm', k: 'c', score: 9, days: 2,
    look: { bg: '#dbeafe', skin: '#f1c7a5', hair: '#c9a063', hs: 'long', shirt: '#1e3a8a' },
    ctx: { en: 'Commented on Brightwave’s post', ro: 'A comentat la o postare Brightwave' },
    quote: { en: '“We tried three outbound tools this year. None worked for a team our size. What do you use?”', ro: '„Am încercat trei unelte de outbound anul ăsta. Niciuna n-a mers pentru o echipă ca a noastră. Voi ce folosiți?”' },
    why: { en: 'Founder of a 12-person agency, actively looking for an outbound tool.', ro: 'Fondatoare a unei agenții de 12 oameni, caută activ o unealtă de outbound.' } },
  { name: 'Tomás Ferreira', co: 'B', role: 'Head of Growth · Brightlane', city: 'Lisbon', k: 'r', score: 8, days: 1,
    look: { bg: '#dcfce7', skin: '#c99673', hair: '#2b1d14', hs: 'short', shirt: '#166534' },
    ctx: { en: 'Liked 3 posts from Ana · Growth', ro: 'A apreciat 3 postări de la Ana · Growth' },
    quote: POST,
    why: { en: 'Owns pipeline targets and keeps coming back to lead-gen content.', ro: 'Răspunde de pipeline și revine constant la conținut de lead-gen.' } },
  { name: 'Priya Raman', co: 'F', role: 'Owner · Fold & Co', city: 'London', k: 's', score: 8, days: 3,
    look: { bg: '#fae8ff', skin: '#a86f4c', hair: '#1a1110', hs: 'bun', shirt: '#701a75' },
    ctx: { en: 'Reshared a post from your page', ro: 'A distribuit o postare de pe pagina ta' },
    quote: { en: '“How we booked 40 calls from one LinkedIn post”', ro: '„Cum am obținut 40 de call-uri dintr-o singură postare”' },
    why: { en: 'Decision maker at a small agency that is hiring for sales.', ro: 'Decide într-o agenție mică ce angajează oameni de vânzări.' } },
  { name: 'Daniel Okafor', co: 'K', role: 'Sales Director · Kestrel B2B', city: 'Amsterdam', k: 'c', score: 7, days: 1,
    look: { bg: '#fef3c7', skin: '#6b4430', hair: '#120c08', hs: 'curly', shirt: '#374151' },
    ctx: { en: 'Commented on Kestrel Sales’ post', ro: 'A comentat la o postare Kestrel Sales' },
    quote: { en: '“This is exactly our problem. Our lead lists go stale in a week.”', ro: '„Exact asta e problema noastră. Listele de leads se învechesc într-o săptămână.”' },
    why: { en: 'Leads a sales team and named the exact pain we solve.', ro: 'Conduce o echipă de vânzări și a numit exact problema pe care o rezolvăm.' } },
  { name: 'Sofia Marchetti', co: 'A', role: 'Partner · Atelier Nove', city: 'Milan', k: 'l', score: 6, days: 4,
    look: { bg: '#ffe4e6', skin: '#e8b896', hair: '#5a3420', hs: 'long', shirt: '#9f1239' },
    ctx: { en: 'Liked a post from Brightwave', ro: 'A apreciat o postare Brightwave' },
    quote: { en: '“5 signs your agency has outgrown referrals”', ro: '„5 semne că agenția ta a depășit recomandările”' },
    why: { en: 'Agency partner. Interest is plausible, budget role unclear.', ro: 'Partener într-o agenție. Interes plauzibil, rol în buget neclar.' } },
  { name: 'Lena Hartmann', co: 'T', role: 'Student · TU Berlin', city: 'Berlin', k: 'l', score: 3, days: 5,
    look: { bg: '#f4f4f5', skin: '#f3d2b8', hair: '#b4532a', hs: 'bun', shirt: '#737373' },
    ctx: { en: 'Liked a post from Ana · Growth', ro: 'A apreciat o postare Ana · Growth' },
    quote: POST,
    why: { en: 'No buying role yet. Kept in your list, ranked low.', ro: 'Nu decide achiziții încă. Rămâne în listă, cu scor mic.' } },
];

const MAYA = LEADS[0].look;

const segColor = (i: number) => (i <= 3 ? '#fcd34d' : i <= 6 ? '#fb923c' : i <= 8 ? '#f97316' : '#dc2626');
const tierOf = (score: number) => (score >= 8 ? 'hot' : score >= 6 ? 'warm' : 'cold') as 'hot' | 'warm' | 'cold';
const ago = (days: number, lang: Lang) =>
  lang === 'ro' ? (days === 1 ? 'acum o zi' : `acum ${days} zile`) : `${days}d ago`;

/* ---------- small pieces ---------- */

function Mark({ size = 26, onDark = false, glow = true }: { size?: number; onDark?: boolean; glow?: boolean }) {
  const ink = onDark ? '#ffffff' : '#0a0a0a';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {glow && <rect x="3" y="6" width="42" height="14" rx="7" fill={ACCENT} opacity=".16" />}
      <rect x="6" y="9" width="36" height="8" rx="4" fill={ACCENT} />
      <rect x="6" y="20" width="26" height="8" rx="4" fill={ink} />
      <rect x="6" y="31" width="16" height="8" rx="4" fill={ink} opacity={onDark ? 0.35 : 0.3} />
    </svg>
  );
}

function Avatar({ look, size = 56, label }: { look: Look; size?: number; label?: string }) {
  return (
    <span className={s.avatar} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 56 56" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
        <rect width="56" height="56" fill={look.bg} />
        <path d="M8 58c0-11 9-18 20-18s20 7 20 18z" fill={look.shirt} />
        <rect x="24" y="31" width="8" height="10" rx="3" fill={look.skin} />
        <ellipse cx="28" cy="24" rx="9" ry="10.5" fill={look.skin} />
        <path d={HAIR[look.hs]} fill={look.hair} />
      </svg>
    </span>
  );
}

const IconComment = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z" fill="none" stroke="#404040" strokeWidth="1.6" strokeLinejoin="round" /></svg>
);
const IconHeart = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13.5S2 10 2 5.8A3 3 0 0 1 8 4.5a3 3 0 0 1 6 1.3C14 10 8 13.5 8 13.5z" fill="#f97316" /></svg>
);
const IconReshare = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6.5V5h8.5l-2-2M13 9.5V11H4.5l2 2" fill="none" stroke="#404040" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={s.whyIcon}><path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6z" fill={ACCENT} /></svg>
);

function Segmented<V extends string>({ label, options, value, onChange, small }: {
  label: string; options: { id: V; label: string }[]; value: V; onChange: (v: V) => void; small?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className={s.seg}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}
          className={`${small ? s.segBtnSm : s.segBtn} ${value === o.id ? s.segOn : ''}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function LeadCard({ lead, lang }: { lead: Lead; lang: Lang }) {
  const t = T[lang];
  const tier = tierOf(lead.score);
  return (
    <article className={s.lead}>
      <div className={s.leadTop}>
        <div className={s.avatarWrap}>
          <Avatar look={lead.look} label={lead.name} />
          <span aria-hidden="true" className={s.coBadge}>{lead.co}</span>
        </div>
        <div className={s.who}>
          <span className={s.name}>{lead.name}</span>
          <span className={s.role}>{lead.role}</span>
          <span className={s.city}>{lead.city}</span>
        </div>
        <div role="img" aria-label={`${t.score} ${lead.score}/10`} className={s.score}>
          <div className={s.scoreRow}>
            <span className={`${s.tier} ${s[tier]}`}>{t[tier]}</span>
            <span className={s.scoreNum}>{lead.score}</span>
          </div>
          <div className={s.segs}>
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={s.segment} style={{ background: i + 1 <= lead.score ? segColor(i + 1) : '#ececec' }} />
            ))}
          </div>
        </div>
      </div>
      <div className={s.ctx}>
        <div className={s.ctxLine}>
          {lead.k === 'c' ? <IconComment /> : lead.k === 's' ? <IconReshare /> : <IconHeart />}
          <span className={s.ctxStrong}>{lead.ctx[lang]}</span>
          <span className={s.dim}>·</span>
          <span>{ago(lead.days, lang)}</span>
        </div>
        <p className={s.quote}>{lead.quote[lang]}</p>
      </div>
      <div className={s.why}>
        <IconSparkle />
        <span className={s.whyLabel}>{t.why}</span>
        <span>{lead.why[lang]}</span>
      </div>
    </article>
  );
}

/* ---------- page ---------- */

export default function Landing() {
  const [lang, setLang] = useState<Lang>('en');
  const [filter, setFilter] = useState<Filter>('all');
  const t = T[lang];

  // Romanian browsers start in RO; the choice is remembered per visitor.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('glowlist-lang');
      if (saved === 'en' || saved === 'ro') setLang(saved);
      else if (navigator.language?.toLowerCase().startsWith('ro')) setLang('ro');
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('glowlist-lang', lang); } catch {}
  }, [lang]);

  const visible = LEADS.filter((l) => (filter === 'hot' ? l.score >= 8 : filter === 'commented' ? l.k === 'c' : true));

  return (
    <div className={s.page}>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <a href="#top" className={s.brand}>
            <Mark />
            <span className={s.brandName}>glowlist</span>
          </a>
          <nav aria-label="Main" className={s.nav}>
            <a href="#pricing" className={s.navLink}>{t.navPricing}</a>
            <a href={LINKS.login} className={s.navLink}>{t.navLogin}</a>
            <Segmented label="Language" small value={lang} onChange={setLang}
              options={[{ id: 'en', label: 'EN' }, { id: 'ro', label: 'RO' }]} />
            <a href={LINKS.sample} className={s.btnDark}>{t.navSample}</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className={`${s.wrap} ${s.hero}`}>
          <span className={s.badge}>{t.badge}</span>
          <h1 className={s.h1}>{t.h1}</h1>
          <p className={s.sub}>{t.sub}</p>
          <form id="sample" className={s.form} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="src" className={s.srOnly}>{t.inputLabel}</label>
            <input id="src" type="text" placeholder="linkedin.com/company/..." className={s.input} />
            <button type="submit" className={s.btnAccent}>{t.cta}</button>
          </form>
          <p className={s.note}>{t.ctaNote}</p>
        </section>

        <section aria-label={t.previewLabel} className={`${s.wrap} ${s.preview}`}>
          <div className={s.window}>
            <div className={s.winBar}>
              <div className={s.winMeta}>
                <span className={s.winTitle}>Leads</span>
                <span className={s.dim}>/</span>
                <span>{visible.length} {t.people}</span>
                <span className={s.dim}>·</span>
                <span>{t.last7}</span>
              </div>
              <Segmented label="Filter" value={filter} onChange={setFilter}
                options={[{ id: 'all', label: t.tAll }, { id: 'hot', label: t.tHot }, { id: 'commented', label: t.tCom }]} />
            </div>
            <div className={s.grid}>
              {visible.map((l) => <LeadCard key={l.name} lead={l} lang={lang} />)}
            </div>
          </div>
          <p className={s.example}>{t.example}</p>
        </section>

        <section aria-labelledby="how" className={s.how}>
          <div className={`${s.wrap} ${s.howIn}`}>
            <h2 id="how" className={s.h2} style={{ maxWidth: 600 }}>{t.howTitle}</h2>
            <div className={s.steps}>
              <div className={s.step}>
                <div className={s.panel}>
                  <div className={s.panelHead}>{t.watching}</div>
                  {[
                    { ab: 'BW', name: 'Brightwave Agency', n: t.p312, cls: s.srcIconDark },
                    { ab: 'AG', name: 'Ana · Growth', n: t.p188, cls: s.srcIconRound },
                    { ab: 'KS', name: 'Kestrel Sales', n: t.p97, cls: s.srcIcon },
                  ].map((r) => (
                    <div key={r.ab} className={s.srcRow}>
                      <span className={r.cls}>{r.ab}</span>
                      <span className={s.srcName}>{r.name}</span>
                      <span className={s.srcCount}>{r.n}</span>
                    </div>
                  ))}
                </div>
                <div><h3 className={s.stepTitle}>{t.s1t}</h3><p className={s.stepText}>{t.s1d}</p></div>
              </div>

              <div className={s.step}>
                <div className={`${s.panel} ${s.panelPad}`}>
                  <p className={s.postQuote}>{t.postQuote}</p>
                  <div className={s.bars}>
                    {[
                      { label: t.reactions, w: '86%', n: 214 },
                      { label: t.comments, w: '24%', n: 38 },
                      { label: t.reshares, w: '9%', n: 12 },
                    ].map((b) => (
                      <div key={b.n} className={s.barRow}>
                        <span className={s.barLabel}>{b.label}</span>
                        <div className={s.track}><div className={s.fill} style={{ width: b.w }} /></div>
                        <span className={s.barNum}>{b.n}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div><h3 className={s.stepTitle}>{t.s2t}</h3><p className={s.stepText}>{t.s2d}</p></div>
              </div>

              <div className={s.step}>
                <div className={`${s.panel} ${s.panelPad} ${s.miniLead}`}>
                  <div className={s.miniTop}>
                    <Avatar look={MAYA} size={36} />
                    <div className={s.who}>
                      <span className={s.miniName}>Maya Lindqvist</span>
                      <span className={s.miniRole}>Founder · Northpeak Studio</span>
                    </div>
                    <span className={s.miniScore}>9<span>/10</span></span>
                  </div>
                  <p className={s.miniWhy}>{t.mayaReason}</p>
                </div>
                <div><h3 className={s.stepTitle}>{t.s3t}</h3><p className={s.stepText}>{t.s3d}</p></div>
              </div>
            </div>

            <div className={s.stats}>
              {[
                { n: t.n275, l: t.st1 }, { n: '~23', l: t.st2 }, { n: '24h', l: t.st3 }, { n: '0', l: t.st4 },
              ].map((x) => (
                <div key={x.l}><div className={s.statNum}>{x.n}</div><div className={s.statLabel}>{x.l}</div></div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-title" className={s.bordered}>
          <div className={`${s.wrap} ${s.pricing}`}>
            <div className={s.center}>
              <h2 id="pricing-title" className={s.h2}>{t.priceTitle}</h2>
              <p className={s.muted}>{t.priceSub}</p>
            </div>
            <div className={s.plans}>
              <div className={`${s.plan} ${s.planFeatured}`}>
                <div className={s.planHead}>
                  <h3 className={s.planName}>Founding</h3>
                  <span className={s.spots}>{t.spots}</span>
                </div>
                <div className={s.price}><span className={s.priceNum}>€490</span><span className={s.priceOld}>€990</span><span className={s.per}>{t.perYear}</span></div>
                <ul className={s.features}><li>{t.f1}</li><li>{t.f2}</li><li>{t.bonus}</li></ul>
                <a href={LINKS.sample} className={s.btnAccentBlock}>{t.cta}</a>
              </div>
              <div className={s.plan}>
                <div className={s.planHead}><h3 className={s.planName}>Standard</h3></div>
                <div className={s.price}><span className={s.priceNum}>€990</span><span className={s.per}>{t.perYear}</span></div>
                <ul className={s.features}><li>{t.st1Plan}</li><li>{t.st2Plan}</li><li>{t.bonus}</li></ul>
                <a href={LINKS.sample} className={s.btnOutline}>{t.cta}</a>
              </div>
            </div>
            <p className={s.promise}>{t.promise}</p>
          </div>
        </section>

        <section aria-labelledby="faq-title" className={s.bordered}>
          <div className={s.faq}>
            <h2 id="faq-title" className={s.faqTitle}>{t.faqTitle}</h2>
            <div className={s.faqList}>
              {t.faq.map((q) => (
                <details key={q.q} className={s.details}>
                  <summary className={s.summary}>{q.q}<span className={s.plus} aria-hidden="true">+</span></summary>
                  <p className={s.faqA}>{q.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="cta" className={s.final}>
          <div className={`${s.wrap} ${s.finalIn}`}>
            <h2 id="cta" className={s.finalTitle}>{t.finalTitle}</h2>
            <a href={LINKS.sample} className={s.btnAccentInline}>{t.cta}</a>
          </div>
        </section>
      </main>

      <footer className={`${s.wrap} ${s.footer}`}>
        <span className={s.footBrand}><Mark size={16} glow={false} />© 2026 Glowlist</span>
        <nav aria-label="Footer" className={s.footNav}>
          <a href={LINKS.privacy}>{t.privacy}</a>
          <a href={LINKS.terms}>{t.terms}</a>
        </nav>
      </footer>
    </div>
  );
}
