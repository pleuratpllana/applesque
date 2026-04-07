import { useStore } from "@/store/useStore";
import { CATEGORIES, SORT_OPTIONS, PRICE_RANGES } from "@/data/products";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CustomSelectProps {
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}

const CustomSelect = ({ value, options, onChange }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 h-9 pl-3.5 pr-3 rounded-lg text-sm font-medium transition-all border ${
          open
            ? "bg-background border-border shadow-steel text-foreground"
            : "bg-secondary border-transparent text-foreground hover:bg-secondary/80"
        }`}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1.5 min-w-[180px] bg-popover border border-border rounded-xl shadow-steel overflow-hidden z-30"
          >
            <ul className="py-1">
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors text-left ${
                      value === opt.value
                        ? "text-foreground bg-secondary/60 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    <span className="flex-1">{opt.label}</span>
                    {value === opt.value && (
                      <Check size={14} className="text-foreground shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterBar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
  } = useStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mb-8">
      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort & price row */}
      <div className="relative flex items-center gap-3 mt-4">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
            showMobileFilters
              ? "bg-background border-border shadow-steel text-foreground"
              : "bg-secondary border-transparent text-foreground"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          <ChevronDown
            size={14}
            className={`text-muted-foreground transition-transform duration-200 ${showMobileFilters ? "rotate-180" : ""}`}
          />
        </button>

        {/* Desktop: always visible. Mobile: dropdown panel */}
        <div
          className={`${showMobileFilters ? "flex" : "hidden"} md:flex flex-row gap-3 md:w-auto absolute md:relative left-0 right-0 md:left-auto md:right-auto bg-background md:bg-transparent p-3 md:p-0 border md:border-0 border-border rounded-xl md:rounded-none shadow-steel md:shadow-none z-30 top-[calc(100%+8px)] md:top-auto`}
        >
          <CustomSelect
            value={sortBy}
            options={
              SORT_OPTIONS as unknown as { value: string; label: string }[]
            }
            onChange={(v) => {
              setSortBy(v);
            }}
          />
          <CustomSelect
            value={priceRange}
            options={
              PRICE_RANGES as unknown as { value: string; label: string }[]
            }
            onChange={(v) => {
              setPriceRange(v);
            }}
          />
        </div>

        {/* Result count - pushed right on desktop */}
        <div
          className="ml-auto text-xs text-muted-foreground hidden md:block"
          id="filter-count"
        />
      </div>
    </div>
  );
};

export default FilterBar;
