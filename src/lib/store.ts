import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CustomerInfo {
  email: string;
  whatsapp: string;
  customerId: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  sweetNote: boolean;
  sweetNotePrice: number;
  deliveryFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  sweetNote: boolean;
  customer: CustomerInfo | null;
  isSignedIn: boolean;
  orders: Order[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleDrawer: () => void;
  setSweetNote: (value: boolean) => void;
  clearCart: () => void;
  setCustomer: (info: CustomerInfo) => void;
  signOut: () => void;
  addOrder: (order: Order) => void;
}

const generateCustomerId = () => {
  return 'CUS' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isDrawerOpen: false,
  sweetNote: false,
  customer: null,
  isSignedIn: false,
  orders: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
          isDrawerOpen: true,
        };
      }
      return { items: [...state.items, item], isDrawerOpen: true };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setSweetNote: (value) => set({ sweetNote: value }),
  clearCart: () => set({ items: [], sweetNote: false }),
  setCustomer: (info) => set({ 
    customer: { ...info, customerId: info.customerId || generateCustomerId() },
    isSignedIn: true 
  }),
  signOut: () => set({ customer: null, isSignedIn: false }),
  addOrder: (order) => set((state) => ({ 
    orders: [order, ...state.orders] 
  })),
}));
