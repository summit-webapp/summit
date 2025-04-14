import React from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import CustomTable from './CustomTable'; // adjust path as needed

type CartItem = {
  metal: string;
  purity: string;
  tone: string;
  diamond: string;
  size: string;
  quantity: number;
  total: number;
};

type CartTableProps = {
  cart: CartItem[];
  handleCartQuantityChange: (index: number, change: number) => void;
};

const CartTable: React.FC<CartTableProps> = ({ cart, handleCartQuantityChange }) => {
  const headers = ['Metal', 'Purity', 'Tone', 'Diamond', 'Size', 'Quantity', 'Total'];

  const rows = cart.map((item, index) => [
    item.metal,
    item.purity,
    item.tone,
    item.diamond,
    item.size,
    // Quantity Control (JSX Element)
    <div key={index} className="d-flex align-items-center shadow-sm border rounded overflow-hidden">
      <button
        className="d-flex align-items-center justify-content-center flex-fill py-2 border-0 bg-transparent"
        onClick={() => handleCartQuantityChange(index, -1)}
      >
        <IoRemoveOutline size={18} />
      </button>
      <div className="flex-fill text-center fw-bold py-2 border-start border-end">{item.quantity}</div>
      <button
        className="d-flex align-items-center justify-content-center flex-fill py-2 border-0 bg-transparent"
        onClick={() => handleCartQuantityChange(index, 1)}
      >
        <IoAddOutline size={18} />
      </button>
    </div>,
    item.total.toFixed(2),
  ]);
  if (cart.length === 0) {
    rows.push([
      <td key="empty" colSpan={7} className="text-center fw-bold px-4">
        No items in cart
      </td>,
    ]);
  }

  return <CustomTable headers={headers} rows={rows} />;
};

export default CartTable;
