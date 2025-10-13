import { AuthProvider } from "./auth/AuthProvider";
import { ArticleProvider } from "./article/ArticleProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ArticleProvider>{children}</ArticleProvider>
    </AuthProvider>
  );
};


