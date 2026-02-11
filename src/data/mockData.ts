// Seat Layout
export type SeatStatus = "available" | "reserved" | "occupied" | "selected";

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  capacity: number;
  type: "table-2" | "table-4" | "table-6" | "booth";
}

export const generateSeats = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E"];
  const seats: Seat[] = [];
  const statuses: SeatStatus[] = ["available", "reserved", "occupied", "available"];

  rows.forEach((row, ri) => {
    const count = row === "E" ? 3 : row === "D" ? 4 : 5;
    for (let i = 1; i <= count; i++) {
      const type = row === "E" ? "booth" : i <= 2 ? "table-2" : "table-4";
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: statuses[(ri + i) % statuses.length],
        capacity: type === "table-2" ? 2 : type === "table-4" ? 4 : type === "booth" ? 6 : 6,
        type,
      });
    }
  });
  return seats;
};

// Menu
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  available: boolean;
  prepTime: number;
  isVeg: boolean;
  description: string;
}

export interface SubCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuCategory {
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

const img = (seed: string) => `https://images.unsplash.com/photo-${seed}?w=300&h=200&fit=crop`;

export const menuData: MenuCategory[] = [
  {
    name: "Breakfast",
    icon: "☀️",
    subcategories: [
      {
        name: "Dosa Items",
        items: [
          { id: "b1", name: "Masala Dosa", price: 120, image: img("1630383249824-d4e59b8c3a45"), available: true, prepTime: 15, isVeg: true, description: "Crispy crepe with spiced potato filling" },
          { id: "b2", name: "Rava Dosa", price: 140, image: img("1668236543090-c0cb8f82a781"), available: true, prepTime: 12, isVeg: true, description: "Semolina crepe, crispy and lacy" },
        ],
      },
      {
        name: "Idli Items",
        items: [
          { id: "b3", name: "Steamed Idli", price: 80, image: img("1589301760435-2d423b4b4c45"), available: true, prepTime: 10, isVeg: true, description: "Soft steamed rice cakes with sambar" },
        ],
      },
    ],
  },
  {
    name: "Lunch",
    icon: "🍛",
    subcategories: [
      {
        name: "North Indian",
        items: [
          { id: "l1", name: "Butter Chicken", price: 320, image: img("1603894584373-5ac82b2ae398"), available: true, prepTime: 25, isVeg: false, description: "Tender chicken in rich tomato cream" },
          { id: "l2", name: "Paneer Tikka Masala", price: 280, image: img("1631452180519-c014fe39b323"), available: true, prepTime: 20, isVeg: true, description: "Grilled paneer in spiced gravy" },
          { id: "l3", name: "Dal Makhani", price: 220, image: img("1546833999-4e3a1a0a3d4e"), available: false, prepTime: 30, isVeg: true, description: "Slow-cooked black lentils" },
        ],
      },
      {
        name: "South Indian",
        items: [
          { id: "l4", name: "Chettinad Chicken", price: 340, image: img("1610057099443-fde6c5282196"), available: true, prepTime: 30, isVeg: false, description: "Fiery pepper chicken curry" },
        ],
      },
      {
        name: "Chinese",
        items: [
          { id: "l5", name: "Hakka Noodles", price: 200, image: img("1585032226651-759b368d7246"), available: true, prepTime: 15, isVeg: true, description: "Stir-fried noodles with vegetables" },
          { id: "l6", name: "Chilli Chicken", price: 260, image: img("1525755662015-2b6de8cb6d13"), available: true, prepTime: 20, isVeg: false, description: "Crispy chicken tossed in spicy sauce" },
        ],
      },
    ],
  },
  {
    name: "Dinner",
    icon: "🌙",
    subcategories: [
      {
        name: "Grills & Kebabs",
        items: [
          { id: "d1", name: "Tandoori Platter", price: 450, image: img("1599487488170-d11ec9c172f0"), available: true, prepTime: 35, isVeg: false, description: "Assorted tandoori meats and paneer" },
          { id: "d2", name: "Seekh Kebab", price: 320, image: img("1606471191009-63994b4a1e13"), available: true, prepTime: 25, isVeg: false, description: "Minced meat skewers, charcoal grilled" },
        ],
      },
    ],
  },
  {
    name: "Beverages",
    icon: "🥤",
    subcategories: [
      {
        name: "Hot Drinks",
        items: [
          { id: "v1", name: "Masala Chai", price: 60, image: img("1571934811356-4b5ab9e02c4a"), available: true, prepTime: 5, isVeg: true, description: "Traditional spiced Indian tea" },
          { id: "v2", name: "Filter Coffee", price: 80, image: img("1509042239860-f550ce710b93"), available: true, prepTime: 5, isVeg: true, description: "South Indian style decoction coffee" },
        ],
      },
      {
        name: "Cold Drinks",
        items: [
          { id: "v3", name: "Mango Lassi", price: 120, image: img("1553530666-ba11a7da3888"), available: true, prepTime: 5, isVeg: true, description: "Creamy mango yogurt smoothie" },
        ],
      },
    ],
  },
];

// Cart
export interface CartItem extends MenuItem {
  quantity: number;
}

// Orders for admin
export interface Order {
  id: string;
  customerName: string;
  seatId: string;
  items: CartItem[];
  status: "pending" | "cook-now" | "preparing" | "ready" | "served";
  total: number;
  time: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Rahul Sharma",
    seatId: "A1",
    items: [
      { ...menuData[1].subcategories[0].items[0], quantity: 1 },
      { ...menuData[3].subcategories[0].items[0], quantity: 2 },
    ],
    status: "cook-now",
    total: 440,
    time: "12:30 PM",
  },
  {
    id: "ORD-002",
    customerName: "Priya Patel",
    seatId: "B3",
    items: [
      { ...menuData[1].subcategories[0].items[1], quantity: 1 },
    ],
    status: "preparing",
    total: 280,
    time: "12:45 PM",
  },
  {
    id: "ORD-003",
    customerName: "Amit Kumar",
    seatId: "C2",
    items: [
      { ...menuData[0].subcategories[0].items[0], quantity: 2 },
      { ...menuData[3].subcategories[1].items[0], quantity: 1 },
    ],
    status: "pending",
    total: 360,
    time: "1:00 PM",
  },
];
