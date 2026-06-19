"use client";

import { MapPin, Star, BadgeCheck, Globe, Phone, ChevronRight } from "lucide-react";

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  country: string;
  rating: number;
  reviewCount: number;
  isKycVerified: boolean;
  acceptsPi: boolean;
  website?: string;
  phone?: string;
  employeeCount?: string;
  founded?: string;
}

interface BusinessCardProps {
  business: Business;
  onPress?: (business: Business) => void;
}

const categoryIcons: Record<string, string> = {
  Technology: "T",
  Retail: "R",
  Food: "F",
  Finance: "Fi",
  Healthcare: "H",
  Education: "E",
  Logistics: "L",
  Other: "O",
};

export function BusinessCard({ business, onPress }: BusinessCardProps) {
  const initial = business.name[0]?.toUpperCase() ?? "B";
  const catBg = "#1a2340";

  return (
    <button
      onClick={() => onPress?.(business)}
      className="w-full text-left rounded-2xl p-4 flex flex-col gap-3 active:scale-98 transition-all duration-150"
      style={{ backgroundColor: "#0f1629", border: "1px solid #1e2d4a" }}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg"
          style={{ backgroundColor: catBg, color: "#c9a84c" }}
        >
          {initial}
        </div>

        {/* Name + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-sm leading-tight" style={{ color: "#e8e8e8" }}>
              {business.name}
            </span>
            {business.isKycVerified && (
              <BadgeCheck size={15} style={{ color: "#4a9fd4" }} aria-label="KYC Verified" />
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "#7a8aaa" }}>
            {business.category}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={11} fill="#c9a84c" style={{ color: "#c9a84c" }} />
            <span className="text-xs font-semibold" style={{ color: "#c9a84c" }}>
              {business.rating.toFixed(1)}
            </span>
            <span className="text-xs" style={{ color: "#7a8aaa" }}>
              ({business.reviewCount})
            </span>
          </div>
        </div>

        <ChevronRight size={16} style={{ color: "#7a8aaa" }} />
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#7a8aaa" }}>
        {business.description}
      </p>

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <MapPin size={11} style={{ color: "#7a8aaa" }} />
          <span className="text-xs" style={{ color: "#7a8aaa" }}>
            {business.location}, {business.country}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {business.isKycVerified && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(74,159,212,0.15)", color: "#4a9fd4", border: "1px solid rgba(74,159,212,0.3)" }}
            >
              KYC
            </span>
          )}
          {business.acceptsPi && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
            >
              Pi Pay
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
