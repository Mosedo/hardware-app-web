import React, { useState } from 'react';
import { ShoppingCart, LayoutGrid, Search, PlusCircle, ClipboardList } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { 
    cart, 
    setIsAddProductModalOpen,
    searchTerm,
    setSearchTerm,
    setActiveFilter
  } = useApp();
  
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.inCart, 0);

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Hardware POS</h1>
          </div>
          
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-96' : 'w-64'}`}>
            <input 
              type="text" 
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full px-4 py-2 rounded-full bg-blue-900 bg-opacity-50 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-300 transition-all"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-blue-300" />
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAddProductModalOpen(true)}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              <span>Add Item</span>
            </button>
            
            <button 
              onClick={() => setActiveFilter('sales')}
              className="flex items-center bg-blue-900 hover:bg-blue-950 text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <ClipboardList className="w-5 h-5 mr-1" />
              <span>Sales</span>
            </button>
            
            <div className="relative">
              <ShoppingCart className="w-7 h-7" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;