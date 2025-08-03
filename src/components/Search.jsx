import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../search.js';

const Search = () => {
  const getCombinedArticles = () => {
    try {
      const storedArticlesRaw = localStorage.getItem('searchArticlesData');
      const storedArticles = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];
      const articleMap = new Map();
      search.forEach(item => articleMap.set(item.id, item));
      storedArticles.forEach(item => articleMap.set(item.id, item));
      const combinedArticles = Array.from(articleMap.values());
      console.log("Combined articles:", combinedArticles); // Debug
      return combinedArticles;
    } catch (error) {
      console.error("Failed to load articles from local storage or combine with default:", error);
      return search;
    }
  };

  const [searchArticles, setSearchArticles] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState('');
  const [expandedItemId, setExpandedItemId] = useState(null);

  // Initialize searchArticles on mount
  useEffect(() => {
    setSearchArticles(getCombinedArticles());
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'searchArticlesData' || event.key === null) {
        setSearchArticles(getCombinedArticles());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navigate = useNavigate();

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={index} className="bg-lime-600 text-white rounded-sm px-0.5">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  let displayArticles = [];
  if (showResults) {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      displayArticles = searchArticles
        .map(item => {
          let matchedSnippet = '';
          let matchFound = false;
          const contextLength = 70;
          const fieldsToSearch = [item.title, item.content, item.references];
          for (const field of fieldsToSearch) {
            const index = field.toLowerCase().indexOf(lowerCaseQuery);
            if (index !== -1) {
              const start = Math.max(0, index - contextLength);
              const end = Math.min(field.length, index + lowerCaseQuery.length + contextLength);
              matchedSnippet = (start > 0 ? '...' : '') + field.substring(start, end) + (end < field.length ? '...' : '');
              matchFound = true;
              break;
            }
          }
          return { ...item, matchedSnippet, matchFound };
        })
        .filter(item => item.matchFound)
        .sort((a, b) => a.title.localeCompare(b.title));
    } else {
      displayArticles = [...searchArticles].sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  const handleExpand = (id) => {
    setExpandedItemId(id);
  };

  const handleClose = () => {
    setExpandedItemId(null);
  };

  const handleSearchClick = () => {
    setSearchArticles(getCombinedArticles());
    setShowResults(true);
  };

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery === '') {
      setShowResults(false);
    }
  };

  const handleDelete = (articleId) => {
    const isConfirmed = window.confirm("Are you sure you want to permanently delete this article?");
    if (isConfirmed) {
      try {
        const storedArticlesRaw = localStorage.getItem('searchArticlesData');
        const storedArticles = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];
        const updatedArticles = storedArticles.filter(item => item.id !== articleId);
        localStorage.setItem('searchArticlesData', JSON.stringify(updatedArticles));
        setSearchArticles(getCombinedArticles());
        alert("Article deleted successfully.");
      } catch (error) {
        console.error("Failed to delete article:", error);
        alert("An error occurred while trying to delete the article.");
      }
    }
  };

  const handleEdit = (articleToEdit) => {
    navigate('/create-article', { state: { articleToEdit } });
  };

  return (
    <div className="min-h-50 bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg text-left">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">Search Articles</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search For Topics Or People..."
            className="p-3 w-full rounded-lg bg-zinc-800 text-white border-2 border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200 ease-in-out shadow-md placeholder-zinc-400"
            value={query}
            onChange={handleQueryChange}
          />
          <button
            onClick={handleSearchClick}
            className="px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium flex-shrink-0"
          >
            Search
          </button>
        </div>
        <div className="space-y-6">
          {showResults && displayArticles.length === 0 && query !== '' ? (
            <p className="text-lime-600 text-center text-lg">
              No results found for "<span className="font-semibold">{query}</span>".
            </p>
          ) : showResults && displayArticles.length === 0 && query === '' ? (
            <p className="text-lime-600 text-center text-lg">No articles available. Create some!</p>
          ) : (
            displayArticles.map((item) => (
              <div key={item.id} className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-lime-600">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl text-lime-600">{item.title}</h2>
                  {item.isUserCreated && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-lime-600 hover:text-lime-400"
                        title="Edit Article"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-400"
                        title="Delete Article"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {expandedItemId === item.id ? (
                  <>
                    <p className="font-['Roboto'] text-white mb-3 leading-relaxed">{item.content}</p>
                    <p className="font-['Roboto'] text-lime-600 italic">
                      {item.references.split(/(?<=\.’" {2})|(?<=\.'" {2})|(?<=\." {2})|(?<=\. {2})/).map((ref, index) => (
                        <span key={index}>
                          {ref}
                          <br />
                          <br />
                        </span>
                      ))}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-5 px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    {item.matchedSnippet && (
                      <p className="text-zinc-600 text-base mb-3 leading-snug">
                        {highlightMatch(item.matchedSnippet, query)}
                      </p>
                    )}
                    <button
                      onClick={() => handleExpand(item.id)}
                      className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
                    >
                      Expand
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;