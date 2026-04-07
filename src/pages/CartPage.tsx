import { useStore } from "@/store/useStore";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground mb-8">
          Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-0 divide-y divide-border">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 py-6"
                >
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-24 h-28 bg-surface rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt={item.name}
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                      {item.category}
                    </p>
                    <p className="text-sm font-semibold mt-2 text-foreground">
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm tabular-nums w-6 text-center font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span className="font-semibold tabular-nums text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-6">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-bold tabular-nums text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Checkout
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Orders ship within 24 hours. 30-day guarantee.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CartPage;
