import { useNavigate } from "react-router-dom";

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

const ArticleCard = ({ article }: { article: Article }) => {

  const {title, content, category, _id} = article;
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/article/${_id}`)} className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-stone-800/25 duration-300 cursor-pointer bg-stone-300/20">
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-stone-800 rounded-sm text-white text-xs font-bold">{category as string}</span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-stone-800 text-2xl">{title}</h5>
        <p className="mb-3 text-lg text-stone-800" dangerouslySetInnerHTML={{"__html": content.slice(0, 80)}}></p>
      </div>
    </div>
  )
}
export default ArticleCard;