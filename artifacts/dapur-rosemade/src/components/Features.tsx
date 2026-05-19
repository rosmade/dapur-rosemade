import { motion } from "framer-motion";

const features = [
  {
    emoji: "🥬",
    title: "Bahan Segar",
    desc: "Dipilih langsung setiap hari dari pasar tradisional untuk menjaga kualitas dan kesegaran.",
  },
  {
    emoji: "🍳",
    title: "Dimasak Sendiri",
    desc: "Bukan pabrik, murni tangan. Setiap porsi dimasak dengan perhatian penuh.",
  },
  {
    emoji: "💝",
    title: "Penuh Kasih",
    desc: "Seperti masakan ibu — hangat, familiar, dan dibuat dengan sepenuh hati.",
  },
];

export function Features() {
  return (
    <section id="tentang" className="py-20 bg-background" data-testid="features-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-medium uppercase tracking-wide text-sm mb-2">
            Tentang Kami
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Keunggulan Dapur Rosemade
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-testid={`feature-card-${i}`}
            >
              <div className="text-5xl mb-5">{f.emoji}</div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
