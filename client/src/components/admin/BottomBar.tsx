import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-row justify-between border-t border-gray-200 px-6">

      <NavLink end={true} to="/admin" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-t-4 border-primary"}`}>
        <img src="/assets/home_icon.svg" alt="home icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink to="/admin/addBlog" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-t-4 border-primary"}`}>
        <img src="/assets/add_icon.svg" alt="add icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink to="/admin/listBlog" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-t-4 border-primary"}`}>
        <img src="/assets/list_icon.svg" alt="add icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog lists</p>
      </NavLink>

      <NavLink to="/admin/comments" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-t-4 border-primary"}`}>
        <img src="/assets/comment_icon.svg" alt="add icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>

    </div>
  )
}