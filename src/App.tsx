import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import AddProductModal from './components/AddProductModal';
import SalesList from './components/SalesList';
import ReceiptModal from './components/ReceiptModal';

const AppContent: React.FC = () => {
  const { activeFilter } = useApp();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pb-16">
        {activeFilter === 'sales' ? <SalesList /> : <ProductList />}
      </main>
      <CartSidebar />
      <AddProductModal />
      <ReceiptModal />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;