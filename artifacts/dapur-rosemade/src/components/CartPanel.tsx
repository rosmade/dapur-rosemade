import React from "react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartPanel() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    setIsOrderModalOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[360px] bg-card shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 sm:slide-in-from-bottom md:slide-in-from-right">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-serif text-2xl font-bold text-foreground">🛒 Pesananmu</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:bg-accent/50 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <span className="text-6xl">🛒</span>
              <p className="text-muted-foreground">Keranjangmu masih kosong~</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center p-3 border border-border rounded-xl bg-background/50">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-2xl">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                  <div className="font-bold text-sm text-foreground">{formatRupiah(item.price * item.quantity)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-primary rounded-full px-1">
                    <button
                      className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-primary/10 rounded-full transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-primary">
                      {item.quantity}
                    </span>
                    <button
                      className="w-6 h-6 flex items-center justify-center text-primary font-bold hover:bg-primary/10 rounded-full transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-primary hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border bg-card">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-muted-foreground">Total:</span>
              <span className="font-serif text-xl font-bold text-foreground">{formatRupiah(totalPrice)}</span>
            </div>
            <Button
              className="w-full rounded-full h-12 text-md font-semibold"
              onClick={() => {
                setIsCartOpen(false);
                setIsOrderModalOpen(true);
              }}
            >
              Pesan via WhatsApp 💬
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
