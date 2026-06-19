"use client";

import { useState } from "react";
import {
  Newspaper,
  TrendingUp,
  Clock,
  Globe2,
  BookOpen,
  Flame,
  ChevronRight,
  Search,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  titleAr?: string;
  summary: string;
  source: string;
  category: string;
  timeAgo: string;
  readTime: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  tags: string[];
  image?: string;
}

const NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Pi Network Surpasses 50 Million KYC-Verified Users Globally",
    titleAr: "شبكة باي تتجاوز 50 مليون مستخدم موثق",
    summary:
      "Pi Network reaches a historic milestone as KYC completions accelerate across emerging markets in Asia, Africa, and the Middle East, positioning the network for full mainnet utility.",
    source: "Pi Times",
    category: "Pi Network",
    timeAgo: "12m ago",
    readTime: "2 min",
    isBreaking: true,
    tags: ["KYC", "Milestone", "Mainnet"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
  },
  {
    id: "2",
    title: "Global Crypto Market Cap Hits $2.4 Trillion Amid ETF Inflows",
    titleAr: "رأس مال سوق العملات المشفرة يبلغ 2.4 تريليون دولار",
    summary:
      "Institutional ETF inflows reached $1.2B this week, driving Bitcoin dominance above 52% while altcoins show renewed momentum across the board.",
    source: "CryptoGlobal",
    category: "Markets",
    timeAgo: "1h ago",
    readTime: "3 min",
    isTrending: true,
    tags: ["ETF", "Bitcoin", "Altcoins"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
  },
  {
    id: "3",
    title: "Middle East E-Commerce Adoption of Pi Payments Grows 340%",
    titleAr: "نمو 340% في اعتماد مدفوعات باي في التجارة الإلكترونية بالشرق الأوسط",
    summary:
      "Businesses across UAE, Saudi Arabia, and Egypt report a surge in Pi payment integrations as consumer adoption of cryptocurrency payments deepens.",
    source: "EconArabia",
    category: "Trade",
    timeAgo: "3h ago",
    readTime: "4 min",
    tags: ["MENA", "E-Commerce", "Adoption"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
  },
  {
    id: "4",
    title: "Pi Network Launches Business API for KYC-Verified Merchants",
    titleAr: "باي نتورك تطلق واجهة برمجية للتجار الموثقين",
    summary:
      "The new Business API allows KYC-verified merchants to integrate Pi payments directly into their storefronts, enabling seamless global commerce.",
    source: "Pi Developer Hub",
    category: "Pi Network",
    timeAgo: "5h ago",
    readTime: "3 min",
    isTrending: true,
    tags: ["API", "Merchants", "Payments"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400",
  },
  {
    id: "5",
    title: "IMF Report: Crypto Assets Reshaping Global Trade Financing",
    titleAr: "تقرير صندوق النقد الدولي: الأصول المشفرة تعيد تشكيل تمويل التجارة العالمية",
    summary:
      "An IMF working paper outlines how decentralized payment rails like Pi Network are reducing cross-border transaction costs for SMEs in developing markets.",
    source: "IMF Insights",
    category: "Economy",
    timeAgo: "8h ago",
    readTime: "5 min",
    tags: ["IMF", "Trade", "DeFi"],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
  },
  {
    id: "6",
    title: "Southeast Asia Sees Explosive Pi Merchant Growth in Q1 2026",
    titleAr: "نمو متفجر للتجار في جنوب شرق آسيا خلال الربع الأول من 2026",
    summary:
      "Indonesia, Philippines, and Vietnam collectively onboarded over 200,000 Pi-accepting merchants in the first quarter, making SEA the fastest-growing Pi economy.",
    source: "AsiaEcon",
    category: "Trade",
    timeAgo: "12h ago",
    readTime: "4 min",
    tags: ["SEA", "Merchants", "Growth"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
  },
  {
    id: "7",
    title: "Federal Reserve Signals Continued Rate Pause Through Mid-2026",
    titleAr: "الاحتياطي الفيدرالي يُشير إلى تثبيت الفائدة حتى منتصف 2026",
    summary:
      "Fed Chair signals a rate hold through at least June 2026, citing cooling inflation data and stable labor markets, a bullish signal for risk assets.",
    source: "Fed Watch",
    category: "Economy",
    timeAgo: "1d ago",
    readTime: "3 min",
    tags: ["Fed", "Rates", "Macro"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
  },
  {
    id: "8",
    title: "Pi Hackathon 2026: $10M Prize Pool for Global Developers",
    titleAr: "هاكاثون باي 2026: جائزة 10 مليون دولار للمطورين العالميين",
    summary:
      "Pi Core Team announces a global developer hackathon with a $10M prize pool to build apps on the Pi open mainnet, driving ecosystem expansion.",
    source: "Pi Developer Hub",
    category: "Pi Network",
    timeAgo: "2d ago",
    readTime: "2 min",
    tags: ["Hackathon", "Developers", "Ecosystem"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
  },
];

const CATEGORIES = ["All", "Pi Network", "Markets", "Trade", "Economy"];

const categoryColors: Record<string, string> = {
  "Pi Network": "#c9a84c",
  Markets: "#4a9fd4",
  Trade: "#26a65b",
  Economy: "#9b59b6",
};

export function NewsTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = NEWS.filter((n) => {
    const matchCat = category === "All" || n.category === category;
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const breaking = NEWS.filter((n) => n.isBreaking);
  const trending = NEWS.filter((n) => n.isTrending);

  return (
    <div className="flex flex-col pb-2">
      {/* Breaking news ticker */}
      {breaking.length > 0 && (
        <div
          className="flex items-center gap-3 px-4 py-2.5 overflow-hidden"
          style={{ backgroundColor: "rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}
        >
          <span
            className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
          >
            BREAKING
          </span>
          <p className="text-xs font-semibold truncate" style={{ color: "#e8e8e8" }}>
            {breaking[0].title}
          </p>
        </div>
      )}

      {/* Stats strip */}
      <div className="px-4 pt-3 pb-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
        {[
          { label: "Total Stories", value: `${NEWS.length}+`, icon: <Newspaper size={12} /> },
          { label: "Trending", value: `${trending.length}`, icon: <Flame size={12} /> },
          { label: "Sources", value: "24", icon: <Globe2 size={12} /> },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <span style={{ color: "#c9a84c" }}>{s.icon}</span>
            <div>
              <p className="text-xs font-bold leading-tight" style={{ color: "#e8e8e8" }}>{s.value}</p>
              <p className="text-[10px] leading-tight" style={{ color: "#7a8aaa" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
          style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
        >
          <Search size={15} style={{ color: "#7a8aaa" }} />
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#e8e8e8" }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{
              backgroundColor: category === cat ? "#c9a84c" : "#141d35",
              color: category === cat ? "#0a0f1e" : "#7a8aaa",
              border: category === cat ? "none" : "1px solid #1e2d4a",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trending row */}
      {category === "All" && trending.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={13} style={{ color: "#c9a84c" }} />
            <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>Trending Now</span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {trending.map((n) => {
              const catColor = categoryColors[n.category] ?? "#7a8aaa";
              return (
                <button
                  key={n.id}
                  onClick={() => setExpanded(expanded === n.id ? null : n.id)}
                  className="flex-shrink-0 w-52 rounded-2xl overflow-hidden text-left transition-all duration-150 active:scale-95"
                  style={{
                    backgroundColor: "#141d35",
                    border: `1px solid ${expanded === n.id ? "#c9a84c44" : "#1e2d4a"}`,
                  }}
                >
                  {n.image && (
                    <div className="w-full h-24 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={n.image}
                        alt={n.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: `${catColor}22`, color: catColor }}
                    >
                      {n.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={10} style={{ color: "#c9a84c" }} />
                    </div>
                  </div>
                  <p className="text-xs font-semibold leading-snug line-clamp-2 text-balance" style={{ color: "#e8e8e8" }}>
                    {n.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock size={10} style={{ color: "#7a8aaa" }} />
                    <span className="text-[10px]" style={{ color: "#7a8aaa" }}>{n.timeAgo}</span>
                  </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section header */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <BookOpen size={13} style={{ color: "#c9a84c" }} />
        <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>Latest Stories</span>
        <span className="text-xs" style={{ color: "#7a8aaa" }}>({filtered.length})</span>
      </div>

      {/* News list */}
      <div className="px-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center" style={{ color: "#7a8aaa" }}>
            No stories found
          </div>
        ) : (
          filtered.map((item) => {
            const catColor = categoryColors[item.category] ?? "#7a8aaa";
            const isOpen = expanded === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="w-full text-left rounded-2xl overflow-hidden transition-all duration-200 active:scale-[0.99]"
                style={{
                  backgroundColor: "#0f1629",
                  border: `1px solid ${isOpen ? "#c9a84c44" : "#1e2d4a"}`,
                }}
              >
                {/* Thumbnail */}
                {item.image && (
                  <div className="w-full h-36 overflow-hidden" style={{ backgroundColor: "#141d35" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}

                <div className="p-4">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${catColor}22`, color: catColor, border: `1px solid ${catColor}33` }}
                    >
                      {item.category}
                    </span>
                    {item.isBreaking && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c" }}
                      >
                        BREAKING
                      </span>
                    )}
                    {item.isTrending && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"
                        style={{ backgroundColor: "rgba(224,82,82,0.12)", color: "#e05252" }}
                      >
                        <Flame size={8} />
                        HOT
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    size={14}
                    style={{
                      color: "#7a8aaa",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Title */}
                <p className="text-sm font-bold leading-snug text-balance" style={{ color: "#e8e8e8" }}>
                  {item.title}
                </p>

                {/* Expanded summary */}
                {isOpen && (
                  <p className="text-xs leading-relaxed mt-2" style={{ color: "#7a8aaa" }}>
                    {item.summary}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-2.5">
                  <div className="flex items-center gap-2">
                    <Globe2 size={11} style={{ color: "#7a8aaa" }} />
                    <span className="text-[11px] font-semibold" style={{ color: "#7a8aaa" }}>
                      {item.source}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock size={10} style={{ color: "#7a8aaa" }} />
                      <span className="text-[10px]" style={{ color: "#7a8aaa" }}>{item.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={10} style={{ color: "#7a8aaa" }} />
                      <span className="text-[10px]" style={{ color: "#7a8aaa" }}>{item.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {isOpen && (
                  <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#141d35", color: "#7a8aaa", border: "1px solid #1e2d4a" }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="h-4" />
    </div>
  );
}
