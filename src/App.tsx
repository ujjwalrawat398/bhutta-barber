import { FormEvent, useEffect, useRef, useState } from "react";

// Customer bookings open a WhatsApp chat with this number (country code, no + or spaces).
const WHATSAPP_NUMBER = "447468899048";
// TODO: replace with the shop's real Instagram profile link, e.g. "https://www.instagram.com/yourhandle/"
const INSTAGRAM_URL = "https://www.instagram.com/";

type IconName =
  | "arrow-up-right"
  | "calendar"
  | "chevron-down"
  | "chevron-right"
  | "clock"
  | "close"
  | "cut"
  | "eye"
  | "instagram"
  | "location"
  | "menu"
  | "phone"
  | "star"
  | "whatsapp"
  | "scissors"
  | "spark";

const listingImages = [
  {
    src: "https://lh3.googleusercontent.com/sUu-1HJBJwJyE7NZxZ6GXms691jATP1870td0vyhRHQM-iaBnMRf8kTqtcUdmcqewVpRXmADGVi2ogyfu-aVk4KL4YA_uHYUCB1bB0Xu=w1600-rw",
    alt: "The Bhutta BarBer storefront and interior",
    label: "The room",
  },
  {
    src: "https://lh3.googleusercontent.com/x5nU2iVFeS72bVauxhO8E0xLELTsZslgKLn6vE3SPRW4E6vJ45S8J4fBBd4dKYC2QGm9nc7soL6HpKwtPUDuN2EUJXzG978SCBlFnHap=w800-rw",
    alt: "The Bhutta BarBer interior",
    label: "The detail",
  },
  {
    src: "https://lh3.googleusercontent.com/Ohrf3A3WJwldL8o9x5L-S9MHKxLqcbHocFKnHqxRKNXm9yafAmfpcPYbee3TYKVRCvmTBJKvKEqjizX55IPiemDmVPfzgMXc0CnKAbKV=w800-rw",
    alt: "The Bhutta BarBer chair and grooming station",
    label: "The chair",
  },
  {
    src: "https://lh3.googleusercontent.com/pG6Sj-PRi3QUjeoGGJtgJPJPnqMw6kvj8L0RgL3dGzTi3c6mHgcfQkxfc3GrBpdCpJQsAByCfbbYUzpf1y2DAinIwa3KsLfYDD1iHLPf=h800-rw",
    alt: "The Bhutta BarBer service space",
    label: "The craft",
  },
  {
    src: "https://lh3.googleusercontent.com/2OYPnaTyCueW8as9LMCmUwNHMRMZFgQ6AnXGY9QgigvBpL2PaEOBmfesUNh8RNHPm44EU_G6NJ4XFVQ8w14zfQD__k8OfiASX0pFsfEc=h800-rw",
    alt: "The Bhutta BarBer salon detail",
    label: "The finish",
  },
  {
    src: "https://lh3.googleusercontent.com/5pNonJ1iK2bNznIWt77k6Ep3fGE5Q7ua-pgU0oG2shp4r60sWZYyghE914eacdj7daTzgEHWxqGqWm4GR1WOvgLXO7GheUWK3ndxXuvN=h800-rw",
    alt: "The Bhutta BarBer barbershop",
    label: "The welcome",
  },
];

const wigImages = [
  "https://images.pexels.com/photos/6923351/pexels-photo-6923351.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "https://images.pexels.com/photos/18614263/pexels-photo-18614263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
];

const barberServices = [
  { name: "Signature cut", detail: "Consultation, cut and finish" },
  { name: "Skin fade", detail: "A clean, graduated finish" },
  { name: "Beard sculpt", detail: "Shape, line-up and hot towel" },
  { name: "Cut and beard", detail: "The full Bhutta finish" },
];

const wigServices = [
  { name: "Private consultation", detail: "A calm, one-to-one fitting appointment" },
  { name: "Custom fitting", detail: "Secure, natural and made for you" },
  { name: "Wig styling", detail: "Cut, shape and finish your piece" },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow-up-right":
      return <svg {...common}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M16 2.5v4M8 2.5v4M3 9.5h18" /></svg>;
    case "chevron-down":
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case "chevron-right":
      return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "cut":
      return <svg {...common}><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="6.5" cy="17.5" r="2.5" /><path d="m8.7 8.7 10 10M8.7 15.3l10-10" /></svg>;
    case "eye":
      return <svg {...common}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
    case "instagram":
      return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
    case "location":
      return <svg {...common}><path d="M19 10.2c0 5-7 10.3-7 10.3S5 15.2 5 10.2a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "phone":
      return <svg {...common}><path d="M6.7 3.5 9.5 6 8 9.2c1.1 2.4 2.4 3.7 4.8 4.8l3.2-1.5 2.5 2.8c.4.5.4 1.2-.1 1.6l-1.7 1.5c-.5.4-1.2.6-1.8.4-6.1-1.8-10.3-6-12.1-12.1-.2-.6 0-1.3.4-1.8l1.5-1.7c.4-.5 1.1-.5 1.6-.1Z" /></svg>;
    case "scissors":
      return <svg {...common}><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="6.5" cy="17.5" r="2.5" /><path d="M8.7 8.7 20 20M8.7 15.3 20 4" /></svg>;
    case "spark":
      return <svg {...common}><path d="m12 2 1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4L12 2Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></svg>;
    case "whatsapp":
      return <svg {...common}><path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21Z" /><path d="M9 9.2c.3 2.3 2.4 4.4 4.7 4.7l1.2-1.2-1.6-1-.8.6a3.6 3.6 0 0 1-2-2l.6-.8-1-1.6L9 9.2Z" /></svg>;
    case "star":
      return <svg {...common} fill="currentColor"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>;
    default:
      return null;
  }
}

function ServiceRows({ items, onSelect }: { items: { name: string; detail: string }[]; onSelect: (name: string) => void }) {
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item, index) => (
        <button
          type="button"
          key={item.name}
          onClick={() => onSelect(item.name)}
          className="group flex w-full items-center gap-4 py-5 text-left transition-colors hover:text-[var(--rust)]"
        >
          <span className="w-8 font-mono text-[11px] tracking-[0.16em] text-[var(--muted)]">0{index + 1}</span>
          <span className="flex-1">
            <span className="block font-display text-[20px] leading-tight">{item.name}</span>
            <span className="mt-1 block text-[12px] uppercase tracking-[0.13em] text-[var(--muted)]">{item.detail}</span>
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] transition-all group-hover:border-[var(--rust)] group-hover:bg-[var(--rust)] group-hover:text-white">
            <Icon name="arrow-up-right" size={15} />
          </span>
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Signature cut");
  const menuRef = useRef<HTMLDivElement>(null);
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!bookingOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBookingOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [bookingOpen]);

  const openBooking = (service = "Signature cut") => {
    setSelectedService(service);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const service = String(data.get("service") ?? selectedService);
    const date = String(data.get("date") ?? "");
    const time = String(data.get("time") ?? "");
    const note = String(data.get("message") ?? "").trim();
    const prettyDate = date
      ? new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
      : "";

    const lines = [
      "Hi The Bhutta BarBer, I'd like to book an appointment.",
      "",
      `Name: ${name}`,
      `Service: ${service}`,
      `Preferred date: ${prettyDate}`,
      `Preferred time: ${time}`,
    ];
    if (note) lines.push(`Note: ${note}`);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    setBookingOpen(false);
  };

  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <header className="hero relative isolate min-h-svh bg-[#201c19] text-white sm:min-h-[780px]" id="top">
        <img
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
          src={listingImages[0].src}
          alt={listingImages[0].alt}
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,18,16,0.92)_0%,rgba(20,18,16,0.72)_39%,rgba(20,18,16,0.2)_78%,rgba(20,18,16,0.3)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(20,18,16,0.68),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 bg-[rgba(20,18,16,0.32)] sm:hidden" />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-3 border-b border-white/20 py-2 text-[11px] uppercase tracking-[0.1em] text-white/75 sm:py-4 sm:tracking-[0.2em]">
            <span>Southall<span className="hidden min-[400px]:inline"> / West London</span></span>
            <span className="hidden sm:block">Est. in the chair, made for your day</span>
            <a className="flex min-h-11 items-center transition-colors hover:text-white" href="tel:+447468899048">+44 7468 899048</a>
          </div>

          <div ref={menuRef} className="relative">
          <nav className="flex items-center justify-between py-6" aria-label="Main navigation">
            <a className="brand-mark flex items-center gap-3" href="#top" aria-label="The Bhutta BarBer home">
              <span className="brand-monogram flex h-10 w-10 items-center justify-center border border-white/50 font-display text-[21px] italic">B</span>
              <span className="font-display text-[18px] tracking-[0.02em] sm:text-[20px]">The Bhutta BarBer</span>
            </a>
            <div className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.19em] text-white/80 md:flex">
              <a className="nav-link" href="#services">Services</a>
              <a className="nav-link" href="#wigs">Wig studio</a>
              <a className="nav-link" href="#visit">Visit us</a>
              <button className="button-light px-5 py-3" type="button" onClick={() => openBooking()}>Book a chair</button>
            </div>
            <button className="flex h-12 w-12 items-center justify-center border border-white/35 md:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <Icon name={menuOpen ? "close" : "menu"} size={20} />
            </button>
          </nav>

          {menuOpen && (
            <div className="absolute inset-x-0 top-full z-20 border border-white/20 bg-[rgba(26,22,20,0.97)] p-6 md:hidden">
              <div className="flex flex-col text-[12px] uppercase tracking-[0.2em] text-white/85">
                <a className="py-3.5" href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                <a className="py-3.5" href="#wigs" onClick={() => setMenuOpen(false)}>Wig studio</a>
                <a className="py-3.5" href="#visit" onClick={() => setMenuOpen(false)}>Visit us</a>
                <button className="button-light mt-3 px-5 py-3 text-center" type="button" onClick={() => openBooking()}>Book a chair</button>
              </div>
            </div>
          )}
          </div>

          <div className="flex flex-1 flex-col justify-center pb-28 pt-20 sm:pb-36 sm:pt-24">
            <p className="eyebrow mb-6 animate-fade-up">A Southall grooming original</p>
            <h1 className="hero-title max-w-[850px] font-display text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.88] tracking-[-0.05em] animate-fade-up-delayed">
              The Bhutta<br /><span className="italic text-[var(--gold)]">BarBer.</span>
            </h1>
            <p className="mt-8 max-w-[410px] text-[15px] leading-7 text-white/76 sm:text-[17px] sm:leading-8">
              Sharp cuts, considered detail and a private wig studio, all under one roof on The Green.
            </p>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button className="button-rust group w-full sm:w-auto" type="button" onClick={() => openBooking()}>
                Book your appointment <Icon name="arrow-up-right" size={16} />
              </button>
              <a className="button-ghost w-full sm:w-auto" href="#services">Explore the studio <Icon name="chevron-down" size={15} /></a>
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-white/20 py-5 text-white/70">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"><Icon name="location" size={15} /> The Green, Southall</span>
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]"><Icon name="star" size={13} /> 4.6 / 17 local reviews</span>
          </div>
        </div>
      </header>

      <main>
        <section className="intro-section mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow text-[var(--rust)]">The Bhutta way</p>
              <div className="mt-8 flex items-center gap-3 text-[var(--muted)]"><span className="h-px w-12 bg-[var(--rust)]" /><span className="font-mono text-[11px] tracking-[0.16em]">01 / 03</span></div>
            </div>
            <div>
              <h2 className="section-title max-w-[730px] font-display text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.96] tracking-[-0.045em]">A good cut changes the way you carry the day.</h2>
              <p className="mt-8 max-w-[550px] text-[15px] leading-7 text-[var(--muted)] sm:text-[17px] sm:leading-8">No rush, no fuss. Just a proper consultation, a steady hand and a finish that feels like yours. Step in for the cut. Stay for the ritual.</p>
              <a className="text-link mt-8 inline-flex items-center gap-3" href="#visit">Find us on The Green <Icon name="arrow-up-right" size={15} /></a>
            </div>
          </div>
        </section>

        <section className="services-section border-y border-[var(--line)] bg-[var(--sand)]" id="services">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24 lg:px-12 lg:py-36">
            <div>
              <p className="eyebrow text-[var(--rust)]">Services / 01</p>
              <h2 className="mt-6 max-w-[420px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.045em]">The chair is yours.</h2>
              <p className="mt-7 max-w-[400px] text-[15px] leading-7 text-[var(--muted)]">From a skin fade to a full beard sculpt, every appointment starts with understanding what you want to see in the mirror.</p>
              <div className="mt-10 flex items-center gap-3 text-[var(--rust)]"><Icon name="scissors" size={22} /><span className="text-[11px] uppercase tracking-[0.2em]">Walk-ins welcome when available</span></div>
            </div>
            <div className="pt-1">
              <ServiceRows items={barberServices} onSelect={openBooking} />
              <div className="mt-6 flex items-start gap-3 text-[12px] leading-5 text-[var(--muted)]"><Icon name="clock" size={17} /><span>Appointments are recommended. Call ahead for today&apos;s availability.</span></div>
            </div>
          </div>
        </section>

        <section className="wig-section relative overflow-hidden bg-[var(--ink)] text-white" id="wigs">
          <div className="absolute -right-20 top-20 hidden h-72 w-72 rounded-full border border-white/10 lg:block" />
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24 lg:px-12 lg:py-36">
            <div className="relative grid grid-cols-[1.2fr_0.8fr] items-end gap-4 sm:gap-6">
              <div className="relative aspect-[0.79] overflow-hidden bg-[#3d3730]">
                <img className="h-full w-full object-cover" src={wigImages[0]} alt="A wig being styled in a private salon setting" loading="lazy" />
              </div>
              <div className="relative aspect-[0.72] overflow-hidden bg-[#3d3730] pb-10 sm:pb-16">
                <img className="h-full w-full object-cover object-center" src={wigImages[1]} alt="Close detail of a blonde hair piece" loading="lazy" />
              </div>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[var(--rust)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.17em] text-white sm:px-5">Bhutta Wigs</span>
            </div>
            <div>
              <p className="eyebrow text-[var(--gold)]">The wig studio / 02</p>
              <h2 className="mt-6 max-w-[600px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.94] tracking-[-0.045em]">A private space for your next look.</h2>
              <p className="mt-8 max-w-[520px] text-[15px] leading-7 text-white/64 sm:text-[17px] sm:leading-8">Inside the salon, Bhutta Wigs brings a softer kind of expertise. Talk through texture, tone and fit in a relaxed, one-to-one appointment, then leave with something that feels completely natural.</p>
              <div className="mt-10 max-w-[540px] border-y border-white/16 divide-y divide-white/16">
                {wigServices.map((item) => (
                  <button type="button" key={item.name} onClick={() => openBooking(item.name)} className="group flex w-full items-center gap-4 py-4 text-left text-white/80 transition-colors hover:text-[var(--gold)]">
                    <Icon name="spark" size={16} />
                    <span className="flex-1"><span className="block text-[15px]">{item.name}</span><span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-white/45">{item.detail}</span></span>
                    <Icon name="arrow-up-right" size={15} />
                  </button>
                ))}
              </div>
              <button className="button-gold mt-10" type="button" onClick={() => openBooking("Private consultation")}>Talk to the wig studio <Icon name="arrow-up-right" size={16} /></button>
            </div>
          </div>
        </section>

        <section className="gallery-section mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36" id="gallery">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
            <div><p className="eyebrow text-[var(--rust)]">Inside the studio / 03</p><h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.94] tracking-[-0.045em]">The room<br /><span className="italic">where it happens.</span></h2></div>
            <p className="max-w-[260px] text-[12px] uppercase leading-5 tracking-[0.14em] text-[var(--muted)]">A look inside The Bhutta BarBer, Southall</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {listingImages.map((image, index) => (
              <figure key={image.src} className={`gallery-image group relative overflow-hidden bg-[var(--sand)] ${index === 0 ? "col-span-2 aspect-[4/3] sm:row-span-2 sm:aspect-auto" : index === 1 ? "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-square" : "aspect-square"}`}>
                <img className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" src={image.src} alt={image.alt} loading={index === 0 ? "eager" : "lazy"} />
                <figcaption className="absolute bottom-0 left-0 bg-[rgba(20,18,16,0.76)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{image.label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]"><span>Photo journal</span><span className="flex items-center gap-2"><Icon name="eye" size={15} /> A space with purpose</span></div>
        </section>

        <section className="visit-section border-t border-[var(--line)] bg-[var(--sand)]" id="visit">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:px-12 lg:py-36">
            <div>
              <p className="eyebrow text-[var(--rust)]">Come through</p>
              <h2 className="mt-6 max-w-[650px] font-display text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-[-0.05em]">See you<br /><span className="italic">on The Green.</span></h2>
              <p className="mt-8 max-w-[450px] text-[15px] leading-7 text-[var(--muted)]">Find us in the heart of Southall. Bring a reference, bring a question or just bring yourself. We&apos;ll take it from there.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a className="button-rust w-full sm:w-auto" href="https://www.google.com/maps/dir/?api=1&destination=51.5030932,-0.3808812" target="_blank" rel="noreferrer">Get directions <Icon name="arrow-up-right" size={16} /></a>
                <a className="button-outline w-full sm:w-auto" href="tel:+447468899048">Call the studio <Icon name="phone" size={15} /></a>
              </div>
            </div>
            <div className="flex flex-col justify-end border-t border-[var(--line)] pt-8 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
              <div className="space-y-8">
                <div className="flex gap-4"><Icon name="location" size={22} /><div><p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Address</p><p className="mt-2 font-display text-[24px] leading-tight">The Green<br />Southall, UB2 4BG</p></div></div>
                <div className="flex gap-4"><Icon name="phone" size={21} /><div><p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Appointments</p><a className="-my-2 mt-2 block py-2 font-display text-[24px] leading-tight transition-colors hover:text-[var(--rust)]" href="tel:+447468899048">+44 7468 899048</a></div></div>
                <div className="flex gap-4"><Icon name="clock" size={21} /><div><p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Before you visit</p><p className="mt-2 max-w-[280px] text-[14px] leading-6 text-[var(--muted)]">Hours can change. Call ahead for same-day availability and wig appointments.</p></div></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--ink)] px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a className="flex min-h-11 items-center gap-3" href="#top"><span className="flex h-9 w-9 items-center justify-center border border-white/45 font-display text-[18px] italic">B</span><span className="font-display text-[18px]">The Bhutta BarBer</span></a>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.17em] text-white/60"><a className="flex min-h-11 items-center px-2 transition-colors hover:text-white" href="#services">Services</a><a className="flex min-h-11 items-center px-2 transition-colors hover:text-white" href="#wigs">Bhutta Wigs</a><a className="flex h-11 w-11 items-center justify-center transition-colors hover:text-white" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={20} /></a></div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">Southall, London / 2026</p>
        </div>
      </footer>

      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(20,18,16,0.75)] p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setBookingOpen(false)} role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="booking-modal relative max-h-[94dvh] w-full max-w-[560px] overflow-y-auto overscroll-contain bg-[var(--paper)] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-10" onClick={(event) => event.stopPropagation()}>
            <button className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]" type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><Icon name="close" size={17} /></button>
                <p className="eyebrow pr-12 text-[var(--rust)]">Make it yours</p>
                <h2 id="booking-title" className="mt-5 max-w-[400px] font-display text-[clamp(2.6rem,7vw,4rem)] leading-[0.92] tracking-[-0.045em]">Book your<br /><span className="italic">time in the chair.</span></h2>
                <p className="mt-5 max-w-[410px] text-[14px] leading-6 text-[var(--muted)]">Fill this in and WhatsApp opens with your request ready to send. For same-day bookings, call us directly.</p>
                <form className="mt-8 space-y-5" onSubmit={submitBooking}>
                  <label className="field-label">Your name<input required name="name" type="text" placeholder="Full name" /></label>
                  <label className="field-label">I&apos;m interested in<select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)}><option>Signature cut</option><option>Skin fade</option><option>Beard sculpt</option><option>Cut and beard</option><option>Private consultation</option><option>Custom fitting</option><option>Wig styling</option></select></label>
                  <div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Preferred date<input required name="date" type="date" min={today} /></label><label className="field-label">Preferred time<select name="time"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div>
                  <label className="field-label">Anything we should know? <span className="font-normal normal-case tracking-normal text-[var(--muted)]">(optional)</span><textarea name="message" rows={3} placeholder="Tell us a little about what you have in mind..." /></label>
                  <button className="button-rust w-full justify-center" type="submit"><Icon name="whatsapp" size={17} /> Send on WhatsApp</button>
                </form>
          </div>
        </div>
      )}
    </div>
  );
}
