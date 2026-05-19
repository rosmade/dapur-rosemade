import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const orderSchema = z.object({
  name: z.string().min(2, "Nama harus diisi"),
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  address: z.string().min(10, "Alamat lengkap harus diisi"),
  notes: z.string().optional(),
  payment: z.enum(["BCA", "BRI", "GoPay/OVO", "COD"], {
    required_error: "Pilih metode pembayaran",
  }),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export function OrderModal() {
  const { cart, totalPrice, isOrderModalOpen, setIsOrderModalOpen, clearCart } =
    useCart();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      address: "",
      notes: "",
      payment: undefined,
    },
  });

  if (!isOrderModalOpen) return null;

  const onSubmit = (data: OrderFormValues) => {
    let orderList = cart
      .map((item) => `- ${item.quantity}x ${item.name} (${formatRupiah(item.price * item.quantity)})`)
      .join("\n");

    const text = `*Pesanan Baru Dapur Rosemade* 🌹\n\n*Nama:* ${data.name}\n*No. WA:* ${data.whatsapp}\n*Alamat:* ${data.address}\n*Catatan:* ${data.notes || "-"}\n*Pembayaran:* ${data.payment}\n\n*Detail Pesanan:*\n${orderList}\n\n*Total: ${formatRupiah(totalPrice)}*\n\nMohon segera diproses, terima kasih! 💝`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/6281234567890?text=${encodedText}`, "_blank");
    
    clearCart();
    setIsOrderModalOpen(false);
    form.reset();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#3D1525]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={() => setIsOrderModalOpen(false)}
      >
        <div
          className="bg-card w-full max-w-[480px] rounded-3xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
            <h2 className="font-serif text-2xl font-bold text-foreground">Detail Pemesanan 📋</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOrderModalOpen(false)}
              className="text-muted-foreground hover:bg-accent/50 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nama Lengkap*</FormLabel>
                      <FormControl>
                        <Input placeholder="Tulis nama lengkapmu..." {...field} className="rounded-xl border-border focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nomor WhatsApp*</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="08xx-xxxx-xxxx" {...field} className="rounded-xl border-border focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Alamat Pengiriman*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detail alamat (jalan, RT/RW, patokan)..."
                          className="resize-none rounded-xl border-border focus-visible:ring-primary"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Catatan Tambahan (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Misal: tidak pedas, tanpa kecap..."
                          className="resize-none rounded-xl border-border focus-visible:ring-primary"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground">Metode Pembayaran*</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          {["BCA", "BRI", "GoPay/OVO", "COD"].map((method) => (
                            <div key={method} className="flex items-center space-x-3 bg-accent/20 p-3 rounded-xl border border-border">
                              <RadioGroupItem value={method} id={method} className="text-primary border-primary" />
                              <Label htmlFor={method} className="font-medium cursor-pointer flex-1">
                                {method === "COD" ? "COD (Bayar di Tempat)" : `Transfer ${method}`}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t border-border mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total Pesanan:</span>
                    <span className="font-serif text-xl font-bold text-foreground">{formatRupiah(totalPrice)}</span>
                  </div>
                  <Button type="submit" className="w-full rounded-full h-12 text-md font-bold">
                    Kirim ke WhatsApp 🚀
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
