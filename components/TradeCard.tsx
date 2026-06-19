"use client";

import { MapPin, Tag, Star, ShoppingCart } from "lucide-react";

export interface TradeItem {
  id: string;
  title: string;
  category: string;
  price: number;
  currency: "Pi" | "USD";
  seller: string;
  location: string;
  rating: number;
  image?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface TradeCardProps {
  item: TradeItem;
  onBuy?: (item: TradeItem) => void;
}

export function TradeCard({ item, onBuy }: TradeCardProps) {
  const categoryColors: Record<string, string> = {
    Electronics: "#4a9fd4",
    Services: "#26a65b",
    Food: "#e8a040",
    Fashion: "#9b59b6",
    Property: "#c9a84c",
    Automotive: "#e05252",
    Other: "#7a8aaa",
  };
  const catColor = categoryColors[item.category] ?? "#7a8aaa";

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a" }}
    >
      {/* Image area */}
      <div
        className="relative h-32 flex items-center justify-center"
        style={{ backgroundColor: "#141d35" }}
      >
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 opacity-40">
            <ShoppingCart size={28} style={{ color: "#c9a84c" }} />
            <span className="text-xs" style={{ color: "#7a8aaa" }}>{item.category}</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.isNew && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
            >
              NEW
            </span>
          )}
          {item.isFeatured && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "#26a65b", color: "#fff" }}
            >
              HOT
            </span>
          )}
        </div>
        {/* Category pill */}
        <div className="absolute top-2 right-2">
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${catColor}22`, color: catColor, border: `1px solid ${catColor}44` }}
          >
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <p className="font-semibold text-sm leading-snug text-balance" style={{ color: "#e8e8e8" }}>
          {item.title}
        </p>

        <div className="flex items-center gap-1.5">
          <Star size={11} fill="#c9a84c" style={{ color: "#c9a84c" }} />
          <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>{item.rating.toFixed(1)}</span>
          <span className="text-xs" style={{ color: "#7a8aaa" }}>• {item.seller}</span>
        </div>

        <div className="flex items-center gap-1">
          <MapPin size={11} style={{ color: "#7a8aaa" }} />
          <span className="text-xs" style={{ color: "#7a8aaa" }}>{item.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <span className="font-bold text-base" style={{ color: "#c9a84c" }}>
              {item.price}
            </span>
            <span className="text-xs font-semibold ml-1" style={{ color: "#c9a84c" }}>
              {item.currency}
            </span>
          </div>
          <button
            onClick={() => onBuy?.(item)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
            style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
          >
            <Tag size={11} />
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
