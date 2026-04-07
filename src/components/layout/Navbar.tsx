import { ShoppingBag, Sun, Moon, Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useNavigate, useLocation } from "react-router-dom";
import SearchDropdown from "@/components/shop/SearchDropdown";

const NAV_LINKS = [
  { label: "Products", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Sale", path: "/sale" },
];

const Navbar = () => {
  const { cart, wishlist, toggleCart, isDark, toggleTheme } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold tracking-[-0.06em] text-foreground shrink-0"
        >
          APPLESQUE.
        </button>

        <div className="flex items-center gap-6 ml-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {link.label === "Sale" && (
                <span className="ml-1.5 text-[10px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </button>
          ))}
        </div>

        <SearchDropdown className="flex-1 max-w-sm mx-6" />

        {/* Vertical divider */}
        <div className="h-6 w-px bg-border mx-1" />

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-secondary rounded-full transition-colors text-foreground"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => navigate("/wishlist")}
            className="p-2.5 hover:bg-secondary rounded-full transition-colors relative text-foreground"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={toggleCart}
            className="p-2.5 hover:bg-secondary rounded-full transition-colors relative text-foreground"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
