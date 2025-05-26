import React, { forwardRef } from 'react';
import { Sale } from '../types';

interface ReceiptProps {
  sale: Sale;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(({ sale }, ref) => {
  // Format date for the receipt
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div ref={ref} className="bg-white w-full max-w-md mx-auto p-6 font-mono text-sm">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">HARDWARE STORE</h2>
        <p>123 Main Street, Nairobi</p>
        <p>Tel: +254 712 345678</p>
        <p>Email: info@hardwarestore.co.ke</p>
      </div>
      
      <div className="border-t border-b border-dashed border-gray-300 py-2 my-4">
        <div className="flex justify-between">
          <span>Receipt #:</span>
          <span>{sale.receiptNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{formatDate(sale.date)}</span>
        </div>
        <div className="flex justify-between">
          <span>Cashier:</span>
          <span>{sale.cashierName}</span>
        </div>
        {sale.customerName && (
          <div className="flex justify-between">
            <span>Customer:</span>
            <span>{sale.customerName}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Payment Method:</span>
          <span>{sale.paymentMethod.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between border-b border-gray-300 pb-2 font-bold">
          <span className="w-1/2">Item</span>
          <span className="w-1/6 text-right">Qty</span>
          <span className="w-1/6 text-right">Rate</span>
          <span className="w-1/6 text-right">Amount</span>
        </div>
        
        {sale.items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-dotted border-gray-200">
            <span className="w-1/2 truncate">{item.name}</span>
            <span className="w-1/6 text-right">{item.inCart}</span>
            <span className="w-1/6 text-right">{item.rate.toLocaleString()}</span>
            <span className="w-1/6 text-right">{item.subtotal.toLocaleString()}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-300 pt-2">
        <div className="flex justify-between font-bold text-lg">
          <span>TOTAL:</span>
          <span>KES {sale.total.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs">
        <p>Thank you for shopping with us!</p>
        <p>All goods sold are not returnable</p>
        <p>Powered by Hardware POS System</p>
      </div>
    </div>
  );
});

Receipt.displayName = 'Receipt';

export default Receipt;