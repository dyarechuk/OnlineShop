import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { clearCart } from '../../features/cartSlice';
import { useMemo } from 'react';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';
import { getCurrSymbol } from '../../utils/getCurrSymbol';
import { CartItem } from '../CartItem/CartItem';

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  const { selectedCurrency } = useAppSelector((state) => state.currency);

  const dispatch = useAppDispatch();

  const totals = useMemo(() => {
    return cart.cartItems.reduce(
      (acc, item) => {
        return {
          totalAmount:
            acc.totalAmount + +item.product.convertedPrice * item.cartQuantity,
          totalQuantity: acc.totalQuantity + item.cartQuantity,
        };
      },
      { totalAmount: 0, totalQuantity: 0 },
    );
  }, [cart]);

  return (
    <div className='px-4 lg:px-16 py-4 lg:py-8'>
      <h2 className='text-3xl text-center'>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='mt-4 border shadow-xl block mx-auto py-4 max-w-full lg:max-w-[40%]'>
          <p className='text-center lg:text-4xl'>
            Your cart is currently empty
          </p>
          <div className='mt-2'>
            <Link
              to='/'
              className='flex gap-3 justify-center text-slate-700 items-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                fill='currentColor'
                className='bi bi-arrow-left'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8'
                />
              </svg>
              <span className='text-xl lg:text-2xl'>Start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className='lg:flex lg:justify-between lg:gap-x-20'>
          <div className='lg:w-3/4'>
            <div className='lg:mt-8 lg:mb-4 lg:grid lg:items-center lg:grid-cols-6'>
              <h3 className='lg:text-sm uppercase lg:col-span-3 lg:pl-2'>
                Product
              </h3>
              <h3 className='lg:text-sm uppercase lg:col-span-1'>Price</h3>
              <h3 className='lg:text-sm uppercase lg:col-span-1'>Quantity</h3>
              <h3 className='lg:text-sm uppercase lg:col-span-1 lg:pr-2 lg:justify-self-end'>
                Total
              </h3>
            </div>
            <div className=''>
              {cart.cartItems?.map((cartItem) => (
                <CartItem cartItem={cartItem} key={cartItem.id} />
              ))}
            </div>
            <div className='lg:flex lg:justify-between lg:items-start'>
              <button
                className='lg:w-32 lg:max-w-full lg:h-10 lg:rounded-md lg:tracking-wide lg:border text-slate-500 hover:bg-gray-600 hover:text-white transition-all'
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
              <div className=''>
                <div className='lg:flex lg:justify-between lg:text-xl lg:gap-x-3'>
                  <span>Subtotal:</span>
                  <span className='lg:font-bold'>
                    {getCurrSymbol(selectedCurrency)}
                    {Math.floor(totals.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CheckoutForm />
        </div>
      )}
    </div>
  );
};

export default Cart;
