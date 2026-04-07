import { SALE_PRODUCTS } from "@/data/products";
import InfiniteProductGrid from "@/components/shop/InfiniteProductGrid";

const SalePage = () => {
  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-12 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] text-foreground mb-2">
            Sale
          </h1>
          <p className="text-muted-foreground">Selected pieces at reduced prices. While stocks last.</p>
          <div className="h-px w-full bg-border mt-4" />
        </header>

        <InfiniteProductGrid sourceOverride={SALE_PRODUCTS} />
      </section>
    </main>
  );
};

export default SalePage;
