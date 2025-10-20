import { useEffect, useState } from "react";
import UsersTableItem from "../../components/admin/UsersTableItem";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth/useAuth";

interface Users {
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  _id: string;
}

export default function Users() {

  const { axios } = useAuth();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/admin/users");
      if (data.success) {
        setUsers(data.users);
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
    fetchUsers();
  }, [])

  return (
    <div className="h-full w-full flex flex-col pt-5 px-5 sm:pt-12 sm:px-10">
      <h1 className="text-3xl font-semibold text-stone-800">All Users</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="pl-6 px-2 py-4">Name</th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">Email</th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">Role</th>
              <th scope="col" className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: Users) => {
              return <UsersTableItem key={user._id} user={user} fetchUsers={fetchUsers} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}