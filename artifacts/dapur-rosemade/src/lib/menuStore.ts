import { useState, useEffect } from "react";

export type MenuItem = {
  id: number;
  emoji: string;
  name: string;
  desc: string;
  price: number;
  badge: string | null;
  soldOut: boolean;
};

const STORAGE_KEY = "dapur_rosemade_menu";

const defaultMenu: MenuItem[] = [
  { id: 1, emoji: "🍱", name: "Nasi Ayam Bumbu Kuning", desc: "Ayam kampung dengan bumbu kuning khas", price: 25000, badge: "Best Seller", soldOut: false },
  { id: 2, emoji: "🥘", name: "Rendang Daging Sapi", desc: "Rendang empuk bumbu rempah pilihan", price: 35000, badge: "Best Seller", soldOut: false },
  { id: 3, emoji: "🍜", name: "Mie Goreng Spesial", desc: "Mie goreng dengan topping komplit", price: 20000, badge: null, soldOut: false },
  { id: 4, emoji: "🥗", name: "Gado-Gado Segar", desc: "Sayuran segar dengan bumbu kacang spesial", price: 18000, badge: "Baru", soldOut: false },
  { id: 5, emoji: "🍛", name: "Nasi Gudeg Komplit", desc: "Gudeg Jogja dengan krecek dan ayam", price: 28000, badge: null, soldOut: false },
  { id: 6, emoji: "🥩", name: "Semur Daging Kentang", desc: "Daging empuk dengan kuah semur kental", price: 30000, badge: "Baru", soldOut: false },
  { id: 7, emoji: "🍲", name: "Soto Ayam Lamongan", desc: "Soto bening dengan ayam suwir dan lontong", price: 22000, badge: null, soldOut: false },
  { id: 8, emoji: "🥞", name: "Martabak Telur Mini", desc: "Martabak gurih isi daging dan telur", price: 15000, badge: null, soldOut: false },
  { id: 9, emoji: "🍮", name: "Klepon Ubi Ungu", desc: "Klepon lembut isi gula merah cair", price: 12000, badge: "Baru", soldOut: false },
];

export function loadMenu(): MenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultMenu;
    const parsed = JSON.parse(raw) as MenuItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultMenu;
    // Migrate old items that don't have soldOut field
    return parsed.map((m) => ({ ...m, soldOut: m.soldOut ?? false }));
  } catch {
    return defaultMenu;
  }
}

export function saveMenu(menu: MenuItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
}

export function getNextId(menu: MenuItem[]): number {
  return menu.length > 0 ? Math.max(...menu.map((m) => m.id)) + 1 : 1;
}

export function useMenuStore() {
  const [menu, setMenu] = useState<MenuItem[]>(loadMenu);

  useEffect(() => {
    saveMenu(menu);
  }, [menu]);

  const addItem = (item: Omit<MenuItem, "id">) => {
    setMenu((prev) => [...prev, { ...item, id: getNextId(prev) }]);
  };

  const updateItem = (id: number, updates: Partial<Omit<MenuItem, "id">>) => {
    setMenu((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteItem = (id: number) => {
    setMenu((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleSoldOut = (id: number) => {
    setMenu((prev) =>
      prev.map((m) => (m.id === id ? { ...m, soldOut: !m.soldOut } : m))
    );
  };

  return { menu, addItem, updateItem, deleteItem, toggleSoldOut };
}
