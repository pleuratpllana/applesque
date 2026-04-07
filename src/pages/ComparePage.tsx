import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ComparePage = () => {
  const { compare, toggleCompare, clearCompare, addToCart } = useStore();
  const navigate = useNavigate();

  if (compare.length < 2) {
    return (
      <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-muted-foreground mt-20">
            Select at least 2 products to compare.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Browse products
          </button>
        </div>
      </main>
    );
  }

  const specs = [
    {
      label: "Price",
      render: (p: (typeof compare)[0]) => (
        <div>
          {p.onSale && p.salePrice ? (
            <>
              <span className="text-accent font-semibold">${p.salePrice}</span>
              <span className="text-muted-foreground line-through text-xs ml-1">
                ${p.price}
              </span>
            </>
          ) : (
            <span className="font-semibold text-foreground">${p.price}</span>
          )}
        </div>
      ),
    },
    {
      label: "Category",
      render: (p: (typeof compare)[0]) => (
        <span className="text-sm text-muted-foreground capitalize">
          {p.category}
        </span>
      ),
    },
    {
      label: "Status",
      render: (p: (typeof compare)[0]) =>
        p.onSale ? (
          <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            On Sale
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Regular</span>
        ),
    },
    {
      label: "Description",
      render: (p: (typeof compare)[0]) => (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
          {p.description}
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={() => {
              clearCompare();
              navigate("/");
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8">
          Compare Products
        </h1>

        {/* Scrollable comparison table */}
        <div className="overflow-x-auto -mx-4 px-4 pb-4">
          <div className="min-w-600px">
            {/* Product images & names */}
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `120px repeat(${compare.length}, 1fr)`,
              }}
            >
              <div />
              {compare.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center relative"
                >
                  <button
                    onClick={() => toggleCompare(p)}
                    className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-secondary text-muted-foreground hover:text-foreground rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={12} />
                  </button>
                  <div
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="aspect-square bg-surface rounded-xl overflow-hidden mb-3 cursor-pointer hover:ring-2 ring-primary/20 transition-all"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover justify-start align-start ml-0"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                    {p.name}
                  </h3>
                </motion.div>
              ))}
            </div>

            {/* Spec rows */}
            <div className="mt-6 border-t border-border">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid gap-4 py-4 items-start ${i < specs.length - 1 ? "border-b border-border" : ""}`}
                  style={{
                    gridTemplateColumns: `120px repeat(${compare.length}, 1fr)`,
                  }}
                >
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium pt-0.5">
                    {spec.label}
                  </span>
                  {compare.map((p) => (
                    <div key={p.id}>{spec.render(p)}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Add to cart row */}
            <div
              className="grid gap-4 pt-6"
              style={{
                gridTemplateColumns: `120px repeat(${compare.length}, 1fr)`,
              }}
            >
              <div />
              {compare.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    addToCart(p);
                    toast.success("Added to cart", { description: p.name });
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold hover:opacity-90 transition-opacity active:scale-[0.98]"
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComparePage;
