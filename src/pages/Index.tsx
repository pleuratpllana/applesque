import FilterBar from "@/components/shop/FilterBar";
import InfiniteProductGrid from "@/components/shop/InfiniteProductGrid";

const Index = () => {
  return (
    <main className="min-h-svh pt-20 md:pt-24 pb-28 md:pb-12">
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="mb-6 md:mb-12 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-6xl font-bold tracking-[-0.04em] text-foreground mb-4">
            Essential objects for the{" "}
            <span className="text-muted-foreground italic">modern</span> space.
          </h1>
          <div className="h-px w-full bg-border" />
        </header>

        <FilterBar />
        <InfiniteProductGrid />
      </section>
    </main>
  );
};

export default Index;
