import { motion } from "framer-motion";
import heroImage from "@assets/Gemini_Generated_Image_9kx3gt9kx3gt9kx3_1779205214874.png";

export function Hero() {
  const handleScrollToMenu = () => {
    const el = document.querySelector("#menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="beranda"
      className="min-h-screen bg-background flex items-center pt-16"
      data-testid="hero-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        {/* Text side */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4">
            Homemade · Segar · Penuh Cinta
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Masakan Rumahan,<br />
            <span className="text-primary">Rasa Penuh Cinta</span> 🍱
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
            Setiap masakan dibuat dengan bahan pilihan segar, tanpa pengawet, langsung dari dapur kami untuk meja makanmu.
          </p>
          <button
            onClick={handleScrollToMenu}
            className="inline-flex items-center gap-2 bg-primary hover:bg-[#8B4560] text-primary-foreground font-semibold px-8 py-3.5 rounded-full transition-colors duration-200 text-base shadow-md hover:shadow-lg"
            data-testid="hero-cta"
          >
            Lihat Menu
          </button>

          <div className="flex items-center gap-6 mt-10 justify-center md:justify-start">
            <div className="text-center">
              <div className="font-serif font-bold text-2xl text-foreground">50+</div>
              <div className="text-muted-foreground text-sm">Menu Tersedia</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="font-serif font-bold text-2xl text-foreground">500+</div>
              <div className="text-muted-foreground text-sm">Pelanggan Puas</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="font-serif font-bold text-2xl text-foreground">3+</div>
              <div className="text-muted-foreground text-sm">Tahun Melayani</div>
            </div>
          </div>
        </motion.div>

        {/* Decorative side */}
        <motion.div
          className="flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Hero image */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl border-4 border-accent">
              <img
                src={heroImage}
                alt="Dapur Rosemade Chef"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-lg px-4 py-2 border border-border">
              <p className="font-serif text-sm font-semibold text-foreground">Tanpa Pengawet</p>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary rounded-2xl shadow-lg px-4 py-2">
              <p className="text-sm font-semibold text-primary-foreground">100% Homemade</p>
            </div>
            {/* Decorative accents */}
            <div className="absolute top-4 -left-8 text-2xl">🌹</div>
            <div className="absolute bottom-12 -right-6 text-xl">✨</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
