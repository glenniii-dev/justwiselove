export default function Header() {
  return (
    <header className='flex flex-row justify-center bg-linear-90 from-stone-800 via-stone-800/90 to-stone-800 shadow-lg h-18 items-center p-5 w-screen'>
      <div className='flex flex-row justify-between items-center p-5 min-w-100 sm:min-w-150 md:min-w-180 lg:min-w-250 xl:min-w-280 max-w-350'>
        <a href='/' className='flex flex-row gap-4 font-semibold text-white text-3xl w-full items-center'>
          <img src='/assets/jwl.png' alt='Just Wise Love Logo' className='w-15' />
          Just Wise Love
        </a>
        <a href='/admin' className='flex flex-row items-center text-center bg-white py-1 px-6 rounded-lg shadow-stone-900 text-stone-800 font-bold hover:shadow-md hover:scale-105 transition-all'>Login</a>
      </div>
    </header>
  )
}
