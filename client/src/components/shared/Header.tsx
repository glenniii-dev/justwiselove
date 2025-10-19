import { useAuth } from "../../context/auth/useAuth";

export default function Header() {
  const { token } = useAuth();
  return (
    <header className="flex flex-row justify-center bg-linear-90 from-stone-800 via-stone-800/90 to-stone-800 shadow-lg h-18 items-center p-5 w-screen">
      <div className="flex flex-row justify-between items-center p-5 min-w-100 sm:min-w-150 md:min-w-180 lg:min-w-250 xl:min-w-280 max-w-350">
        <a href="/" className="flex flex-row gap-4 font-semibold text-white text-3xl w-full items-center">
          <svg className="h-7" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 18 L15 18 L23 35 L31 0  L39 35 L47 18 L55 35 L63 0 L71 35 L79 18 L94 18" stroke="#fff" strokeWidth="4" fill="none"/>
          </svg>
          Just Wise Love
        </a>
        <a href="/admin" className="flex flex-row items-center text-center bg-white py-1 px-6 rounded-lg shadow-stone-900 text-stone-800 font-bold hover:shadow-md hover:scale-105 transition-all">{token ? "Dashboard" : "Login"}</a>
      </div>
    </header>
  )
}
