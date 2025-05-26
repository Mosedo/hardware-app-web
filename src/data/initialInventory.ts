import { v4 as uuidv4 } from 'uuid';
import { Product } from '../types';

// Parse the CSV-like data into an array of Product objects
export const initialInventory: Product[] = [
  { id: uuidv4(), name: "BLACK PIPE 11/2'' C/A", quantity: 30, rate: 2930, per: "PCS" },
  { id: uuidv4(), name: "NYUMBA ALMASI SHEET 32G X 3MTR", quantity: 200, rate: 1095, per: "PCS" },
  { id: uuidv4(), name: "NYUMBA ALMASI SHEET 32G X 2.5MTR", quantity: 48, rate: 913, per: "PCS" },
  { id: uuidv4(), name: "NYUMBA 11/3 CHARC/GREY 30GX2MTR", quantity: 23, rate: 1100, per: "PCS" },
  { id: uuidv4(), name: "GALVANIZED PLAIN WIRE 8G", quantity: 75, rate: 228, per: "KGS" },
  { id: uuidv4(), name: "WIRE NAILS 2'' TO 6''", quantity: 100, rate: 162, per: "KGS" },
  { id: uuidv4(), name: "FLAT BAR 2''", quantity: 10, rate: 900, per: "PCS" },
  { id: uuidv4(), name: "NYUMBA 11/3 CHARC/GREY 30GX3MTR", quantity: 32, rate: 1650, per: "PCS" },
  { id: uuidv4(), name: "NYUMBA MAX780 CHARC/GREY 30GX3MTR", quantity: 10, rate: 1650, per: "PCS" },
  { id: uuidv4(), name: "GOLDEN BRIDGE W/RODE 2.5MM", quantity: 40, rate: 525, per: "PKTS" },
  { id: uuidv4(), name: "GOLDEN BRIDGE W/RODE 3.2MM", quantity: 20, rate: 1050, per: "PKTS" },
  { id: uuidv4(), name: "FONTARC WELDING RODE 3.2MM", quantity: 20, rate: 1250, per: "PKTS" },
  { id: uuidv4(), name: "R/COT C/SHEET 30GX3MTR SKY BLUE", quantity: 48, rate: 1875, per: "PCS" },
  { id: uuidv4(), name: "R/COT CX780 30GX3MTR SKY BLUE", quantity: 48, rate: 1875, per: "PCS" },
  { id: uuidv4(), name: "CX780 CHARC/GREY 30Gx3MTR", quantity: 48, rate: 1875, per: "PCS" },
  // Add more items as needed from the inventory
  { id: uuidv4(), name: "R/COT CX780 30GX3MTR MAROON", quantity: 48, rate: 1875, per: "PCS" },
  { id: uuidv4(), name: "NYUMBA ALMASI SHEET 30G X 3MTR", quantity: 48, rate: 1320, per: "PCS" },
  { id: uuidv4(), name: "R.H.S 4'' X 2'' X 2.5MM", quantity: 6, rate: 5300, per: "PCS" },
  { id: uuidv4(), name: "R.H.S 6'' X 2'' X 3.0MM", quantity: 6, rate: 9000, per: "PCS" },
  { id: uuidv4(), name: "CHAINLINK 8FT", quantity: 10, rate: 5520, per: "ROLL" }
];

export const getFullInventory = (): Product[] => {
  return initialInventory;
};

export const getInventoryCategories = (): string[] => {
  const perSet = new Set(initialInventory.map(item => item.per));
  return Array.from(perSet);
};