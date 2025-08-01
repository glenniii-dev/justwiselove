import React, { useState, useEffect } from 'react';
import search from '../search.js'; // Re-importing the original search array

const Search = () => {
  // Function to combine imported articles with stored articles, ensuring uniqueness by title.
  // This function will be used both for initial state and for updates from local storage.
  const getCombinedArticles = () => {
    try {
      const storedArticlesRaw = localStorage.getItem('searchArticlesData');
      const storedArticles = storedArticlesRaw ? JSON.parse(storedArticlesRaw) : [];

      // Start with the imported 'search' array
      const combinedArticles = [...search];
      // Keep track of titles to avoid duplicates (prioritizing imported articles if titles clash)
      const articleTitles = new Set(search.map(item => item.title));

      // Add articles from local storage that are not already present in the imported list (based on title)
      storedArticles.forEach(storedItem => {
        if (!articleTitles.has(storedItem.title)) {
          combinedArticles.push(storedItem);
          articleTitles.add(storedItem.title); // Add new title to set to prevent further duplicates
        }
      });
      return combinedArticles;
    } catch (error) {
      console.error("Failed to load articles from local storage or combine with default:", error);
      return search; // Fallback to just imported articles on error
    }
  };

  // State to hold the articles for searching. Initially empty, populated by the "Search" button.
  const [searchArticles, setSearchArticles] = useState([]);
  // State to control when results are displayed (only after the "Search" button is pressed)
  const [showResults, setShowResults] = useState(false);

  // useEffect hook to listen for changes in local storage
  // This ensures that if another part of your application (like the CreateArticle component)
  // updates 'searchArticlesData' in local storage, this component will react and update
  // its internal 'searchArticles' when the 'Search' button is next pressed.
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Check if the change is for the specific key we care about
      if (event.key === 'searchArticlesData' || event.key === null) { // event.key is null for clear() or other broad changes
        // When storage changes, update the internal articles list
        // This doesn't immediately show results unless the search button is pressed again.
        setSearchArticles(getCombinedArticles());
      }
    };

    // Add event listener for 'storage' event on the window object
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount and cleanup on unmount


  const [query, setQuery] = useState('');
  const [expandedItemId, setExpandedItemId] = useState(null); // Stores the title of the currently expanded item

  // Helper function to highlight the search query within a text snippet
  const highlightMatch = (text, query) => {
    if (!query) return text; // If no query, return the original text
    // Split the text by the query (case-insensitive) to find parts to highlight
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          // If a part matches the query, highlight it; otherwise, render as normal text
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

  // Function to filter and sort results, and extract relevant snippets for display
  let displayArticles = [];
  if (showResults) { // Only process and display articles if the search button has been pressed
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      displayArticles = searchArticles.map(item => { // Iterate over the articles loaded from state
        let matchedSnippet = '';
        let matchFound = false;
        const contextLength = 70; // Number of characters to show around the match

        // Check for the query in the article's title
        let index = item.title.toLowerCase().indexOf(lowerCaseQuery);
        if (index !== -1) {
          const start = Math.max(0, index - contextLength);
          const end = Math.min(item.title.length, index + lowerCaseQuery.length + contextLength);
          matchedSnippet = (start > 0 ? '...' : '') + item.title.substring(start, end) + (end < item.title.length ? '...' : '');
          matchFound = true;
        }

        // If not found in title, check the article's content
        if (!matchFound) {
          index = item.content.toLowerCase().indexOf(lowerCaseQuery);
          if (index !== -1) {
            const start = Math.max(0, index - contextLength);
            const end = Math.min(item.content.length, index + lowerCaseQuery.length + contextLength);
            matchedSnippet = (start > 0 ? '...' : '') + item.content.substring(start, end) + (end < item.content.length ? '...' : '');
            matchFound = true;
          }
        }

        // If not found in content, check the article's references
        if (!matchFound) {
          index = item.references.toLowerCase().indexOf(lowerCaseQuery);
          if (index !== -1) {
            const start = Math.max(0, index - contextLength);
            const end = Math.min(item.references.length, index + lowerCaseQuery.length + contextLength);
            matchedSnippet = (start > 0 ? '...' : '') + item.references.substring(start, end) + (end < item.references.length ? '...' : '');
            matchFound = true;
          }
        }

        // Return the item with its matched snippet and a flag indicating if a match was found
        return { ...item, matchedSnippet, matchFound };
      }).filter(item => item.matchFound); // Only keep items where a match was found in any field

      // Sort the filtered results: first by title, then by content, then by references
      displayArticles.sort((a, b) => {
        // Primary sort by title
        const titleCompare = a.title.localeCompare(b.title);
        if (titleCompare !== 0) {
          return titleCompare;
        }

        // Secondary sort by content if titles are the same
        const contentCompare = a.content.localeCompare(b.content);
        if (contentCompare !== 0) {
          return contentCompare;
        }

        // Tertiary sort by references if titles and content are the same
        return a.references.localeCompare(b.references);
      });
    } else {
      // If query is empty but search button was pressed, show all articles, sorted
      displayArticles = [...searchArticles].sort((a, b) => {
        const titleCompare = a.title.localeCompare(b.title);
        if (titleCompare !== 0) {
          return titleCompare;
        }
        const contentCompare = a.content.localeCompare(b.content);
        if (contentCompare !== 0) {
          return contentCompare;
        }
        return a.references.localeCompare(b.references);
      });
    }
  }

  // Function to handle expanding an article to show its full content
  const handleExpand = (title) => {
    setExpandedItemId(title);
  };

  // Function to handle closing an expanded article
  const handleClose = () => {
    setExpandedItemId(null);
  };

  // Function to handle the "Search" button click
  const handleSearchClick = () => {
    setSearchArticles(getCombinedArticles()); // Load/sync data from local storage and imported array
    setShowResults(true); // Set flag to display results
  };

  // Handle input change: if query becomes empty, hide results
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery === '') {
      setShowResults(false); // Hide results when query is cleared
    }
  };

  return (
    <div className="min-h-50 bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg text-left">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">Search Articles</h1>

        {/* Search Input and Search Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search For Topics Or People..."
            className="p-3 w-full rounded-lg bg-zinc-800 text-white border-2 border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200 ease-in-out shadow-md placeholder-zinc-400"
            value={query}
            onChange={handleQueryChange} // Use the new handler here
          />
          <button
            onClick={handleSearchClick}
            className="px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-800 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium flex-shrink-0"
          >
            Search
          </button>
        </div>


        {/* Search Results display area */}
        <div className="space-y-6">
          {/* Conditional rendering for no results found or initial state */}
          {showResults && displayArticles.length === 0 && query !== '' ? (
            <p className="text-lime-600 text-center text-lg">No results found for "<span className="font-semibold">{query}</span>".</p>
          ) : showResults && displayArticles.length === 0 && query === '' ? (
            <p className="text-lime-600 text-center text-lg">No articles available. Create some!</p>
          ) : (
            // Map through the filtered and sorted results to display each article
            displayArticles.map((item) => (
              <div key={item.title} className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-lime-600">
                <h2 className="text-2xl text-lime-600 mb-3">{item.title}</h2>

                {/* Conditional rendering based on whether the item is expanded or not */}
                {expandedItemId === item.title ? (
                  <>
                    {/* Display full content and references when expanded */}
                    <p className="font-['Roboto'] text-white mb-3 leading-relaxed">{item.content}</p>
                    <p className="font-['Roboto'] text-lime-600 italic">
                    {item.references.split(/(?<=\.’"  )|(?<=\.'"  )|(?<=\."  )|(?<=\.  )/).map((ref, index) => (
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
                    {/* Display a snippet and an expand button when not expanded */}
                    {item.matchedSnippet && (
                      <p className="text-zinc-600 text-base mb-3 leading-snug">
                        {highlightMatch(item.matchedSnippet, query)}
                      </p>
                    )}
                    <button
                      onClick={() => handleExpand(item.title)}
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


// make reference allow enter
