"use client";

import { useState } from "react";
import { ArrowUpDown, Wallet, History, ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const CURRENCIES = ["USD", "EUR", "GBP", "AED", "SAR", "EGP", "IDR", "INR", "NGN"];

const RATES: Record<string, number> = {
  USD: 314.15, EUR: 290.42, GBP: 248.30, AED: 1153.7, SAR: 1178.1,
  EGP: 9750.0, IDR: 4980000, INR: 26200, NGN: 475000,
};

const CHART_DATA = Array.from({ length: 14 }, (_, i) => ({
  d: `Mar ${i + 1}`,
  v: 295 + Math.sin(i * 0.5) * 22 + Math.random() * 10,
}));

const TX_HISTORY = [
  { id: "1", type: "receive", amount: 25, from: "@alice.pi", date: "2h ago", status: "completed" },
  { id: "2", type: "send", amount: 10, to: "@bob.pi", date: "1d ago", status: "completed" },
  { id: "3", type: "exchange", amount: 50, pair: "PI→USD", date: "2d ago", status: "completed" },
  { id: "4", type: "receive", amount: 100, from: "@shop.pi", date: "3d ago", status: "completed" },
  { id: "5", type: "send", amount: 15, to: "@market.pi", date: "4d ago", status: "completed" },
];

export function ExchangeTab() {
  const { userData } = usePiAuth();
  const [fromCur, setFromCur] = useState("USD");
  const [toCur] = useState("PI");
  const [amount, setAmount] = useState("100");
  const [activeSection, setActiveSection] = useState<"exchange" | "wallet" | "history">("wallet");

  const rate = RATES[fromCur] ?? 314.15;
  const converted = parseFloat(amount || "0") / rate;

  const balance = userData?.credits_balance ?? 0;

  return (
    <div className="flex flex-col">
      {/* Section tabs */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-3">
        {[
          { id: "wallet", label: "Wallet" },
          { id: "exchange", label: "Exchange" },
          { id: "history", label: "History" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as typeof activeSection)}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all duration-150"
            style={{
              backgroundColor: activeSection === s.id ? "#c9a84c" : "#141d35",
              color: activeSection === s.id ? "#0a0f1e" : "#7a8aaa",
              border: activeSection === s.id ? "none" : "1px solid #1e2d4a",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* === WALLET SECTION === */}
      {activeSection === "wallet" && (
        <div className="px-4 flex flex-col gap-4">
          {/* Balance card */}
          <div
            className="rounded-3xl p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a2340 0%, #0f1629 100%)", border: "1px solid #c9a84c44" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #c9a84c, transparent)", transform: "translate(30%, -30%)" }} />
            <p className="text-xs font-semibold" style={{ color: "#7a8aaa" }}>Pi Balance</p>
            <p className="text-4xl font-bold mt-1" style={{ color: "#c9a84c" }}>
              {balance.toLocaleString()} <span className="text-xl">π</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "#7a8aaa" }}>
              ≈ ${(balance * 314.15).toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
            </p>
            <p className="text-xs mt-3" style={{ color: "#7a8aaa" }}>
              @{userData?.username ?? "user"}
            </p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Send", icon: <ArrowUpRight size={18} />, color: "#e05252" },
              { label: "Receive", icon: <ArrowDownLeft size={18} />, color: "#26a65b" },
              { label: "Exchange", icon: <ArrowUpDown size={18} />, color: "#c9a84c" },
              { label: "History", icon: <History size={18} />, color: "#4a9fd4" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => a.label === "Exchange" ? setActiveSection("exchange") : a.label === "History" ? setActiveSection("history") : undefined}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all duration-150 active:scale-95"
                style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
              >
                <span style={{ color: a.color }}>{a.icon}</span>
                <span className="text-[11px] font-semibold" style={{ color: "#7a8aaa" }}>{a.label}</span>
              </button>
            ))}
          </div>

          {/* Pi chart */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold" style={{ color: "#e8e8e8" }}>Pi Price (14d)</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <TrendingUp size={12} style={{ color: "#26a65b" }} />
                  <span className="text-xs font-semibold" style={{ color: "#26a65b" }}>+6.2%</span>
                </div>
              </div>
              <p className="text-lg font-bold" style={{ color: "#c9a84c" }}>$314.15</p>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="wallet-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" />
                  <XAxis dataKey="d" tick={{ fill: "#7a8aaa", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8aaa", fontSize: 9 }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a", borderRadius: "8px", fontSize: 11 }}
                    labelStyle={{ color: "#7a8aaa" }}
                    itemStyle={{ color: "#c9a84c" }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#c9a84c" strokeWidth={2} fill="url(#wallet-grad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent transactions preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>Recent Activity</span>
              <button className="text-xs" style={{ color: "#7a8aaa" }} onClick={() => setActiveSection("history")}>See all</button>
            </div>
            <div className="flex flex-col gap-1.5">
              {TX_HISTORY.slice(0, 3).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tx.type === "receive" ? "rgba(38,166,91,0.15)" : "rgba(224,82,82,0.15)" }}
                    >
                      {tx.type === "receive"
                        ? <ArrowDownLeft size={14} style={{ color: "#26a65b" }} />
                        : tx.type === "send"
                        ? <ArrowUpRight size={14} style={{ color: "#e05252" }} />
                        : <ArrowUpDown size={14} style={{ color: "#c9a84c" }} />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold capitalize" style={{ color: "#e8e8e8" }}>{tx.type}</p>
                      <p className="text-[10px]" style={{ color: "#7a8aaa" }}>
                        {tx.from ?? tx.to ?? tx.pair} · {tx.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: tx.type === "receive" ? "#26a65b" : tx.type === "send" ? "#e05252" : "#c9a84c" }}
                  >
                    {tx.type === "send" ? "-" : "+"}{tx.amount} π
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === EXCHANGE SECTION === */}
      {activeSection === "exchange" && (
        <div className="px-4 flex flex-col gap-4">
          <div
            className="rounded-3xl p-5"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <p className="text-xs font-bold mb-4" style={{ color: "#c9a84c" }}>Currency Exchange</p>

            {/* From */}
            <div className="mb-3">
              <label className="text-xs" style={{ color: "#7a8aaa" }}>You Pay ({fromCur})</label>
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl text-lg font-bold outline-none"
                  style={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a", color: "#e8e8e8" }}
                />
                <select
                  value={fromCur}
                  onChange={(e) => setFromCur(e.target.value)}
                  className="px-2 py-3 rounded-xl text-sm font-semibold outline-none"
                  style={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a", color: "#c9a84c" }}
                >
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Swap icon */}
            <div className="flex justify-center my-1">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                <ArrowUpDown size={16} style={{ color: "#c9a84c" }} />
              </div>
            </div>

            {/* To */}
            <div className="mt-3">
              <label className="text-xs" style={{ color: "#7a8aaa" }}>You Get (PI)</label>
              <div
                className="flex items-center justify-between mt-1.5 px-3 py-3 rounded-xl"
                style={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a" }}
              >
                <span className="text-lg font-bold" style={{ color: "#c9a84c" }}>
                  {converted.toFixed(4)} π
                </span>
                <span className="text-sm font-bold" style={{ color: "#c9a84c" }}>PI</span>
              </div>
            </div>

            <div
              className="flex items-center justify-between mt-3 px-3 py-2 rounded-xl text-xs"
              style={{ backgroundColor: "#0f1629" }}
            >
              <span style={{ color: "#7a8aaa" }}>Rate</span>
              <span style={{ color: "#e8e8e8" }}>1 PI = {rate.toLocaleString()} {fromCur}</span>
            </div>
          </div>

          {/* Exchange rates grid */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <p className="text-xs font-bold mb-3" style={{ color: "#c9a84c" }}>Live Rates (1 Pi =)</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(RATES).slice(0, 6).map(([cur, rate]) => (
                <div
                  key={cur}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                  style={{ backgroundColor: "#0f1629" }}
                >
                  <span className="text-xs font-semibold" style={{ color: "#7a8aaa" }}>{cur}</span>
                  <span className="text-xs font-bold" style={{ color: "#e8e8e8" }}>
                    {rate >= 1000 ? (rate / 1000).toFixed(1) + "K" : rate.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95"
            style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
          >
            Exchange {amount} {fromCur} → {converted.toFixed(4)} Pi
          </button>
        </div>
      )}

      {/* === HISTORY SECTION === */}
      {activeSection === "history" && (
        <div className="px-4 flex flex-col gap-3">
          {/* Volume chart */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <p className="text-xs font-bold mb-3" style={{ color: "#c9a84c" }}>Transaction Volume</p>
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA.slice(0, 7)}>
                  <XAxis dataKey="d" tick={{ fill: "#7a8aaa", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8aaa", fontSize: 9 }} axisLine={false} tickLine={false} width={35} />
                  <Bar dataKey="v" fill="#c9a84c" radius={[4, 4, 0, 0]} opacity={0.8} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a", borderRadius: "8px", fontSize: 11 }}
                    labelStyle={{ color: "#7a8aaa" }}
                    itemStyle={{ color: "#c9a84c" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p className="text-xs font-bold" style={{ color: "#c9a84c" }}>All Transactions</p>
          {TX_HISTORY.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between px-4 py-3 rounded-2xl"
              style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: tx.type === "receive"
                      ? "rgba(38,166,91,0.15)"
                      : tx.type === "exchange"
                      ? "rgba(201,168,76,0.15)"
                      : "rgba(224,82,82,0.15)",
                  }}
                >
                  {tx.type === "receive"
                    ? <ArrowDownLeft size={16} style={{ color: "#26a65b" }} />
                    : tx.type === "send"
                    ? <ArrowUpRight size={16} style={{ color: "#e05252" }} />
                    : <ArrowUpDown size={16} style={{ color: "#c9a84c" }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold capitalize" style={{ color: "#e8e8e8" }}>{tx.type}</p>
                  <p className="text-xs" style={{ color: "#7a8aaa" }}>
                    {tx.from ?? tx.to ?? tx.pair} · {tx.date}
                  </p>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(38,166,91,0.12)", color: "#26a65b" }}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
              <span
                className="text-base font-bold"
                style={{ color: tx.type === "receive" ? "#26a65b" : tx.type === "send" ? "#e05252" : "#c9a84c" }}
              >
                {tx.type === "send" ? "-" : "+"}{tx.amount} π
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}
