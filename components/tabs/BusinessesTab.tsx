"use client";

import { useState } from "react";
import { Search, BadgeCheck, Globe2, Building2, Plus, Phone, Globe, Coins } from "lucide-react";
import { BusinessCard, type Business } from "@/components/BusinessCard";
import { Modal } from "@/components/Modal";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

const BUSINESSES: Business[] = [
  { id: "1", name: "PiTech Solutions", category: "Technology", description: "Full-stack software development, mobile apps, and cloud infrastructure solutions built on Pi Network.", location: "Dubai", country: "UAE", rating: 4.9, reviewCount: 214, isKycVerified: true, acceptsPi: true, website: "pitech.pi", phone: "+971-55-000" },
  { id: "2", name: "GlobalShip Express", category: "Logistics", description: "International freight and last-mile delivery network spanning 50+ countries, accepting Pi payments.", location: "Shanghai", country: "China", rating: 4.7, reviewCount: 512, isKycVerified: true, acceptsPi: true, website: "globalship.pi", employeeCount: "500+" },
  { id: "3", name: "EduPi Academy", category: "Education", description: "Online education platform offering 500+ courses in technology, business, and languages for Pi Network users.", location: "Lagos", country: "Nigeria", rating: 4.8, reviewCount: 892, isKycVerified: true, acceptsPi: true, website: "edupi.pi", founded: "2022" },
  { id: "4", name: "PiMart Retail", category: "Retail", description: "E-commerce store for electronics, fashion, and home goods. All priced in Pi for global accessibility.", location: "Istanbul", country: "Turkey", rating: 4.5, reviewCount: 341, isKycVerified: false, acceptsPi: true },
  { id: "5", name: "HealthBridge Clinic", category: "Healthcare", description: "Telemedicine and in-person healthcare services connecting patients with doctors in 30+ countries.", location: "Nairobi", country: "Kenya", rating: 4.6, reviewCount: 178, isKycVerified: true, acceptsPi: true, phone: "+254-700-000" },
  { id: "6", name: "PiFinance Group", category: "Finance", description: "Financial services including currency exchange, micro-loans, and investment products in Pi ecosystem.", location: "Singapore", country: "SG", rating: 4.8, reviewCount: 624, isKycVerified: true, acceptsPi: true, website: "pifinance.pi", employeeCount: "120+" },
  { id: "7", name: "FoodChain Global", category: "Food", description: "Restaurant aggregator and food delivery platform covering 100+ cities with Pi payment integration.", location: "Jakarta", country: "Indonesia", rating: 4.4, reviewCount: 1204, isKycVerified: false, acceptsPi: true },
  { id: "8", name: "BuildPi Construction", category: "Other", description: "Property development and construction services. Buy or rent homes with Pi in emerging markets.", location: "Mumbai", country: "India", rating: 4.3, reviewCount: 89, isKycVerified: true, acceptsPi: false },
];

const CATS = ["All", "Technology", "Finance", "Retail", "Logistics", "Education", "Healthcare"];

export function BusinessesTab() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [kycOnly, setKycOnly] = useState(false);
  const [selected, setSelected] = useState<Business | null>(null);
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

  const filtered = BUSINESSES.filter((b) => {
    const matchCat = category === "All" || b.category === category;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
    const matchKyc = !kycOnly || b.isKycVerified;
    return matchCat && matchSearch && matchKyc;
  });

  return (
    <div className="flex flex-col">
      {/* Header stats */}
      <div className="px-4 pt-3 pb-3 flex items-center gap-3 overflow-x-auto scrollbar-none">
        {[
          { label: "Businesses", value: "12,480+", icon: <Building2 size={13} /> },
          { label: "KYC Verified", value: "8,214", icon: <BadgeCheck size={13} /> },
          { label: "Countries", value: "89", icon: <Globe2 size={13} /> },
        ].map((s) => (
          <div
            key={s.label}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
          >
            <span style={{ color: "#c9a84c" }}>{s.icon}</span>
            <div>
              <p className="text-xs font-bold" style={{ color: "#e8e8e8" }}>{s.value}</p>
              <p className="text-[10px]" style={{ color: "#7a8aaa" }}>{s.label}</p>
            </div>
          </div>
        ))}
        <button
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
          style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
        >
          <Plus size={12} />
          Register
        </button>
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
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#e8e8e8" }}
          />
        </div>
      </div>

      {/* Filters row */}
      <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setKycOnly(!kycOnly)}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150"
          style={{
            backgroundColor: kycOnly ? "rgba(74,159,212,0.15)" : "#141d35",
            color: kycOnly ? "#4a9fd4" : "#7a8aaa",
            border: `1px solid ${kycOnly ? "rgba(74,159,212,0.4)" : "#1e2d4a"}`,
          }}
        >
          <BadgeCheck size={12} />
          KYC Only
        </button>
        {CATS.map((cat) => (
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

      {/* Global Economy payment button */}
      <div className="px-4 pb-3">
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

      {/* Business list */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center" style={{ color: "#7a8aaa" }}>No businesses found</div>
        ) : (
          filtered.map((b) => (
            <BusinessCard key={b.id} business={b} onPress={setSelected} />
          ))
        )}
      </div>

      {/* Business Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
        size="md"
      >
        {selected && (
          <div className="p-5 flex flex-col gap-4">
            {/* Avatar + info */}
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
                style={{ backgroundColor: "#1a2340", color: "#c9a84c" }}
              >
                {selected.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-base" style={{ color: "#e8e8e8" }}>{selected.name}</p>
                  {selected.isKycVerified && <BadgeCheck size={16} style={{ color: "#4a9fd4" }} />}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#7a8aaa" }}>{selected.category}</p>
                <p className="text-xs mt-0.5" style={{ color: "#7a8aaa" }}>{selected.location}, {selected.country}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "#7a8aaa" }}>{selected.description}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {selected.isKycVerified && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(74,159,212,0.15)", color: "#4a9fd4", border: "1px solid rgba(74,159,212,0.3)" }}>
                  KYC Verified
                </span>
              )}
              {selected.acceptsPi && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}>
                  Accepts Pi
                </span>
              )}
              {selected.employeeCount && (
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#141d35", color: "#7a8aaa" }}>
                  {selected.employeeCount} employees
                </span>
              )}
              {selected.founded && (
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#141d35", color: "#7a8aaa" }}>
                  Est. {selected.founded}
                </span>
              )}
            </div>

            {/* Contact actions */}
            <div className="grid grid-cols-2 gap-3">
              {selected.website && (
                <button
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#141d35", color: "#c9a84c", border: "1px solid #1e2d4a" }}
                >
                  <Globe size={14} />
                  Website
                </button>
              )}
              {selected.phone && (
                <button
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "#141d35", color: "#c9a84c", border: "1px solid #1e2d4a" }}
                >
                  <Phone size={14} />
                  Contact
                </button>
              )}
              <button
                className="col-span-2 py-3 rounded-2xl font-bold text-sm"
                style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
              >
                Send Pi Payment
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
