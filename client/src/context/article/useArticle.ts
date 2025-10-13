import { useContext } from "react";
import { ArticleContext } from "./ArticleContext";

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) throw new Error("useArticles must be used within an ArticleProvider");
  return context;
};

