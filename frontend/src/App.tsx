import './App.css';
import AddToCart from './pages/addToCart';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/addtocart" element={<AddToCart />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
