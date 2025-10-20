import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Loading from "../components/shared/Loading";
import { useArticle } from "../context/article/useArticle";
import toast from "react-hot-toast";
import moment from "moment";

type ArticleData = {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isPublished: boolean;
  subtitle: string;
}

type CommentType = {
  article : ArticleData,
  name: string,
  content: string,
  isApproved: boolean,
  _id: string;
  createdAt: string
};

export default function Article() {
  const { id } = useParams();

  const { axios } = useArticle();

  const [data, setData] = useState<ArticleData | null>(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchArticleData = async () => {
    try {
      const { data } = await axios.get(`/api/articles/${id}`);
      if (data.success) {
        setData(data.article);
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

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/articles/comments`, { articleId: id });
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

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/articles/add-comment`, { article: id, name, content });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
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
    fetchArticleData();
    fetchComments();
  }, [])

  return data ? (
    <div className="relative">
      <img src="/assets/gradientBackground.png" alt="gradient background" className="absolute top-1 -z-1 opacity-25" />
      <Header />
      <div className="text-center mt-20 text-stone-600 mx-5">
        <p className="text-green py-4 font-medium">Published on {moment(data.createdAt).format("MMMM Do, YYYY")}</p>

        <h1 className="text-3xl sm:text-5xl font-semibold max-w-2xl mx-auto text-stone-800">{data.title}</h1>

        <h2 className="my-5 max-w-lg truncate mx-auto text-xl font-bold">{data.subtitle}</h2>

        {/* <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-green/35 pg-green/5 font-medium text-green">Michael Brown</p> !!!!! FUTURE SET TO ACTUAL AUTHOR !!!!! */}
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">

        <div className="rich-text max-w-3xl mx-auto" dangerouslySetInnerHTML={{"__html": data.content}}></div>

        {/*--- Comments Section ---*/}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment: CommentType, index) => (
              <div key={index} className="relative bg-green/2 border border-green/5 w-full p-4 rounded text-gray-600">

                <div className="flex items-center gap-2 mb-2">
                  <img src="/assets/users.png" alt="users icon" className="w-6" />
                  <p className="font-semibold">{comment.name}</p>
                </div>

                <p className="max-w-md ml-8">{comment.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-sm">{moment(comment.createdAt).fromNow()}</div>

              </div>
            ))}
          </div>
        </div>
        
        {/*--- Add Comment Section ---*/}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add a comment</p>
          <form onSubmit={addComment} className="flex flex-col items-start gap-4 w-full">

            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your name" required className="w-full p-2 border border-gray-300 rounded outline-none" />

            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder="Enter your comment" required className="w-full p-2 border border-gray-300 rounded outline-none h-48" />
            <button type="submit" className="bg-green text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer flex font-bold">Submit</button>
          </form>
        </div>

        {/*--- Share Buttons ---*/}    
        {/* <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this article on social media</p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="facebook icon" width={50} height={50} />
            <img src={assets.twitter_icon} alt="facebook icon" width={50} height={50} />
            <img src={assets.googleplus_icon} alt="facebook icon" width={50} height={50} />
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  ) : (<Loading />)
}