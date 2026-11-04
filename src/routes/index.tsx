import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Calendar, Clock, MapPin, Users, Menu, X, Instagram, User } from "lucide-react";
import { EVENT_START_ISO, MAPS_URL, WHATSAPP_NUMBER, SPEAKER_PHOTO, SOCIAL } from "@/config/event";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ALIVE IN (AI) — Christmas Youth Service | GPPS Agape Watugolong" },
      { name: "description", content: "Christmas Youth Service 2026 at GPPS Agape Watugolong. Saturday, 12 December 2026, 18:00 WIB. Rooted in Him. Built up in Him. Alive in Him." },
      { property: "og:title", content: "ALIVE IN (AI) — Christmas Youth Service 2026" },
      { property: "og:description", content: "Join us Saturday, 12 December 2026, 18:00 WIB at GPPS Agape Watugolong. Colossians 2:7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Lang = "en" | "id";

const COPY = {
  en: {
    nav: [
      { id: "home", label: "Home" },
      { id: "theme", label: "Theme" },
      { id: "event", label: "Event" },
      { id: "rsvp", label: "RSVP" },
    ],
    badge: "GPPS AGAPE WATUGOLONG PRESENTS",
    eyebrow: "CHRISTMAS YOUTH SERVICE",
    tagline: "Rooted in Him. Built up in Him. Alive in Him.",
    verse: "COLOSSIANS 2:7",
    cta1: "COUNT ME IN",
    cta2: "EXPLORE EVENT",
    countdownTitle: "THE COUNTDOWN BEGINS",
    units: ["Days", "Hours", "Minutes", "Seconds"],
    themeEyebrow: "OUR THEME",
    verseBadge: "COLOSSIANS 2:6–7",
    quote: "Rooted in Him. Built up in Him. Alive in Him.",
    themeBody:
      "This Christmas, we celebrate the life Jesus brings. Just as we received Christ, we are called to keep walking in Him — growing deeper in faith, standing firm, and overflowing with thankfulness.",
    speakerEyebrow: "OUR GUEST SPEAKER",
    speakerSoon: "Speaker photo coming soon",
    detailsEyebrow: "EVENT DETAILS",
    detailsTitle: "ALIVE IN (AI) — CHRISTMAS YOUTH SERVICE",
    labels: { date: "Date", time: "Time", venue: "Venue", audience: "For" },
    values: {
      date: "Saturday, 12 December 2026",
      time: "18:00 WIB",
      venue: "GPPS Agape Watugolong",
      audience: "Teenagers & Youth (SMP–SMA)",
    },
    openMaps: "OPEN MAPS",
    rsvpTitleA: "SAVE YOUR ",
    rsvpTitleB: "SEAT",
    rsvpDesc: "Fill in your name and we'll prepare a WhatsApp message for you to send.",
    fullName: "FULL NAME",
    fullNamePh: "Your full name",
    church: "CHURCH / COMMUNITY",
    churchPh: "Optional",
    attendLabel: "WILL YOU ATTEND?",
    attendYes: "I'll be there",
    attendNo: "Can't make it",
    thanksNo: "Thanks for letting us know. We hope to see you next time!",
    confirm: "CONFIRM VIA WHATSAPP",
    rsvpNote: "Your RSVP is complete once you press send in WhatsApp.",
    errName: "Please enter your full name.",
    thanksTitle: "THANK YOU",
    thanksBody: "WhatsApp has opened with your message — press send there to complete your RSVP.",
    edit: "EDIT RESPONSE",
    madeWith: "Made with joy for Christmas 2026",
  },
  id: {
    nav: [
      { id: "home", label: "Beranda" },
      { id: "theme", label: "Tema" },
      { id: "event", label: "Acara" },
      { id: "rsvp", label: "RSVP" },
    ],
    badge: "GPPS AGAPE WATUGOLONG MEMPERSEMBAHKAN",
    eyebrow: "IBADAH REMAJA NATAL",
    tagline: "Berakar di dalam Dia. Dibangun di dalam Dia. Hidup di dalam Dia.",
    verse: "KOLOSSUS 2:7",
    cta1: "AKU IKUT",
    cta2: "LIHAT ACARA",
    countdownTitle: "HITUNG MUNDUR DIMULAI",
    units: ["Hari", "Jam", "Menit", "Detik"],
    themeEyebrow: "TEMA KAMI",
    verseBadge: "KOLOSSUS 2:6–7",
    quote: "Berakar di dalam Dia. Dibangun di dalam Dia. Hidup di dalam Dia.",
    themeBody:
      "Natal ini, kita merayakan hidup yang Yesus bawa. Seperti kita telah menerima Kristus, kita dipanggil untuk terus berjalan di dalam Dia — bertumbuh makin dalam dalam iman, teguh berdiri, dan melimpah dalam syukur.",
    speakerEyebrow: "PEMBICARA TAMU",
    speakerSoon: "Foto pembicara segera hadir",
    detailsEyebrow: "DETAIL ACARA",
    detailsTitle: "ALIVE IN (AI) — IBADAH REMAJA NATAL",
    labels: { date: "Tanggal", time: "Waktu", venue: "Lokasi", audience: "Untuk" },
    values: {
      date: "Sabtu, 12 Desember 2026",
      time: "18:00 WIB",
      venue: "GPPS Agape Watugolong",
      audience: "Pemuda & Remaja",
    },
    openMaps: "BUKA PETA",
    rsvpTitleA: "AMANKAN ",
    rsvpTitleB: "TEMPATMU",
    rsvpDesc: "Isi namamu dan kami siapkan pesan WhatsApp untuk kamu kirim.",
    fullName: "NAMA LENGKAP",
    fullNamePh: "Nama lengkapmu",
    church: "GEREJA / KOMUNITAS",
    churchPh: "Opsional",
    attendLabel: "KEHADIRAN",
    attendYes: "Aku hadir",
    attendNo: "Tidak bisa hadir",
    thanksNo: "Terima kasih sudah memberi kabar. Semoga kita bisa bertemu di lain waktu!",
    confirm: "KONFIRMASI VIA WHATSAPP",
    rsvpNote: "RSVP-mu selesai setelah kamu tekan kirim di WhatsApp.",
    errName: "Mohon isi nama lengkapmu.",
    thanksTitle: "TERIMA KASIH",
    thanksBody: "WhatsApp sudah terbuka dengan pesanmu — tekan kirim di sana untuk menyelesaikan RSVP.",
    edit: "UBAH JAWABAN",
    madeWith: "Dibuat dengan sukacita untuk Natal 2026",
  },
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  const [lang, setLang] = useState<Lang>("id");
  useReveal();
  const t = COPY[lang];
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} />
        <Theme t={t} />
        <Speaker t={t} />
        <Details t={t} />
        <Rsvp t={t} lang={lang} />
      </main>
      <Footer t={t} />
    </div>
  );
}

/* ---------- Decorations ---------- */

function Ornament({ x, len, kind, c, delay }: { x: number; len: number; kind: "ball" | "bell"; c: string; delay: string }) {
  return (
    <g className="animate-sway" style={{ transformOrigin: `${x}px 0px`, animationDelay: delay }}>
      <line x1={x} y1={0} x2={x} y2={len - 6} stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
      {kind === "ball" ? (
        <>
          <rect x={x - 3.5} y={len - 6} width={7} height={7} rx={1.5} fill="#ffffff" opacity="0.75" />
          <circle cx={x} cy={len + 14} r={15} fill={c} />
          <circle cx={x - 5} cy={len + 9} r={4} fill="#ffffff" opacity="0.45" />
        </>
      ) : (
        <>
          <path d={`M${x - 14},${len + 20} c0,-24 28,-24 28,0 l4,5 h-36 z`} fill={c} />
          <circle cx={x} cy={len + 29} r={2.5} fill="#ffffff" opacity="0.8" />
          <rect x={x - 3.5} y={len - 6} width={7} height={6} rx={1.5} fill="#ffffff" opacity="0.75" />
        </>
      )}
    </g>
  );
}

function Garland() {
  const hangs: { x: number; len: number; kind: "ball" | "bell"; c: string }[] = [
    { x: 95, len: 118, kind: "bell", c: "var(--sun)" },
    { x: 255, len: 66, kind: "ball", c: "var(--mint)" },
    { x: 400, len: 148, kind: "ball", c: "var(--sun)" },
    { x: 550, len: 58, kind: "ball", c: "var(--blush)" },
    { x: 890, len: 62, kind: "ball", c: "var(--mint)" },
    { x: 1045, len: 138, kind: "bell", c: "var(--sun)" },
    { x: 1190, len: 74, kind: "ball", c: "var(--blush)" },
    { x: 1345, len: 116, kind: "ball", c: "var(--sun)" },
  ];
  const stars: { x: number; y: number }[] = [
    { x: 170, y: 190 }, { x: 480, y: 150 }, { x: 700, y: 190 }, { x: 960, y: 150 },
    { x: 1120, y: 200 }, { x: 300, y: 170 }, { x: 1260, y: 160 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 1440 240" preserveAspectRatio="xMidYMin meet" className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full">
      <path d="M-10,34 Q140,150 300,58" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="60" cy="96" r="5" fill="var(--mint)" />
      <circle cx="130" cy="122" r="5" fill="#ffffff" opacity="0.85" />
      <circle cx="205" cy="102" r="5" fill="var(--sun)" />
      <path d="M1450,34 Q1300,150 1140,58" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="1380" cy="96" r="5" fill="var(--blush)" />
      <circle cx="1310" cy="122" r="5" fill="#ffffff" opacity="0.85" />
      <circle cx="1235" cy="102" r="5" fill="var(--mint)" />
      {hangs.map((h, i) => (
        <Ornament key={i} x={h.x} len={h.len} kind={h.kind} c={h.c} delay={`${i * 0.7}s`} />
      ))}
      {stars.map((s, i) => (
        <g key={i} className="animate-twinkle" style={{ animationDelay: `${i * 0.45}s` }}>
          <path d={`M${s.x - 5},${s.y} h10 M${s.x},${s.y - 5} v10`} stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function Gift({ body, ribbon }: { body: string; ribbon: string }) {
  return (
    <svg width="72" height="66" viewBox="0 0 72 66" aria-hidden>
      <rect x="8" y="22" width="56" height="40" rx="7" fill={body} />
      <rect x="30" y="22" width="12" height="40" fill={ribbon} />
      <rect x="4" y="14" width="64" height="12" rx="6" fill={body} />
      <rect x="28" y="14" width="16" height="12" fill={ribbon} />
      <path d="M36,14 C28,2 16,4 20,12 C22,16 30,15 36,14 Z" fill={ribbon} />
      <path d="M36,14 C44,2 56,4 52,12 C50,16 42,15 36,14 Z" fill={ribbon} />
    </svg>
  );
}

function Wave() {
  return (
    <svg aria-hidden viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-[60px] w-full text-cream md:h-[100px]">
      <path fill="currentColor" d="M0,70 C260,116 520,112 760,84 C1000,56 1220,44 1440,68 L1440,110 L0,110 Z" />
    </svg>
  );
}

/* ---------- Navbar ---------- */

function Navbar({ t, lang, setLang }: { t: (typeof COPY)["en"]; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled || open ? "bg-cream/95 shadow-sm backdrop-blur" : "bg-cream"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <a href="#home" className="font-display text-sm font-extrabold tracking-wide text-ink">
          GPPS <span className="text-red">AGAPE</span> WATUGOLONG
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-7">
            {t.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-sm font-semibold text-ink transition-colors hover:text-red">{n.label}</a>
              </li>
            ))}
          </ul>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="flex flex-col gap-1 px-5 pb-5 md:hidden">
          {t.nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block py-3 text-sm font-semibold text-ink hover:text-red">{n.label}</a>
            </li>
          ))}
          <li className="pt-2">
            <LangToggle lang={lang} setLang={setLang} />
          </li>
        </ul>
      )}
    </header>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-full bg-white p-1 card-soft">
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-7 w-9 rounded-full text-[11px] font-bold tracking-wide uppercase transition-colors ${lang === l ? "bg-red text-white" : "text-ink hover:text-red"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ---------- Countdown ---------- */

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    done: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function Countdown({ t }: { t: (typeof COPY)["en"] }) {
  const target = new Date(EVENT_START_ISO).getTime();
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(null);
  useEffect(() => {
    setTime(getRemaining(target));
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const values = [time?.d, time?.h, time?.m, time?.s];
  return (
    <div className="relative z-10 px-5 pt-16">
      <p className="text-center text-xs font-bold tracking-[0.3em] text-white uppercase">{t.countdownTitle}</p>
      {time?.done ? (
        <p className="mx-auto mt-8 max-w-2xl text-center font-display text-3xl font-black tracking-wide text-white sm:text-5xl">ALLELUIA!</p>
      ) : (
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-4 gap-2 sm:gap-5" role="timer" aria-live="off">
          {t.units.map((label, i) => (
            <div key={label} className="card-soft relative rounded-2xl bg-white px-1 py-5 sm:py-7">
              <span className="absolute inset-x-3 top-0 h-1.5 rounded-b-full bg-mint" />
              <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-sun" />
              <span key={values[i] ?? "x"} className="animate-in fade-in block text-center font-display text-3xl font-extrabold tabular-nums text-red duration-500 sm:text-5xl">
                {values[i] === undefined ? "--" : String(values[i]).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-center text-[9px] font-semibold tracking-widest text-muted-foreground uppercase sm:text-[11px]">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Sections ---------- */

function Hero({ t }: { t: (typeof COPY)["en"] }) {
  return (
    <section id="home" className="relative overflow-hidden bg-red text-white">
      <Garland />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-44 pb-4 text-center md:pt-48">
        <p className="animate-fade-up mx-auto inline-block rounded-full border border-white/40 px-5 py-2 text-[10px] font-semibold tracking-[0.25em] text-white/90 uppercase">
          {t.badge}
        </p>
        <p className="animate-fade-up mt-7 text-sm font-bold tracking-[0.35em] text-sun uppercase sm:text-base" style={{ animationDelay: ".1s" }}>
          {t.eyebrow}
        </p>
        <h1 className="animate-fade-up mt-3 font-display text-7xl leading-none font-black tracking-tight sm:text-8xl md:text-9xl" style={{ animationDelay: ".2s" }}>
          ALIVE IN
          <span className="mt-1 block font-display text-6xl font-black text-blush sm:text-7xl md:text-8xl">(AI)</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl font-serif text-2xl italic sm:text-3xl" style={{ animationDelay: ".3s" }}>
          {t.tagline}
        </p>
        <p className="animate-fade-up mt-4 text-[10px] font-semibold tracking-[0.3em] text-white/80 uppercase" style={{ animationDelay: ".4s" }}>
          {t.verse}
        </p>
        <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: ".5s" }}>
          <a href="#rsvp" className="w-full rounded-full bg-white px-8 py-4 text-xs font-bold tracking-widest text-red uppercase transition hover:-translate-y-0.5 hover:shadow-lg sm:w-auto">
            {t.cta1}
          </a>
          <a href="#event" className="w-full rounded-full border-2 border-white/80 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto">
            {t.cta2}
          </a>
        </div>
      </div>
      <Countdown t={t} />
      <div aria-hidden className="pointer-events-none absolute bottom-16 left-4 hidden md:block">
        <Gift body="var(--mint)" ribbon="#ffffff" />
        <div className="mt-2 ml-10"><Gift body="var(--sun)" ribbon="#ffffff" /></div>
      </div>
      <div aria-hidden className="pointer-events-none absolute right-6 bottom-24 hidden md:block">
        <Gift body="var(--blush)" ribbon="#ffffff" />
      </div>
      <div className="relative z-10 mt-14">
        <Wave />
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, tone = "dark" }: { eyebrow: string; title: ReactNode; tone?: "dark" | "red" }) {
  return (
    <div className="text-center">
      <p className={`text-xs font-bold tracking-[0.3em] uppercase ${tone === "red" ? "text-red" : "text-ink"}`}>{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-5xl">{title}</h2>
    </div>
  );
}

function Theme({ t }: { t: (typeof COPY)["en"] }) {
  return (
    <section id="theme" className="relative scroll-mt-20 overflow-hidden px-5 py-20 md:py-24">
      <div aria-hidden className="absolute -top-6 -left-16 h-44 w-44 rounded-full bg-blush/60" />
      <div aria-hidden className="absolute top-72 -right-20 h-52 w-52 rounded-full bg-mint/50" />
      <div className="reveal relative mx-auto max-w-3xl">
        <SectionHead
          eyebrow={t.themeEyebrow}
          title={
            <>
              ALIVE IN <span className="text-red">CHRIST</span>
            </>
          }
        />
        <p className="mt-4 flex items-center justify-center gap-2 text-xs font-bold tracking-[0.25em] text-red uppercase">
          <span aria-hidden>✦</span> {t.verseBadge} <span aria-hidden>✦</span>
        </p>
        <blockquote className="card-soft mx-auto mt-10 max-w-2xl rounded-3xl px-8 py-9 text-center font-serif text-2xl text-ink italic sm:text-3xl">
          {t.quote}
        </blockquote>
        <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-muted-foreground">{t.themeBody}</p>
      </div>
    </section>
  );
}

function Speaker({ t }: { t: (typeof COPY)["en"] }) {
  return (
    <section className="px-5 pb-20 md:pb-24">
      <div className="reveal card-soft mx-auto max-w-lg rounded-3xl bg-white px-8 py-10 text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-red uppercase">{t.speakerEyebrow}</p>
        <div className="mx-auto mt-8 h-44 w-44">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-mint bg-blush/50">
            {SPEAKER_PHOTO ? (
              <img src={SPEAKER_PHOTO} alt="Ps. Jefree S. Laksono " className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <User className="h-16 w-16" strokeWidth={1.5} />
                <span className="mt-2 text-[10px] font-semibold tracking-wider uppercase">{t.speakerSoon}</span>
              </div>
            )}
          </div>
        </div>
        <p className="mt-8 font-display text-xl font-extrabold tracking-wide text-ink sm:text-2xl">
  PS. JEFREE S. LAKSONO
  <br />
  (GBI PPWM Malang)
</p>
      </div>
    </section>
  );
}

function Details({ t }: { t: (typeof COPY)["en"] }) {
  const items = [
    { icon: Calendar, circle: "bg-mint/60", label: t.labels.date, value: t.values.date },
    { icon: Clock, circle: "bg-sun/60", label: t.labels.time, value: t.values.time },
    { icon: MapPin, circle: "bg-blush/70", label: t.labels.venue, value: t.values.venue },
    { icon: Users, circle: "bg-mint/60", label: t.labels.audience, value: t.values.audience },
  ];
  return (
    <section id="event" className="scroll-mt-20 px-5 py-16 md:py-20">
      <div className="reveal mx-auto max-w-4xl">
        <SectionHead tone="red" eyebrow={t.detailsEyebrow} title={t.detailsTitle} />
        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, circle, label, value }) => (
            <div key={label} className="card-soft flex items-center gap-4 rounded-2xl bg-white p-5">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${circle} text-ink`}>
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
                <p className="mt-0.5 font-semibold text-ink">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red px-9 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-red/25 transition hover:-translate-y-0.5"
          >
            <MapPin className="h-4 w-4" /> {t.openMaps}
          </a>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.297.347-.495.116-.198.058-.371-.058-.52-.116-.148-.522-1.281-1.131-2.78-.492-1.182-.99-1.207-1.35-1.23-.349-.023-.748-.023-1.146-.023-.398 0-1.043.149-1.589.745-.546.595-2.085 2.037-2.085 4.964 0 2.927 2.135 5.758 2.432 6.057.297.297 4.213 6.433 10.205 4.517 4.213-1.35 4.682-2.984 4.926-3.529.244-.546.492-1.453.546-1.731.055-.279.093-.621-.116-.98-.174-.322-.664-.497-1.045-.67Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.77a5.76 5.76 0 0 0-.78-.05 5.66 5.66 0 1 0 5.66 5.66V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.22-1.48Z" />
    </svg>
  );
}

function Rsvp({ t, lang }: { t: (typeof COPY)["en"]; lang: Lang }) {
  const [name, setName] = useState("");
  const [church, setChurch] = useState("");
  const [attend, setAttend] = useState<"yes" | "no">("yes");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setErr(t.errName);
    setErr("");
    const status =
      lang === "id"
        ? attend === "yes" ? "Hadir" : "Tidak hadir"
        : attend === "yes" ? "I'll be there" : "Can't make it";
    const msg =
      lang === "id"
        ? `Halo! RSVP Ibadah Remaja Natal ALIVE IN (AI)\nNama: ${name.trim()}\nGereja/Komunitas: ${church.trim() || "-"}\nKehadiran: ${status}`
        : `Hi! RSVP for Christmas Youth Service ALIVE IN (AI)\nName: ${name.trim()}\nChurch/Community: ${church.trim() || "-"}\nAttendance: ${status}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setSent(true);
  };
  const field = "w-full rounded-xl border border-input bg-cream/60 px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/60 focus:border-red focus:outline-none";
  const label = "mb-2 block text-xs font-bold tracking-wider text-ink uppercase";
  return (
    <section id="rsvp" className="scroll-mt-20 px-5 pt-10 pb-20 md:pb-24">
      <div className="reveal card-soft mx-auto max-w-xl rounded-3xl bg-white p-7 sm:p-10">
        {sent ? (
          <div className="text-center" role="status">
            <h2 className="font-display text-3xl font-black text-ink">
              {t.thanksTitle}, <span className="text-red">{name.trim().toUpperCase()}</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              {attend === "yes" ? t.thanksBody : t.thanksNo}
            </p>
            <button onClick={() => setSent(false)} className="mt-6 text-xs font-bold tracking-wider text-red uppercase underline-offset-4 hover:underline">
              {t.edit}
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center font-display text-3xl font-black text-ink sm:text-4xl">
              {t.rsvpTitleA}<span className="text-red">{t.rsvpTitleB}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm text-muted-foreground">{t.rsvpDesc}</p>
            <form onSubmit={submit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className={label}>
                  {t.fullName} <span className="text-red">*</span>
                </label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className={field} placeholder={t.fullNamePh} />
              </div>
              <div>
                <label htmlFor="church" className={label}>{t.church}</label>
                <input id="church" value={church} onChange={(e) => setChurch(e.target.value)} maxLength={100} className={field} placeholder={t.churchPh} />
              </div>
              <div>
                <span className={label}>{t.attendLabel}</span>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t.attendLabel}>
                  {([
                    { value: "yes", text: t.attendYes },
                    { value: "no", text: t.attendNo },
                  ] as const).map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={attend === o.value}
                      onClick={() => setAttend(o.value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        attend === o.value
                          ? "border-red bg-red text-white"
                          : "border-input bg-cream/60 text-ink hover:border-red"
                      }`}
                    >
                      {o.text}
                    </button>
                  ))}
                </div>
              </div>
              {err && <p className="text-sm text-destructive" role="alert">{err}</p>}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-red/25 transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" /> {t.confirm}
              </button>
              <p className="text-center text-sm text-muted-foreground">{t.rsvpNote}</p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function Footer({ t }: { t: (typeof COPY)["en"] }) {
  const socials = [
    { href: SOCIAL.instagram, icon: Instagram, label: "Instagram" },
    { href: SOCIAL.tiktok, icon: TikTokIcon, label: "TikTok" },
  ];
  return (
    <footer className="border-t border-border px-5 py-14 text-center">
      <p className="font-display text-2xl font-black text-ink">
        ALIVE IN <span className="text-red">(AI)</span>
      </p>
      <p className="mt-2 text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">GPPS AGAPE WATUGOLONG</p>
      <div className="mt-7 flex justify-center gap-3">
        {socials.map(({ href, icon: Icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="card-soft flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-colors hover:text-red">
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">{t.madeWith}</p>
    </footer>
  );
}
