import { useInfiniteQuery } from "@tanstack/react-query";
import { useStore } from "@/store/useStore";
import { PRODUCTS, PRICE_RANGES, type SortOption } from "@/data/products";
import { useMemo } from "react";

const PAGE_SIZE = 8;

function getFilteredProducts(
  searchQuery: string,
  selectedCategory: string,
  sortBy: string,
  priceRange: string,
  source = PRODUCTS
) {
  let result = [...source];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (selectedCategory !== "All") {
    result = result.filter((p) => p.category === selectedCategory);
  }

  if (priceRange !== "all") {
    const range = PRICE_RANGES.find((r) => r.value === priceRange);
    if (range && "min" in range) {
      result = result.filter((p) => {
        const price = p.onSale && p.salePrice ? p.salePrice : p.price;
        return price >= range.min && price <= range.max;
      });
    }
  }

  switch (sortBy as SortOption) {
    case "price-asc":
      result.sort((a, b) => (a.onSale && a.salePrice ? a.salePrice : a.price) - (b.onSale && b.salePrice ? b.salePrice : b.price));
      break;
    case "price-desc":
      result.sort((a, b) => (b.onSale && b.salePrice ? b.salePrice : b.price) - (a.onSale && a.salePrice ? a.salePrice : a.price));
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "newest":
      result.reverse();
      break;
  }

  return result;
}

export function useProducts(sourceOverride?: typeof PRODUCTS) {
  const { searchQuery, selectedCategory, sortBy, priceRange } = useStore();

  const allFiltered = useMemo(
    () => getFilteredProducts(searchQuery, selectedCategory, sortBy, priceRange, sourceOverride),
    [searchQuery, selectedCategory, sortBy, priceRange, sourceOverride]
  );

  const query = useInfiniteQuery({
    queryKey: ["products", searchQuery, selectedCategory, sortBy, priceRange, sourceOverride?.length],
    queryFn: ({ pageParam = 0 }) => {
      // Simulate async fetch with a tiny delay
      return new Promise<{ items: typeof PRODUCTS; nextPage: number | null; total: number }>((resolve) => {
        setTimeout(() => {
          const start = pageParam * PAGE_SIZE;
          const items = allFiltered.slice(start, start + PAGE_SIZE);
          const nextPage = start + PAGE_SIZE < allFiltered.length ? pageParam + 1 : null;
          resolve({ items, nextPage, total: allFiltered.length });
        }, 100);
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const products = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return {
    products,
    total,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
}
