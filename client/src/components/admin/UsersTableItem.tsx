import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { useAuth } from "../../context/auth/useAuth";

interface Users {
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  _id: string;
}

interface TableData {
  user: Users;
  fetchUsers: () => Promise<void>;
}

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
}

export default function UsersTableItem({ user, fetchUsers }: TableData) {
  const token = localStorage.getItem("token");
  const { axios } = useAuth();
  const { name, email, role, isApproved } = user;
  const isAdmin = role === "admin";

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

  const deleteUser = async () => {
    const confirmed = await confirmDialog({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
    });

    if (!confirmed) return;

    try {
      const { data } = await axios.delete(`/api/admin/delete`, {
        data: { userId: user._id },
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const approveUser = async () => {
    const confirmed = await confirmDialog({
      title: 'Confirm Approval',
      message: 'Are you sure you want to make this user an admin? NOTICE: THIS ACTION CANNOT BE UNDONE.',
    });

    if (!confirmed) return;
    try {
      const { data } = await axios.post(`/api/admin/approve`, { userId: user._id });
      if (data.success) {
        toast.success(data.message);
        await fetchUsers();
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
      <td className="pl-6 px-2 py-4 max-md:max-w-35 word-wrap">{ name }</td>
      <td className="px-2 py-4 max-sm:hidden">{ email }</td>
      <td className="px-2 py-4 max-sm:hidden">{ role }</td>
      <td className="px-2 py-4 flex text-xs gap-3">
        {!isApproved && (
          <button onClick={approveUser} className="border px-2 py-0.5 mt-1 rounded cursor-pointer">
            Approve
        </button>
        )}
        {!isAdmin ? ( <img
          onClick={deleteUser}
          src="/assets/delete.png"
          alt="delete icon"
          className="w-5 h-5 hover:scale-110 transition-all cursor-pointer"
          /> ) : ( <div className="text-stone-400 italic">N/A</div> )
        }
      </td>
    </tr>
  );
}