import React from 'react';
import { Product } from '../../types/Product';
import { getCurrSymbol } from '../../utils/getCurrSymbol';
import { convertCurrency } from '../../utils/convertCurrency';
import { useAppSelector } from '../../app/hooks';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { selectedCurrency } = useAppSelector((state) => state.currency);

  return (
    <div
      key={product.id}
      className='lg:w-64 max-w-full flex flex-col lg:justify-between mt-4 mx-auto p-2 lg:p-4 shadow-lg rounded-lg'
    >
      <h3 className='text-2xl mt-2 ml-2'>{product.name}</h3>
      <img
        src={product.image}
        alt={product.name}
        className='lg:w-[80%] mx-auto mt-2 lg:mt-4 lg:max-h-48 w-[60%]'
      />
      <div className='flex justify-between align-center mt-2 px-4 lg:px-0'>
        <span className=''>{product.desc}</span>
        <span className='lg:text-xl font-bold text-lg'>
          {getCurrSymbol(selectedCurrency)}
          {convertCurrency(selectedCurrency, product.usdPrice)}
        </span>
      </div>

      <AddToCartButton product={product} />
    </div>
  );
};
