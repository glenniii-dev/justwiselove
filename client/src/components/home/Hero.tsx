export default function Hero() {
  return (
    <section className='flex flex-col items-center justify-center border-t-[1px] border-white py-40 px-10 sm:px-20 w-screen bg-radial from-stone-700 to-stone-800 text-white'>
      <h1 className="text-6xl md:text-7xl font-semibold sm:leading-16">Live your <span className="text-green"> best</span> life now</h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto text-lg md:px-18 lg:px-20 md:text-xl mx-auto text-justify">This is your space to thing out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here</p>

        <form className="flex justify-between w-90 lg:w-100 max-sm:scale-75 mx-auto border border-gray-300 bg-transparent rounded-lg overflow-hidden text-lg">
          <input type="text" placeholder="Search for blogs" required className="w-full pl-4 outline-none" />
          <button type="submit" className="bg-white text-stone-900 font-bold px-8 py-2 m-1 rounded-sm hover:scale-105 hover:mr-[6px] transition-all cursor-pointer">Search</button>
        </form>
    </section>
  )
}
