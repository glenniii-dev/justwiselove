import { useState } from "react";
import { categories } from "../../utils/categories";
import ArticleCard from "../cards/ArticleCard";
import { useArticle } from "../../context/article/useArticle";

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

export default function Articles() {
  const [menu, setMenu] = useState("Index");
  const { articles, input } = useArticle();

  const filteredArticles = () => {
    if (!articles || !Array.isArray(articles)) return [];

    if (input === "") {
      return articles;
    }

    return articles.filter((article: Article) => {
      const categoryName =
        typeof article.category === "string"
          ? article.category
          : article.category.category;

      return (
        article.title.toLowerCase().includes(input.toLowerCase()) ||
        categoryName.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  const selectedCategory =  categories.find((cat) => cat.category === menu);

  return (
    <div>
      {/* Category Menu */}
      <div className="flex justify-center gap-4 sm:gap-8 mt-10 flex-wrap relative px-10 sm:px-20">
        { categories.map((category: Category) => (
          <div key={category.category} className="relative">
            <button
              onClick={() => setMenu(category.category)}
              className={`border border-stone-800 text-stone-800 font-bold px-6 py-2 m-1 rounded-sm cursor-pointer ${
                menu === category.category ? "bg-green text-white" : ""
              }`}
            >
              {category.category}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-wrap mt-5 mb-10 px-4 sm:px-6 lg:px-8 w-screen justify-center items-start">
        <div className="flex flex-col mx-auto">
        {selectedCategory?.category && (
          <h1 className="text-green text-2xl font-bold mb-3 text-left max-w-160">
            {selectedCategory.category !== "Index" && selectedCategory.category.toUpperCase()}
          </h1>
        )}
        {selectedCategory?.description && (
          <p className="text-stone-800 text-lg font-medium max-w-160">
            {selectedCategory.description}
          </p>
        )}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 2xl:mx-40">
        {filteredArticles()
          .filter((article: Article) => {
            const categoryName =
              typeof article.category === "string"
                ? article.category
                : article.category.category;

            return menu === "Index" ? true : categoryName === menu;
          })
          .map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
}
