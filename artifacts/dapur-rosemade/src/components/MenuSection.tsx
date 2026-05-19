import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";
import { type MenuItem, useMenuStore } from "@/lib/menuStore";

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className={`bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-200 ${
        item.soldOut
          ? "opacity-60 grayscale"
          : "hover:-translate-y-1 hover:shadow-md"
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      data-testid={`menu-card-${item.id}`}
    >
      {/* Image area */}
      <div className="bg-accent h-36 flex items-center justify-center relative">
        <span className="text-6xl select-none">{item.emoji}</span>

        {/* Sold out overlay */}
        {item.soldOut && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full">
              Habis
            </span>
          </div>
        )}

        {/* Badge (only show if not sold out) */}
        {item.badge && !item.soldOut && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold text-primary-foreground px-2.5 py-1 rounded-full ${
              item.badge === "Best Seller" ? "bg-primary" : "bg-[#8B4560]"
            }`}
            data-testid={`badge-${item.id}`}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-1 text-base leading-snug">{item.name}</h3>
        <p className="text-muted-foreground text-xs mb-3 flex-1 line-clamp-1">{item.desc}</p>
        <div className="flex items-center justify-between mt-auto gap-3">
          <span className="font-serif font-bold text-foreground text-base" data-testid={`price-${item.id}`}>
            {formatRupiah(item.price)}
          </span>
          {item.soldOut ? (
            <span className="text-sm text-muted-foreground font-medium px-4 py-2 border border-border rounded-full">
              Habis
            </span>
          ) : (
            <button
              className="bg-primary hover:bg-[#8B4560] text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap"
              onClick={() => addToCart(item)}
              data-testid={`add-to-cart-${item.id}`}
            >
              + Tambah
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function MenuSection() {
  const { menu } = useMenuStore();

  return (
    <section id="menu" className="py-20 bg-secondary/30" data-testid="menu-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-medium uppercase tracking-wide text-sm mb-2">
            Pilihan Terbaik
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Menu Hari Ini
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Semua menu dimasak segar setiap hari — tanpa bahan pengawet, penuh cita rasa.
          </p>
        </motion.div>

        {menu.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <span className="text-5xl block mb-4">🍽️</span>
            <p>Menu sedang dipersiapkan. Pantau terus!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {menu.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
