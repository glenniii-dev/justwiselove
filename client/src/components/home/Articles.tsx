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

  // Return an array of objects containing the article and optional preview/searchTerm
  type DisplayArticle = { article: Article; preview?: string; searchTerm?: string };

  const getDisplayedArticles = (): DisplayArticle[] => {
    if (!articles || !Array.isArray(articles)) return [];

    const stripHtml = (html: string) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    };

    const searchTerm = input.trim().toLowerCase();

    // If no search input, return articles without previews
    if (searchTerm === "") {
      return articles.map((a: Article) => ({ article: a }));
    }

    return articles
      .map((article: Article) => {
        const categoryName =
          typeof article.category === "string"
            ? article.category
            : article.category.category;

        const titleMatch = article.title.toLowerCase().includes(searchTerm);
        const categoryMatch = categoryName.toLowerCase().includes(searchTerm);

        const plainContent = stripHtml(article.content);
        const contentLower = plainContent.toLowerCase();
        const contentMatch = contentLower.includes(searchTerm);

        let preview: string | undefined = undefined;
        if (contentMatch) {
          const matchIndex = contentLower.indexOf(searchTerm);
          const startIndex = Math.max(0, matchIndex - 50);
          const endIndex = Math.min(contentLower.length, matchIndex + searchTerm.length + 50);
          preview = plainContent.slice(startIndex, endIndex);
          if (startIndex > 0) preview = "..." + preview;
          if (endIndex < plainContent.length) preview += "...";
        }

        const matches = titleMatch || categoryMatch || contentMatch;
        return { article, preview, searchTerm: matches ? searchTerm : undefined };
      })
      .filter((d) => d.article && (d.searchTerm !== undefined || d.preview !== undefined || true)) // keep articles then filter below by matches
      .filter((d) => {
        const catName = typeof d.article.category === "string" ? d.article.category : d.article.category.category;
        const titleMatch = d.article.title.toLowerCase().includes(searchTerm);
        const categoryMatch = catName.toLowerCase().includes(searchTerm);
        const contentMatch = (d.preview || "").toLowerCase().includes(searchTerm);
        return titleMatch || categoryMatch || contentMatch;
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
        {getDisplayedArticles()
          .filter(({ article }) => {
            const categoryName =
              typeof article.category === "string"
                ? article.category
                : article.category.category;

            return menu === "Index" ? true : categoryName === menu;
          })
          .map(({ article, preview, searchTerm }) => (
            <ArticleCard key={article._id} article={article} preview={preview} searchTerm={searchTerm} />
          ))}
      </div>
    </div>
  );
}
