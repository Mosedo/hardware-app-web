import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Product, CartItem, Sale } from '../types';
import { initialInventory } from '../data/initialInventory';

interface AppContextType {
  inventory: Product[];
  setInventory: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  sales: Sale[];
  processSale: (cashierName: string, customerName: string | null, paymentMethod: string) => Sale;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  cartTotal: number;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentSale: Sale | null;
  setCurrentSale: React.Dispatch<React.SetStateAction<Sale | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Product[]>(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : initialInventory;
  });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>(() => {
    const savedSales = localStorage.getItem('sales');
    return savedSales ? JSON.parse(savedSales) : [];
  });
  
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<Sale | null>(null);

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);

  // Save inventory and sales to localStorage when they change
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    
    // Check if we have enough stock
    if (quantity > product.quantity) {
      alert(`Only ${product.quantity} units available in stock`);
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check if adding more would exceed available stock
        if (existingItem.inCart + quantity > product.quantity) {
          alert(`Cannot add more. Only ${product.quantity - existingItem.inCart} more units available`);
          return prevCart;
        }
        
        return prevCart.map(item => 
          item.id === product.id 
            ? { 
                ...item, 
                inCart: item.inCart + quantity,
                subtotal: (item.inCart + quantity) * item.rate
              } 
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          inCart: quantity,
          subtotal: quantity * product.rate 
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // Find the product in inventory to check available stock
    const product = inventory.find(p => p.id === productId);
    if (!product || quantity > product.quantity) {
      alert(`Only ${product?.quantity || 0} units available in stock`);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, inCart: quantity, subtotal: quantity * item.rate } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const processSale = (cashierName: string, customerName: string | null, paymentMethod: string): Sale => {
    if (cart.length === 0) {
      throw new Error("Cannot process sale with empty cart");
    }

    // Create a new sale record
    const newSale: Sale = {
      id: uuidv4(),
      items: [...cart],
      total: cartTotal,
      date: new Date(),
      cashierName,
      customerName,
      paymentMethod,
      receiptNumber: `RCP-${Date.now().toString().slice(-8)}`
    };

    // Update inventory quantities
    setInventory(prevInventory => 
      prevInventory.map(item => {
        const cartItem = cart.find(ci => ci.id === item.id);
        return cartItem 
          ? { ...item, quantity: item.quantity - cartItem.inCart } 
          : item;
      })
    );

    // Add sale to sales history
    setSales(prevSales => [...prevSales, newSale]);
    
    // Clear the cart
    clearCart();
    
    // Return the sale for receipt generation
    return newSale;
  };

  const value = {
    inventory,
    setInventory,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    sales,
    processSale,
    isAddProductModalOpen,
    setIsAddProductModalOpen,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    cartTotal,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    currentSale,
    setCurrentSale
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};