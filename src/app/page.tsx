"use client";

import Image from "next/image";
import { useState } from "react";

/* ================================================================
   NAV — Minimal top bar, no CTA button
   ================================================================ */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Overview", href: "#overview" },
    { label: "Specs", href: "#specs" },
    { label: "Fiber", href: "#fiber" },
    { label: "Location", href: "#location" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-rule">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="font-semibold text-ink text-sm tracking-tight">
            CLIFTON AI POWER LAND
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-transform ${open ? "rotate-45 translate-y-[4.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-transform ${open ? "-rotate-45 -translate-y-[4.5px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-rule bg-surface px-6 py-4 space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-ink-secondary hover:text-ink py-1.5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ================================================================
   HERO — Large type, system status pill, single CTA
   ================================================================ */
function Hero() {
  return (
    <section
      id="overview"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2.5 border border-rule bg-white px-4 py-2 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-[11px] tracking-widest uppercase text-ink-secondary">
            Status: Study Completed
          </span>
        </div>

        <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] font-bold text-ink leading-[1.05] tracking-[-0.035em] max-w-4xl mb-6">
          74&thinsp;MW Shovel-Ready
          <br />
          AI Data Center Land
        </h1>

        <p className="text-lg md:text-xl text-ink-secondary leading-relaxed max-w-2xl mb-10">
          ±14 acres in Bosque County, TX — 138&thinsp;kV transmission,
          dual-path redundant fiber up to{" "}
          <span className="text-accent font-semibold">800&thinsp;Gbps</span>,
          ERCOT North. Interconnection study completed.
        </p>

        <a
          href="/clifton-site-overview.pdf"
          target="_blank"
          className="inline-flex items-center gap-2.5 bg-ink text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-ink/85 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Site Overview
        </a>

        {/* Metric strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-rule rounded-xl overflow-hidden border border-rule">
          {[
            { value: "74 MW", label: "Power Capacity", sub: "138 kV · TNMP" },
            {
              value: "800 Gbps",
              label: "Fiber Throughput",
              sub: "FiberLight + AT&T",
            },
            {
              value: "±14 ac",
              label: "Parcel Size",
              sub: "Flat & Cleared",
            },
            {
              value: "Q3 2027",
              label: "Target Energization",
              sub: "ERCOT North",
            },
          ].map((m) => (
            <div key={m.value} className="bg-white px-5 py-5">
              <div className="font-mono text-xl md:text-2xl font-bold text-ink tracking-tight">
                {m.value}
              </div>
              <div className="text-[13px] font-medium text-ink-secondary mt-1">
                {m.label}
              </div>
              <div className="font-mono text-[11px] text-ink-muted mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SPECS — Engineering table / dense metric layout
   ================================================================ */
function SpecsSection() {
  const specs = [
    {
      category: "POWER",
      items: [
        {
          label: "Total Capacity",
          value: "74 MW",
          note: "Interconnection study completed",
          accent: true,
        },
        {
          label: "Transmission",
          value: "138 kV",
          note: "TNMP utility provider",
        },
        {
          label: "Market",
          value: "ERCOT North",
          note: "Competitive wholesale",
        },
        {
          label: "Substation",
          value: "< 1 mi",
          note: "Self-build on-site step-down",
        },
      ],
    },
    {
      category: "CONNECTIVITY",
      items: [
        {
          label: "Max Throughput",
          value: "800 Gbps",
          note: "Dual-loop, dual-path dark fiber",
          accent: true,
        },
        {
          label: "Carrier 1",
          value: "FiberLight",
          note: "Texas-based, carrier-neutral",
        },
        {
          label: "Carrier 2",
          value: "AT&T",
          note: "Tier-1 global backbone",
        },
        {
          label: "Fiber Status",
          value: "At boundary",
          note: "Ring topology protection",
        },
      ],
    },
    {
      category: "SITE",
      items: [
        {
          label: "Parcel",
          value: "±14 acres",
          note: "Flat, cleared, rectangular",
        },
        {
          label: "Jurisdiction",
          value: "Unincorporated",
          note: "Outside Clifton ETJ",
          accent: true,
        },
        {
          label: "Water",
          value: "Municipal",
          note: "Service at property boundary",
        },
        {
          label: "Energization",
          value: "Q3 2027",
          note: "Feasibility study completed",
        },
      ],
    },
  ];

  return (
    <section id="specs" className="py-20 bg-white border-y border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted">
            Specifications
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-ink tracking-[-0.03em] mt-2">
            Infrastructure at a Glance
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {specs.map((group) => (
            <div key={group.category}>
              <div className="font-mono text-[11px] tracking-[0.15em] text-ink-muted mb-4 pb-3 border-b border-rule">
                {group.category}
              </div>
              <div className="space-y-0">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between py-3 border-b border-rule-light last:border-0"
                  >
                    <div>
                      <div className="text-sm text-ink-secondary">
                        {item.label}
                      </div>
                      <div className="text-[12px] text-ink-muted mt-0.5">
                        {item.note}
                      </div>
                    </div>
                    <div
                      className={`font-mono text-sm font-semibold tracking-tight ${
                        item.accent ? "text-accent" : "text-ink"
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FIBER — Dual-carrier comparison
   ================================================================ */
function FiberSection() {
  return (
    <section id="fiber" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted">
            Connectivity
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-ink tracking-[-0.03em] mt-2">
            Dual-Carrier Fiber Redundancy
          </h2>
          <p className="text-ink-secondary mt-3 max-w-xl">
            Two independent Tier-1 carriers at the property boundary.
            Dual-loop, dual-path architecture — zero single points of failure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-rule rounded-xl overflow-hidden border border-rule">
          {/* FiberLight */}
          <div className="bg-white p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
              </div>
              <div>
                <div className="font-semibold text-ink">FiberLight</div>
                <div className="font-mono text-[11px] text-ink-muted">
                  CARRIER 1
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Low-latency dark fiber infrastructure",
                "Dedicated high-capacity wavelengths",
                "Texas-based, carrier-neutral provider",
                "Ring topology protection available",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <span className="mt-2 w-1 h-1 rounded-full bg-ink-muted flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* AT&T */}
          <div className="bg-white p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-md bg-sky-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-sky-500" />
              </div>
              <div>
                <div className="font-semibold text-ink">AT&amp;T</div>
                <div className="font-mono text-[11px] text-ink-muted">
                  CARRIER 2
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Tier-1 global IP transit backbone",
                "Full carrier neutrality & peering",
                "Enterprise-grade SLA guarantees",
                "Nationwide & international reach",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <span className="mt-2 w-1 h-1 rounded-full bg-ink-muted flex-none" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Throughput callout */}
        <div className="mt-6 border border-rule rounded-xl bg-ink text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
              800 Gbps
            </div>
            <div className="text-zinc-400 text-sm mt-1">
              Combined dual-loop, dual-path throughput with automatic failover
            </div>
          </div>
          <div className="flex gap-3">
            {["FiberLight", "AT&T"].map((c) => (
              <div
                key={c}
                className="border border-white/15 rounded-md px-4 py-2"
              >
                <div className="font-mono text-sm font-medium">{c}</div>
                <div className="text-zinc-500 text-[11px]">Tier-1</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   LOCATION
   ================================================================ */
function LocationSection() {
  const advantages = [
    {
      title: "Speed to Market",
      desc: "No municipal zoning delays. Industrial-class permitting on a streamlined county pathway.",
    },
    {
      title: "Favorable Tax & Regulatory Climate",
      desc: "Lower property tax burden and flexible land use for heavy power infrastructure.",
    },
    {
      title: "~90 min from Dallas–Fort Worth",
      desc: "State Highway 6 frontage, rail and transmission adjacent. Non-residential setting.",
    },
    {
      title: "±14 Acres — Flat, Cleared, Rectangular",
      desc: "Optimal geometry for efficient data hall layout and phased campus expansion.",
    },
  ];

  return (
    <section id="location" className="py-20 bg-white border-y border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted">
              Location
            </span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-ink tracking-[-0.03em] mt-2 mb-4">
              Outside City Limits.
              <br />
              Inside the Opportunity.
            </h2>
            <p className="text-ink-secondary mb-8">
              Unincorporated Bosque County, outside Clifton city limits —
              streamlined permitting with full access to utility infrastructure.
            </p>

            <div className="space-y-0 border-t border-rule">
              {advantages.map((item) => (
                <div
                  key={item.title}
                  className="py-4 border-b border-rule-light"
                >
                  <div className="text-sm font-semibold text-ink">
                    {item.title}
                  </div>
                  <div className="text-sm text-ink-muted mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-rule">
              <Image
                src="/land-map.jpg"
                alt="Clifton TX site infrastructure map showing water lines, sewer, and property boundary"
                width={830}
                height={520}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white border border-rule rounded-lg px-4 py-2.5 shadow-sm">
              <div className="font-mono text-[10px] tracking-widest text-ink-muted">
                BOSQUE COUNTY, TX
              </div>
              <div className="text-sm font-semibold text-ink">
                Hwy 6 · Near Clifton
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   GALLERY
   ================================================================ */
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
      caption: "Transmission-adjacent, non-residential setting",
    },
    {
      src: "/land-field.jpg",
      alt: "Cleared land parcel ready for development",
      caption: "Cleared and graded — shovel-ready condition",
    },
  ];

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted">
            Gallery
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-ink tracking-[-0.03em] mt-2">
            See the Property
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {images.map((img) => (
            <div key={img.src} className="group">
              <div className="rounded-xl overflow-hidden border border-rule bg-white">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  className="w-full h-60 object-cover group-hover:scale-[1.015] transition-transform duration-700"
                />
              </div>
              <p className="font-mono text-[11px] text-ink-muted mt-2.5 px-0.5">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CONTACT — Pinned-style minimal bar
   ================================================================ */
function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white border-t border-rule">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted">
              Contact
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-[-0.025em] mt-2">
              Get in Touch
            </h2>
            <p className="text-ink-secondary text-sm mt-2 max-w-md">
              Direct from landowner. Due-diligence packages, survey maps, and
              utility confirmation available upon request.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 border border-rule rounded-xl bg-surface px-6 py-5">
            <div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-ink-muted mb-1">
                Entity
              </div>
              <div className="text-sm font-semibold text-ink">
                CLF VOLTCORE LLC
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-rule" />
            <div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-ink-muted mb-1">
                Email
              </div>
              <a
                href="mailto:clfvoltcore@gmail.com"
                className="text-sm font-semibold text-accent hover:underline underline-offset-2"
              >
                clfvoltcore@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
  return (
    <footer className="border-t border-rule py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs text-ink-muted tracking-wide">
              CLIFTON AI POWER LAND
            </span>
          </div>
          <div className="text-[11px] text-ink-muted text-center max-w-xl leading-relaxed">
            &copy; {new Date().getFullYear()} CLF VOLTCORE LLC. All rights
            reserved. All information deemed reliable but not guaranteed and
            subject to verification, utility confirmation and buyer due
            diligence.
          </div>
        </div>
        <div className="mt-4 border-t border-rule-light pt-4">
          <p className="text-[10px] text-ink-muted leading-relaxed text-center max-w-3xl mx-auto">
            <span className="font-semibold">Broker Disclaimer:</span> This
            website is provided for informational purposes only by CLF VOLTCORE
            LLC as the direct landowner. No representation or warranty is made
            regarding the accuracy of the information contained herein.
            Prospective buyers and their brokers should independently verify all
            specifications, utility commitments, and jurisdictional
            requirements.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   PAGE
   ================================================================ */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SpecsSection />
        <FiberSection />
        <LocationSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
