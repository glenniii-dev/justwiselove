import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { useArticle } from "../../context/article/useArticle";
import categories from "../../utils/categories";
import toast from "react-hot-toast";

function Create() {

  const token = localStorage.getItem("token");
  const { axios } = useArticle();
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const article = {
        title, 
        subtitle, 
        content: quillRef.current?.root.innerHTML || '', 
        category, 
        isPublished
      }

      const formData = new FormData();
      formData.append('article', JSON.stringify(article));

      console.log({ title, subtitle, content: quillRef.current?.root.innerHTML, category, isPublished });

      const payload = {
        article: JSON.stringify({
          title,
          subtitle,
          content: quillRef.current?.root.innerHTML || '',
          category,
          isPublished,
        })
      };

      const { data } = await axios.post(
        '/api/articles/add',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      );


      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSubtitle('');
        if (quillRef.current?.root) {
          quillRef.current.root.innerHTML = '';
        }
        setCategory('');
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
        setIsAdding(false);
    }
  }

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className="h-full w-full sm:max-w-[600px] md:max-w-2xl lg:max-w-3xl flex flex-col text-stone-600 overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

        <p className="font-bold">Title</p>
        <input type="text" placeholder="Enter your title" required className="w-full max-w-lg mt-2 p-2 border border-stone-300 outline-none rounded" onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className="mt-4 font-bold">Subtitle</p>
        <input type="text" placeholder="Enter your subtitle" required className="w-full max-w-lg mt-2 p-2 border border-stone-300 outline-none rounded" onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />

        <p className="mt-4 font-bold">Content</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
        </div>

        <p className="mt-4 font-bold">Category</p>
        <select onChange={(e) => setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border text-stone-500 border-stone-300 outline-none rounded">
          <option value="">Select category</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.category}>{category.category}</option>
            )
          })}
        </select>

        <div className="flex gap-2 mt-4">
          <p className="font-bold">Publish Now</p>
          <input type="checkbox" className="scale-125 cursor-pointer" onChange={(e) => setIsPublished(e.target.checked)} checked={isPublished} />
        </div>

        <button disabled={isAdding} type="submit" className="mt-8 w-40 h-10 bg-green text-white rounded cursor-pointer font-bold">
          {isAdding ? 'Adding...' : 'Create Article'}
        </button>

      </div>
    </form>
  )
}

export default Create;
