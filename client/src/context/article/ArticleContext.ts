import { createContext } from "react";
import axios from "axios";

// 📰 Define what an article looks like
export interface Article {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  _id: string;
  createdAt: string;
  isPublished: boolean;
}

// 🧩 Define what the ArticleContext provides
export interface ArticleContextType {
  axios: typeof axios;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  fetchArticles: () => Promise<void>;
}

// 🧠 Create Article context
export const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

