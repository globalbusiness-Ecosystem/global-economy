"use client";

import { BarChart2, ShoppingBag, Building2, ArrowLeftRight, Newspaper } from "lucide-react";

export type TabId = "markets" | "trade" | "businesses" | "exchange" | "news";

interface NavItem {
  id: TabId;
  label: string;
  labelAr: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "markets",
    label: "Markets",
    labelAr: "الأسواق",
    icon: <BarChart2 size={20} />,
  },
  {
    id: "trade",
    label: "Trade",
    labelAr: "تداول",
    icon: <ShoppingBag size={20} />,
  },
  {
    id: "businesses",
    label: "Business",
    labelAr: "أعمال",
    icon: <Building2 size={20} />,
  },
  {
    id: "exchange",
    label: "Exchange",
    labelAr: "صرف",
    icon: <ArrowLeftRight size={20} />,
  },
  {
    id: "news",
    label: "News",
    labelAr: "أخبار",
    icon: <Newspaper size={20} />,
  },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  rtl?: boolean;
}

export function BottomNav({ activeTab, onTabChange, rtl = false }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{ backgroundColor: "#0f1629", borderTop: "1px solid #1e2d4a" }}
    >
      <div className="flex items-center justify-around px-1 pt-2 pb-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1 px-1 rounded-xl transition-all duration-200 active:scale-95"
              style={{
                color: isActive ? "#c9a84c" : "#7a8aaa",
                backgroundColor: isActive ? "rgba(201,168,76,0.1)" : "transparent",
              }}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className="transition-transform duration-200"
                style={{ transform: isActive ? "scale(1.1)" : "scale(1)" }}
              >
                {item.icon}
              </span>
              <span
                className="text-[10px] font-semibold leading-tight truncate w-full text-center"
              >
                {rtl ? item.labelAr : item.label}
              </span>
              {isActive && (
                <span
                  className="w-4 h-0.5 rounded-full mt-0.5"
                  style={{ backgroundColor: "#c9a84c" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
