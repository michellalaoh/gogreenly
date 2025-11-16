import { Route, Routes, useLocation } from 'react-router';
import './App.css'
import HomePage from './home-page/HomePage';
import ProductPage from './product-page/ProductPage';
import { useState, useEffect } from 'react';
import OrderPage from './order-page/OrderPage';
import CartPage from './cart/CartPage';
import { CartProvider } from './context/CartContext';



function App() {
  const [cartShow, setCartShow] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const location = useLocation();

  // Sync URL parameters with categories state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoriesParam = searchParams.get("categories");
    
    if (categoriesParam) {
      // Split by '+' to get individual categories
      const urlCategories = categoriesParam.split('+');
      setCategories(urlCategories);
    } else {
      setCategories([]);
    }
  }, [location.search]);

  console.log(categories)

  return (
    <CartProvider cartShow={cartShow} setCartShow={setCartShow}>
      <Routes>
        <Route index element={<HomePage cartShow={cartShow} setCartShow={setCartShow} categories={categories} setCategories={setCategories} />} />
        <Route path='products' element={<ProductPage cartShow={cartShow} setCartShow={setCartShow} categories={categories} setCategories={setCategories} />} />
        <Route path='my-order' element={<OrderPage cartShow={cartShow} setCartShow={setCartShow} />} />
        <Route path='cart' element={<CartPage cartShow={cartShow} setCartShow={setCartShow} />} />
      </Routes>
    </CartProvider>
  )
}

export default App
