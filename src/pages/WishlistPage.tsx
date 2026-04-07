import { useStore } from "@/store/useStore";
import ProductCard from "@/components/shop/ProductCard";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const WishlistPage = () => {
  const { wishlist } = useStore();
  const navigate = useNavigate();

  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-12 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground mb-2">
            Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}
          </p>
          <div className="h-px w-full bg-border mt-4" />
        </header>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default WishlistPage;
