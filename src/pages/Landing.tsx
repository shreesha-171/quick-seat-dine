import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-restaurant.jpg";

const stats = [
  { icon: Users, value: "10K+", label: "Happy Diners" },
  { icon: MapPin, value: "50+", label: "Restaurants" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: Clock, value: "<2min", label: "Booking Time" },
];

const features = [
  {
    emoji: "💺",
    title: "Real-Time Seat Booking",
    description: "See live seat availability and book instantly — like choosing your movie seat.",
  },
  {
    emoji: "🍽️",
    title: "Pre-Order Your Meal",
    description: "Browse the full menu, add items to cart, and order before you even arrive.",
  },
  {
    emoji: "👨‍🍳",
    title: "Cook on Arrival",
    description: "Your food is prepared fresh only when you confirm — no stale dishes.",
  },
  {
    emoji: "🎁",
    title: "Loyalty & Rewards",
    description: "Earn points, unlock vouchers, and enjoy exclusive offers on every visit.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Restaurant ambiance" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              ✨ The Future of Dining
            </motion.div>

            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl">
              Reserve. <span className="text-gradient">Pre-Order.</span>
              <br />
              Dine Fresh.
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              Skip the wait. Book your seat in real-time, pre-order from the menu,
              and have your food cooked fresh the moment you arrive.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/book">
                <Button variant="hero" size="lg" className="text-base px-8 py-6">
                  Book a Table <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
                  Explore Menu
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 font-serif text-4xl font-bold text-foreground">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              A seamless dining experience from booking to checkout.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card group p-6 transition-all hover:border-primary/30"
              >
                <div className="mb-4 text-4xl">{feature.emoji}</div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card mx-auto max-w-3xl overflow-hidden p-12 text-center"
          >
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Ready to Skip the Queue?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of diners who love the QuickSeat experience.
            </p>
            <Link to="/book">
              <Button variant="hero" size="lg" className="px-10 py-6 text-base">
                Get Started <ArrowRight className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 QuickSeat & Dine. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
