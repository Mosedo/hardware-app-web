import React, { useRef } from 'react';
import { X, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { useApp } from '../context/AppContext';
import Receipt from './Receipt';

const ReceiptModal: React.FC = () => {
  const { isReceiptModalOpen, setIsReceiptModalOpen, currentSale } = useApp();
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });
  
  if (!isReceiptModalOpen || !currentSale) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-blue-700 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Receipt</h2>
          <button 
            onClick={() => setIsReceiptModalOpen(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <Receipt sale={currentSale} ref={receiptRef} />
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Printer size={18} className="mr-2" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;