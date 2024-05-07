import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../../features/cartSlice';
import { Product } from '../../types/Product';
import classNames from 'classnames';

interface Props {
  product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const cartItemsIds = cart.cartItems.map((item) => item.product.id);

  return (
    <button
      disabled={cartItemsIds.includes(product.id)}
      onClick={() => dispatch(addToCart(product))}
      className={classNames(
        'lg:mt-10 mt-5 outline-none lg:w-full p-2 bg-slate-500 text-white rounded-md lg:border-none hover:bg-slate-400 transition-all tracking-wide',
        {
          '!bg-gray-800 ': cartItemsIds.includes(product.id),
        },
      )}
    >
      {cartItemsIds.includes(product.id) ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
