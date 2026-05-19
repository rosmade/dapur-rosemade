import { useState } from "react";
import { useMenuStore, type MenuItem } from "@/lib/menuStore";
import { formatRupiah } from "@/lib/utils";
import { Pencil, Trash2, Plus, LogOut, ChefHat, Check, X } from "lucide-react";

const ADMIN_PASSWORD = "dapurmamaros123";

type FormState = {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  badge: string;
};

const emptyForm: FormState = {
  emoji: "🍱",
  name: "",
  desc: "",
  price: "",
  badge: "",
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Password salah. Coba lagi.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex items-center justify-center px-4">
      <div className="bg-white border border-[#F2C4D0] rounded-2xl shadow-md p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-[#F2C4D0] rounded-full flex items-center justify-center mb-3">
            <ChefHat className="h-7 w-7 text-[#C96A8A]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#3D1525]">Admin Panel</h1>
          <p className="text-[#7D5060] text-sm mt-1">Dapur Rosemade</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#3D1525] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Masukkan password admin"
              className="w-full border border-[#F2C4D0] focus:border-[#C96A8A] focus:outline-none rounded-xl px-4 py-2.5 text-[#3D1525] placeholder:text-[#7D5060]/50"
              data-testid="admin-password-input"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#C96A8A] hover:bg-[#8B4560] text-white font-semibold py-2.5 rounded-full transition-colors"
            data-testid="admin-login-button"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

function MenuForm({
  initial,
  onSave,
  onCancel,
  isEdit,
}: {
  initial: FormState;
  onSave: (f: FormState) => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Nama tidak boleh kosong";
    if (!form.emoji.trim()) e.emoji = "Emoji tidak boleh kosong";
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Harga harus berupa angka positif";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  const field = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-[#3D1525] mb-1 block">Emoji</label>
          <input
            value={form.emoji}
            onChange={(e) => field("emoji", e.target.value)}
            className="w-full border border-[#F2C4D0] focus:border-[#C96A8A] focus:outline-none rounded-xl px-3 py-2 text-center text-xl"
            maxLength={4}
          />
          {errors.emoji && <p className="text-red-500 text-xs mt-0.5">{errors.emoji}</p>}
        </div>
        <div className="col-span-2">
          <label className="text-xs font-medium text-[#3D1525] mb-1 block">Nama Menu*</label>
          <input
            value={form.name}
            onChange={(e) => field("name", e.target.value)}
            placeholder="Nama makanan"
            className="w-full border border-[#F2C4D0] focus:border-[#C96A8A] focus:outline-none rounded-xl px-3 py-2 text-[#3D1525] text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-[#3D1525] mb-1 block">Deskripsi Singkat</label>
        <input
          value={form.desc}
          onChange={(e) => field("desc", e.target.value)}
          placeholder="1 kalimat singkat tentang menu ini"
          className="w-full border border-[#F2C4D0] focus:border-[#C96A8A] focus:outline-none rounded-xl px-3 py-2 text-[#3D1525] text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-[#3D1525] mb-1 block">Harga (Rp)*</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => field("price", e.target.value)}
            placeholder="25000"
            min="0"
            className="w-full border border-[#F2C4D0] focus:border-[#C96A8A] focus:outline-none rounded-xl px-3 py-2 text-[#3D1525] text-sm"
          />
          {errors.price && <p className="text-red-500 text-xs mt-0.5">{errors.price}</p>}
        </div>
        <div>
          <label className="text-xs font-medium text-[#3D1525] mb-1 block">Badge</label>
          <select
            value={form.badge}
            onChange={(e) => field("badge", e.target.value)}
            className="w-full border border-[#F2C4D0] focus:border-[#C96A8A] focus:outline-none rounded-xl px-3 py-2 text-[#3D1525] text-sm bg-white"
          >
            <option value="">Tidak ada</option>
            <option value="Best Seller">Best Seller</option>
            <option value="Baru">Baru</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex items-center gap-1.5 bg-[#C96A8A] hover:bg-[#8B4560] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
        >
          <Check className="h-4 w-4" />
          {isEdit ? "Simpan" : "Tambah Menu"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 border border-[#F2C4D0] text-[#7D5060] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#FFF0F5] transition-colors"
        >
          <X className="h-4 w-4" />
          Batal
        </button>
      </div>
    </form>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { menu, addItem, updateItem, deleteItem } = useMenuStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleAdd = (form: FormState) => {
    addItem({
      emoji: form.emoji,
      name: form.name.trim(),
      desc: form.desc.trim(),
      price: Number(form.price),
      badge: form.badge || null,
    });
    setShowAddForm(false);
  };

  const handleEdit = (id: number, form: FormState) => {
    updateItem(id, {
      emoji: form.emoji,
      name: form.name.trim(),
      desc: form.desc.trim(),
      price: Number(form.price),
      badge: form.badge || null,
    });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    deleteItem(id);
    setDeleteConfirmId(null);
  };

  const itemToForm = (item: MenuItem): FormState => ({
    emoji: item.emoji,
    name: item.name,
    desc: item.desc,
    price: String(item.price),
    badge: item.badge ?? "",
  });

  return (
    <div className="min-h-screen bg-[#FFF0F5]">
      {/* Header */}
      <div className="bg-white border-b border-[#F2C4D0] px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#F2C4D0] rounded-full flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-[#C96A8A]" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-[#3D1525] text-lg leading-none">Admin Panel</h1>
            <p className="text-[#7D5060] text-xs">Dapur Rosemade</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-[#7D5060] hover:text-[#C96A8A] text-sm font-medium transition-colors"
          data-testid="admin-logout"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-[#F2C4D0] rounded-xl p-4 text-center">
            <div className="font-serif font-bold text-2xl text-[#C96A8A]">{menu.length}</div>
            <div className="text-[#7D5060] text-xs mt-0.5">Total Menu</div>
          </div>
          <div className="bg-white border border-[#F2C4D0] rounded-xl p-4 text-center">
            <div className="font-serif font-bold text-2xl text-[#C96A8A]">
              {menu.filter((m) => m.badge === "Best Seller").length}
            </div>
            <div className="text-[#7D5060] text-xs mt-0.5">Best Seller</div>
          </div>
          <div className="bg-white border border-[#F2C4D0] rounded-xl p-4 text-center">
            <div className="font-serif font-bold text-2xl text-[#C96A8A]">
              {menu.filter((m) => m.badge === "Baru").length}
            </div>
            <div className="text-[#7D5060] text-xs mt-0.5">Menu Baru</div>
          </div>
        </div>

        {/* Menu list */}
        <div className="bg-white border border-[#F2C4D0] rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2C4D0]">
            <h2 className="font-serif font-bold text-[#3D1525] text-lg">Daftar Menu</h2>
            {!showAddForm && (
              <button
                onClick={() => { setShowAddForm(true); setEditingId(null); }}
                className="flex items-center gap-1.5 bg-[#C96A8A] hover:bg-[#8B4560] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                data-testid="add-menu-button"
              >
                <Plus className="h-4 w-4" />
                Tambah Menu
              </button>
            )}
          </div>

          {/* Add form */}
          {showAddForm && (
            <div className="px-5 py-5 border-b border-[#F2C4D0] bg-[#FFF0F5]">
              <h3 className="font-semibold text-[#3D1525] mb-3 text-sm">Menu Baru</h3>
              <MenuForm
                initial={emptyForm}
                onSave={handleAdd}
                onCancel={() => setShowAddForm(false)}
                isEdit={false}
              />
            </div>
          )}

          {/* Items */}
          <div className="divide-y divide-[#F2C4D0]">
            {menu.length === 0 && (
              <div className="py-12 text-center text-[#7D5060]">
                Belum ada menu. Tambahkan menu pertamamu!
              </div>
            )}
            {menu.map((item) => (
              <div key={item.id} data-testid={`admin-menu-item-${item.id}`}>
                {editingId === item.id ? (
                  <div className="px-5 py-5 bg-[#FFF0F5]">
                    <h3 className="font-semibold text-[#3D1525] mb-3 text-sm">Edit Menu</h3>
                    <MenuForm
                      initial={itemToForm(item)}
                      onSave={(form) => handleEdit(item.id, form)}
                      onCancel={() => setEditingId(null)}
                      isEdit
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-5 py-4">
                    <div className="w-11 h-11 bg-[#F2C4D0] rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#3D1525] text-sm truncate">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-xs font-bold text-white px-2 py-0.5 rounded-full shrink-0 ${
                              item.badge === "Best Seller" ? "bg-[#C96A8A]" : "bg-[#8B4560]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[#7D5060] text-xs mt-0.5 truncate">{item.desc || "—"}</div>
                      <div className="font-semibold text-[#C96A8A] text-sm mt-0.5">{formatRupiah(item.price)}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => { setEditingId(item.id); setShowAddForm(false); }}
                        className="p-2 text-[#7D5060] hover:text-[#C96A8A] hover:bg-[#FFF0F5] rounded-lg transition-colors"
                        title="Edit"
                        data-testid={`edit-menu-${item.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-full transition-colors"
                            data-testid={`confirm-delete-${item.id}`}
                          >
                            Hapus
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-xs border border-[#F2C4D0] text-[#7D5060] px-2.5 py-1.5 rounded-full hover:bg-[#FFF0F5] transition-colors"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-2 text-[#7D5060] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                          data-testid={`delete-menu-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#7D5060]/50 text-xs mt-6">
          Data tersimpan otomatis di browser ini.
        </p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });

  const handleLogin = () => {
    sessionStorage.setItem("admin_auth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <LoginScreen onLogin={handleLogin} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
