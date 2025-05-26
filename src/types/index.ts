export interface Product {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  per: string;
  inCart?: number;
}

export interface CartItem extends Product {
  inCart: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  cashierName: string;
  customerName: string | null;
  paymentMethod: string;
  receiptNumber: string;
}