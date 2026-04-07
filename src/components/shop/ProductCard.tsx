import { motion } from "framer-motion";
import { useStore, Product } from "@/store/useStore";
import { Plus, Heart, GitCompareArrows } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const toggleCompare = useStore((state) => state.toggleCompare);
  const compare = useStore((state) => state.compare);
  const navigate = useNavigate();
  const isWished = wishlist.some((p) => p.id === product.id);
  const isCompared = compare.some((p) => p.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="group relative"
    >
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="block w-full text-left"
      >
        <div className="aspect-4/5 overflow-hidden bg-surface rounded-xl relative mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 ease-apple-out group-hover:scale-105"
            loading="lazy"
          />
          {product.onSale && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider rounded-full">
              Sale
            </span>
          )}
        </div>
      </button>

      {/* Wishlist button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
          toast(isWished ? "Removed from wishlist" : "Added to wishlist", {
            description: product.name,
          });
        }}
        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          isWished
            ? "bg-accent text-accent-foreground shadow-steel"
            : "bg-background/70 backdrop-blur-sm text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-accent"
        }`}
      >
        <Heart size={16} className={isWished ? "fill-current" : ""} />
      </button>

      {/* Compare button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isCompared && compare.length >= 4) {
            toast.error("Compare limit reached", {
              description: "Remove a product first (max 4)",
            });
            return;
          }
          toggleCompare(product);
          toast(isCompared ? "Removed from compare" : "Added to compare", {
            description: product.name,
          });
        }}
        className={`absolute top-3 right-14 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          isCompared
            ? "bg-primary text-primary-foreground shadow-steel"
            : "bg-background/70 backdrop-blur-sm text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary"
        }`}
      >
        <GitCompareArrows size={15} />
      </button>

      {/* Add to cart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
          toast.success("Added to cart", {
            description: product.name,
          });
        }}
        className="absolute bottom-[72px] right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-steel opacity-0 translate-y-2 transition-all duration-300 ease-apple-out group-hover:opacity-100 group-hover:translate-y-0 active:scale-90"
      >
        <Plus size={18} />
      </button>

      <div className="flex justify-between items-start px-0.5">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
            {product.category}
          </p>
        </div>
        <div className="text-right">
          {product.onSale && product.salePrice ? (
            <>
              <p className="text-sm font-semibold tabular-nums text-accent">
                ${product.salePrice}
              </p>
              <p className="text-xs text-muted-foreground line-through tabular-nums">
                ${product.price}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold tabular-nums text-foreground">
              ${product.price}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
