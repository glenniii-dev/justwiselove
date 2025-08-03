import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../search.js';

// Search component for displaying and managing articles with search functionality
const Search = () => {
  // Combines imported articles with those stored in localStorage, ensuring no duplicates by ID
  const getCombinedArticles = () => {
    try {
      // Retrieve raw data from localStorage under 'searchArticlesData' key
      const storedArticlesRaw = localStorage.getItem('searchArticlesData');
      // Parse stored data into an array, or use empty array if none exists
      const storedArticles = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];

      // Use Map to ensure unique articles by ID, prioritizing stored articles
      const articleMap = new Map();
      // Add default articles from imported 'search' array
      search.forEach(item => articleMap.set(item.id, item));
      // Overwrite with stored articles (user-created or modified)
      storedArticles.forEach(item => articleMap.set(item.id, item));

      // Convert Map values to an array and return
      return Array.from(articleMap.values());
    } catch (error) {
      // Log error and return default articles if localStorage parsing fails
      console.error("Failed to load articles from local storage or combine with default:", error);
      return search;
    }
  };

  // State to store the combined list of articles
  const [searchArticles, setSearchArticles] = useState([]);
  // State to control whether search results are displayed
  const [showResults, setShowResults] = useState(false);
  // State to store the current search query
  const [query, setQuery] = useState('');
  // State to track the ID of the currently expanded article (null if none)
  const [expandedItemId, setExpandedItemId] = useState(null);

  // useEffect to listen for changes in localStorage
  useEffect(() => {
    // Handler for storage events (triggered when localStorage changes in another tab/window)
    const handleStorageChange = (event) => {
      // Only update if the changed key is 'searchArticlesData' or localStorage is cleared (null)
      if (event.key === 'searchArticlesData' || event.key === null) {
        setSearchArticles(getCombinedArticles());
      }
    };
    // Add event listener for 'storage' events
    window.addEventListener('storage', handleStorageChange);
    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  const navigate = useNavigate();

  // Highlights search query matches in text by wrapping them in styled <strong> tags
  const highlightMatch = (text, query) => {
    // Return original text if no query is provided
    if (!query) return text;
    // Split text into parts, using case-insensitive regex to match query
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          // Highlight matching parts with lime background and white text
          part.toLowerCase() === query.toLowerCase() ? (
            <strong key={index} className="bg-lime-600 text-white rounded-sm px-0.5">
              {part}
            </strong>
          ) : (
            // Non-matching parts are rendered as-is
            part
          )
        )}
      </span>
    );
  };

  // Prepare articles to display based on search query and showResults state
  let displayArticles = [];
  if (showResults) {
    if (query) {
      // Convert query to lowercase for case-insensitive search
      const lowerCaseQuery = query.toLowerCase();
      // Map articles to include matched snippets and filter by matches
      displayArticles = searchArticles.map(item => {
        let matchedSnippet = '';
        let matchFound = false;
        // Define context length for snippets (70 characters before/after match)
        const contextLength = 70;

        // Search in title, content, and references fields
        const fieldsToSearch = [item.title, item.content, item.references];
        for (const field of fieldsToSearch) {
          // Find index of query in field (case-insensitive)
          const index = field.toLowerCase().indexOf(lowerCaseQuery);
          if (index !== -1) {
            // Extract snippet around match, adding ellipses if truncated
            const start = Math.max(0, index - contextLength);
            const end = Math.min(field.length, index + lowerCaseQuery.length + contextLength);
            matchedSnippet = (start > 0 ? '...' : '') + field.substring(start, end) + (end < field.length ? '...' : '');
            matchFound = true;
            break; // Stop after first match
          }
        }

        // Return article with added matchedSnippet and matchFound properties
        return { ...item, matchedSnippet, matchFound };
      }).filter(item => item.matchFound); // Keep only articles with matches

      // Sort filtered articles alphabetically by title
      displayArticles.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else {
      // If no query, display all articles sorted by title
      displayArticles = [...searchArticles].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
  }

  // Expand an article by setting its ID as the expandedItemId
  const handleExpand = (id) => {
    setExpandedItemId(id);
  };

  // Collapse the expanded article by resetting expandedItemId to null
  const handleClose = () => {
    setExpandedItemId(null);
  };

  // Handle search button click: refresh articles and show results
  const handleSearchClick = () => {
    setSearchArticles(getCombinedArticles());
    setShowResults(true);
  };

  // Update query state and hide results if query is cleared
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery === '') {
      setShowResults(false);
    }
  };

  // Delete an article from localStorage and update state
  const handleDelete = (articleId) => {
    // Confirm deletion with user
    const isConfirmed = window.confirm("Are you sure you want to permanently delete this article?");
    if (isConfirmed) {
      try {
        // Retrieve and parse stored articles
        const storedArticlesRaw = localStorage.getItem('searchArticlesData');
        const storedArticles = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];
        // Filter out the article with the specified ID
        const updatedArticles = storedArticles.filter(item => item.id !== articleId);
        // Save updated articles to localStorage
        localStorage.setItem('searchArticlesData', JSON.stringify(updatedArticles));
        // Refresh article list
        setSearchArticles(getCombinedArticles());
        alert("Article deleted successfully.");
      } catch (error) {
        // Handle errors during deletion
        console.error("Failed to delete article:", error);
        alert("An error occurred while trying to delete the article.");
      }
    }
  };

  const handleEdit = (articleToEdit) => {
    navigate('/create-article', { state: { articleToEdit } });
  };

  // Render the search interface
  return (
    // Main container with dark background, responsive padding, and centered content
    <div className="min-h-50 bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg text-left">
      <div className="w-full max-w-4xl">
        {/* Page title */}
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">Search Articles</h1>

        {/* Search input and button in a responsive flex layout */}
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

        {/* Results section */}
        <div className="space-y-6">
          {/* Show message if no results and query is not empty */}
          {showResults && displayArticles.length === 0 && query !== '' ? (
            <p className="text-lime-600 text-center text-lg">No results found for "<span className="font-semibold">{query}</span>".</p>
          ) : showResults && displayArticles.length === 0 && query === '' ? (
            // Show message if no articles are available
            <p className="text-lime-600 text-center text-lg">No articles available. Create some!</p>
          ) : (
            // Render list of articles
            displayArticles.map((item) => (
              <div key={item.id} className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-lime-600">
                {/* Article title and edit/delete buttons (for user-created articles) */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl text-lime-600">{item.title}</h2>
                  {item.isUserCreated && (
                    <div className="flex gap-2">
                      {/* Edit button with SVG icon */}
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-lime-600 hover:text-lime-400"
                        title="Edit Article"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      {/* Delete button with SVG icon */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-400"
                        title="Delete Article"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Expanded view: show full content and references */}
                {expandedItemId === item.id ? (
                  <>
                    <p className="font-['Roboto'] text-white mb-3 leading-relaxed">{item.content}</p>
                    {/* Split references into separate lines with regex */}
                    <p className="font-['Roboto'] text-lime-600 italic">
                      {item.references.split(/(?<=\.’" {2})|(?<=\.'" {2})|(?<=\." {2})|(?<=\. {2})/).map((ref, index) => (
                        <span key={index}>
                          {ref}
                          <br />
                          <br />
                        </span>
                      ))}
                    </p>
                    {/* Button to collapse article */}
                    <button
                      onClick={handleClose}
                      className="mt-5 px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  // Collapsed view: show snippet (if any) and expand button
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

// Export the Search component as default
export default Search;