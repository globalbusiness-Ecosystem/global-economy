"use client";

import { Menu, Settings, Wifi } from "lucide-react";

interface HeaderProps {
  piPrice?: number;
  priceChange?: number;
  onMenuOpen: () => void;
  onSettingsOpen: () => void;
}

export function Header({
  piPrice = 314.15,
  priceChange = 2.34,
  onMenuOpen,
  onSettingsOpen,
}: HeaderProps) {
  const isPositive = priceChange >= 0;

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{ backgroundColor: "#0f1629", borderBottom: "1px solid #1e2d4a" }}
    >
      {/* Main header row: hamburger | logo+domain | gear */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2.5">

        {/* Left: hamburger */}
        <button
          onClick={onMenuOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors active:scale-95"
          style={{ backgroundColor: "#141d35", color: "#b0bcd4", border: "1px solid #1e2d4a" }}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        {/* Center: logo + domain */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
            >
              G
            </div>
            <span className="font-bold text-sm tracking-wide" style={{ color: "#e8e8e8" }}>
              GlobalEconomy
            </span>
          </div>
          <span className="text-[11px]" style={{ color: "#7a8aaa" }}>globaleconomy.pi</span>
        </div>

        {/* Right: settings gear */}
        <button
          onClick={onSettingsOpen}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors active:scale-95"
          style={{ backgroundColor: "#141d35", color: "#b0bcd4", border: "1px solid #1e2d4a" }}
          aria-label="Open settings"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* Pi price ticker */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: "#141d35" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold" style={{ color: "#7a8aaa" }}>PI/USD</span>
          <span className="font-bold text-sm" style={{ color: "#c9a84c" }}>
            ${piPrice.toFixed(2)}
          </span>
          <span
            className="text-xs font-semibold px-1.5 py-0.5 rounded"
            style={{
              color: isPositive ? "#26a65b" : "#e05252",
              backgroundColor: isPositive ? "rgba(38,166,91,0.12)" : "rgba(224,82,82,0.12)",
            }}
          >
            {isPositive ? "+" : ""}{priceChange.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Wifi size={12} style={{ color: "#26a65b" }} />
          <span className="text-xs" style={{ color: "#26a65b" }}>Live</span>
        </div>
      </div>
    </header>
  );
}
