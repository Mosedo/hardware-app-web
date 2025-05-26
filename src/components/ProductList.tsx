import React from 'react';
import { Package2, ShoppingCart, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { getInventoryCategories } from '../data/initialInventory';

const ProductList: React.FC = () => {
  const { 
    inventory, 
    addToCart, 
    searchTerm, 
    activeFilter,
    setActiveFilter
  } = useApp();
  
  const categories = ['all', ...getInventoryCategories()];
  
  // Filter products based on search term and active category
  const filteredProducts = inventory.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'all' || product.per === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };
  
  // Function to determine if the stock level is low
  const isLowStock = (quantity: number) => quantity < 10;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          <Package2 className="inline-block mr-2" size={20} />
          Inventory ({filteredProducts.length} items)
        </h2>
        
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm text-gray-500 mr-2">Filter:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  activeFilter === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2 h-12">{product.name}</h3>
                {isLowStock(product.quantity) && (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Stock: {product.quantity} {product.per}</p>
                  <p className="text-lg font-bold text-blue-700">KES {product.rate.toLocaleString()}</p>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                  className={`p-2 rounded-full ${
                    product.quantity === 0 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  } transition-colors duration-200`}
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
            
            <div className={`h-1 ${
              isLowStock(product.quantity) ? 'bg-red-500' : 
              product.quantity < 20 ? 'bg-orange-500' : 'bg-green-500'
            }`} />
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;