import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#3D1525] text-[#F2C4D0] py-12" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#F2C4D0] mb-2">
              Dapur Rosemade 🌹
            </h3>
            <p className="text-[#F2C4D0]/70 text-sm leading-relaxed mb-4">
              Masakan rumahan buatan tangan, penuh kasih sayang.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#F2C4D0]/10 hover:bg-[#C96A8A] rounded-full flex items-center justify-center transition-colors"
                data-testid="instagram-link"
              >
                <FaInstagram className="h-4 w-4 text-[#F2C4D0]" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#F2C4D0]/10 hover:bg-[#C96A8A] rounded-full flex items-center justify-center transition-colors"
                data-testid="tiktok-link"
              >
                <FaTiktok className="h-4 w-4 text-[#F2C4D0]" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#F2C4D0]/10 hover:bg-[#C96A8A] rounded-full flex items-center justify-center transition-colors"
                data-testid="whatsapp-link"
              >
                <FaWhatsapp className="h-4 w-4 text-[#F2C4D0]" />
              </a>
            </div>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#F2C4D0] mb-4">Jam Operasional</h4>
            <p className="text-[#F2C4D0]/70 text-sm">Senin – Sabtu</p>
            <p className="text-[#F2C4D0] font-semibold">08.00 – 20.00 WIB</p>
            <p className="text-[#F2C4D0]/50 text-sm mt-2">Minggu & Hari Libur: Tutup</p>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#F2C4D0] mb-4">Hubungi Kami</h4>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C96A8A] hover:bg-[#8B4560] text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
              data-testid="footer-wa-button"
            >
              <FaWhatsapp className="h-4 w-4" />
              Chat WhatsApp
            </a>
            <p className="text-[#F2C4D0]/50 text-xs mt-4">
              Pesan sebelum jam 17.00 untuk pengiriman hari yang sama.
            </p>
          </div>
        </div>

        <div className="border-t border-[#F2C4D0]/10 mt-10 pt-6 text-center">
          <p className="text-[#F2C4D0]/50 text-sm">
            © 2025 Dapur Rosemade. Dibuat dengan 💝
          </p>
        </div>
      </div>
    </footer>
  );
}
