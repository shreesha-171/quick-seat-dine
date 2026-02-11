import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed! Your food will be prepared when you arrive and press 'Cook Now'.", {
      duration: 5000,
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center">
          <div className="mb-4 text-6xl">🛒</div>
          <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Add some delicious items from our menu</p>
          <Link to="/menu">
            <Button variant="hero">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/menu">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground">Your Order</h1>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="glass-card flex items-center gap-4 p-4"
            >
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{item.name}</h4>
                <p className="text-sm text-primary font-semibold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center font-bold text-foreground">{item.quantity}</span>
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="glass-card mt-6 space-y-3 p-6">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span><span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Taxes (5%)</span><span>₹{Math.round(total * 0.05)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
            <span>Total</span><span className="text-primary text-lg">₹{total + Math.round(total * 0.05)}</span>
          </div>

          <Button variant="hero" className="w-full mt-4" size="lg" onClick={handleCheckout}>
            <CreditCard className="mr-2 h-4 w-4" /> Place Order & Pay
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Food will be prepared only when you press "Cook Now" at the restaurant
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
