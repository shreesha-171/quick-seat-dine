import { useState } from "react";
import { motion } from "framer-motion";
import { generateSeats, mockOrders, Order, Seat, SeatStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, ChefHat, BarChart3, Settings, Armchair,
  Clock, CheckCircle, Flame, TrendingUp, DollarSign,
  ShoppingBag
} from "lucide-react";

type Tab = "seats" | "orders" | "analytics";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "cook-now": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  preparing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  ready: "bg-green-500/20 text-green-400 border-green-500/30",
  served: "bg-muted text-muted-foreground border-border",
};

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("seats");
  const [seats] = useState<Seat[]>(generateSeats);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "seats", label: "Seats", icon: Armchair },
    { id: "orders", label: "Orders", icon: ChefHat },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  const seatStats = {
    available: seats.filter((s) => s.status === "available").length,
    reserved: seats.filter((s) => s.status === "reserved").length,
    occupied: seats.filter((s) => s.status === "occupied").length,
    total: seats.length,
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your restaurant in real-time</p>
          </div>
          <Button variant="outline" size="icon"><Settings className="h-5 w-5" /></Button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                tab === t.id ? "gradient-warm text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Seat Management */}
        {tab === "seats" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "Total Tables", value: seatStats.total, icon: Armchair, color: "text-foreground" },
                { label: "Available", value: seatStats.available, icon: CheckCircle, color: "text-green-400" },
                { label: "Reserved", value: seatStats.reserved, icon: Clock, color: "text-yellow-400" },
                { label: "Occupied", value: seatStats.occupied, icon: Users, color: "text-red-400" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4">
                  <stat.icon className={`mb-2 h-5 w-5 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Floor Plan</h3>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                {seats.map((seat) => {
                  const cls: Record<SeatStatus, string> = {
                    available: "bg-green-500/20 border-green-500/40 text-green-400",
                    reserved: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400",
                    occupied: "bg-red-500/20 border-red-500/40 text-red-400",
                    selected: "bg-primary/20 border-primary text-primary",
                  };
                  return (
                    <div
                      key={seat.id}
                      className={`flex flex-col items-center justify-center rounded-lg border p-3 text-xs font-medium ${cls[seat.status]}`}
                    >
                      <span className="font-bold">{seat.id}</span>
                      <span className="opacity-60">{seat.capacity}p</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Management */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="glass-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground">{order.id}</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">{order.customerName}</span>
                  </div>
                  <Badge className={`border ${statusColors[order.status]}`}>
                    {order.status === "cook-now" ? "🔥 Cook Now" : order.status}
                  </Badge>
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Armchair className="h-4 w-4" /> Table {order.seatId}
                  <span className="mx-1">·</span>
                  <Clock className="h-4 w-4" /> {order.time}
                </div>
                <div className="mb-4 space-y-1">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.name} × {item.quantity}</span>
                      <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                    <span>Total</span><span className="text-primary">₹{order.total}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {order.status === "cook-now" && (
                    <Button size="sm" variant="hero" onClick={() => updateOrderStatus(order.id, "preparing")}>
                      <Flame className="mr-1 h-3 w-3" /> Start Preparing
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button size="sm" variant="hero" onClick={() => updateOrderStatus(order.id, "ready")}>
                      <CheckCircle className="mr-1 h-3 w-3" /> Mark Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button size="sm" variant="hero" onClick={() => updateOrderStatus(order.id, "served")}>
                      <ShoppingBag className="mr-1 h-3 w-3" /> Mark Served
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Analytics */}
        {tab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Today's Revenue", value: "₹24,500", icon: DollarSign, change: "+12%" },
                { label: "Bookings Today", value: "47", icon: Armchair, change: "+8%" },
                { label: "Orders Served", value: "38", icon: ChefHat, change: "+15%" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <TrendingUp className="h-3 w-3" /> {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-card mt-6 p-6">
              <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">Top Dishes Today</h3>
              <div className="space-y-3">
                {[
                  { name: "Butter Chicken", orders: 18, revenue: 5760 },
                  { name: "Masala Dosa", orders: 15, revenue: 1800 },
                  { name: "Paneer Tikka Masala", orders: 12, revenue: 3360 },
                  { name: "Hakka Noodles", orders: 10, revenue: 2000 },
                ].map((dish, i) => (
                  <div key={dish.name} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="font-medium text-foreground">{dish.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">₹{dish.revenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{dish.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
