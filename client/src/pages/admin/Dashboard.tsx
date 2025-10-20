import { useState, useEffect } from "react";
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
export default function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    totalArticles: 0,
    totalComments: 0,
    totalDrafts: 0,
    recentArticles: [],
  });

  const { axios } = useAuth();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      if (data && data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data?.message);
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
    fetchDashboard();
  }, [])

  return (
    <div className="h-full w-full flex flex-col gap-4 p-4 md:p-8">

      <div className="flex flex-wrap gap-4">
        
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src="/assets/articles.png" alt="articles icon" className="h-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.totalArticles}</p>
            <p className="text-gray-400 font-light">Articles</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src="/assets/comments.png" alt="comment data icon" className="h-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.totalComments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src="/assets/create.png" alt="create icon" className="h-10" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.totalDrafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <p className="text-2xl font-semibold">Recent Articles</p>
        </div>
        
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mb-4">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6"> # </th>
                <th scope="col" className="px-2 py-4">Article Title</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentArticles.map((article: Article, index) => { 
                return <ArticleTableItem key={article._id} article={article} fetchArticles={fetchDashboard} index={index++} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
