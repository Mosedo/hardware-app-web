import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CartSidebar: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    cartTotal,
    processSale,
    setIsReceiptModalOpen,
    setCurrentSale
  } = useApp();
  
  const [customerName, setCustomerName] = useState('');
  const [cashierName, setCashierName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    
    if (!cashierName) {
      alert('Please enter cashier name');
      return;
    }
    
    try {
      // Process the sale and get the sale object back
      const sale = processSale(
        cashierName,
        customerName || null,
        paymentMethod
      );
      
      // Set the current sale for receipt printing
      setCurrentSale(sale);
      
      // Open the receipt modal
      setIsReceiptModalOpen(true);
      
      // Reset checkout form
      setIsCheckoutOpen(false);
      setCustomerName('');
      setCashierName('');
      setPaymentMethod('cash');
      
    } catch (error) {
      alert(`Error processing sale: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-300 z-50 ${cart.length > 0 ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="bg-blue-800 text-white py-4 px-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingCart className="mr-2" />
            Shopping Cart
          </h2>
          <span className="bg-white text-blue-800 rounded-full px-2 py-1 text-sm font-bold">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {cart.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                  <div className="flex-1 mr-4">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">KES {item.rate.toLocaleString()} per {item.per}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center mr-3">
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.inCart - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      
                      <input 
                        type="number" 
                        min="1" 
                        max={item.quantity + item.inCart}
                        value={item.inCart}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          updateCartItemQuantity(item.id, value);
                        }}
                        className="w-12 h-8 text-center border-t border-b border-gray-200"
                      />
                      
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.inCart + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              {isCheckoutOpen ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Checkout</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cashier Name*
                    </label>
                    <input
                      type="text"
                      value={cashierName}
                      onChange={(e) => setCashierName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter cashier name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name (optional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter customer name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="cash">Cash</option>
                      <option value="mpesa">M-Pesa</option>
                      <option value="card">Card</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">Total: KES {cartTotal.toLocaleString()}</p>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={() => setIsCheckoutOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleCheckout}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Complete Sale
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold">KES {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Total:</span>
                    <span className="text-xl font-bold text-blue-700">KES {cartTotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={clearCart} 
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} className="mr-1" />
                      Clear Cart
                    </button>
                    
                    <button 
                      onClick={() => setIsCheckoutOpen(true)}
                      className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <CreditCard size={18} className="mr-2" />
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col p-8">
            <ShoppingCart size={80} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 text-sm mt-2">Add items from the inventory</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;