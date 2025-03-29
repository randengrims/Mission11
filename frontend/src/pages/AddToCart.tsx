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
    const newitem: CartItem =
     {
      bookId: Number(bookId),
      title: title || 'No title found',
      price: Number(price),
    };
    itemAddToCart(newitem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h1>Do you want to add {title} to your cart?</h1>

      <div>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>

      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default AddToCart;
