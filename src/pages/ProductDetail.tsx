import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/store/useStore";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id);
  const cartItem = cart.find((item) => item.id === id);
  const wished = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-svh flex items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const effectivePrice =
    product.onSale && product.salePrice ? product.salePrice : product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart`, {
      description: product.name,
    });
    setQuantity(1);
  };

  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="aspect-4/5 bg-surface rounded-2xl overflow-hidden relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.onSale && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                Sale
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-foreground mb-4">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <p className="text-2xl font-semibold tabular-nums text-foreground">
                ${effectivePrice}
              </p>
              {product.onSale && product.salePrice && (
                <p className="text-lg text-muted-foreground line-through tabular-nums">
                  ${product.price}
                </p>
              )}
            </div>

            {/* Quantity control + Add to cart */}
            {cartItem ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3 bg-secondary rounded-full px-2 py-1.5">
                  <button
                    onClick={() => {
                      updateQuantity(product.id, cartItem.quantity - 1);
                      if (cartItem.quantity <= 1) {
                        toast("Removed from cart", {
                          description: product.name,
                        });
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-semibold tabular-nums w-6 text-center text-foreground">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, cartItem.quantity + 1)
                    }
                    className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(product.id);
                    toast("Removed from cart", { description: product.name });
                  }}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors underline underline-offset-4"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                {/* Modern quantity selector */}
                <div className="flex items-center bg-secondary rounded-full px-1.5 py-1.5 self-start">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-sm font-semibold tabular-nums w-10 text-center text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
                >
                  <ShoppingBag size={18} className="shrink-0" />
                  <span className="truncate">Add to Cart</span>
                  <span className="hidden xs:inline">—</span>
                  <span className="tabular-nums">
                    ${(effectivePrice * quantity).toFixed(0)}
                  </span>
                </button>
              </div>
            )}

            {/* Wishlist button */}
            <button
              onClick={() => {
                toggleWishlist(product);
                toast(wished ? "Removed from wishlist" : "Added to wishlist", {
                  description: product.name,
                });
              }}
              className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full text-sm font-medium transition-all mb-8 ${
                wished
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              <Heart size={16} className={wished ? "fill-current" : ""} />
              {wished ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            {/* Accordions */}
            <Accordion
              type="multiple"
              defaultValue={["description"]}
              className="w-full"
            >
              <AccordionItem value="description">
                <AccordionTrigger className="text-sm font-semibold text-foreground">
                  Description
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-semibold text-foreground">
                  <span className="flex items-center gap-2">
                    <Truck size={15} className="text-muted-foreground" />
                    Shipping & Delivery
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>Free standard shipping on orders over $100</li>
                    <li>Express shipping available (2-3 business days)</li>
                    <li>International shipping to select countries</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="returns">
                <AccordionTrigger className="text-sm font-semibold text-foreground">
                  <span className="flex items-center gap-2">
                    <RotateCcw size={15} className="text-muted-foreground" />
                    Returns & Exchanges
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>30-day return policy for unused items</li>
                    <li>Free returns on all domestic orders</li>
                    <li>Exchange for different size or color</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warranty" className="border-b-0">
                <AccordionTrigger className="text-sm font-semibold text-foreground">
                  <span className="flex items-center gap-2">
                    <Shield size={15} className="text-muted-foreground" />
                    Warranty
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>2-year manufacturer warranty</li>
                    <li>Coverage for material and craftsmanship defects</li>
                    <li>Extended warranty available at checkout</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
