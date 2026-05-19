const STORAGE_KEY = "dapur_rosemade_orders";

export type OrderItem = {
  name: string;
  emoji: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  name: string;
  whatsapp: string;
  address: string;
  payment: string;
  notes: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
};

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Omit<Order, "id" | "createdAt">): Order {
  const newOrder: Order = {
    ...order,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const existing = loadOrders();
  const updated = [newOrder, ...existing].slice(0, 100); // keep latest 100
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newOrder;
}

export function clearOrders(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatOrderDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }) + " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}
