export default function Hero() {
  return (
    <section className='flex flex-col items-center justify-center border-t-[1px] border-white w-screen bg-[url(/assets/gradientBackground.png)] bg-center bg-no-repeat bg-contain text-stone-800'>
      <div className='bg-stone-200/60 flex flex-col items-center justify-center w-screen py-30 px-10 sm:px-20 '>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold sm:leading-16">Live your <span className="text-green"> best</span> life now</h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto text-lg md:px-18 lg:px-20 md:text-xl mx-auto text-center font-medium">In a world full of questions and uncertainties, uncover timeless wisdom that guides you toward deeper meaning and lasting joy. Explore a path rich in purpose, enduring values, and principles that elevate everyday living. Whether you seek clarity, inner peace, or true happiness that lasts forever, discover truth that transforms your life!</p>

        <form className="flex justify-between w-90 lg:w-100 max-sm:scale-75 border border-stone-800 bg-transparent rounded-lg overflow-hidden text-lg">
          <input type="text" placeholder="Search articles..." required className="w-full pl-4 outline-none font-medium" />
          <button type="submit" className="bg-stone-800 text-white font-bold px-8 py-2 m-1 rounded-sm hover:scale-105 hover:mr-[6px] transition-all cursor-pointer">Search</button>
        </form>
      </div>
    </section>
  )
}
