import { CATEGORIES } from "@/data/products";
import { PRODUCTS } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

const CATEGORY_IMAGES: Record<string, string> = {
  Furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600",
  Lighting:
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
  Home: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600",
  Accessories:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
  Kitchen:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
  Audio:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
  Office:
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600",
};

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useStore();
  const categories = CATEGORIES.filter((c) => c !== "All");

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    navigate("/");
  };

  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-12 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground mb-2">
            Categories
          </h1>
          <p className="text-muted-foreground">Browse by collection</p>
          <div className="h-px w-full bg-border mt-4" />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const count = PRODUCTS.filter((p) => p.category === cat).length;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => handleCategoryClick(cat)}
                className="group relative aspect-3/2 rounded-2xl overflow-hidden text-left"
              >
                <img
                  src={CATEGORY_IMAGES[cat]}
                  alt={cat}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-apple-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {cat}
                  </h2>
                  <p className="text-white/70 text-sm mt-1">
                    {count} product{count !== 1 ? "s" : ""}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;
