import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData, MenuCategory, MenuItem as MenuItemType } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Clock, ShoppingCart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const MenuItemCard = ({ item }: { item: MenuItemType }) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card overflow-hidden transition-all ${!item.available ? "opacity-50" : ""}`}
    >
      <div className="flex gap-4 p-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <Badge
            className={`absolute left-1 top-1 border-0 px-1.5 py-0.5 text-[10px] ${
              item.isVeg ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"
            }`}
          >
            {item.isVeg ? "VEG" : "NON-VEG"}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{item.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {item.prepTime} min
              {!item.available && (
                <Badge variant="destructive" className="ml-1 text-[10px]">Unavailable</Badge>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold text-primary">₹{item.price}</span>
            {item.available && (
              cartItem ? (
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-5 text-center text-sm font-bold text-foreground">{cartItem.quantity}</span>
                  <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => addItem(item)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button size="sm" variant="hero" className="h-8 text-xs" onClick={() => addItem(item)}>
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].name);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const { itemCount, total } = useCart();

  const category = menuData.find((c) => c.name === activeCategory)!;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-serif text-4xl font-bold text-foreground">Our Menu</h1>
          <p className="mb-8 text-muted-foreground">Fresh, flavorful, made when you're ready</p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {menuData.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setActiveSub(null); }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === cat.name
                  ? "gradient-warm text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSub(null)}
            className={`rounded-lg px-4 py-2 text-sm transition-all ${
              !activeSub ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub.name}
              onClick={() => setActiveSub(sub.name)}
              className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition-all ${
                activeSub === sub.name ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ChevronRight className="h-3 w-3" /> {sub.name}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {category.subcategories
              .filter((sub) => !activeSub || sub.name === activeSub)
              .flatMap((sub) => sub.items)
              .map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
          </AnimatePresence>
        </div>

        {/* Cart floating bar */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 left-4 right-4 z-40 mx-auto max-w-lg"
            >
              <Link to="/cart">
                <div className="flex items-center justify-between rounded-2xl gradient-warm p-4 text-primary-foreground shadow-2xl">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-semibold">{itemCount} items</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    ₹{total} <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <ChevronRight className={className} />
);

export default MenuPage;
