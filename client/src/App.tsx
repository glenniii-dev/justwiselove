import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Layout from "./pages/admin/Layout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddArticle from "./pages/admin/AddArticle";
import AllArticles from "./pages/admin/AllArticles";
import Comments from "./pages/admin/Comments";
import Users from "./pages/admin/Users";
import { useAuth } from "./context/auth/useAuth";

export default function App() {
  const { token } = useAuth();
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article:id" element={<Article />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addArticle" element={<AddArticle />} />
          <Route path="allArticles" element={<AllArticles />} />
          <Route path="comments" element={<Comments />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  )
}