import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArticleContext } from "./ArticleContext";

interface Article {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  _id: string;
  createdAt: string;
  isPublished: boolean;
}

// ⚡ ArticleProvider component
export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [input, setInput] = useState<string>("");

  // 🧾 Fetch all articles
  const fetchArticles = async () => {
    try {
      const { data } = await axios.get("/api/articles/all");
      console.log(data.articles);
      if (data.success) {
        setArticles(data.articles);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const value = {
    axios,
    articles,
    setArticles,
    input,
    setInput,
    fetchArticles,
  };

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};
