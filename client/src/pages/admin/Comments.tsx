import toast from "react-hot-toast";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useEffect, useState } from "react";
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

type CommentType = {
  article : Article,
  name: string,
  content: string,
  isApproved: boolean,
  _id: string;
  createdAt: string;
};


export default function Comments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAuth();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      if (data.success) {
        setComments(data.comments);
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
    fetchComments();
  }, [])

  return (
    <div className="h-full w-full flex flex-col pt-5 px-5 sm:pt-12 sm:pl-10">
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-3xl font-semibold text-stone-800">Comments</h1>
        <div className="flex gap-4">
          <button onClick={() => setFilter('Approved')} className={`border rounded-full px-4 py-1 cursor-pointer text-md font-semibold ${filter === 'Approved' ? 'text-green' : 'text-stone-700'}`}>Approved</button>
          <button onClick={() => setFilter('Not Approved')} className={`border rounded-full px-4 py-1 cursor-pointer text-md font-semibold ${filter === 'Not Approved' ? 'text-green' : 'text-stone-700'}`}>Not Approved</button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 g-white shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">Article Title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if (filter === 'Approved' && comment) return comment.isApproved === true;

              return comment.isApproved === false;
            }).map((comment) => <CommentTableItem key={comment._id} comment={comment} fetchComments={fetchComments} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}