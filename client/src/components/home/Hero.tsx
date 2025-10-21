import { useRef } from "react";
import { useArticle } from "../../context/article/useArticle";

export default function Hero() {
  const { setInput, input } = useArticle();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput(inputRef.current?.value || '');
  };

  const onClear = () => {
    setInput('')
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <section className="flex flex-col items-center justify-center border-t-[1px] border-white w-screen bg-[url(/assets/gradientBackground.png)] bg-center bg-no-repeat bg-contain text-stone-800">
      <div className="bg-stone-200/60 flex flex-col items-center justify-center w-screen pt-30 pb-10 px-10 sm:px-20">
        <a href="/family" className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-8 border border-green/40 bg-green/10 rounded-full text-sm text-green font-semibold hover:transition-all hover:duration-500 hover:ease-in-out hover:scale-105">
          <p>FAMILY WORSHIP</p>
          <img src="/assets/bible.png" alt="bible icon" className="w-5 h-5" />
        </a>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold sm:leading-16">Live your <span className="text-green"> best</span> life now</h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto text-lg md:px-18 lg:px-20 md:text-xl mx-auto text-center font-medium">In a world of questions and uncertainties, build wisdom that guides you toward deeper meaning and joy. Explore a path rich in purpose, values, and principles that elevate everyday living. Whether you seek clarity, peace, or happiness that lasts, discover life-saving truth!</p>

        <form onSubmit={onSubmitHandler} className="flex justify-between w-90 lg:w-100 max-sm:scale-75 border border-stone-800 bg-transparent rounded-lg overflow-hidden text-lg">
          <input ref={inputRef} type="text" placeholder="Search articles..." required className="w-full pl-4 outline-none font-medium" />
          <button type="submit" className="bg-stone-800 text-white font-bold px-8 py-2 m-1 rounded-sm hover:scale-105 hover:mr-[6px] transition-all cursor-pointer">Search</button>
        </form>
      </div>

      <div className="text-center">
        {input && <button onClick={onClear} className="border border-stone-800 text-xs py-1 px-3 rounded-sm cursor-pointer font-bold hover:bg-stone-800 hover:text-white">Clear Search</button>
        }
      </div>
    </section>
  )
}
