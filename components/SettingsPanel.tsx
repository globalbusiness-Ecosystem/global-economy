"use client";

import { useState } from "react";
import { X, Palette, Globe, DollarSign, Bell, Info, ChevronRight, Check, Moon, Sun } from "lucide-react";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
}

const THEMES = ["Dark Navy", "Midnight", "Deep Black"];
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
];
const CURRENCIES = ["USD", "EUR", "GBP", "SAR", "AED", "CNY", "INR", "NGN"];

type Section = "main" | "theme" | "language" | "currency" | "notifications" | "about";

export function SettingsPanel({ open, onClose }: SettingsPanelProps) {
  const [section, setSection] = useState<Section>("main");
  const [selectedTheme, setSelectedTheme] = useState("Dark Navy");
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [notifSettings, setNotifSettings] = useState({
    priceAlerts: true,
    tradeUpdates: true,
    newsAlerts: false,
    paymentConfirm: true,
  });

  const handleBack = () => setSection("main");

  const toggle = (key: keyof typeof notifSettings) => {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer slides from right */}
      <aside
        className="fixed top-0 right-0 z-50 h-full flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "300px",
          backgroundColor: "#0f1629",
          borderLeft: "1px solid #1e2d4a",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #1e2d4a" }}
        >
          {section !== "main" ? (
            <button
              onClick={handleBack}
              className="text-sm font-semibold flex items-center gap-1"
              style={{ color: "#c9a84c" }}
            >
              <ChevronRight size={15} className="rotate-180" />
              Back
            </button>
          ) : (
            <p className="font-bold text-base" style={{ color: "#e8e8e8" }}>Settings</p>
          )}
          <button
            onClick={() => { setSection("main"); onClose(); }}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ color: "#7a8aaa" }}
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── MAIN ── */}
          {section === "main" && (
            <div className="px-4 py-4 flex flex-col gap-2">
              {[
                { id: "theme" as Section, icon: <Palette size={17} />, label: "Theme", value: selectedTheme },
                { id: "language" as Section, icon: <Globe size={17} />, label: "Language", value: LANGUAGES.find(l => l.code === selectedLang)?.label ?? selectedLang },
                { id: "currency" as Section, icon: <DollarSign size={17} />, label: "Currency", value: selectedCurrency },
                { id: "notifications" as Section, icon: <Bell size={17} />, label: "Notifications", value: Object.values(notifSettings).filter(Boolean).length + " active" },
                { id: "about" as Section, icon: <Info size={17} />, label: "About", value: "v1.0.0" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl transition-colors active:scale-95"
                  style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: "#c9a84c" }}>{item.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "#e8e8e8" }}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "#7a8aaa" }}>{item.value}</span>
                    <ChevronRight size={14} style={{ color: "#7a8aaa" }} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── THEME ── */}
          {section === "theme" && (
            <div className="px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: "#7a8aaa" }}>Select Theme</p>
              <div className="flex flex-col gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-colors"
                    style={{
                      backgroundColor: selectedTheme === t ? "rgba(201,168,76,0.1)" : "#141d35",
                      border: `1px solid ${selectedTheme === t ? "rgba(201,168,76,0.3)" : "#1e2d4a"}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {t === "Dark Navy" ? <Moon size={16} style={{ color: "#c9a84c" }} /> : <Sun size={16} style={{ color: "#c9a84c" }} />}
                      <span className="text-sm" style={{ color: "#e8e8e8" }}>{t}</span>
                    </div>
                    {selectedTheme === t && <Check size={15} style={{ color: "#c9a84c" }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── LANGUAGE ── */}
          {section === "language" && (
            <div className="px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: "#7a8aaa" }}>Select Language</p>
              <div className="flex flex-col gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-colors"
                    style={{
                      backgroundColor: selectedLang === lang.code ? "rgba(201,168,76,0.1)" : "#141d35",
                      border: `1px solid ${selectedLang === lang.code ? "rgba(201,168,76,0.3)" : "#1e2d4a"}`,
                    }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#e8e8e8" }}>{lang.label}</p>
                      <p className="text-xs" style={{ color: "#7a8aaa" }}>{lang.native}</p>
                    </div>
                    {selectedLang === lang.code && <Check size={15} style={{ color: "#c9a84c" }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CURRENCY ── */}
          {section === "currency" && (
            <div className="px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: "#7a8aaa" }}>Display Currency</p>
              <div className="grid grid-cols-2 gap-2">
                {CURRENCIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCurrency(c)}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-colors"
                    style={{
                      backgroundColor: selectedCurrency === c ? "rgba(201,168,76,0.1)" : "#141d35",
                      border: `1px solid ${selectedCurrency === c ? "rgba(201,168,76,0.3)" : "#1e2d4a"}`,
                      color: selectedCurrency === c ? "#c9a84c" : "#b0bcd4",
                    }}
                  >
                    {selectedCurrency === c && <Check size={12} />}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {section === "notifications" && (
            <div className="px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: "#7a8aaa" }}>Notification Preferences</p>
              <div className="flex flex-col gap-2">
                {(
                  [
                    { key: "priceAlerts", label: "Price Alerts", desc: "Pi price movements" },
                    { key: "tradeUpdates", label: "Trade Updates", desc: "Buy/sell confirmations" },
                    { key: "newsAlerts", label: "News Alerts", desc: "Breaking economic news" },
                    { key: "paymentConfirm", label: "Payment Confirmations", desc: "Pi transaction receipts" },
                  ] as { key: keyof typeof notifSettings; label: string; desc: string }[]
                ).map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
                    style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#e8e8e8" }}>{item.label}</p>
                      <p className="text-xs" style={{ color: "#7a8aaa" }}>{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggle(item.key)}
                      className="relative w-11 h-6 rounded-full transition-colors duration-200"
                      style={{ backgroundColor: notifSettings[item.key] ? "#c9a84c" : "#1e2d4a" }}
                      role="switch"
                      aria-checked={notifSettings[item.key]}
                    >
                      <span
                        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                        style={{ transform: notifSettings[item.key] ? "translateX(22px)" : "translateX(4px)" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ABOUT ── */}
          {section === "about" && (
            <div className="px-4 py-4 flex flex-col gap-3">
              <div
                className="flex flex-col items-center gap-3 py-6 rounded-2xl"
                style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl"
                  style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
                >
                  G
                </div>
                <div className="text-center">
                  <p className="font-bold text-base" style={{ color: "#e8e8e8" }}>GlobalEconomy</p>
                  <p className="text-xs mt-0.5" style={{ color: "#7a8aaa" }}>globaleconomy.pi</p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  Version 1.0.0
                </div>
              </div>
              {[
                { label: "Platform", value: "Pi Network App" },
                { label: "Network", value: "Pi Mainnet" },
                { label: "Region Support", value: "Global / MENA" },
                { label: "RTL Support", value: "Arabic, Hebrew" },
                { label: "Built with", value: "Next.js + Pi SDK" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl"
                  style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
                >
                  <span className="text-sm" style={{ color: "#7a8aaa" }}>{label}</span>
                  <span className="text-sm font-medium" style={{ color: "#e8e8e8" }}>{value}</span>
                </div>
              ))}
              <p className="text-center text-xs mt-2" style={{ color: "#3a4a6a" }}>
                Global economic platform on Pi Network. Trade goods, track markets, connect businesses and exchange Pi worldwide.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
