import { useNavigate } from "react-router-dom";

interface Blog {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  image: string;
  _id: string;
  createdAt: string;
  isPublished: boolean;
}

const BlogCard = ({ blog }: { blog: Blog }) => {

  const {title, content, category, image, _id} = blog;
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-stone-800/90 duration-300 cursor-pointer">
      <img src={image} alt="" className="aspect-video" />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">{category}</span>
      <div className="p-5">
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{"__html": content.slice(0, 80)}}></p>
      </div>
    </div>
  )
}
export default BlogCard;