import { useEffect, useState } from "react";
import ArticleTableItem from "../../components/admin/ArticleTableItem";

import toast from "react-hot-toast";
import { useAuth } from "../../context/auth/useAuth";

interface Category {
  category: string;
  description: string | null;
}

interface Article {
  title: string;
  subtitle: string;
  content: string;
  category: Category | string;
  _id: string;
  createdAt: string;
  isPublished: boolean;
}
export default function AllArticles() {

  const { axios } = useAuth();

  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const { data } = await axios.get("/api/admin/articles");
      if (data.success) {
        setArticles(data.articles);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [])

  return (
    <div className="h-full w-full flex flex-col pt-5 px-5 sm:pt-12 sm:px-10">
      <h1 className="text-3xl font-semibold text-stone-800">All Articles</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">#</th>
              <th scope="col" className="px-2 py-4">Title</th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
              <th scope="col" className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article: Article, index) => {
              return <ArticleTableItem key={article._id} article={article} fetchArticles={fetchArticles} index={index++} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}