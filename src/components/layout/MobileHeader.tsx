import { useState } from "react";
import { Menu, ShoppingBag, Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useNavigate, useLocation } from "react-router-dom";
import SearchDropdown from "@/components/shop/SearchDropdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Sun, Moon, Home, LayoutGrid, Tag, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Products", path: "/", icon: Home },
  { label: "Categories", path: "/categories", icon: LayoutGrid },
  { label: "Sale", path: "/sale", icon: Tag },
  { label: "Wishlist", path: "/wishlist", icon: Heart },
  { label: "Cart", path: "/cart", icon: ShoppingBag },
];

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, wishlist, isDark, toggleTheme } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 md:hidden">
      <div className="bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1.5 -ml-1.5 text-foreground"
          >
            <Menu size={22} />
          </button>

          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="text-lg font-bold tracking-[-0.06em] text-foreground"
          >
            APPLESQUE.
          </button>

          <div className="flex-1 min-w-0">
            <SearchDropdown compact />
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="p-1.5 relative text-foreground shrink-0"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 p-0 [&>button]:hidden">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-bold tracking-[-0.06em]">
                CERAMIC.
              </SheetTitle>
              <SheetClose className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </SheetClose>
            </div>
          </SheetHeader>

          <nav className="py-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              const badge =
                link.label === "Cart" && cartCount > 0
                  ? cartCount
                  : link.label === "Wishlist" && wishlist.length > 0
                    ? wishlist.length
                    : null;

              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{link.label}</span>
                  {link.label === "Sale" && (
                    <span className="text-[10px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  {badge && (
                    <span className="w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-border px-6 py-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileHeader;
