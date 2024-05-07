import React from 'react';
import { CartProduct } from '../../types/CartProduct';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../features/cartSlice';
import { getCurrSymbol } from '../../utils/getCurrSymbol';
import classNames from 'classnames';

interface Props {
  cartItem: CartProduct;
}

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { selectedCurrency } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  return (
    <div className='lg:grid lg:items-center lg:grid-cols-6 lg:border-t border-slate-300 lg:py-4'>
      <div className='lg:col-span-3 lg:flex'>
        <img
          src={cartItem.product.image}
          alt={cartItem.product.name}
          className='lg:w-24 lg:max-w-full lg:mr-4'
        />
        <div className=''>
          <h3 className='lg:font-semibold'>{cartItem.product.name}</h3>
          <p>{cartItem.product.desc}</p>
          <button
            onClick={() => dispatch(removeFromCart(cartItem))}
            className='lg:mt-2.5 text-slate-500 hover:text-black transition-all'
          >
            Remove
          </button>
        </div>
      </div>
      <div className='lg:col-span-1'>
        {getCurrSymbol(selectedCurrency)}
        {cartItem.product.convertedPrice}
      </div>
      <div className='lg:col-span-1 lg:flex lg:justify-center lg:w-32 lg:max-w-full lg:border border-slate-500 lg:rounded-lg'>
        <button
          className='lg:py-3 lg:px-6'
          onClick={() => dispatch(decreaseQuantity(cartItem))}
        >
          -
        </button>
        <div className='lg:py-3'>{cartItem.cartQuantity}</div>
        <button
          className='lg:py-3 lg:px-6'
          onClick={() => dispatch(increaseQuantity(cartItem))}
        >
          +
        </button>
      </div>
      <div
        className={classNames(
          `lg:col-span-1 lg:justify-self-end lg:pr-2 lg:font-bold`,
        )}
      >
        {getCurrSymbol(selectedCurrency)}
        {+cartItem.product.convertedPrice * cartItem.cartQuantity}
      </div>
    </div>
  );
};
