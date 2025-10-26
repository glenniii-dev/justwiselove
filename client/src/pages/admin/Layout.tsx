import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import BottomBar from "../../components/admin/BottomBar";

export default function Layout() {

  function Logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
    return (
      <>
      <header className="flex flex-row justify-between bg-linear-90 from-stone-800 via-stone-800/90 to-stone-800 shadow-lg h-18 items-center p-5 w-screen">
        <a href="/" className="flex flex-row gap-4 font-semibold text-white text-3xl w-full items-center">
          <img src="/jwl.png" alt="jwl logo" className="h-15" />
          Just Wise Love
        </a>
        <button onClick={Logout} className="flex flex-row items-center text-center bg-white py-1 px-6 rounded-lg shadow-stone-900 text-stone-800 font-bold hover:shadow-md hover:scale-105 transition-all">Logout</button>
      </header>
      <div className="flex h-[calc(100vh-70px)]">
        <div className="hidden sm:flex flex-row w-full h-full">
          <Sidebar />
          <div className="flex-1 h-full overflow-y-auto bg-stone-200"> {/* Added bg-gray-50 for full-height background */}
            <Outlet />
          </div>
        </div>
        <div className="w-full flex flex-col sm:hidden h-full">
          <div className="flex-1 overflow-y-auto bg-stone-200"> {/* Added bg-gray-50 for full-height background */}
            <Outlet />
          </div>
          <BottomBar />
        </div>
      </div>
      </>
    )
}