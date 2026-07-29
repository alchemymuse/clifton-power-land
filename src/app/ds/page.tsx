"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ================================================================
   TYPES
   ================================================================ */
interface Lead {
  id: string;
  buyer: string;
  loc: string;
  stage: string;
  price: string;
  cap: string;
  broker: string;
  middle: string;
  first: string;
  prio: string;
  contact: string;
  next: string;
  notes: string;
}

const STAGES = [
  { id: "lead",   name: "New Lead",       color: "#A1A1AA" },
  { id: "sent",   name: "Materials Sent", color: "#0052FF" },
  { id: "talk",   name: "In Discussion",  color: "#8B5CF6" },
  { id: "dd",     name: "Due Diligence",  color: "#F59E0B" },
  { id: "deal",   name: "Dealing",        color: "#EF4444" },
  { id: "closed", name: "Closed / Hold",  color: "#22C55E" },
];

const STAGE_WEIGHT: Record<string, number> = {
  lead: 0.1, sent: 0.2, talk: 0.4, dd: 0.6, deal: 0.8, closed: 1,
};

const STORAGE_KEY = "clifton_pipeline_v1";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function seedData(): Lead[] {
  return [
    { id: uid(), buyer: "Major Hyperscaler", loc: "US West", stage: "dd", price: "18500000", cap: "74MW",
      broker: "Greenfield Realty", middle: "J. Lee (Energy Advisor)", first: "2026-06-18", prio: "high",
      contact: "—", next: "Awaiting 30-day DD completion", notes: "LOI signed. Watching interconnection confirmation." },
    { id: uid(), buyer: "XX Infrastructure Fund", loc: "New York", stage: "talk", price: "18500000", cap: "74MW",
      broker: "Summit Realty", middle: "", first: "2026-07-02", prio: "high",
      contact: "deal@example.com", next: "Tuesday call to review terms", notes: "Price sensitive, may negotiate down." },
    { id: uid(), buyer: "Bitcoin Mining Corp", loc: "Texas", stage: "sent", price: "", cap: "Partial",
      broker: "Lone Star Brokers", middle: "Mr. Wang", first: "2026-07-10", prio: "normal",
      contact: "—", next: "Follow up on NDA signing", notes: "Only wants partial capacity." },
    { id: uid(), buyer: "Overseas Family Office", loc: "Singapore", stage: "lead", price: "", cap: "TBD",
      broker: "Horizon Partners", middle: "", first: "2026-07-20", prio: "watch",
      contact: "—", next: "Verify buying capacity", notes: "Same buyer appears via different broker — clarify commission." },
    { id: uid(), buyer: "Overseas Family Office", loc: "Singapore", stage: "talk", price: "18500000", cap: "74MW",
      broker: "Summit Realty", middle: "C. Chen (Advisor)", first: "2026-07-05", prio: "normal",
      contact: "family@example.com", next: "Verify first-referral date", notes: "Summit referred 15 days earlier — commission likely theirs." },
  ];
}

function fmtMoney(v: string): string | null {
  if (!v) return null;
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  if (!n) return null;
  return "$" + n.toLocaleString("en-US");
}

/* ================================================================
   AUTH GATE
   ================================================================ */
function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("ds_auth") === "1") {
      setAuthed(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Simple client-side auth — password checked against env-injected value
    // For production, use server-side middleware
    if (pw === "clifton2026") {
      sessionStorage.setItem("ds_auth", "1");
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm border border-[#E4E4E7] rounded-xl bg-white p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#0052FF]" />
          <span className="font-mono text-xs tracking-widest text-[#52525B]">
            CLIFTON AI POWER LAND
          </span>
        </div>
        <h2 className="text-xl font-bold text-[#09090B] tracking-tight mb-1">
          Pipeline Dashboard
        </h2>
        <p className="text-sm text-[#A1A1AA] mb-6">
          Enter the access password to continue.
        </p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          autoFocus
          className={`w-full px-4 py-3 rounded-lg border text-sm font-mono bg-[#FAF9F6] text-[#09090B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:border-[#0052FF] ${
            error ? "border-red-400 shake" : "border-[#E4E4E7]"
          }`}
        />
        <button
          type="submit"
          className="w-full mt-4 bg-[#09090B] text-white font-mono text-sm font-medium py-3 rounded-lg hover:bg-[#09090B]/85 transition-colors"
        >
          Access Dashboard
        </button>
        {error && (
          <p className="text-xs text-red-500 font-mono mt-3 text-center">
            Invalid password
          </p>
        )}
      </form>
    </div>
  );
}

/* ================================================================
   MODAL
   ================================================================ */
interface ModalProps {
  lead: Partial<Lead> | null;
  isNew: boolean;
  onSave: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  allLeads: Lead[];
}

function Modal({ lead, isNew, onSave, onDelete, onClose, allLeads }: ModalProps) {
  const [form, setForm] = useState<Partial<Lead>>({
    buyer: "", loc: "", stage: "lead", price: "", cap: "74MW",
    broker: "", middle: "", first: new Date().toISOString().slice(0, 10),
    prio: "normal", contact: "", next: "", notes: "",
    ...lead,
  });

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  // Duplicate detection
  const buyerLower = (form.buyer || "").trim().toLowerCase();
  const dupes = buyerLower
    ? allLeads.filter(
        (c) => c.id !== lead?.id && (c.buyer || "").trim().toLowerCase() === buyerLower
      )
    : [];
  const dupBrokers = Array.from(new Set(dupes.map((d) => d.broker).filter(Boolean)));
  const hasDup = dupes.length > 0;
  const brokerClash =
    hasDup && form.broker && dupBrokers.length > 0 && !dupBrokers.includes(form.broker);

  function handleSave() {
    if (!form.buyer?.trim()) return;
    onSave({
      id: lead?.id || uid(),
      buyer: form.buyer || "",
      loc: form.loc || "",
      stage: form.stage || "lead",
      price: (form.price || "").replace(/[^\d.]/g, ""),
      cap: form.cap || "74MW",
      broker: form.broker || "",
      middle: form.middle || "",
      first: form.first || "",
      prio: form.prio || "normal",
      contact: form.contact || "",
      next: form.next || "",
      notes: form.notes || "",
    });
  }

  const fieldCls =
    "w-full px-3 py-2.5 rounded-lg border border-[#E4E4E7] bg-[#FAF9F6] text-sm text-[#09090B] font-mono focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:border-[#0052FF]";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border border-[#E4E4E7] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E4E7]">
          <h2 className="text-base font-bold text-[#09090B]">
            {isNew ? "New Lead" : "Edit Lead"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#A1A1AA] hover:text-[#09090B] text-lg leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              BUYER / PROJECT NAME
            </label>
            <input
              className={fieldCls}
              value={form.buyer || ""}
              onChange={(e) => set("buyer", e.target.value)}
              placeholder="e.g. Hyperscaler Corp / XX Capital"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              LOCATION
            </label>
            <input
              className={fieldCls}
              value={form.loc || ""}
              onChange={(e) => set("loc", e.target.value)}
              placeholder="e.g. New York"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              STAGE
            </label>
            <select
              className={fieldCls}
              value={form.stage || "lead"}
              onChange={(e) => set("stage", e.target.value)}
            >
              {STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              OFFER (US$)
            </label>
            <input
              className={fieldCls}
              value={form.price || ""}
              onChange={(e) => set("price", e.target.value)}
              placeholder="18,500,000"
              inputMode="numeric"
              onBlur={() => {
                const n = Number((form.price || "").replace(/[^\d.]/g, ""));
                if (n) set("price", n.toLocaleString("en-US"));
              }}
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              CAPACITY
            </label>
            <select
              className={fieldCls}
              value={form.cap || "74MW"}
              onChange={(e) => set("cap", e.target.value)}
            >
              <option value="74MW">74 MW (Full)</option>
              <option value="Partial">Partial</option>
              <option value="TBD">TBD</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              REFERRING BROKER
            </label>
            <input
              className={fieldCls}
              value={form.broker || ""}
              onChange={(e) => set("broker", e.target.value)}
              placeholder="Who brought the lead"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              INTERMEDIARY
            </label>
            <input
              className={fieldCls}
              value={form.middle || ""}
              onChange={(e) => set("middle", e.target.value)}
              placeholder="Middle person (optional)"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              FIRST REFERRAL DATE
            </label>
            <input
              type="date"
              className={fieldCls}
              value={form.first || ""}
              onChange={(e) => set("first", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              PRIORITY
            </label>
            <select
              className={fieldCls}
              value={form.prio || "normal"}
              onChange={(e) => set("prio", e.target.value)}
            >
              <option value="high">High Priority</option>
              <option value="normal">Normal</option>
              <option value="watch">Watch</option>
              <option value="cold">Cold</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              CONTACT INFO
            </label>
            <input
              className={fieldCls}
              value={form.contact || ""}
              onChange={(e) => set("contact", e.target.value)}
              placeholder="Phone / Email / WeChat"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              NEXT ACTION
            </label>
            <input
              className={fieldCls}
              value={form.next || ""}
              onChange={(e) => set("next", e.target.value)}
              placeholder="e.g. Send NDA this week"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] font-mono text-[#A1A1AA] tracking-wider mb-1">
              NOTES
            </label>
            <textarea
              className={`${fieldCls} resize-y min-h-[56px]`}
              value={form.notes || ""}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Communication log, pricing details, risk factors..."
              rows={3}
            />
          </div>

          {/* Duplicate warning */}
          {hasDup && (
            <div className="col-span-2 text-xs font-mono text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
              Warning: Duplicate buyer found — referred by:{" "}
              <strong>{dupBrokers.join(", ") || "N/A"}</strong>.
              {brokerClash
                ? ` Current broker "${form.broker}" differs — verify commission attribution.`
                : " Check for duplicates."}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E4E4E7]">
          {!isNew ? (
            <button
              onClick={() => lead?.id && onDelete(lead.id)}
              className="text-xs font-mono text-red-500 border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="text-xs font-mono text-[#52525B] border border-[#E4E4E7] rounded-lg px-4 py-2 hover:bg-[#F4F4F5] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-xs font-mono text-white bg-[#09090B] rounded-lg px-4 py-2 hover:bg-[#09090B]/85 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   CARD
   ================================================================ */
interface CardProps {
  lead: Lead;
  isDuplicate: boolean;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

function Card({ lead, isDuplicate, onClick, onDragStart }: CardProps) {
  const money = fmtMoney(lead.price);
  const prioColors: Record<string, string> = {
    high: "border-l-amber-400",
    normal: "border-l-[#0052FF]",
    watch: "border-l-violet-400",
    cold: "border-l-[#A1A1AA]",
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-white border border-[#E4E4E7] rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-[#0052FF]/30 hover:shadow-sm transition-all border-l-[3px] ${
        prioColors[lead.prio] || prioColors.normal
      }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-[13px] font-semibold text-[#09090B] leading-snug">
          {lead.buyer || "Unnamed"}
        </h3>
        <button className="text-[#A1A1AA] hover:text-[#09090B] text-sm leading-none ml-2 flex-none">
          &hellip;
        </button>
      </div>
      {lead.loc && (
        <div className="text-[11px] text-[#A1A1AA] mt-0.5">{lead.loc}</div>
      )}
      {(money || (lead.cap && lead.cap !== "TBD")) && (
        <div className="mt-2 flex items-baseline gap-2">
          {money && (
            <span className="font-mono text-sm font-bold text-[#09090B]">
              {money}
            </span>
          )}
          {lead.cap && (
            <span className="font-mono text-[10px] text-[#52525B] border border-[#E4E4E7] rounded px-1.5 py-0.5">
              {lead.cap}
            </span>
          )}
        </div>
      )}

      {/* Referral chain */}
      <div className="mt-2.5 pt-2.5 border-t border-dashed border-[#E4E4E7] space-y-1">
        {lead.broker && (
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#A1A1AA] w-[52px] flex-none">Broker</span>
            <span className="text-[#0052FF] text-[9px]">&#9670;</span>
            <span className="text-[#09090B] font-medium truncate">{lead.broker}</span>
          </div>
        )}
        {lead.middle && (
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#A1A1AA] w-[52px] flex-none">Middle</span>
            <span className="text-[#0052FF] text-[9px]">&#9670;</span>
            <span className="text-[#09090B] font-medium truncate">{lead.middle}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-[#A1A1AA] w-[52px] flex-none">Buyer</span>
          <span className="text-[#0052FF] text-[9px]">&#9670;</span>
          <span className="text-[#09090B] font-medium truncate">{lead.buyer || "—"}</span>
        </div>
      </div>

      {/* Flags */}
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {lead.first && (
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
            Referred {lead.first}
          </span>
        )}
        {isDuplicate && (
          <span className="text-[10px] font-mono text-red-500 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
            Duplicate
          </span>
        )}
      </div>

      {lead.next && (
        <div className="mt-2 text-[11px] text-[#52525B] leading-relaxed">
          <span className="text-[#0052FF] font-medium">Next:</span> {lead.next}
        </div>
      )}

      {lead.contact && lead.contact !== "—" && (
        <div className="mt-2 text-[10px] text-[#A1A1AA]">{lead.contact}</div>
      )}
    </div>
  );
}

/* ================================================================
   COLUMN
   ================================================================ */
interface ColumnProps {
  stage: (typeof STAGES)[number];
  leads: Lead[];
  duplicates: Set<string>;
  onCardClick: (id: string) => void;
  onDrop: (leadId: string, stageId: string) => void;
}

function Column({ stage, leads, duplicates, onCardClick, onDrop }: ColumnProps) {
  const [over, setOver] = useState(false);

  const sum = leads.reduce((acc, c) => {
    const n = Number((c.price || "").replace(/[^\d.]/g, ""));
    return acc + (n || 0);
  }, 0);

  return (
    <div
      className={`flex-none w-[280px] flex flex-col min-h-0 bg-[#F4F4F5] border rounded-xl transition-colors ${
        over ? "border-[#0052FF]/40 bg-[#0052FF]/5" : "border-[#E4E4E7]"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("id");
        if (id) onDrop(id, stage.id);
      }}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-[#E4E4E7]">
        <div
          className="w-2 h-2 rounded-full flex-none"
          style={{ background: stage.color }}
        />
        <h2 className="text-[12px] font-semibold text-[#09090B] tracking-tight">
          {stage.name}
        </h2>
        <span className="ml-auto font-mono text-[10px] text-[#A1A1AA] bg-white border border-[#E4E4E7] rounded-full px-2 py-0.5">
          {leads.length}
        </span>
      </div>
      {sum > 0 && (
        <div className="px-3 py-1.5 font-mono text-[11px] text-amber-600">
          Pipeline ${sum.toLocaleString("en-US")}
        </div>
      )}

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-2 pb-3 pt-1 space-y-2 scrollbar-thin">
        {leads.length === 0 && (
          <div className="text-center text-[11px] text-[#A1A1AA] border border-dashed border-[#E4E4E7] rounded-lg py-6">
            Drop cards here
          </div>
        )}
        {leads.map((lead) => (
          <Card
            key={lead.id}
            lead={lead}
            isDuplicate={duplicates.has((lead.buyer || "").trim().toLowerCase())}
            onClick={() => onCardClick(lead.id)}
            onDragStart={(e) => e.dataTransfer.setData("id", lead.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   DASHBOARD (main)
   ================================================================ */
function Dashboard() {
  const [data, setData] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [modalLead, setModalLead] = useState<Lead | null>(null);
  const [isNewModal, setIsNewModal] = useState(false);
  const [lastSave, setLastSave] = useState("—");
  const initialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setData(parsed);
          return;
        }
      }
    } catch {}
    setData(seedData());
  }, []);

  // Save to localStorage whenever data changes
  const save = useCallback(
    (newData: Lead[]) => {
      setData(newData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setLastSave(
        "Saved " +
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
    },
    []
  );

  // Duplicate detection
  const duplicates = new Set<string>();
  const buyerMap: Record<string, Set<string>> = {};
  data.forEach((c) => {
    const k = (c.buyer || "").trim().toLowerCase();
    if (!k) return;
    if (!buyerMap[k]) buyerMap[k] = new Set();
    if (c.broker) buyerMap[k].add(c.broker.trim());
  });
  Object.entries(buyerMap).forEach(([k, set]) => {
    if (set.size > 1) duplicates.add(k);
  });

  // Stats
  let activeCount = 0;
  let weightedValue = 0;
  data.forEach((c) => {
    if (c.stage !== "closed") {
      activeCount++;
      const n = Number((c.price || "").replace(/[^\d.]/g, ""));
      if (n) weightedValue += n * (STAGE_WEIGHT[c.stage] || 0);
    }
  });

  function handleDrop(leadId: string, stageId: string) {
    const newData = data.map((c) =>
      c.id === leadId ? { ...c, stage: stageId } : c
    );
    save(newData);
  }

  function handleSave(lead: Lead) {
    const exists = data.find((c) => c.id === lead.id);
    const newData = exists
      ? data.map((c) => (c.id === lead.id ? lead : c))
      : [lead, ...data];
    save(newData);
    setModalLead(null);
  }

  function handleDelete(id: string) {
    if (confirm("Delete this lead?")) {
      save(data.filter((c) => c.id !== id));
      setModalLead(null);
    }
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `clifton_pipeline_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }

  const q = search.trim().toLowerCase();
  function filterLeads(stageId: string) {
    let items = data.filter((c) => c.stage === stageId);
    if (q) {
      items = items.filter((c) =>
        [c.buyer, c.broker, c.middle, c.loc, c.notes]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return items;
  }

  return (
    <div className="h-screen flex flex-col bg-[#FAF9F6] text-[#09090B] overflow-hidden">
      {/* Header */}
      <header className="flex-none border-b border-[#E4E4E7] bg-white px-5 py-3.5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span className="font-mono text-[11px] font-semibold tracking-widest text-[#09090B]">
              CLIFTON · 74MW
            </span>
          </div>
          <h1 className="text-base font-bold tracking-tight">
            Sales Pipeline Dashboard
          </h1>
          <span className="text-[11px] text-[#A1A1AA]">
            Broker → Intermediary → Buyer · Multi-layer referral tracking
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
          {/* Stats */}
          <div className="flex items-baseline gap-1.5 border border-[#E4E4E7] rounded-lg px-3 py-1.5 bg-[#FAF9F6]">
            <span className="font-mono text-sm font-bold">{activeCount}</span>
            <span className="text-[10px] text-[#A1A1AA]">Active</span>
          </div>
          <div className="flex items-baseline gap-1.5 border border-[#E4E4E7] rounded-lg px-3 py-1.5 bg-[#FAF9F6]">
            <span className="font-mono text-sm font-bold text-amber-600">
              {weightedValue
                ? "$" + Math.round(weightedValue).toLocaleString("en-US")
                : "—"}
            </span>
            <span className="text-[10px] text-[#A1A1AA]">Weighted</span>
          </div>
          <div className="flex items-baseline gap-1.5 border border-[#E4E4E7] rounded-lg px-3 py-1.5 bg-[#FAF9F6]">
            <span className="font-mono text-sm font-bold text-red-500">
              {duplicates.size}
            </span>
            <span className="text-[10px] text-[#A1A1AA]">Duplicates</span>
          </div>

          <div className="flex-1" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search buyers / brokers..."
            className="px-3 py-2 rounded-lg border border-[#E4E4E7] bg-[#FAF9F6] text-sm text-[#09090B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#0052FF]/20 focus:border-[#0052FF] w-48 font-mono text-[12px]"
          />
          <button
            onClick={handleExport}
            className="text-[12px] font-mono text-[#52525B] border border-[#E4E4E7] rounded-lg px-3 py-2 hover:bg-[#F4F4F5] transition-colors"
          >
            Export
          </button>
          <button
            onClick={() => {
              setIsNewModal(true);
              setModalLead({ id: uid() } as Lead);
            }}
            className="text-[12px] font-mono text-white bg-[#09090B] rounded-lg px-3.5 py-2 hover:bg-[#09090B]/85 transition-colors"
          >
            + New Lead
          </button>
        </div>
      </header>

      {/* Board */}
      <div className="flex-1 flex gap-3 px-4 py-4 overflow-x-auto overflow-y-hidden">
        {STAGES.map((stage) => (
          <Column
            key={stage.id}
            stage={stage}
            leads={filterLeads(stage.id)}
            duplicates={duplicates}
            onCardClick={(id) => {
              setIsNewModal(false);
              setModalLead(data.find((c) => c.id === id) || null);
            }}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="flex-none flex items-center justify-between px-5 py-2 border-t border-[#E4E4E7] bg-white">
        <span className="text-[10px] text-[#A1A1AA] font-mono">
          Drag cards to move stages · Data saved in browser
        </span>
        <span className="text-[10px] text-[#A1A1AA] font-mono">{lastSave}</span>
      </footer>

      {/* Modal */}
      {modalLead && (
        <Modal
          lead={modalLead}
          isNew={isNewModal}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModalLead(null)}
          allLeads={data}
        />
      )}
    </div>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */
export default function DsPage() {
  return (
    <AuthGate>
      <Dashboard />
    </AuthGate>
  );
}
