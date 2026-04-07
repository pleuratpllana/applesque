import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Trash2, Minus, Plus } from "lucide-react";

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } =
    useStore();
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-[70] shadow-2xl p-6 md:p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-[-0.04em] text-foreground">
                Your Cart
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-secondary rounded-full text-foreground"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-20">
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm font-semibold mt-1 text-foreground">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted"
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
                          className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-accent transition-colors self-start mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-border mt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-xl font-bold tabular-nums text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    toggleCart();
                    navigate("/checkout");
                  }}
                  className="w-full py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity active:scale-[0.98]"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
