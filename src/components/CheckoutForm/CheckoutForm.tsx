import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseInit';
import { clearCart, setOrderSuccess } from '../../features/cartSlice';

interface Form {
  name: string;
  surname: string;
  address: string;
  phone: string;
}

export const CheckoutForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset, formState } = useForm<Form>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      address: '',
      phone: '',
    },
  });
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const { errors, isValid } = formState;

  const onSubmit = async (data: Form) => {
    const order = {
      ...data,
      cartItems,
      subTotal: Math.floor(
        cartItems.reduce(
          (acc, item) => acc + +item.product.convertedPrice * item.cartQuantity,
          0,
        ),
      ),
      currency: localStorage.getItem('selectedCurrency'),
      orderDate: new Date().toLocaleString(),
    };

    const ordersCollectionRef = collection(db, 'orders');
    const docRef = doc(ordersCollectionRef);
    await setDoc(docRef, order);

    dispatch(setOrderSuccess());
    dispatch(clearCart());
    reset();
  };

  return (
    <div className='lg:flex lg:flex-col lg:gap-y-4 lg:w-1/4'>
      <h2 className='lg:text-4xl lg:font-semibold lg:text-center'>Checkout</h2>
      <form
        className='lg:shadow-2xl shadow-zinc-400 bg-zinc-300 border lg:flex lg:flex-col lg:gap-y-3 lg:rounded-xl lg:h-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='lg:px-6 lg:tracking-widest lg:mt-10'>
          <label htmlFor='name'></label>
          <input
            {...register('name', {
              required: true,
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters long',
              },
            })}
            className='lg:shadow-sm shadow-slate-500 lg:w-full lg:px-4 lg:py-4 lg:rounded-lg placeholder-slate-400 lg:text-2xl lg:focus:outline-none lg:focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            placeholder='NAME'
            type='text'
            id='name'
            name='name'
          />
          <div className='lg:mt-1 lg:text-sm'>
            {errors?.name && (
              <span className='text-red-500'>
                {errors.name.message || 'Please enter your name'}
              </span>
            )}
          </div>
        </div>
        <div className='lg:px-6 lg:tracking-widest'>
          <label htmlFor='surname'></label>
          <input
            {...register('surname', {
              required: true,
              minLength: {
                value: 3,
                message: 'Surname must be at least 3 characters long',
              },
            })}
            className='lg:shadow-xl lg:w-full lg:px-4 lg:py-4 lg:rounded-lg placeholder-slate-400 lg:text-2xl lg:focus:outline-none lg:focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            placeholder='SURNAME'
            type='text'
            id='surname'
            name='surname'
          />
          <div className='lg:mt-1 lg:text-sm'>
            {errors.surname && (
              <span className='text-red-500'>
                {errors.surname.message || 'Please enter your surname'}
              </span>
            )}
          </div>
        </div>
        <div className='lg:px-6 lg:tracking-widest'>
          <label htmlFor='address'></label>
          <input
            {...register('address', { required: true, minLength: {
              value: 5,
              message: 'Address must be at least 5 characters long',
            }, })}
            className='lg:shadow-xl lg:w-full lg:px-4 lg:py-4 lg:rounded-lg placeholder-slate-400 lg:text-2xl lg:focus:outline-none lg:focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            placeholder='ADDRESS'
            type='text'
            id='address'
            name='address'
          />
          <div className='lg:mt-1 lg:text-sm'>
            {errors.address && (
              <span className='text-red-500'>
                {errors.address.message || 'Please, enter your address'}
              </span>
            )}
          </div>
        </div>
        <div className='lg:px-6 lg:tracking-widest'>
          <label htmlFor='phone'></label>
          <input
            {...register('phone', {
              required: 'Please, enter your phone',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Please, enter a valid phone number',
              },
            })}
            className='lg:w-full lg:shadow-xl lg:px-4 lg:py-4 lg:rounded-lg placeholder-slate-400 lg:text-2xl lg:focus:outline-none lg:focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            placeholder='PHONE'
            type='text'
            id='phone'
            name='phone'
          />
          <div className='lg:mt-1  lg:text-sm'>
            {errors.phone && typeof errors.phone === 'object' ? (
              <span className='text-red-500'>{errors.phone.message}</span>
            ) : (
              <span className='text-red-500'>{errors.phone}</span>
            )}
          </div>
        </div>
        <button
          disabled={!isValid}
          type='submit'
          className={classNames(
            'bg-gray-700 lg:mt-16 lg:mx-6 lg:py-3 text-white uppercase lg:rounded-md lg:text-2xl hover:bg-gray-500 transition-all lg:tracking-wider lg:mb-5',
            {
              '!bg-gray-400': !isValid,
            },
          )}
        >
          Order
        </button>
      </form>
    </div>
  );
};
