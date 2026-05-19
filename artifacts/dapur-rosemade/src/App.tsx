import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MenuSection } from "@/components/MenuSection";
import { CartPanel } from "@/components/CartPanel";
import { OrderModal } from "@/components/OrderModal";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>
              <Hero />
              <Features />
              <MenuSection />
            </main>
            <Footer />
            <CartPanel />
            <OrderModal />
          </div>
        </CartProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
