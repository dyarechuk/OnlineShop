/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import NavBar from './components/NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { convertAllToCurrency } from './features/cartSlice';
import { store } from './app/store';
import { useAppSelector } from './app/hooks';

function App() {
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  const { cartItems, cartTotalAmount } = useAppSelector((state) => state.cart);

  useEffect(() => {
    store.dispatch(convertAllToCurrency(selectedCurrency));
  }, [selectedCurrency, cartItems.length, cartTotalAmount]);

  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
