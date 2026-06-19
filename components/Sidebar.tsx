"use client";

import { X, TrendingUp, ShoppingBag, Building2, ArrowLeftRight, Newspaper, Wallet, HelpCircle, LogOut, BadgeCheck } from "lucide-react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import type { TabId } from "@/components/BottomNav";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string; labelAr: string; icon: React.ReactNode }[] = [
  { id: "markets",    label: "Markets",    labelAr: "الأسواق",     icon: <TrendingUp size={18} /> },
  { id: "trade",      label: "Trade",      labelAr: "التجارة",     icon: <ShoppingBag size={18} /> },
  { id: "businesses", label: "Businesses", labelAr: "الأعمال",     icon: <Building2 size={18} /> },
  { id: "exchange",   label: "Exchange",   labelAr: "التحويل",     icon: <ArrowLeftRight size={18} /> },
  { id: "news",       label: "News",       labelAr: "الأخبار",     icon: <Newspaper size={18} /> },
];

export function Sidebar({ open, onClose, activeTab, onTabChange }: SidebarProps) {
  const { userData } = usePiAuth();

  const handleNav = (tab: TabId) => {
    onTabChange(tab);
    onClose();
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

      {/* Drawer */}
      <aside
        className="fixed top-0 left-0 z-50 h-full flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "280px",
          backgroundColor: "#0f1629",
          borderRight: "1px solid #1e2d4a",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
        aria-label="Sidebar navigation"
        role="dialog"
        aria-modal="true"
      >
        {/* Header row */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #1e2d4a" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base"
              style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
            >
              G
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "#e8e8e8" }}>GlobalEconomy</p>
              <p className="text-xs" style={{ color: "#7a8aaa" }}>globaleconomy.pi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: "#7a8aaa" }}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* User profile */}
        {userData && (
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid #1e2d4a" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: "#1e2d4a", color: "#c9a84c" }}
            >
              {userData.username?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold truncate" style={{ color: "#e8e8e8" }}>
                  @{userData.username}
                </p>
                <BadgeCheck size={13} style={{ color: "#c9a84c", flexShrink: 0 }} />
              </div>
              <p className="text-xs" style={{ color: "#7a8aaa" }}>Pi Pioneer</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all duration-150 active:scale-95"
                style={{
                  backgroundColor: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                  color: isActive ? "#c9a84c" : "#b0bcd4",
                  border: isActive ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
                }}
              >
                <span style={{ color: isActive ? "#c9a84c" : "#7a8aaa" }}>{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs" style={{ color: "#7a8aaa" }}>{item.labelAr}</p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="px-3 py-4 flex flex-col gap-1" style={{ borderTop: "1px solid #1e2d4a" }}>
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors"
            style={{ color: "#7a8aaa" }}
          >
            <Wallet size={17} />
            <span className="text-sm">Pi Wallet</span>
          </button>
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors"
            style={{ color: "#7a8aaa" }}
          >
            <HelpCircle size={17} />
            <span className="text-sm">Help & Support</span>
          </button>
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors"
            style={{ color: "#e05252" }}
          >
            <LogOut size={17} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
