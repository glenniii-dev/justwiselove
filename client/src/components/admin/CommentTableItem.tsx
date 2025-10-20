import toast from "react-hot-toast";
import { useAuth } from "../../context/auth/useAuth";
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

type CommentType = {
  article : Article,
  name: string,
  content: string,
  isApproved: boolean,
  _id: string;
  createdAt: string;
};

type TableItem = {
  comment: CommentType;
  fetchComments: () => Promise<void>;
}

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
}

export default function CommentTableItem({comment, fetchComments}: TableItem) {
  const { article, createdAt, _id } = comment;
  const ArticleDate = new Date(createdAt);

  const token = localStorage.getItem("token");
  const { axios } = useAuth();

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

  const approveComment = async () => {
    try {
      const { data } = await axios.put(`/api/admin/comments/approve`, {id: _id});
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
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

  const deleteComment = async () => {
    try {
      const confirmed = await confirmDialog({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this comment?',
      });
      if (!confirmed) return;

      const { data } = await axios.delete(`/api/admin/comments/delete`, {
        headers: { token },
        data: { id: _id },
      });
      
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
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


  return (
    <tr className="order-y border-b border-gray-200">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Article</b> : {article.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {ArticleDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img onClick={approveComment} src="/assets/check.png" alt="check icon" className="h-5 w-5 hover:scale-110 transition-all cursor-pointer" />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
          )}
          <img onClick={deleteComment} src="/assets/delete.png" alt="delete icon" className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
        </div>
      </td>
    </tr>
  )
}