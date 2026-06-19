"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const COIN_LOGOS: Record<string, string> = {
  PI:    "https://cryptologos.cc/logos/pi-network-pi-logo.png?v=040",
  BTC:   "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=040",
  ETH:   "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
  BNB:   "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=040",
  SOL:   "https://cryptologos.cc/logos/solana-sol-logo.png?v=040",
  AVAX:  "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=040",
  XRP:   "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=040",
  ADA:   "https://cryptologos.cc/logos/cardano-ada-logo.png?v=040",
  DOT:   "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=040",
  MATIC: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=040",
};

export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  sparkline: { v: number }[];
  category?: string;
}

interface MarketCardProps {
  item: MarketItem;
  onPress?: (item: MarketItem) => void;
}

export function MarketCard({ item, onPress }: MarketCardProps) {
  const isPositive = item.change >= 0;
  const gainColor = "#26a65b";
  const lossColor = "#e05252";
  const trendColor = isPositive ? gainColor : lossColor;

  return (
    <button
      onClick={() => onPress?.(item)}
      className="w-full flex items-center gap-3 px-4 py-3 active:scale-98 transition-all duration-150"
      style={{
        backgroundColor: "#0f1629",
        borderBottom: "1px solid #1e2d4a",
      }}
    >
      {/* Coin logo */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: "#1a2340" }}
      >
        {COIN_LOGOS[item.symbol] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={COIN_LOGOS[item.symbol]}
            alt={item.symbol}
            width={36}
            height={36}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.parentElement as HTMLElement).innerHTML = `<span style="font-size:11px;font-weight:700;color:#c9a84c">${item.symbol.slice(0, 3)}</span>`;
            }}
          />
        ) : (
          <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>{item.symbol.slice(0, 3)}</span>
        )}
      </div>

      {/* Name + volume */}
      <div className="flex-1 min-w-0 text-left">
        <p className="font-semibold text-sm leading-tight" style={{ color: "#e8e8e8" }}>
          {item.symbol}
        </p>
        <p className="text-xs truncate" style={{ color: "#7a8aaa" }}>
          {item.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#7a8aaa" }}>
          Vol: {item.volume}
        </p>
      </div>

      {/* Mini chart */}
      <div className="w-16 h-10 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={item.sparkline} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
            <defs>
              <linearGradient id={`grad-${item.symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={trendColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={trendColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={trendColor}
              strokeWidth={1.5}
              fill={`url(#grad-${item.symbol})`}
              dot={false}
            />
            <Tooltip content={() => null} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Price + change */}
      <div className="text-right flex-shrink-0 min-w-[72px]">
        <p className="font-bold text-sm" style={{ color: "#e8e8e8" }}>
          ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <span
          className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded mt-0.5"
          style={{
            color: trendColor,
            backgroundColor: isPositive ? "rgba(38,166,91,0.12)" : "rgba(224,82,82,0.12)",
          }}
        >
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositive ? "+" : ""}{item.change.toFixed(2)}%
        </span>
      </div>
    </button>
  );
}
