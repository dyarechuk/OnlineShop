import { ClipLoader } from 'react-spinners';
import { useGetProductsQuery } from '../../features/productsApi';
import { Product } from '../../types/Product';
import { CSSProperties } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

const Home = () => {
  const { data, error, isLoading } = useGetProductsQuery({});

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    marginTop: '20%',
  };

  return isLoading ? (
    <ClipLoader cssOverride={override} size={150} />
  ) : error ? (
    <p>An error occured</p>
  ) : (
    <div className='lg:px-16 lg:py-8 py-4 px-8'>
      <h2 className='lg:text-4xl text-2xl lg:text-center'>New Arrivals</h2>
      <div className='lg:flex lg:justify-between lg:flex-wrap lg:mt-8 mt-2'>
        {(data as Product[]).map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
