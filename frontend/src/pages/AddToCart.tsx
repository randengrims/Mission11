import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function AddToCart() {
  const navigate = useNavigate();
  return (
    <>
      <WelcomeBand />
      <h1>Add To Cart</h1>

      <div>
        <input type="number" placeholder="Enter Donation Amount" />
        <button>Add to Cart</button>
      </div>

      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default AddToCart;
