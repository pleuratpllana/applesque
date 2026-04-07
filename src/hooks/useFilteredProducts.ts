import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { PRODUCTS, PRICE_RANGES, type SortOption } from "@/data/products";
import { Product } from "@/store/useStore";

export function useFilteredProducts(productsOverride?: Product[]) {
  const { searchQuery, selectedCategory, sortBy, priceRange } = useStore();
  const source = productsOverride || PRODUCTS;

  return useMemo(() => {
    let result = [...source];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range
    if (priceRange !== "all") {
      const range = PRICE_RANGES.find((r) => r.value === priceRange);
      if (range && "min" in range) {
        result = result.filter((p) => {
          const effectivePrice = p.onSale && p.salePrice ? p.salePrice : p.price;
          return effectivePrice >= range.min && effectivePrice <= range.max;
        });
      }
    }

    // Sort
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
      default:
        break;
    }

    return result;
  }, [source, searchQuery, selectedCategory, sortBy, priceRange]);
}
