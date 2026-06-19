"use client";

import { useState } from "react";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { TradeCard, type TradeItem } from "@/components/TradeCard";
import { Modal } from "@/components/Modal";
import { usePiAuth } from "@/contexts/pi-auth-context";

const CATEGORIES = ["All", "Electronics", "Services", "Food", "Fashion", "Property"];

const ITEMS: TradeItem[] = [
  { id: "1", title: "iPhone 15 Pro Max 256GB", category: "Electronics", price: 320, currency: "Pi", seller: "TechStore.pi", location: "Dubai, UAE", rating: 4.8, isNew: true, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400" },
  { id: "2", title: "Professional Web Design Service", category: "Services", price: 50, currency: "Pi", seller: "DesignPro.pi", location: "Cairo, EG", rating: 4.9, isFeatured: true, image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400" },
  { id: "3", title: "Organic Coffee Beans 1kg Premium", category: "Food", price: 8, currency: "Pi", seller: "CafeWorld.pi", location: "Riyadh, SA", rating: 4.6, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400" },
  { id: "4", title: "MacBook Air M3 Chip 16GB RAM", category: "Electronics", price: 580, currency: "Pi", seller: "AppleHub.pi", location: "Istanbul, TR", rating: 4.7, isNew: true, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
  { id: "5", title: "Handmade Leather Wallet Premium", category: "Fashion", price: 15, currency: "Pi", seller: "LeatherCraft.pi", location: "Marrakech, MA", rating: 4.5, image: "https://images.unsplash.com/photo-1627123424574-724758594913?w=400" },
  { id: "6", title: "SEO & Digital Marketing Package", category: "Services", price: 35, currency: "Pi", seller: "GrowthHack.pi", location: "Karachi, PK", rating: 4.8, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
  { id: "7", title: "Studio Apartment Monthly Rent", category: "Property", price: 200, currency: "Pi", seller: "PropWorld.pi", location: "Jakarta, ID", rating: 4.3, isFeatured: true, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" },
  { id: "8", title: "Samsung Galaxy S24 Ultra", category: "Electronics", price: 290, currency: "Pi", seller: "GalaxyStore.pi", location: "Lagos, NG", rating: 4.6, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400" },
  { id: "9", title: "Homemade Spices Collection Box", category: "Food", price: 5, currency: "Pi", seller: "SpiceMart.pi", location: "Mumbai, IN", rating: 4.7, isNew: true, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400" },
  { id: "10", title: "Traditional Embroidered Dress", category: "Fashion", price: 22, currency: "Pi", seller: "FashionGlobe.pi", location: "Tehran, IR", rating: 4.4, image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400" },
];

export function TradeTab() {
  const { userData } = usePiAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<TradeItem | null>(null);
  const [buyAmount, setBuyAmount] = useState("1");
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const filtered = ITEMS.filter((item) => {
    const matchCat = category === "All" || item.category === category;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleBuy = async () => {
    setIsPaying(true);
    try {
      await new Promise<void>((resolve, reject) =>
        window.pay({
          amount: selected!.price * Number(buyAmount),
          memo: `Purchase: ${selected!.title}`,
          metadata: { itemId: selected!.id, title: selected!.title },
          onComplete: () => {
            setPaySuccess(true);
            setTimeout(() => {
              setPaySuccess(false);
              setSelected(null);
            }, 2000);
            resolve();
          },
          onError: (err) => reject(err),
        })
      );
    } catch {
      // handle silently
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div
        className="mx-4 mt-3 rounded-2xl p-4 flex items-center justify-between"
        style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
      >
        <div>
          <p className="text-sm font-bold" style={{ color: "#c9a84c" }}>Pi Marketplace</p>
          <p className="text-xs mt-0.5" style={{ color: "#7a8aaa" }}>Buy & sell goods worldwide with Pi</p>
          <p className="text-xs mt-1 font-semibold" style={{ color: "#e8e8e8" }}>
            {ITEMS.length}+ active listings
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs"
          style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
        >
          <Plus size={13} />
          List Item
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-3">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
          style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a" }}
        >
          <Search size={15} style={{ color: "#7a8aaa" }} />
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#e8e8e8" }}
          />
          <SlidersHorizontal size={15} style={{ color: "#7a8aaa" }} />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
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

      {/* Grid of items */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        {filtered.length === 0 ? (
          <div className="col-span-2 py-12 text-center" style={{ color: "#7a8aaa" }}>
            No listings found
          </div>
        ) : (
          filtered.map((item) => (
            <TradeCard key={item.id} item={item} onBuy={setSelected} />
          ))
        )}
      </div>

      {/* Buy Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => { setSelected(null); setPaySuccess(false); }}
        title="Purchase with Pi"
        size="sm"
      >
        {selected && (
          <div className="p-5 flex flex-col gap-4">
            {paySuccess ? (
              <div className="py-8 text-center flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: "rgba(38,166,91,0.15)", color: "#26a65b" }}
                >
                  ✓
                </div>
                <p className="font-bold text-sm" style={{ color: "#26a65b" }}>Payment Successful!</p>
                <p className="text-xs" style={{ color: "#7a8aaa" }}>Your order has been placed.</p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl p-3" style={{ backgroundColor: "#141d35" }}>
                  <p className="font-semibold text-sm" style={{ color: "#e8e8e8" }}>{selected.title}</p>
                  <p className="text-xs mt-1" style={{ color: "#7a8aaa" }}>Seller: {selected.seller}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: "#7a8aaa" }}>Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm font-semibold outline-none"
                    style={{ backgroundColor: "#141d35", border: "1px solid #1e2d4a", color: "#e8e8e8" }}
                  />
                </div>

                <div
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}
                >
                  <span className="text-sm" style={{ color: "#7a8aaa" }}>Total</span>
                  <span className="font-bold text-lg" style={{ color: "#c9a84c" }}>
                    {(selected.price * Number(buyAmount)).toFixed(2)} Pi
                  </span>
                </div>

                <div
                  className="rounded-xl p-3 text-xs"
                  style={{ backgroundColor: "#141d35", color: "#7a8aaa" }}
                >
                  Buyer: <span style={{ color: "#e8e8e8" }}>@{userData?.username ?? "you"}</span>
                  {" · "}Balance: <span style={{ color: "#c9a84c" }}>{userData?.credits_balance ?? 0} Pi</span>
                </div>

                <button
                  onClick={handleBuy}
                  disabled={isPaying}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-95 disabled:opacity-60"
                  style={{ backgroundColor: "#c9a84c", color: "#0a0f1e" }}
                >
                  {isPaying ? "Processing..." : `Pay ${(selected.price * Number(buyAmount)).toFixed(2)} Pi`}
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
