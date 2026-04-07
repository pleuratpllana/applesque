import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SearchDropdownProps {
  compact?: boolean;
  className?: string;
}

const SearchDropdown = ({
  compact = false,
  className = "",
}: SearchDropdownProps) => {
  const { searchQuery, setSearchQuery } = useStore();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results =
    searchQuery.length >= 2
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()),
        ).slice(0, 6)
      : [];

  const showDropdown = isFocused && searchQuery.length >= 2;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelect = (productId: string) => {
    setIsFocused(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className={`relative group transition-all duration-200 ${isFocused ? "scale-[1.01]" : ""}`}
      >
        <Search
          size={compact ? 14 : 16}
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
            isFocused ? "text-foreground" : "text-muted-foreground"
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search products..."
          className={`w-full pl-10 pr-16 bg-secondary/80 border border-transparent rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 ${
            isFocused
              ? "bg-background border-border shadow-steel ring-1 ring-ring/10"
              : "hover:bg-secondary"
          } ${compact ? "h-9 text-xs" : "h-10"}`}
        />
        {searchQuery ? (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={14} />
          </button>
        ) : (
          !compact && (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-muted text-muted-foreground text-[10px] font-medium rounded border border-border">
              ⌘K
            </kbd>
          )
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-steel overflow-hidden z-50"
          >
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No results for "{searchQuery}"
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Try a different search term
                </p>
              </div>
            ) : (
              <>
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <ul className="py-1 max-h-[320px] overflow-y-auto">
                  {results.map((product, i) => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleSelect(product.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/60 transition-colors text-left group/item"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-11 h-11 rounded-lg object-cover shrink-0 ring-1 ring-border"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-semibold tabular-nums text-foreground">
                            $
                            {product.onSale && product.salePrice
                              ? product.salePrice
                              : product.price}
                          </span>
                          <ArrowRight
                            size={14}
                            className="text-muted-foreground opacity-0 group-hover/item:opacity-100 transition-opacity"
                          />
                        </div>
                      </button>
                      {i < results.length - 1 && (
                        <div className="mx-3 border-b border-border/50" />
                      )}
                    </li>
                  ))}
                </ul>
                {results.length === 6 && (
                  <div className="px-3 py-2.5 border-t border-border bg-secondary/30">
                    <button
                      onClick={() => {
                        setIsFocused(false);
                        navigate("/");
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View all results
                      <ArrowRight size={12} />
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchDropdown;
