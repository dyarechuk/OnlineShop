import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrency } from '../../features/currencySlice';
import { getCurrSymbol } from '../../utils/getCurrSymbol';

const NavBar = () => {
  const cart = useAppSelector((state) => state.cart);
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  const totalAmount = cart.cartItems.reduce((acc, item) => {
    return acc + Number(item.product.convertedPrice) * item.cartQuantity;
  }, 0);

  return (
    <nav className='lg:h-16 bg-gray-600 flex justify-between items-center px-4 lg:px-16 lg:py-0'>
      <div className='flex items-center'>
        <Link to='/' className='text-white no-underline'>
          <h2 className='text-xl lg:text-4xl'>OnlineShop</h2>
        </Link>
      </div>
      <select
        value={selectedCurrency}
        onChange={(e) => {
          dispatch(selectCurrency(e.target.value));
        }}
        className='text-slate-100 lg:mr-4 h-20 lg:h-full px-3 bg-slate-800 focus:outline-none'
      >
        <option value='USD'>USD</option>
        <option value='UAH'>UAH</option>
        <option value='EUR'>EUR</option>
      </select>
      <Link to='/cart' className=''>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='#fff'
            className='bi bi-basket mr-2'
            viewBox='0 0 16 16'
          >
            <path d='M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5' />
          </svg>
          {!!totalAmount && (
            <span className='lg:px-3 lg:py-2 lg:min-w-24 lg:flex lg:justify-center lg:items-center bg-slate-200 lg:text-sm lg:font-bold text-slate-800 lg:ml-5'>
              {getCurrSymbol(selectedCurrency)}
              {totalAmount}
            </span>
          )}
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
