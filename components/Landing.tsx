'use client';

import { useEffect, useState } from 'react';
import s from './Landing.module.css';

/* Glowlist landing — ported 1:1 from the Claude Design canvas (v10).
   Bilingual (EN/RO). The lead inbox is interactive: filter + click a person to see details.
   All people shown are invented. */

const ACCENT = '#e2531c';

// Fill these in before launch
const LINKS = { sample: '#sample', book: '#book', login: '#login', privacy: '#privacy', terms: '#terms', linkedin: '#' };

type Lang = 'en' | 'ro';
type Filter = 'all' | 'hot' | 'commented';
type Kind = 'c' | 'l' | 's'; // comment, like, reshare
type L10n = Record<Lang, string>;

const T = {
  en: {
    navHow: 'How it works', navPricing: 'Pricing', navLogin: 'Log in', navSample: 'Free sample',
    badge: 'For B2B agencies',
    h1: "Your competitors' audience, scored and ready to call.",
    sub: "We watch who likes, comments and reshares in your niche. AI tells you who's worth a call, and why.",
    inputLabel: 'Competitor LinkedIn page', cta: 'Get your free lead sample', cta2: 'Book your setup call',
    ctaNote: 'No card. No call. First leads in 24h.',
    previewLabel: 'Product preview', people: 'people', last7: 'last 7 days',
    tAll: 'All', tHot: 'Hot 8+', tCom: 'Commented',
    example: 'Example data. Names are invented.',
    open: 'Open on LinkedIn', scoreTitle: 'AI score', whyTitle: 'Why it’s a fit', activity: 'Activity',
    tierHot: 'Hot lead — reach out today', tierWarm: 'Warm lead — worth a message', tierCold: 'Cold — keep an eye on them',
    stNew: 'New', stDone: 'Contacted', score: 'Score',
    verbs: { c: 'Commented', l: 'Liked', s: 'Reshared' },
    cmpTitle: 'Stop calling strangers.',
    cmpSub: 'Bought lists are cold. The people engaging with your niche right now are not.',
    coldTitle: 'Bought lists',
    coldItems: ['People who have never heard of you', 'The same list your competitors bought', 'Hours of research before every message', 'Data that goes stale in weeks'],
    warmItems: ['People who just engaged with your niche', 'A fresh list every morning', 'Every lead scored, with the reason', 'Zero research. Just reach out'],
    howTitle: 'Add a page once. Leads show up every morning.',
    watching: 'Watching', p312: '312 people', p188: '188 people', p97: '97 people',
    s1t: '1. Pick who to watch', s1d: 'Your competitors, your own page, the voices in your niche.',
    postQuote: '“Cold outreach is dead. Here’s what we do instead →”',
    reactions: 'Reactions', comments: 'Comments', reshares: 'Reshares',
    s2t: '2. We collect every signal', s2d: 'Every new post, every person who engaged with it.',
    mayaReason: 'Runs a 12-person agency and asked which outbound tools actually work.',
    s3t: '3. AI scores. You call.', s3d: 'A 1–10 score and the reason, for every person.',
    n275: '27.5', st1: 'reactions per post, on average', st2: 'new people found per post', st3: 'from signup to first leads', st4: 'logins to your LinkedIn',
    bonusTitle: 'Everything you get, on every plan.',
    bonusSub: 'Set up with you, tuned to your ideal client, delivered daily.',
    totalValue: 'Total value', included: 'Included',
    bonuses: [
      { name: 'Competitor Audience Map', desc: 'Who engages with your top competitors', value: '€290' },
      { name: '20-Minute Launch Call', desc: 'We set up your sources together', value: '€150' },
      { name: 'ICP Sharpener', desc: 'We tune the AI to your ideal client', value: '€190' },
      { name: 'Warm DM Playbook', desc: 'Openers that mention what they engaged with', value: '€90' },
      { name: 'Daily Hot-Lead Digest', desc: 'Your best new leads every morning', value: '€190' },
    ],
    gTitle: 'The 50 Warm Leads Promise', gText: '[Guarantee conditions — to be written]',
    priceTitle: 'One price a year. Everything included.',
    anchor: 'Cheaper than one week of an SDR researching leads by hand.',
    priceSub: 'No Apify account, no API keys, no extra bills.',
    spots: '7 of 10 spots left', perYear: '/ year',
    founding: ['5 sources watched', '1,500 people analyzed / month', 'All 5 bonuses (€910 value)', 'CSV export, new leads daily'],
    standard: ['10 sources watched', '3,000 people analyzed / month', 'All 5 bonuses (€910 value)', 'CSV export, new leads daily'],
    faqTitle: 'Questions',
    faq: [
      { q: 'Who are the leads?', a: 'People who reacted to, commented on or reshared posts from the pages you choose to watch.' },
      { q: 'Will my LinkedIn get banned?', a: 'No. Your account is never used. We never log in as you.' },
      { q: 'What about GDPR?', a: 'EU servers, a data processing agreement, and you can delete everything anytime.' },
      { q: 'What if I hit my monthly limit?', a: 'Collection pauses until next month. Your leads stay where they are.' },
      { q: 'How does setup work?', a: 'A 20-minute call. We add your sources and tune the AI to your ideal client.' },
    ],
    finalTitle: "See who's already interested.",
    finalSub: 'Your first leads within 24 hours.',
    privacy: 'Privacy', terms: 'Terms',
  },
  ro: {
    navHow: 'Cum funcționează', navPricing: 'Prețuri', navLogin: 'Intră în cont', navSample: 'Mostră gratuită',
    badge: 'Pentru agenții B2B',
    h1: 'Publicul competitorilor tăi, punctat și gata de sunat.',
    sub: 'Urmărim cine apreciază, comentează și distribuie în nișa ta. AI-ul îți spune pe cine merită să suni și de ce.',
    inputLabel: 'Pagina de LinkedIn a unui competitor', cta: 'Primește mostra gratuită', cta2: 'Programează apelul de setup',
    ctaNote: 'Fără card. Fără apel. Primele leads în 24h.',
    previewLabel: 'Previzualizare produs', people: 'persoane', last7: 'ultimele 7 zile',
    tAll: 'Toți', tHot: 'Fierbinți 8+', tCom: 'Au comentat',
    example: 'Date de exemplu. Numele sunt inventate.',
    open: 'Deschide pe LinkedIn', scoreTitle: 'Scor AI', whyTitle: 'De ce se potrivește', activity: 'Activitate',
    tierHot: 'Lead fierbinte — scrie-i azi', tierWarm: 'Lead cald — merită un mesaj', tierCold: 'Rece — de urmărit',
    stNew: 'Nou', stDone: 'Contactat', score: 'Scor',
    verbs: { c: 'A comentat', l: 'A apreciat', s: 'A distribuit' },
    cmpTitle: 'Nu mai suna străini.',
    cmpSub: 'Listele cumpărate sunt reci. Oamenii care interacționează acum în nișa ta nu sunt.',
    coldTitle: 'Liste cumpărate',
    coldItems: ['Oameni care n-au auzit niciodată de tine', 'Aceeași listă pe care au cumpărat-o și competitorii', 'Ore de documentare înainte de fiecare mesaj', 'Date care se învechesc în câteva săptămâni'],
    warmItems: ['Oameni care tocmai au interacționat în nișa ta', 'O listă nouă în fiecare dimineață', 'Fiecare lead cu scor și motiv', 'Zero documentare. Doar scrie-le'],
    howTitle: 'Adaugi o pagină o dată. Leads noi în fiecare dimineață.',
    watching: 'Urmărite', p312: '312 persoane', p188: '188 persoane', p97: '97 persoane',
    s1t: '1. Alegi pe cine urmărim', s1d: 'Competitorii, pagina ta, vocile din nișa ta.',
    postQuote: '„Cold outreach-ul a murit. Uite ce facem în schimb →”',
    reactions: 'Reacții', comments: 'Comentarii', reshares: 'Distribuiri',
    s2t: '2. Colectăm fiecare semnal', s2d: 'Fiecare postare nouă, fiecare om care a interacționat cu ea.',
    mayaReason: 'Conduce o agenție de 12 oameni și a întrebat ce unelte de outbound chiar funcționează.',
    s3t: '3. AI-ul dă scorul. Tu suni.', s3d: 'Un scor de la 1 la 10 și motivul, pentru fiecare persoană.',
    n275: '27,5', st1: 'reacții pe postare, în medie', st2: 'persoane noi găsite pe postare', st3: 'de la cont la primele leads', st4: 'logări în LinkedIn-ul tău',
    bonusTitle: 'Tot ce primești, la orice plan.',
    bonusSub: 'Configurat împreună cu tine, adaptat clientului tău ideal, livrat zilnic.',
    totalValue: 'Valoare totală', included: 'Inclus',
    bonuses: [
      { name: 'Competitor Audience Map', desc: 'Cine interacționează cu principalii tăi competitori', value: '€290' },
      { name: '20-Minute Launch Call', desc: 'Configurăm sursele împreună', value: '€150' },
      { name: 'ICP Sharpener', desc: 'Adaptăm AI-ul la clientul tău ideal', value: '€190' },
      { name: 'Warm DM Playbook', desc: 'Mesaje de deschidere care pornesc de la ce au apreciat', value: '€90' },
      { name: 'Daily Hot-Lead Digest', desc: 'Cele mai bune leads noi, în fiecare dimineață', value: '€190' },
    ],
    gTitle: 'The 50 Warm Leads Promise', gText: '[Condițiile garanției — de scris]',
    priceTitle: 'Un preț pe an. Totul inclus.',
    anchor: 'Mai ieftin decât o săptămână de muncă a unui SDR care caută leads de mână.',
    priceSub: 'Fără cont Apify, fără chei API, fără costuri în plus.',
    spots: '7 din 10 locuri rămase', perYear: '/ an',
    founding: ['5 surse urmărite', '1.500 persoane analizate / lună', 'Toate cele 5 bonusuri (valoare €910)', 'Export CSV, leads noi zilnic'],
    standard: ['10 surse urmărite', '3.000 persoane analizate / lună', 'Toate cele 5 bonusuri (valoare €910)', 'Export CSV, leads noi zilnic'],
    faqTitle: 'Întrebări',
    faq: [
      { q: 'Cine sunt leads-urile?', a: 'Oameni care au reacționat, au comentat sau au distribuit postări de pe paginile pe care alegi să le urmărești.' },
      { q: 'Îmi poate fi blocat contul de LinkedIn?', a: 'Nu. Contul tău nu e folosit niciodată. Nu ne logăm în locul tău.' },
      { q: 'Ce e cu GDPR?', a: 'Servere în UE, acord de prelucrare a datelor și poți șterge totul oricând.' },
      { q: 'Ce se întâmplă dacă ating limita lunară?', a: 'Colectarea se oprește până luna viitoare. Leads-urile rămân unde sunt.' },
      { q: 'Cum se face setup-ul?', a: 'Un apel de 20 de minute. Adăugăm sursele și adaptăm AI-ul la clientul tău ideal.' },
    ],
    finalTitle: 'Vezi cine e deja interesat.',
    finalSub: 'Primele leads în 24 de ore.',
    privacy: 'Confidențialitate', terms: 'Termeni',
  },
} as const;

const ago = (d: number, lang: Lang) => (lang === 'ro' ? (d === 1 ? 'acum o zi' : `acum ${d} zile`) : `${d}d ago`);

type Act = { k: Kind; d: number; label: L10n; quote?: L10n };
type Lead = { name: string; initials: string; role: string; city: string; score: number; done: boolean; why: L10n; acts: Act[] };

const POST: L10n = { en: T.en.postQuote, ro: T.ro.postQuote };

const LEADS: Lead[] = [
  { name: 'Maya Lindqvist', initials: 'ML', role: 'Founder · Northpeak Studio', city: 'Stockholm', score: 9, done: false,
    why: { en: 'Founder of a 12-person agency. She asked in public which outbound tools work for a team her size, so she is shopping right now.', ro: 'Fondatoarea unei agenții de 12 oameni. A întrebat public ce unelte de outbound merg pentru o echipă ca a ei, deci caută acum.' },
    acts: [
      { k: 'c', d: 2, label: { en: 'Commented on Brightwave’s post', ro: 'A comentat la o postare Brightwave' },
        quote: { en: '“We tried three outbound tools this year. None worked for a team our size. What do you use?”', ro: '„Am încercat trei unelte de outbound anul ăsta. Niciuna n-a mers pentru o echipă ca a noastră. Voi ce folosiți?”' } },
      { k: 'l', d: 5, label: { en: 'Liked 2 more posts from Brightwave', ro: 'A mai apreciat 2 postări Brightwave' } },
    ] },
  { name: 'Tomás Ferreira', initials: 'TF', role: 'Head of Growth · Brightlane', city: 'Lisbon', score: 8, done: false,
    why: { en: 'Owns the pipeline at a growing B2B firm and keeps coming back to lead-gen content.', ro: 'Răspunde de pipeline într-o firmă B2B în creștere și revine constant la conținut de lead-gen.' },
    acts: [{ k: 'l', d: 1, label: { en: 'Liked 3 posts from Ana · Growth', ro: 'A apreciat 3 postări de la Ana · Growth' }, quote: POST }] },
  { name: 'Priya Raman', initials: 'PR', role: 'Owner · Fold & Co', city: 'London', score: 8, done: true,
    why: { en: 'Owner of a small agency that is hiring for sales. She decides and she has a budget.', ro: 'Proprietara unei agenții mici care angajează oameni de vânzări. Ea decide și are buget.' },
    acts: [{ k: 's', d: 3, label: { en: 'Reshared a post from your page', ro: 'A distribuit o postare de pe pagina ta' },
      quote: { en: '“How we booked 40 calls from one LinkedIn post”', ro: '„Cum am obținut 40 de call-uri dintr-o singură postare”' } }] },
  { name: 'Daniel Okafor', initials: 'DO', role: 'Sales Director · Kestrel B2B', city: 'Amsterdam', score: 7, done: false,
    why: { en: 'Leads a sales team and described the exact problem you solve. Not the final decision maker.', ro: 'Conduce o echipă de vânzări și a descris exact problema pe care o rezolvi. Nu decide singur.' },
    acts: [
      { k: 'c', d: 1, label: { en: 'Commented on Kestrel Sales’ post', ro: 'A comentat la o postare Kestrel Sales' },
        quote: { en: '“This is exactly our problem. Our lead lists go stale in a week.”', ro: '„Exact asta e problema noastră. Listele de leads se învechesc într-o săptămână.”' } },
      { k: 'l', d: 6, label: { en: 'Liked a post from your page', ro: 'A apreciat o postare de pe pagina ta' } },
    ] },
  { name: 'Sofia Marchetti', initials: 'SM', role: 'Partner · Atelier Nove', city: 'Milan', score: 6, done: false,
    why: { en: 'Partner at a design agency. The interest is plausible, but it is unclear if she owns the budget.', ro: 'Partener într-o agenție de design. Interesul e plauzibil, dar nu e clar dacă ea are bugetul.' },
    acts: [{ k: 'l', d: 4, label: { en: 'Liked a post from Brightwave', ro: 'A apreciat o postare Brightwave' },
      quote: { en: '“5 signs your agency has outgrown referrals”', ro: '„5 semne că agenția ta a depășit recomandările”' } }] },
  { name: 'Lena Hartmann', initials: 'LH', role: 'Student · TU Berlin', city: 'Berlin', score: 3, done: false,
    why: { en: 'A student with no buying role yet. She stays in your list, ranked low.', ro: 'Studentă, fără rol de decizie încă. Rămâne în listă, cu scor mic.' },
    acts: [{ k: 'l', d: 5, label: { en: 'Liked a post from Ana · Growth', ro: 'A apreciat o postare Ana · Growth' }, quote: POST }] },
];

const scoreColor = (n: number) => (n >= 8 ? ACCENT : n >= 6 ? '#d97706' : '#a3a3a3');

/* ---------- icons ---------- */

function Mark({ size = 28, onDark = false, glow = true }: { size?: number; onDark?: boolean; glow?: boolean }) {
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

function ActIcon({ k }: { k: Kind }) {
  if (k === 'c') return <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 3.5h11v7h-6l-3 2.5v-2.5h-2z" fill="none" stroke="#404040" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
  if (k === 's') return <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6.5V5h8.5l-2-2M13 9.5V11H4.5l2 2" fill="none" stroke="#404040" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 7v6H2.5V7zM5 7l2.5-4.5c1 0 1.7.8 1.5 1.8L8.6 6.5h3.9c.9 0 1.5.8 1.3 1.7l-.9 3.6c-.2.7-.8 1.2-1.5 1.2H5" fill="none" stroke="#404040" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}

const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className={s.listIcon}><circle cx="10" cy="10" r="9" fill="#ececec" /><path d="M7 7l6 6M13 7l-6 6" stroke="#a3a3a3" strokeWidth="1.6" strokeLinecap="round" /></svg>
);
const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className={s.listIcon}><circle cx="10" cy="10" r="9" fill={ACCENT} /><path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function Segmented<V extends string>({ label, options, value, onChange, small }: {
  label: string; options: { id: V; label: string }[]; value: V; onChange: (v: V) => void; small?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className={small ? s.segSm : s.seg}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}
          className={`${small ? s.segBtnSm : s.segBtn} ${value === o.id ? s.segOn : ''}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- lead inbox ---------- */

function LeadInbox({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [filter, setFilter] = useState<Filter>('all');
  const [selName, setSelName] = useState(LEADS[0].name);

  const visible = LEADS.filter((l) =>
    filter === 'hot' ? l.score >= 8 : filter === 'commented' ? l.acts.some((a) => a.k === 'c') : true);
  const cur = visible.find((l) => l.name === selName) ?? visible[0];
  const tier = cur.score >= 8 ? t.tierHot : cur.score >= 6 ? t.tierWarm : t.tierCold;

  return (
    <div className={s.window}>
      <div className={s.winBar}>
        <div className={s.winMeta}>
          <span className={s.dots} aria-hidden="true"><span /><span /><span /></span>
          <span className={s.winTitle}>Leads</span>
          <span className={s.dim}>/</span>
          <span>{visible.length} {t.people}</span>
          <span className={s.dim}>·</span>
          <span>{t.last7}</span>
        </div>
        <Segmented label="Filter" value={filter} onChange={setFilter}
          options={[{ id: 'all', label: t.tAll }, { id: 'hot', label: t.tHot }, { id: 'commented', label: t.tCom }]} />
      </div>

      <div className={s.inbox}>
        <ul className={s.list}>
          {visible.map((l) => {
            const on = l === cur;
            const first = l.acts[0];
            return (
              <li key={l.name}>
                <button type="button" aria-pressed={on} onClick={() => setSelName(l.name)}
                  className={`${s.row} ${on ? s.rowOn : ''}`}>
                  <span className={s.mono}>{l.initials}</span>
                  <span className={s.rowText}>
                    <span className={s.rowName}>{l.name}</span>
                    <span className={s.rowRole}>{l.role}</span>
                    <span className={s.rowSig}>{t.verbs[first.k]} · {ago(first.d, lang)}</span>
                  </span>
                  <span className={s.rowScore}>
                    <span className={s.scoreDot} style={{ background: scoreColor(l.score) }} />
                    {l.score}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className={s.detail} aria-live="polite">
          <div className={s.dHead}>
            <span className={s.monoLg}>{cur.initials}</span>
            <div className={s.dWho}>
              <span className={s.dName}>{cur.name}</span>
              <span className={s.dRole}>{cur.role}</span>
              <span className={s.dCity}>{cur.city}</span>
            </div>
            <div className={s.dActions}>
              <span className={`${s.status} ${cur.done ? s.statusDone : s.statusNew}`}>{cur.done ? t.stDone : t.stNew}</span>
              <a href={LINKS.linkedin} className={s.btnSmall}>
                {t.open}
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2h6v6M10 2 3 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>

          <div className={s.scoreBox}>
            <div className={s.scoreLeft}>
              <span className={s.label}>{t.scoreTitle}</span>
              <span className={s.scoreBig}>{cur.score}<span>/10</span></span>
            </div>
            <div className={s.scoreRight}>
              <span className={s.tier} style={{ color: scoreColor(cur.score) }}>{tier}</span>
              <div role="img" aria-label={`${t.score} ${cur.score}/10`} className={s.track}>
                <div className={s.fill} style={{ width: `${cur.score * 10}%`, background: scoreColor(cur.score) }} />
              </div>
            </div>
          </div>

          <div className={s.dSection}>
            <span className={s.kicker}>{t.whyTitle}</span>
            <p className={s.dWhy}>{cur.why[lang]}</p>
          </div>

          <div className={s.dSection}>
            <span className={s.kicker}>{t.activity}</span>
            {cur.acts.map((a, i) => (
              <div key={i} className={s.act}>
                <span className={s.actIcon}><ActIcon k={a.k} /></span>
                <div className={s.actBody}>
                  <div className={s.actLine}><span className={s.actLabel}>{a.label[lang]}</span><span className={s.actAgo}>{ago(a.d, lang)}</span></div>
                  {a.quote && <p className={s.actQuote}>{a.quote[lang]}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function Landing() {
  const [lang, setLang] = useState<Lang>('en');
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

  return (
    <div className={s.page}>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <a href="#top" className={s.brand}><Mark /><span className={s.brandName}>glowlist</span></a>
          <nav aria-label="Main" className={s.nav}>
            <a href="#how" className={s.navLink}>{t.navHow}</a>
            <a href="#pricing" className={s.navLink}>{t.navPricing}</a>
            <a href={LINKS.login} className={s.navLink}>{t.navLogin}</a>
            <Segmented label="Language" small value={lang} onChange={setLang}
              options={[{ id: 'en', label: 'EN' }, { id: 'ro', label: 'RO' }]} />
            <a href={LINKS.sample} className={s.btnDark}>{t.navSample}</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* hero */}
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

        {/* product */}
        <section aria-label={t.previewLabel} className={`${s.wrap} ${s.preview}`}>
          <LeadInbox lang={lang} />
          <p className={s.example}>{t.example}</p>
        </section>

        {/* compare */}
        <section aria-labelledby="cmp" className={s.bordered}>
          <div className={`${s.wrap} ${s.section}`}>
            <div className={s.intro}>
              <h2 id="cmp" className={s.h2}>{t.cmpTitle}</h2>
              <p className={s.lead2}>{t.cmpSub}</p>
            </div>
            <div className={s.cmpGrid}>
              <div className={s.cmpCold}>
                <span className={s.cmpHead}>{t.coldTitle}</span>
                <ul className={s.checkList}>{t.coldItems.map((x) => <li key={x}><Cross />{x}</li>)}</ul>
              </div>
              <div className={s.cmpWarm}>
                <span className={s.cmpHeadWarm}><Mark size={20} onDark glow={false} />Glowlist</span>
                <ul className={s.checkList}>{t.warmItems.map((x) => <li key={x}><Check />{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* how */}
        <section id="how" aria-labelledby="how-title" className={`${s.bordered} ${s.grey}`}>
          <div className={`${s.wrap} ${s.section}`}>
            <h2 id="how-title" className={s.h2} style={{ maxWidth: 680 }}>{t.howTitle}</h2>
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
                        <div className={s.barTrack}><div className={s.barFill} style={{ width: b.w }} /></div>
                        <span className={s.barNum}>{b.n}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div><h3 className={s.stepTitle}>{t.s2t}</h3><p className={s.stepText}>{t.s2d}</p></div>
              </div>

              <div className={s.step}>
                <div className={`${s.panel} ${s.panelPad}`}>
                  <div className={s.miniTop}>
                    <span className={s.monoSm}>ML</span>
                    <div className={s.miniWho}><span className={s.miniName}>Maya Lindqvist</span><span className={s.miniRole}>Founder · Northpeak Studio</span></div>
                    <span className={s.miniScore}>9<span>/10</span></span>
                  </div>
                  <div className={s.miniTrack}><div style={{ width: '90%', background: ACCENT }} /></div>
                  <p className={s.miniWhy}>{t.mayaReason}</p>
                </div>
                <div><h3 className={s.stepTitle}>{t.s3t}</h3><p className={s.stepText}>{t.s3d}</p></div>
              </div>
            </div>

            <div className={s.stats}>
              {[{ n: t.n275, l: t.st1 }, { n: '~23', l: t.st2 }, { n: '24h', l: t.st3 }, { n: '0', l: t.st4 }].map((x) => (
                <div key={x.l}><div className={s.statNum}>{x.n}</div><div className={s.statLabel}>{x.l}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* bonuses */}
        <section aria-labelledby="bonus-title" className={s.bordered}>
          <div className={`${s.wrap} ${s.section} ${s.bonusWrap}`}>
            <div className={s.bonusIntro}>
              <h2 id="bonus-title" className={s.h2}>{t.bonusTitle}</h2>
              <p className={s.lead2}>{t.bonusSub}</p>
            </div>
            <div className={s.receipt}>
              {t.bonuses.map((b) => (
                <div key={b.name} className={s.bRow}>
                  <div className={s.bText}><span className={s.bName}>{b.name}</span><span className={s.bDesc}>{b.desc}</span></div>
                  <span className={s.bValue}>{b.value}</span>
                </div>
              ))}
              <div className={s.bTotal}>
                <span>{t.totalValue} <s>€910</s></span>
                <span className={s.bIncluded}>{t.included}</span>
              </div>
            </div>
          </div>
        </section>

        {/* guarantee */}
        <section aria-labelledby="g-title" className={s.gOuter}>
          <div className={s.guarantee}>
            <div className={s.gNum}>50</div>
            <div className={s.gText}>
              <h2 id="g-title" className={s.gTitle}>{t.gTitle}</h2>
              <p>{t.gText}</p>
            </div>
          </div>
        </section>

        {/* pricing */}
        <section id="pricing" aria-labelledby="pricing-title">
          <div className={`${s.wrap} ${s.section} ${s.pricing}`}>
            <div className={s.center}>
              <h2 id="pricing-title" className={s.h2}>{t.priceTitle}</h2>
              <p className={s.lead2}>{t.anchor}</p>
            </div>
            <div className={s.plans}>
              <div className={`${s.plan} ${s.planFeatured}`}>
                <div className={s.planHead}><h3 className={s.planName}>Founding</h3><span className={s.spots}>{t.spots}</span></div>
                <div className={s.price}><span className={s.priceNum}>€490</span><span className={s.priceOld}>€990</span><span className={s.per}>{t.perYear}</span></div>
                <ul className={s.features}>{t.founding.map((x) => <li key={x}>{x}</li>)}</ul>
                <a href={LINKS.sample} className={s.btnAccentBlock}>{t.cta}</a>
              </div>
              <div className={s.plan}>
                <div className={s.planHead}><h3 className={s.planName}>Standard</h3></div>
                <div className={s.price}><span className={s.priceNum}>€990</span><span className={s.per}>{t.perYear}</span></div>
                <ul className={s.features}>{t.standard.map((x) => <li key={x}>{x}</li>)}</ul>
                <a href={LINKS.sample} className={s.btnOutline}>{t.cta}</a>
              </div>
            </div>
            <p className={s.priceSub}>{t.priceSub}</p>
          </div>
        </section>

        {/* faq */}
        <section aria-labelledby="faq-title" className={s.bordered}>
          <div className={`${s.wrap} ${s.section} ${s.faqWrap}`}>
            <h2 id="faq-title" className={`${s.h2} ${s.faqTitle}`}>{t.faqTitle}</h2>
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

        {/* final */}
        <section aria-labelledby="cta" className={s.final}>
          <div className={`${s.wrap} ${s.finalIn}`}>
            <h2 id="cta" className={s.finalTitle}>{t.finalTitle}</h2>
            <p className={s.finalSub}>{t.finalSub}</p>
            <div className={s.finalBtns}>
              <a href={LINKS.sample} className={s.btnAccentInline}>{t.cta}</a>
              <a href={LINKS.book} className={s.btnGhostDark}>{t.cta2}</a>
            </div>
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
