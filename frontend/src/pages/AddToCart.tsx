import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../Types/CartItem';
import { useState } from 'react';

function AddToCart() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { itemAddToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Add to Cart clicked');

    const newitem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No title found',
      price: Number(price),
    };
    console.log('New item:', newitem);

    itemAddToCart(newitem);
    console.log('Item added to cart');

    try {
      const toastEl = document.getElementById('addToast');
      console.log('Toast element:', toastEl);

      if (toastEl) {
        const toast = new (window as any).bootstrap.Toast(toastEl);
        toast.show();
        console.log('Toast shown');
      } else {
        console.warn('Toast element not found');
      }
    } catch (error) {
      console.error('Error showing toast:', error);
    }

    setTimeout(() => {
      console.log('Navigating to /cart...');
      navigate('/cart');
    }, 1000);
  };

  return (
    <>
      <WelcomeBand />
      <h1>Do you want to add {title} to your cart?</h1>

      <div>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>

      <button onClick={() => navigate('/books')}>Go Back</button>

      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          id="addToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">✅ Added to cart!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddToCart;
