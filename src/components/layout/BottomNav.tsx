import { Home, LayoutGrid, ShoppingBag, Tag, Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const { cart, wishlist } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  const items = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    {
      icon: <LayoutGrid size={20} />,
      label: "Categories",
      path: "/categories",
    },
    { icon: <Tag size={20} />, label: "Sale", path: "/sale" },
    {
      icon: <Heart size={20} />,
      label: "Wishlist",
      path: "/wishlist",
      badge: wishlist.length,
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Cart",
      path: "/cart",
      badge: cartCount,
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-background/80 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-stretch px-0 pb-5 pt-2">
        {items.map((item, i) => (
          <div key={item.path} className="flex items-center flex-1">
            {i > 0 && <div className="w-px self-stretch my-2 bg-border" />}
            <button
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 relative flex-1 ${
                isActive(item.path) ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span className="text-[8px] font-medium uppercase tracking-wider">
                {item.label}
              </span>
              {item.badge != null && item.badge > 0 && (
                <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-accent text-accent-foreground text-[8px] font-bold flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
