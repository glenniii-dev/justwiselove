import toast from "react-hot-toast";
import { useArticle } from "../../context/article/useArticle";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

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

interface TableData {
  article: Article;
  fetchArticles: () => Promise<void>;
  index: number;
}

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
}

export default function ArticleTableItem({ article, fetchArticles, index }: TableData) {
  const token = localStorage.getItem("token");
  const { axios } = useArticle();
  const navigate = useNavigate();
  const { title, createdAt } = article;
  const ArticleDate = new Date(createdAt);

  function confirmDialog(options: ConfirmDialogOptions) {
    return new Promise((resolve) => {
      confirmAlert({
        ...options,
        buttons: [
          {
            label: 'Yes',
            onClick: () => resolve(true)
          },
          {
            label: 'No',
            onClick: () => resolve(false)
          }
        ],
      });
    });
  }

  const deleteArticle = async () => {
    const confirmed = await confirmDialog({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this article?',
    });

    if (!confirmed) return;

    try {
      const { data } = await axios.delete(`/api/articles/delete`, {
        data: { id: article._id },
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await fetchArticles();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post(`/api/articles/toggle-publish`, { id: article._id });
      if (data.success) {
        toast.success(data.message);
        await fetchArticles();
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
  };

  return (
    <tr className="border-y border-gray-300 text-md font-medium">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4 max-md:max-w-35 word-wrap">{ article.isPublished ?
        ( <a href={`/article/${article._id}`} target="_blank" className="hover:underline">{title}</a>) : (
          <button
            onClick={() => navigate('/admin/create', { state: { article } })}
            className="text-left hover:underline"
          >
            {title}
          </button>
        ) }</td>
      <td className="px-2 py-4 max-sm:hidden">{ArticleDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={`${article.isPublished ? "text-green-600" : "text-orange-700"}`}>
          {article.isPublished ? "Published" : "Draft"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3 items-center">
        <button onClick={togglePublish} className="border px-2 py-0.5 mt-1 rounded cursor-pointer font-bold">
          {article.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteArticle}
          src="/assets/delete.png"
          alt="delete icon"
          className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
}