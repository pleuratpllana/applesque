import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CompareBar = () => {
  const { compare, toggleCompare, clearCompare } = useStore();
  const navigate = useNavigate();

  if (compare.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground rounded-2xl shadow-steel px-4 py-3 flex items-center gap-3 max-w-[calc(100vw-2rem)]"
      >
        <div className="flex items-center gap-2">
          {compare.map((p) => (
            <div
              key={p.id}
              className="relative w-10 h-10 rounded-lg overflow-hidden bg-primary-foreground/10 shrink-0"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleCompare(p)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-background text-foreground rounded-full flex items-center justify-center"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 2 - compare.length) }).map(
            (_, i) => (
              <div
                key={`empty-${i}`}
                className="w-10 h-10 rounded-lg border-2 border-dashed border-primary-foreground/30 shrink-0"
              />
            ),
          )}
        </div>

        <span className="text-xs font-medium whitespace-nowrap">
          {compare.length}/4
        </span>

        <button
          onClick={() => navigate("/compare")}
          disabled={compare.length < 2}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary-foreground text-primary rounded-full text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 whitespace-nowrap"
        >
          Compare
          <ArrowRight size={14} />
        </button>

        <button
          onClick={clearCompare}
          className="text-primary-foreground/60 hover:text-primary-foreground transition-colors ml-1"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
