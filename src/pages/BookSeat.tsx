import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { generateSeats, Seat, SeatStatus } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";

const statusLabel: Record<SeatStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  occupied: "Occupied",
  selected: "Selected",
};

const statusClass: Record<SeatStatus, string> = {
  available: "seat-available",
  reserved: "seat-reserved",
  occupied: "seat-occupied",
  selected: "seat-selected",
};

const legend: { status: SeatStatus; color: string }[] = [
  { status: "available", color: "bg-green-500" },
  { status: "selected", color: "bg-primary" },
  { status: "reserved", color: "bg-yellow-500" },
  { status: "occupied", color: "bg-red-500" },
];

const BookSeat = () => {
  const [seats, setSeats] = useState<Seat[]>(generateSeats);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const rows = useMemo(() => {
    const map = new Map<string, Seat[]>();
    seats.forEach((s) => {
      const arr = map.get(s.row) || [];
      arr.push(s);
      map.set(s.row, arr);
    });
    return Array.from(map.entries());
  }, [seats]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "reserved" || seat.status === "occupied") return;

    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seat.id) {
          const newStatus: SeatStatus = s.status === "selected" ? "available" : "selected";
          setSelectedSeat(newStatus === "selected" ? s.id : null);
          return { ...s, status: newStatus };
        }
        if (s.status === "selected") return { ...s, status: "available" };
        return s;
      })
    );
  };

  const selected = seats.find((s) => s.id === selectedSeat);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-serif text-4xl font-bold text-foreground">Select Your Table</h1>
          <p className="mb-8 text-muted-foreground">Choose from our real-time floor plan</p>
        </motion.div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap gap-4">
          {legend.map((l) => (
            <div key={l.status} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`h-3 w-3 rounded-full ${l.color}`} />
              {statusLabel[l.status]}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              {/* Stage / Kitchen */}
              <div className="mb-8 rounded-lg border border-border bg-muted/30 py-3 text-center text-sm font-medium text-muted-foreground">
                🍳 Kitchen Area
              </div>

              <div className="space-y-4">
                {rows.map(([row, rowSeats]) => (
                  <div key={row} className="flex items-center gap-3">
                    <span className="w-6 text-center text-xs font-bold text-muted-foreground">{row}</span>
                    <div className="flex flex-wrap gap-3">
                      {rowSeats.map((seat) => (
                        <motion.button
                          key={seat.id}
                          whileHover={seat.status === "available" || seat.status === "selected" ? { scale: 1.05 } : {}}
                          whileTap={seat.status === "available" || seat.status === "selected" ? { scale: 0.95 } : {}}
                          onClick={() => handleSeatClick(seat)}
                          className={`flex h-16 w-20 flex-col items-center justify-center rounded-lg border text-xs font-medium transition-all ${statusClass[seat.status]}`}
                        >
                          <span className="text-sm font-bold">{seat.id}</span>
                          <span className="flex items-center gap-0.5 opacity-70">
                            <Users className="h-3 w-3" /> {seat.capacity}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-lg border border-border bg-muted/30 py-3 text-center text-sm font-medium text-muted-foreground">
                🚪 Entrance
              </div>
            </div>
          </div>

          {/* Selection Panel */}
          <div>
            <div className="glass-card sticky top-24 p-6">
              <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">Booking Details</h3>
              {selected ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm text-muted-foreground">Selected Table</p>
                    <p className="text-2xl font-bold text-primary">{selected.id}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="text-foreground">{selected.capacity} persons</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize text-foreground">{selected.type.replace("-", " for ")}</span>
                  </div>
                  <Link to="/menu" className="block">
                    <Button variant="hero" className="w-full">
                      Continue to Menu <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Tap on an available (green) table to select it.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSeat;
