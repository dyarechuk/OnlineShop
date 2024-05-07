import { Link } from 'react-router-dom';
import './particles.css';

const NotFoundPage = () => {
  return (
    <>
      <div
        className='flex min-h-[calc(100vh-61px-103px)] items-center justify-center bg-lightness 
  bg-cover object-fill transition-all dark:bg-darkness'
      >
        <div
          className='z-20 mx-4 rounded-xl p-8 
      text-center shadow-2xl shadow-zinc-950 dark:shadow-zinc-500 dark:brightness-95 dark:backdrop-blur-[0.5px] sm:mx-6 sm:max-w-xl xl:mx-8 xl:max-w-2xl'
        >
          <h1 className='mb-6 text-6xl font-bold text-404color dark:text-dark-black sm:text-7xl'>
            404
          </h1>
          <p className='text-3xl font-semibold text-gray-700  dark:text-dark-surface1  '>
            Oops! The page you are looking for could not be found.
          </p>
          <Link
            to='/'
            className='mt-8 inline-block rounded bg-slate-700 px-6 py-4 
  font-bold text-white transition-all hover:bg-404color 
   hover:shadow-sh1 dark:hover:bg-slate-600'
          >
            Go back to Home
          </Link>
        </div>
      </div>
      <div className='particle' />
      <div className='particle' />
      <div className='particle' />
      <div className='particle' />
    </>
  );
};

export default NotFoundPage;
