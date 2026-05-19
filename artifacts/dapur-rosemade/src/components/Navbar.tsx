import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Menu", href: "#menu" },
  { label: "Tentang Kami", href: "#tentang" },
];

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 bg-card transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#beranda"
          onClick={(e) => { e.preventDefault(); handleNavClick("#beranda"); }}
          className="flex items-center gap-2 text-foreground no-underline"
          data-testid="logo"
        >
          <span className="text-xl">🌹</span>
          <span className="font-serif text-xl font-bold text-foreground">Dapur Rosemade</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 no-underline"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Cart icon + hamburger */}
        <div className="flex items-center gap-3">
          <button
            className="relative p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-accent"
            onClick={() => setIsCartOpen(true)}
            data-testid="cart-button"
            aria-label="Buka keranjang"
          >
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                data-testid="cart-badge"
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="hamburger-button"
            aria-label="Menu navigasi"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-foreground hover:text-primary font-medium py-2 transition-colors no-underline"
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
