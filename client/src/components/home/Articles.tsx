import { useState } from "react";
import categories from "../../utils/categories";
import ArticleCard from "../cards/ArticleCard";
import { useArticle } from "../../context/article/useArticle";

interface Article {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  _id: string;
  createdAt: string;
  isPublished: boolean;
}

export default function Articles() {
  const [menu, setMenu] = useState("All");
  const { articles, input } = useArticle();

  const filteredArticles = () => {
    if (!articles || !Array.isArray(articles)) return [];

    if (input === "") {
      return articles;
    }

    return articles.filter((article: Article) =>
      article.title.toLowerCase().includes(input.toLowerCase()) ||
      article.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 flex-wrap relative px-10 sm:px-20">
        {categories.map((category: string) => (
          <div key={category} className="relative">
            <button
              onClick={() => setMenu(category)}
              className={`border border-stone-800 text-stone-800 font-bold px-6 py-2 m-1 rounded-sm cursor-pointer ${
                menu === category ? "bg-green text-white" : ""
              }`}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 2xl:mx-40">
        {filteredArticles()
          .filter((article: Article) => (menu === "All" ? true : article.category === menu))
          .map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
}