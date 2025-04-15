import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import ProductInfoTable from './CustomTable';
import CartTable from './CartTable';

import productInformationStyle from '../../styles/components/productInformation.module.scss';

export default function ProductDetails() {
  const [selectedMetal, setSelectedMetal] = useState('Gold');
  const [selectedPurity, setSelectedPurity] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [selectedDiamond, setSelectedDiamond] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleMainQuantityChange = (delta: any) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleCartQuantityChange = (itemIndex: any, delta: any) => {
    setCart((prevCart) =>
      prevCart.map((item, idx) =>
        idx === itemIndex
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
              total: item.unitPrice * Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleAddToCart = () => {
    if (selectedMetal !== 'Platinum') {
      if (!selectedPurity || !selectedTone) {
        setError('Please select purity and tone for Gold.');
        return;
      }
    }

    if (!selectedDiamond || !selectedSize) {
      setError('Please select diamond type and size.');
      return;
    }

    // Clear error
    setError('');

    alert('Product has been added');

    // Add item to cart
    const unitPrice = selectedMetal === 'Gold' ? 211.22 : 311.22;
    const newItem = {
      metal: selectedMetal,
      purity: selectedMetal !== 'Platinum' ? selectedPurity : '-',
      tone: selectedMetal !== 'Platinum' ? selectedTone : '-',
      diamond: selectedDiamond,
      size: selectedSize,
      quantity,
      unitPrice,
      total: unitPrice * quantity, // This is a number
    };

    setCart([...cart, newItem]);

    setSelectedPurity('');
    setSelectedTone('');
    setSelectedDiamond('');
    setSelectedSize('');
    setQuantity(1);
  };

  const metalHeader = ['Kt', 'Colour', 'Wght', 'Rate', 'Value'];
  const metalRows = [
    [22, 'Yellow', 10.5, 5800, (10.5 * 5800).toFixed(2)],
    [18, 'White', 7.3, 4500, (7.3 * 4500).toFixed(2)],
  ];

  const diamondHeader = ['Shape', 'Quality', 'Size 1', 'Size 2', 'Pointer', 'Qty', 'Carats', 'Rate', 'Value', 'Setting', 'Rate', 'Value'];
  const diamondRows = [
    ['Round', 'VVS', '1.2', '1.4', '0.03', 10, 0.3, 5000, (0.3 * 5000).toFixed(2), 'Prong', 200, (10 * 200).toFixed(2)],
    ['Princess', 'VS', '1.5', '1.7', '0.05', 8, 0.4, 5200, (0.4 * 5200).toFixed(2), 'Bezel', 220, (8 * 220).toFixed(2)],
  ];

  const colorStoneHeader = [
    'Shape',
    'Quality',
    'Size 1',
    'Size 2',
    'Pointer',
    'Qty',
    'Carats',
    'Rate',
    'Value',
    'Setting',
    'Rate',
    'Value',
  ];

  const colorStoneRows = [
    ['Round', 'VVS', '1.2', '1.4', '0.03', 10, 0.3, 5000, (0.3 * 5000).toFixed(2), 'Prong', 200, (10 * 200).toFixed(2)],
    ['Princess', 'VS', '1.5', '1.7', '0.05', 8, 0.4, 5200, (0.4 * 5200).toFixed(2), 'Bezel', 220, (8 * 220).toFixed(2)],
  ];

  const accessoriesHeader = [
    'Shape',
    'Quality',
    'Size 1',
    'Size 2',
    'Per pc wt',
    'Qty',
    'Weight',
    'Rate',
    'Value',
    'Setting',
    'Rate',
    'Value',
  ];

  const accessoriesRows = [
    ['Round', 'VVS', '1.2', '1.4', '0.05', 12, 0.6, 4000, (0.6 * 4000).toFixed(2), 'Prong', 150, (12 * 150).toFixed(2)],
    ['Oval', 'VS', '1.3', '1.5', '0.07', 10, 0.7, 4200, (0.7 * 4200).toFixed(2), 'Bezel', 180, (10 * 180).toFixed(2)],
  ];

  const labourHeader = ['Main Kt', 'Lab Cd', 'Qt/Wt', 'Rate', 'Value'];

  const labourRows = [
    ['10.5', 'L123', '0.5', 1000, (0.5 * 1000).toFixed(2)],
    ['12.0', 'L456', '0.8', 1200, (0.8 * 1200).toFixed(2)],
  ];

  const summaryHeaders = ['Summary'];
  const summaryRows = [
    ['Metal Weight', 'qty', 'value'],
    ['Purity', 'qty', 'value'],
    ['Tone', 'qty', 'value'],
    ['Diamond', 'qty', 'value'],
    ['Size', 'qty', 'value'],
  ];

  const customerInfoRows = [
    ['Customer Instructions'],
    ['Product Instruction'],
    ['Stamping'],
    ['Size'],
    ['Special Remark'],
    ['Sub Remark'],
    ['Delivery Date'],
    ['Payment Terms'],
  ];

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center">
        <IoIosArrowBack className="me-2 fw-bold" />
        <h5 className="fw-bold mb-0">Product Details</h5>
      </div>

      <div className="row">
        {/* Left Column */}
        <div className="col-md-6" style={{ height: '450px' }}>
          <div className="row py-2 h-100">
            <div className="col-8">
              <img
                src="https://picsum.photos/400/400"
                alt="Main Product"
                className="img-fluid rounded w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-4 d-flex flex-column justify-content-between">
              <img
                src="https://picsum.photos/200/200"
                alt="Side 1"
                className="img-fluid rounded mb-4"
                style={{ objectFit: 'cover', height: '50%' }}
              />
              <img
                src="https://picsum.photos/200/200"
                alt="Side 2"
                className="img-fluid rounded"
                style={{ objectFit: 'cover', height: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6" style={{ height: '450px' }}>
          <div className="py-2 h-100">
            <div className="d-flex justify-content-between align-items-center py-2 rounded mb-3">
              <h4 className="mb-0 fw-bold">JY-2025-001</h4>
              <h5 className="text-muted mb-0 fw-bold">€{selectedMetal === 'Gold' ? '211.22' : '311.22'}</h5>
            </div>

            {error && <div className="alert alert-danger py-1">{error}</div>}

            <label className={`${productInformationStyle['product-text']}`}>Metal:</label>
            <br />

            <button
              className="btn btn-sm me-2"
              onClick={() => setSelectedMetal('Gold')}
              style={{
                backgroundColor: selectedMetal === 'Gold' ? '#f5f5f5' : 'transparent',
                color: selectedMetal === 'Gold' ? '#000' : '#6c757d',
                fontWeight: selectedMetal === 'Gold' ? 'bold' : 'normal',
                border: selectedMetal === 'Gold' ? 'solid 1px #f5f5f5' : 'solid 1px #f5f5f5',
                borderRadius: '2px',
              }}
            >
              Gold
            </button>

            <button
              className="btn btn-sm me-2"
              onClick={() => {
                setSelectedMetal('Platinum');
                setSelectedPurity('');
                setSelectedTone('');
              }}
              style={{
                backgroundColor: selectedMetal === 'Platinum' ? '#f5f5f5' : 'transparent',
                color: selectedMetal === 'Platinum' ? '#000' : '#6c757d',
                fontWeight: selectedMetal === 'Platinum' ? 'bold' : 'normal',
                border: '1px solid #ccc',
                borderRadius: '6px',
              }}
            >
              Platinum
            </button>

            {selectedMetal !== 'Platinum' && (
              <>
                <div className="mb-2">
                  <label className={`${productInformationStyle['product-text']}`}>Purity:</label>
                  <br />
                  {['9Kt', '10Kt', '14Kt', '18Kt'].map((k, i) => (
                    <button
                      key={i}
                      className={`btn btn-sm me-2 ${productInformationStyle['metal-btn']}  ${selectedPurity === k ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => setSelectedPurity(k)}
                      style={{
                        backgroundColor: selectedPurity === k ? '#f5f5f5' : 'transparent',
                        color: selectedPurity === k ? '#000' : '#6c757d',
                        fontWeight: selectedPurity === k ? 'bold' : 'normal',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                      }}
                    >
                      {k}
                    </button>
                  ))}
                </div>

                <div className="mb-2">
                  <label className={`${productInformationStyle['product-text']}`}>Tone:</label>
                  <br />
                  {['Yellow', 'White', 'Rose'].map((tone, i) => (
                    <button
                      key={i}
                      className={`btn btn-sm me-2 ${productInformationStyle['metal-btn']} ${selectedTone === tone ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      style={{
                        backgroundColor: selectedTone === tone ? '#f5f5f5' : 'transparent',
                        color: selectedTone === tone ? '#000' : '#6c757d',
                        fontWeight: selectedTone === tone ? 'bold' : 'normal',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                      }}
                      onClick={() => setSelectedTone(tone)}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="mb-2">
              <label className={`${productInformationStyle['product-text']}`}>Diamond:</label>
              <br />
              {['I1', 'SI', 'VS', 'LGD'].map((type, i) => (
                <button
                  key={i}
                  className={`btn btn-sm me-2 ${productInformationStyle['metal-btn']} ${selectedDiamond === type ? 'btn-secondary' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedDiamond(type)}
                  style={{
                    backgroundColor: selectedDiamond === type ? '#f5f5f5' : 'transparent',
                    color: selectedDiamond === type ? '#000' : '#6c757d',
                    fontWeight: selectedDiamond === type ? 'bold' : 'normal',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-2">
              <label className={`${productInformationStyle['product-text']}`}>Size:</label>
              <br />
              {['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5'].map((size, i) => (
                <button
                  key={i}
                  className={`btn btn-sm me-2 ${productInformationStyle['metal-btn']}  ${selectedSize === size ? 'btn-secondary' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    backgroundColor: selectedSize === size ? '#f5f5f5' : 'transparent',
                    color: selectedSize === size ? '#000' : '#6c757d',
                    fontWeight: selectedSize === size ? 'bold' : 'normal',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="mb-3 row g-0 d-flex align-items-center">
              {/* Quantity Selector */}
              <div className="col-md-4">
                <label className={`${productInformationStyle['product-text']}`}>Quantity:</label>
                <div className="d-flex align-items-center shadow-sm border rounded overflow-hidden">
                  <button
                    className="d-flex align-items-center justify-content-center flex-fill py-2 border-0 bg-transparent"
                    onClick={() => handleMainQuantityChange(-1)}
                  >
                    <IoRemoveOutline size={18} />
                  </button>
                  <div className="flex-fill text-center fw-bold py-2 border-start border-end">{quantity}</div>
                  <button
                    className="d-flex align-items-center justify-content-center flex-fill py-2 border-0 bg-transparent"
                    onClick={() => handleMainQuantityChange(1)}
                  >
                    <IoAddOutline size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="col-md-8 d-flex align-items-center mt-4 ">
                <button className="btn btn-dark w-100" onClick={handleAddToCart}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div style={{ marginTop: window.innerWidth < 768 ? '7rem' : '3rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-3 align-items-center">
            <img
              src="https://picsum.photos/200/200"
              alt="Side 1"
              className="img-fluid rounded"
              style={{ objectFit: 'cover', height: '30px', width: '40px' }}
            />
            <h5 className="fw-bold">Your Cart for Jy-2025-001</h5>
          </div>

          <h6 className="fw-bold mb-0">Subtotal: €{cart.reduce((acc, item) => acc + (Number(item.total) || 0), 0).toFixed(2)}</h6>
        </div>

        <CartTable cart={cart} handleCartQuantityChange={handleCartQuantityChange} />
      </div>

      {/* --- Desktop Version: Positioned Summary and Customer Info --- */}
      <div className="position-relative mt-5 d-none d-md-block">
        {/* Left: Metal Details */}
        <div className="col-md-8">
          <div className="d-flex gap-3 align-items-center mb-2">
            <img
              src="https://picsum.photos/200/200"
              alt="Side 1"
              className="img-fluid rounded"
              style={{ objectFit: 'cover', height: '30px', width: '30px' }}
            />

            <h5 className="fw-bold">Metal Details</h5>
          </div>
          <ProductInfoTable headers={metalHeader} rows={metalRows} />
        </div>

        {/* Right: Absolute positioned Summary and Customer Info */}
        <div
          className="position-absolute"
          style={{
            top: 0,
            right: 0,
            width: '30%',
            maxWidth: '350px',
          }}
        >
          <div className="mt-4">
            <ProductInfoTable headers={summaryHeaders} rows={summaryRows} />
          </div>
          <div className="mb-4">
            {customerInfoRows.map((item, index) => (
              <div
                key={index}
                className="bg-light p-3 fw-normal rounded"
                style={index === customerInfoRows.length - 1 ? { border: '1px solid #dee2e6' } : {}}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end gap-2 mb-4">
            <button className="btn btn-light w-100 text-dark fw-bold border rounded" onClick={() => setCart([])}>
              Delete Cart
            </button>
            <button className="btn btn-dark w-100 text-light">View Cart</button>
          </div>
        </div>
      </div>

      {/* Diamond Details */}

      <div className="mt-5 col-md-8">
        <div className="d-flex gap-3 align-items-center mb-2">
          <img
            src="https://picsum.photos/200/200"
            alt="Side 1"
            className="img-fluid rounded"
            style={{ objectFit: 'cover', height: '30px', width: '30px' }}
          />
          <h5 className="fw-bold">Diamond Details</h5>
        </div>
        <ProductInfoTable headers={diamondHeader} rows={diamondRows} />
      </div>

      {/* Color Stone Details */}

      <div className="mt-5 col-md-8">
        <div className="d-flex gap-3 align-items-center mb-2">
          <img
            src="https://picsum.photos/200/200"
            alt="Side 1"
            className="img-fluid rounded"
            style={{ objectFit: 'cover', height: '30px', width: '30px' }}
          />
          <h5 className="fw-bold">Color Stone Details</h5>
        </div>
        <ProductInfoTable headers={colorStoneHeader} rows={colorStoneRows} />
      </div>

      {/* Accessories Details */}

      <div className="mt-5 col-md-8">
        <div className="d-flex gap-3 align-items-center mb-2">
          <img
            src="https://picsum.photos/200/200"
            alt="Side 1"
            className="img-fluid rounded"
            style={{ objectFit: 'cover', height: '30px', width: '30px' }}
          />
          <h5 className="fw-bold">Accessories Details</h5>
        </div>
        <ProductInfoTable headers={accessoriesHeader} rows={accessoriesRows} />
      </div>

      {/* Labour Details */}

      <div className="mt-5 col-md-8">
        <div className="d-flex gap-3 align-items-center mb-2">
          <img
            src="https://picsum.photos/200/200"
            alt="Side 1"
            className="img-fluid rounded"
            style={{ objectFit: 'cover', height: '30px', width: '30px' }}
          />
          <h5 className="fw-bold">Labour Details</h5>
        </div>
        <ProductInfoTable headers={labourHeader} rows={labourRows} />
      </div>

      {/* --- Mobile Version: Summary and Customer Info at Bottom --- */}
      <div className="mt-5 d-block d-md-none">
        <div className="mb-4">
          <ProductInfoTable headers={summaryHeaders} rows={summaryRows} />
        </div>
        <div className="mb-4">
          {customerInfoRows.map((item, index) => (
            <div
              key={index}
              className="bg-light p-3 fw-normal rounded"
              style={index === customerInfoRows.length - 1 ? { border: '1px solid #dee2e6' } : {}}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end gap-2 mb-4">
          <button className="btn btn-light w-100 text-dark fw-bold border rounded">Delete Cart</button>
          <button className="btn btn-dark w-100 text-light">View Cart</button>
        </div>
      </div>
    </div>
  );
}
