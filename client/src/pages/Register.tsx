import { useState } from "react";
import { useAuth } from "../context/auth/useAuth";
import { toast } from "react-hot-toast";

export default function Register() {

  const { axios, setToken } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/admin/register', { name, email, password });

      if (data.success) {
        setToken(data.token);
        toast.success(data.message);
        window.location.href = '/';
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-5 max-md:m-6 border border-green/30 shadow-xl shadow-green/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold"><span className="text-green">Admin</span> Registration</h1>
            <p className="font-medium pt-2">Enter your credentials to register</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-2 w-full sm:max-w-md text-stone-600">

            <div className="flex flex-col">
              <label className="font-bold">Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" required className="border-b border-green p-2 outline-none mb-6 bg-transparent" />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" required className="border-b border-green p-2 outline-none mb-6 bg-transparent" />
            </div>

            <div className="flex flex-col">
              <label className="font-bold">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required className="border-b border-green p-2 outline-none mb-6 bg-transparent" />
            </div>

            <button type="submit" className="w-full py-3 font-medium bg-green text-white rounded cursor-pointer hover:bg-green/90 transition-all">Register</button>

          </form>
        </div>
      </div>
    </div>
  )
}