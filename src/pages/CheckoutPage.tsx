import { useState } from "react";
import { useStore } from "@/store/useStore";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { cart } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      (item.onSale && item.salePrice ? item.salePrice : item.price) *
        item.quantity,
    0,
  );
  const shipping = subtotal > 200 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Order placed successfully!", {
      description:
        "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center py-20">
          <p className="text-muted-foreground mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Shipping Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Contact */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Contact
              </h2>
              <InputField
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="First name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <InputField
                    label="Last name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                </div>
                <InputField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={errors.address}
                />
                <InputField
                  label="Apartment, suite, etc. (optional)"
                  name="apartment"
                  value={form.apartment}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <InputField
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    error={errors.city}
                  />
                  <InputField
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    error={errors.state}
                  />
                  <InputField
                    label="ZIP code"
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    error={errors.zip}
                  />
                </div>
                <InputField
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} /> Secure checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={14} /> Free shipping over $200
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw size={14} /> 30-day returns
              </span>
            </div>

            {/* Submit — visible on mobile below form */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-[0.98] lg:hidden"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </motion.form>

          {/* Order Summary Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="lg:sticky lg:top-24 bg-secondary/50 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemPrice =
                    item.onSale && item.salePrice ? item.salePrice : item.price;
                  return (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-20 bg-surface rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          {item.category}
                        </p>
                      </div>
                      <p className="text-sm font-semibold tabular-nums text-foreground whitespace-nowrap">
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {shipping === 0 ? (
                      <span className="text-accent font-medium">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="tabular-nums">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold tabular-nums text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Submit — desktop only */}
              <button
                type="button"
                onClick={() => {
                  const formEl = document.querySelector("form");
                  if (formEl) formEl.requestSubmit();
                }}
                className="hidden lg:block w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Place Order
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Orders ship within 24 hours. 30-day guarantee.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
};

/* ─── Reusable input ─── */
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: InputFieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="text-sm font-medium text-foreground">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
        error ? "border-accent" : "border-border"
      }`}
    />
    {error && <p className="text-xs text-accent">{error}</p>}
  </div>
);

export default CheckoutPage;
