"use client";

import { useState } from "react";
import { Search, Filter, Globe2, TrendingUp, TrendingDown, Coins } from "lucide-react";
import { MarketCard, type MarketItem } from "@/components/MarketCard";
import { Modal } from "@/components/Modal";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Mock data ---
function spark(base: number, count = 12): { v: number }[] {
  let v = base;
  return Array.from({ length: count }, () => {
    v = v + (Math.random() - 0.48) * v * 0.03;
    return { v: parseFloat(v.toFixed(2)) };
  });
}

const MARKETS: MarketItem[] = [
  { symbol: "PI", name: "Pi Network", price: 314.15, change: 2.34, volume: "182M", sparkline: spark(310), category: "Crypto" },
  { symbol: "BTC", name: "Bitcoin", price: 67420.5, change: 1.12, volume: "42B", sparkline: spark(67000), category: "Crypto" },
  { symbol: "ETH", name: "Ethereum", price: 3512.8, change: -0.87, volume: "18B", sparkline: spark(3600), category: "Crypto" },
  { symbol: "BNB", name: "Binance Coin", price: 598.4, change: 3.21, volume: "2.1B", sparkline: spark(580), category: "Crypto" },
  { symbol: "SOL", name: "Solana", price: 172.9, change: -1.45, volume: "3.8B", sparkline: spark(180), category: "Crypto" },
  { symbol: "AVAX", name: "Avalanche", price: 38.62, change: 4.11, volume: "820M", sparkline: spark(37), category: "Crypto" },
  { symbol: "XRP", name: "Ripple", price: 0.624, change: 0.91, volume: "1.5B", sparkline: spark(0.62), category: "Crypto" },
  { symbol: "ADA", name: "Cardano", price: 0.482, change: -2.07, volume: "680M", sparkline: spark(0.5), category: "Crypto" },
  { symbol: "DOT", name: "Polkadot", price: 8.17, change: 1.88, volume: "410M", sparkline: spark(8), category: "Crypto" },
  { symbol: "MATIC", name: "Polygon", price: 0.889, change: -0.44, volume: "320M", sparkline: spark(0.9), category: "Crypto" },
];

const CATEGORIES = ["All", "Crypto", "Forex", "Commodities", "Indices"];

// Detail chart data
const DETAIL_CHART = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}h`,
  v: 300 + Math.sin(i * 0.4) * 20 + Math.random() * 8,
}));

const STATS = [
  { label: "Market Cap", value: "$38.2B" },
  { label: "24h Volume", value: "$182M" },
  { label: "Circulating", value: "3.14B PI" },
  { label: "ATH", value: "$320.00" },
];

export function MarketsTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<MarketItem | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

  const { products } = usePiAuth();
  const product = products?.find((p) => p.id === PRODUCT_CONFIG.PRODUCT_69a97218852ad97300de2ced);
  const amount = product?.price_in_pi;

  const handlePayment = () => {
    if (!product || amount === undefined) return;
    setPaymentStatus("loading");
    setPaymentMessage(null);
    window.pay({
      amount,
      memo: product.name,
      metadata: { productId: product.id },
      onComplete: () => {
        setPaymentStatus("success");
        setPaymentMessage("Payment successful! Welcome to Global Economy.");
        setTimeout(() => { setPaymentStatus("idle"); setPaymentMessage(null); }, 4000);
      },
      onError: (error: Error) => {
        setPaymentStatus("error");
        setPaymentMessage("Payment failed. Please try again.");
        setTimeout(() => { setPaymentStatus("idle"); setPaymentMessage(null); }, 4000);
      },
    });
  };

  const filtered = MARKETS.filter((m) => {
    const matchCat = category === "All" || m.category === category;
    const matchSearch =
      m.symbol.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const gainers = MARKETS.filter((m) => m.change > 0).slice(0, 3);
  const losers = MARKETS.filter((m) => m.change < 0).slice(0, 3);

  return (
    <div className="flex flex-col pb-1">
      {/* Global stats banner */}
      <div className="px-4 py-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
        {[
          { label: "Pi Price", value: "$314.15", up: true },
          { label: "Global MCap", value: "$2.38T", up: true },
          { label: "BTC Dom.", value: "52.4%", up: false },
          { label: "Fear&Greed", value: "68 Greed", up: true },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-shrink-0 px-3 py-2 rounded-xl"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <p className="text-[10px]" style={{ color: "#7a8aaa" }}>{s.label}</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: s.up ? "#26a65b" : "#e05252" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Global Economy payment button */}
      <div className="px-4 pb-2">
        {paymentMessage && (
          <div
            className="mb-2 px-3 py-2 rounded-xl text-xs font-semibold text-center"
            style={{
              backgroundColor: paymentStatus === "success" ? "rgba(38,166,91,0.15)" : "rgba(224,82,82,0.15)",
              color: paymentStatus === "success" ? "#26a65b" : "#e05252",
              border: `1px solid ${paymentStatus === "success" ? "rgba(38,166,91,0.3)" : "rgba(224,82,82,0.3)"}`,
            }}
          >
            {paymentMessage}
          </div>
        )}
        <button
          onClick={handlePayment}
          disabled={!product || paymentStatus === "loading"}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
        >
          <Coins size={15} />
          {paymentStatus === "loading"
            ? "Processing..."
            : !product
            ? "Unavailable"
            : `${product.name} — ${amount} π`}
        </button>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-3">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
          style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
        >
          <Search size={15} style={{ color: "#7a8aaa" }} />
          <input
            type="text"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#e8e8e8" }}
          />
          <Filter size={15} style={{ color: "#7a8aaa" }} />
        </div>
      </div>

      {/* Category tabs */}
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

      {/* Top movers */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Top gainers */}
          <div className="rounded-2xl p-3" style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}>
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp size={13} style={{ color: "#26a65b" }} />
              <span className="text-xs font-bold" style={{ color: "#26a65b" }}>Top Gainers</span>
            </div>
            {gainers.map((m) => (
              <div key={m.symbol} className="flex items-center justify-between py-0.5">
                <span className="text-xs font-semibold" style={{ color: "#e8e8e8" }}>{m.symbol}</span>
                <span className="text-xs font-bold" style={{ color: "#26a65b" }}>+{m.change.toFixed(2)}%</span>
              </div>
            ))}
          </div>
          {/* Top losers */}
          <div className="rounded-2xl p-3" style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}>
            <div className="flex items-center gap-1 mb-2">
              <TrendingDown size={13} style={{ color: "#e05252" }} />
              <span className="text-xs font-bold" style={{ color: "#e05252" }}>Top Losers</span>
            </div>
            {losers.map((m) => (
              <div key={m.symbol} className="flex items-center justify-between py-0.5">
                <span className="text-xs font-semibold" style={{ color: "#e8e8e8" }}>{m.symbol}</span>
                <span className="text-xs font-bold" style={{ color: "#e05252" }}>{m.change.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <Globe2 size={14} style={{ color: "#c9a84c" }} />
        <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>Live Markets</span>
        <span className="text-xs" style={{ color: "#7a8aaa" }}>({filtered.length})</span>
      </div>

      {/* Market list */}
      <div
        className="rounded-2xl overflow-hidden mx-4"
        style={{ border: "1px solid #1e2d4a" }}
      >
        {filtered.length === 0 ? (
          <div className="py-12 text-center" style={{ color: "#7a8aaa" }}>
            No markets found
          </div>
        ) : (
          filtered.map((item) => (
            <MarketCard key={item.symbol} item={item} onPress={setSelected} />
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.symbol} / USD` : ""}
        size="md"
      >
        {selected && (
          <div className="p-5 flex flex-col gap-5">
            {/* Price display */}
            <div>
              <p className="text-3xl font-bold" style={{ color: "#e8e8e8" }}>
                ${selected.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <span
                className="text-sm font-bold"
                style={{ color: selected.change >= 0 ? "#26a65b" : "#e05252" }}
              >
                {selected.change >= 0 ? "+" : ""}{selected.change.toFixed(2)}% (24h)
              </span>
            </div>

            {/* Chart */}
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DETAIL_CHART}>
                  <defs>
                    <linearGradient id="detail-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                  <XAxis dataKey="t" tick={{ fill: "#7a8aaa", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8aaa", fontSize: 10 }} axisLine={false} tickLine={false} width={50} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a", borderRadius: "8px" }}
                    labelStyle={{ color: "#7a8aaa", fontSize: 11 }}
                    itemStyle={{ color: "#c9a84c", fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#c9a84c" strokeWidth={2} fill="url(#detail-grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: "#141d35" }}
                >
                  <p className="text-[11px]" style={{ color: "#7a8aaa" }}>{s.label}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: "#e8e8e8" }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className="py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
                style={{ backgroundColor: "#26a65b", color: "#fff" }}
              >
                Buy {selected.symbol}
              </button>
              <button
                className="py-3 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
                style={{ backgroundColor: "#e05252", color: "#fff" }}
              >
                Sell {selected.symbol}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
