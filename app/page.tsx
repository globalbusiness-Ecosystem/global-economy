"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav, type TabId } from "@/components/BottomNav";
import { Sidebar } from "@/components/Sidebar";
import { SettingsPanel } from "@/components/SettingsPanel";
import { MarketsTab } from "@/components/tabs/MarketsTab";
import { TradeTab } from "@/components/tabs/TradeTab";
import { BusinessesTab } from "@/components/tabs/BusinessesTab";
import { ExchangeTab } from "@/components/tabs/ExchangeTab";
import { NewsTab } from "@/components/tabs/NewsTab";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("markets");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ backgroundColor: "#0a0f1e", maxWidth: "480px", margin: "0 auto" }}
    >
      {/* Sidebar (left drawer) */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Settings panel (right drawer) */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Sticky Header */}
      <Header
        piPrice={314.15}
        priceChange={2.34}
        onMenuOpen={() => setSidebarOpen(true)}
        onSettingsOpen={() => setSettingsOpen(true)}
      />

      {/* Scrollable tab content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: "calc(72px + env(safe-area-inset-bottom, 16px))" }}
      >
        {activeTab === "markets" && <MarketsTab />}
        {activeTab === "trade" && <TradeTab />}
        {activeTab === "businesses" && <BusinessesTab />}
        {activeTab === "exchange" && <ExchangeTab />}
        {activeTab === "news" && <NewsTab />}
      </main>

      {/* Fixed Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
