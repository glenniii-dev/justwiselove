import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-row justify-between border-t border-gray-200 px-6">

      <NavLink end={true} to="/admin" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-green/10 border-t-4 border-green"}`}>
        <img src="/assets/home.png" alt="home icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink to="/admin/create" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-green/10 border-t-4 border-green"}`}>
        <img src="/assets/create.png" alt="create icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Create Article</p>
      </NavLink>

      <NavLink to="/admin/allArticles" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-green/10 border-t-4 border-green"}`}>
        <img src="/assets/articles.png" alt="articles icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">All Articles</p>
      </NavLink>

      <NavLink to="/admin/comments" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-green/10 border-t-4 border-green"}`}>
        <img src="/assets/comments.png" alt="comments icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>

      <NavLink to="/admin/users" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-green/10 border-t-4 border-green"}`}>
        <img src="/assets/users.png" alt="users icon" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Users</p>
      </NavLink>



    </div>
  )
}