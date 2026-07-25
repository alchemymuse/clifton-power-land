"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Zap,
  Wifi,
  MapPin,
  Building2,
  ArrowRight,
  Download,
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  Shield,
  Clock,
  Droplets,
  Radio,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

/* ───────────────────────── NAV ───────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Overview", href: "#overview" },
    { label: "Power & Fiber", href: "#specs" },
    { label: "Location", href: "#location" },
    { label: "Site Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5">
          <Zap className="w-6 h-6 text-primary" strokeWidth={2.5} />
          <span className="font-bold text-navy text-[15px] tracking-tight">
            Clifton AI Power Land
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-500 hover:text-navy transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Request Info
          <ArrowRight className="w-4 h-4" />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-navy"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-slate-600 hover:text-navy py-1.5 font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center mt-2"
          >
            Request Info
          </a>
        </div>
      )}
    </nav>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wide uppercase px-3.5 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            Data Center Ready Land &middot; For Sale
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-navy leading-[1.08] tracking-tight mb-6 text-balance">
            74 MW Shovel-Ready AI Data Center Land with{" "}
            <span className="text-primary">Up to 800 Gbps</span> Redundant
            Fiber
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl">
            ±14 acres, flat &amp; cleared in Bosque County, TX — strategically
            outside Clifton city limits. 138 kV transmission via TNMP, ERCOT
            North, dual-path carrier fiber (FiberLight &amp; AT&amp;T),
            municipal water, and a target energization of Q3 2027.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3.5 rounded-lg text-[15px] transition-colors shadow-sm shadow-primary/20"
            >
              Inquire with Landowner
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/clifton-site-overview.pdf"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-navy font-semibold px-7 py-3.5 rounded-lg text-[15px] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Site Overview (PDF)
            </a>
          </div>
        </div>

        {/* Badge bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Zap, label: "74 MW Power", sub: "138 kV · ERCOT North" },
            {
              icon: Wifi,
              label: "Up to 800 Gbps Fiber",
              sub: "FiberLight & AT&T",
            },
            {
              icon: MapPin,
              label: "Outside City Limits",
              sub: "Fast-track permitting",
            },
            {
              icon: Building2,
              label: "CLF VOLTCORE LLC",
              sub: "Direct from landowner",
            },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-none mt-0.5">
                <b.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-navy">{b.label}</div>
                <div className="text-xs text-slate-400">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── KEY SPECS GRID ───────────────── */
function SpecsGrid() {
  const specs = [
    {
      icon: Zap,
      title: "74 MW Power Capacity",
      detail:
        "Application submitted for 74 MW via 138 kV transmission. TNMP utility, ERCOT North competitive wholesale market. Self-built substation on-site.",
      highlight: "74 MW",
    },
    {
      icon: Radio,
      title: "138 kV Transmission",
      detail:
        "Existing electric substation less than 1 mile from the property line. On-site step-down substation (self-build) for high-density deployment.",
      highlight: "< 1 mi",
    },
    {
      icon: Wifi,
      title: "Up to 800 Gbps Fiber",
      detail:
        "Dual-loop fully redundant dark fiber pathway. Two premier Tier-1 carriers — FiberLight and AT&T — with fiber already extended to the property boundary.",
      highlight: "800 Gbps",
    },
    {
      icon: Shield,
      title: "Outside City Limits",
      detail:
        "Located in unincorporated Bosque County (outside Clifton ETJ). Streamlined industrial permitting, lower tax burden, and flexible land use for heavy power infrastructure.",
      highlight: "ETJ",
    },
    {
      icon: Droplets,
      title: "Municipal Water On-Site",
      detail:
        "Municipal water service already extended to the property boundary — critical for cooling infrastructure without drilling or permitting private wells.",
      highlight: "On-site",
    },
    {
      icon: Clock,
      title: "Energization Q3 2027",
      detail:
        "Target energization 2027 Q3. Shovel-ready site with flat, cleared, rectangular parcel ideal for efficient build-out and phased expansion.",
      highlight: "2027 Q3",
    },
  ];

  return (
    <section id="specs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
            Site Specifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Built for AI-Scale Infrastructure
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Every critical utility — power, fiber, and water — already at or
            near the property boundary. Designed for rapid deployment at
            hyperscaler density.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {specs.map((s) => (
            <div
              key={s.title}
              className="group border border-slate-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-xs font-bold text-primary/60 bg-primary/5 px-2.5 py-1 rounded-md">
                  {s.highlight}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── FIBER DEEP DIVE ───────────── */
function FiberSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
            Connectivity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-4">
            Dual-Carrier Fiber Redundancy
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Two independent Tier-1 fiber carriers already at the property
            boundary — zero single points of failure for mission-critical AI
            workloads.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* FiberLight */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-base font-bold text-navy">FiberLight</div>
                <div className="text-xs text-slate-400">Carrier 1</div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {[
                "Low-latency dark fiber infrastructure",
                "Dedicated high-capacity wavelengths",
                "Texas-based, carrier-neutral provider",
                "Ring topology protection available",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* AT&T */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <Radio className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <div className="text-base font-bold text-navy">AT&amp;T</div>
                <div className="text-xs text-slate-400">Carrier 2</div>
              </div>
            </div>
            <ul className="space-y-2.5">
              {[
                "Tier-1 global IP transit backbone",
                "Full carrier neutrality & peering",
                "Enterprise-grade SLA guarantees",
                "Nationwide & international reach",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Combined specs callout */}
        <div className="mt-8 max-w-4xl mx-auto bg-navy rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="text-white font-bold text-xl mb-1">
              Up to 800 Gbps Total Throughput
            </div>
            <p className="text-slate-400 text-sm">
              Dual-loop ring topology with automatic failover. No single point
              of failure for AI model training, inference workloads, and cloud
              interconnection.
            </p>
          </div>
          <div className="flex gap-4">
            {["FiberLight", "AT&T"].map((c) => (
              <div
                key={c}
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-center"
              >
                <div className="text-white font-mono font-bold text-sm">
                  {c}
                </div>
                <div className="text-slate-400 text-xs">Tier-1</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────── LOCATION ADVANTAGES ────────── */
function LocationSection() {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
              Strategic Positioning
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-5">
              Outside City Limits.
              <br />
              Inside the Opportunity.
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Situated in unincorporated Bosque County, outside Clifton city
              limits — this site eliminates the red tape of municipal zoning
              while preserving full access to utility infrastructure.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Speed to Market",
                  desc: "No lengthy municipal zoning delays. Industrial-class permitting on a streamlined county pathway.",
                },
                {
                  title: "Favorable Tax & Regulatory Climate",
                  desc: "Lower property tax burden and flexible land use rules designed for heavy power and industrial infrastructure.",
                },
                {
                  title: "~90 Minutes from Dallas–Fort Worth",
                  desc: "State Highway 6 frontage, rail and transmission adjacent. Quiet, non-residential setting ideal for 24/7 operations.",
                },
                {
                  title: "±14 Acres — Flat, Cleared, Rectangular",
                  desc: "Optimal parcel geometry for efficient data hall layout, cooling infrastructure, and phased campus expansion.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 items-start border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-none" />
                  <div>
                    <div className="text-sm font-bold text-navy">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <Image
                src="/land-map.jpg"
                alt="Clifton TX site infrastructure map showing water lines, sewer, and property boundary"
                width={830}
                height={520}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3">
              <div className="text-xs text-slate-400 font-mono">
                BOSQUE COUNTY, TX
              </div>
              <div className="text-sm font-bold text-navy">
                Hwy 6 &middot; Near Clifton
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────── GALLERY ────────── */
function GallerySection() {
  const images = [
    {
      src: "/land-aerial.jpg",
      alt: "Aerial view of ±14 acre property boundary",
      caption: "±14 acres — flat, cleared, rectangular parcel",
    },
    {
      src: "/design-render.png",
      alt: "Representative 74 MW data center campus render",
      caption: "Representative 74 MW campus layout",
    },
    {
      src: "/land-sunset.jpg",
      alt: "Site at sunset showing flat terrain and power lines",
      caption: "Quiet, non-residential setting with transmission adjacent",
    },
    {
      src: "/land-field.jpg",
      alt: "Cleared land parcel ready for development",
      caption: "Cleared and graded — shovel-ready condition",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
            Site Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            See the Property
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {images.map((img) => (
            <div key={img.src} className="group">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  className="w-full h-64 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 px-1">{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────── CONTACT FORM ────────── */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = encodeURIComponent("Clifton AI Power Land Inquiry");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nBuyer Type: ${data.get("buyerType")}\n\nMessage:\n${data.get("message")}`
    );

    window.open(
      `mailto:clfvoltcore@gmail.com?subject=${subject}&body=${body}`,
      "_self"
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
              Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-5">
              Ready to Move Forward?
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Contact the landowner directly. Full due-diligence packages,
              survey maps, and utility confirmation available upon request.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">
                    CLF VOLTCORE LLC
                  </div>
                  <div className="text-xs text-slate-400">
                    Direct from Landowner
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <a
                    href="mailto:clfvoltcore@gmail.com"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    clfvoltcore@gmail.com
                  </a>
                  <div className="text-xs text-slate-400">Direct Inquiry</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="name"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Company / Entity
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="company"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      name="phone"
                      type="tel"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="(555) 555-0100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Buyer Type
                </label>
                <select
                  name="buyerType"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select one...</option>
                  <option>Direct Developer</option>
                  <option>CRE Broker</option>
                  <option>Hyperscaler / Cloud Provider</option>
                  <option>Investor / Fund</option>
                  <option>Site Selection Consultant</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Interested in learning more about the site, power capacity, or requesting the full due-diligence package..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Opening Email Client...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────── FOOTER ────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-navy">
              Clifton AI Power Land
            </span>
          </div>
          <div className="text-xs text-slate-400 text-center max-w-xl">
            &copy; {new Date().getFullYear()} CLF VOLTCORE LLC. All rights
            reserved. Confidential property offering. All information deemed
            reliable but not guaranteed and subject to verification, utility
            confirmation and buyer due diligence.
          </div>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-[11px] text-slate-400 leading-relaxed text-center max-w-3xl mx-auto">
            <strong>Broker Disclaimer:</strong> This website is provided for
            informational purposes only by CLF VOLTCORE LLC as the direct
            landowner. No representation or warranty is made regarding the
            accuracy of the information contained herein. Prospective buyers and
            their brokers should independently verify all specifications,
            utility commitments, and jurisdictional requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ────────── PAGE ────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="overview">
        <Hero />
        <SpecsGrid />
        <FiberSection />
        <LocationSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
