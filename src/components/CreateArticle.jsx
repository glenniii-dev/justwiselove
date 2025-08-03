import React, { useState, useEffect } from 'react';

// CreateArticle component for creating or editing articles and managing backups
const CreateArticle = () => {
  // State for form fields: title, content, and references
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [references, setReferences] = useState('');
  // State for displaying feedback messages (e.g., success or error)
  const [message, setMessage] = useState('');
  // State for backup/restore operation messages
  const [backupMessage, setBackupMessage] = useState('');
  // State to track the ID of the article being edited (null if creating a new article)
  const [editingArticleId, setEditingArticleId] = useState(null);

  // State for storing articles, initialized from localStorage
  const [articles, setArticles] = useState(() => {
    try {
      // Retrieve stored articles from localStorage
      const storedArticles = localStorage.getItem('searchArticlesData');
      // Parse JSON or return empty array if none exists
      return storedArticles ? JSON.parse(storedArticles) : [];
    } catch (error) {
      // Log error and return empty array if parsing fails
      console.error("Failed to parse articles from local storage:", error);
      return [];
    }
  });

  // useEffect to save articles to localStorage whenever the articles state changes
  useEffect(() => {
    try {
      // Save articles to localStorage as JSON
      localStorage.setItem('searchArticlesData', JSON.stringify(articles));
      console.log("CreateArticle: Articles successfully saved to localStorage:", articles);
    } catch (error) {
      // Log error and show error message if saving fails
      console.error("Failed to save articles to local storage:", error);
      setMessage('Error saving article. Please try again.');
    }
  }, [articles]); // Dependency: runs whenever articles state changes

  // useEffect to handle localStorage changes for editing articles
  useEffect(() => {
    // Handler for storage events (triggered when localStorage changes in another tab/window)
    const handleStorageChange = (event) => {
      if (event.key === 'articleToEdit' && event.newValue) {
        // If an article is saved for editing, populate form fields
        const articleToEdit = JSON.parse(event.newValue);
        setTitle(articleToEdit.title);
        setContent(articleToEdit.content);
        setReferences(articleToEdit.references);
        setEditingArticleId(articleToEdit.id);
        setMessage(`Editing article: "${articleToEdit.title}"`);
      } else if (event.key === 'articleToEdit' && !event.newValue) {
        // If edit key is removed, clear the form
        setTitle('');
        setContent('');
        setReferences('');
        setEditingArticleId(null);
        setMessage('');
      }
    };

    // Add event listener for storage events
    window.addEventListener('storage', handleStorageChange);

    // Check for an article to edit on component mount
    const articleToEditRaw = localStorage.getItem('articleToEdit');
    if (articleToEditRaw) {
      // Populate form fields with article data
      const articleToEdit = JSON.parse(articleToEditRaw);
      setTitle(articleToEdit.title);
      setContent(articleToEdit.content);
      setReferences(articleToEdit.references);
      setEditingArticleId(articleToEdit.id);
      setMessage(`Editing article: "${articleToEdit.title}"`);
      // Clear the edit key from localStorage after loading
      localStorage.removeItem('articleToEdit');
    }

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  // Handle form submission for creating or updating an article
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate that all fields are filled
    if (!title.trim() || !content.trim() || !references.trim()) {
      setMessage('Please fill in all fields to create the article.');
      return;
    }

    if (editingArticleId) {
      // Update existing article if editing
      const updatedArticles = articles.map(item =>
        item.id === editingArticleId
          ? { ...item, title: title.trim(), content: content.trim(), references: references.trim() }
          : item
      );
      setArticles(updatedArticles);
      setMessage(`Article "${title.trim()}" updated successfully!`);
    } else {
      // Create new article
      const newArticle = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2), // Generate unique ID
        title: title.trim(),
        content: content.trim(),
        references: references.trim(),
        isUserCreated: true, // Mark as user-created
      };
      // Add new article to the beginning of the articles array
      setArticles((prevArticles) => [newArticle, ...prevArticles]);
      setMessage(`Article "${newArticle.title}" created successfully!`);
    }

    // Clear form fields and reset editing state
    setTitle('');
    setContent('');
    setReferences('');
    setEditingArticleId(null);
    setBackupMessage('');
    localStorage.removeItem('articleToEdit'); // Ensure edit key is cleared
  };

  // Handle backup of articles to a JSON file
  const handleBackup = () => {
    try {
      // Convert articles to formatted JSON
      const json = JSON.stringify(articles, null, 2);
      // Create a Blob for downloading
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      // Create and trigger a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'articles_backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupMessage('Articles backed up successfully to articles_backup.json!');
      setMessage('');
    } catch (error) {
      // Log error and show error message if backup fails
      console.error("Failed to backup articles:", error);
      setBackupMessage('Error backing up articles. Please try again.');
    }
  };

  // Handle restoration of articles from a JSON file
  const handleRestore = () => {
    // Create file input element for selecting JSON file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Read the selected file
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            // Parse JSON from file
            const restoredArticles = JSON.parse(e.target.result);
            // Validate that the file contains an array of valid articles
            if (Array.isArray(restoredArticles) && restoredArticles.every(item => item.title && item.content && item.references)) {
              // Ensure each article has an ID and is marked as user-created
              const validatedArticles = restoredArticles.map(article => ({
                ...article,
                id: article.id || Date.now().toString(36) + Math.random().toString(36).substr(2),
                isUserCreated: true,
              }));
              setArticles(validatedArticles);
              setBackupMessage('Articles restored successfully from file!');
              setMessage('');
            } else {
              setBackupMessage('Invalid file format. Please upload a valid articles JSON file.');
            }
          } catch (parseError) {
            // Log error and show error message if parsing fails
            console.error("Failed to parse restored file:", parseError);
            setBackupMessage('Error parsing file. Please ensure it is a valid JSON.');
          }
        };
        reader.readAsText(file);
      } else {
        setBackupMessage('No file selected for restore.');
      }
    };
    input.click(); // Trigger file selection dialog
  };

  // Render the article creation/editing interface
  return (
    // Main container with dark background, responsive padding, and centered content
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg">
      <div className="w-full max-w-4xl">
        {/* Dynamic title based on whether editing or creating */}
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">
          {editingArticleId ? 'Edit Article' : 'Create Article'}
        </h1>

        {/* Display feedback messages */}
        {message && (
          <p className={'text-center text-lg mb-6 text-white'}>
            {message}
          </p>
        )}
        {backupMessage && (
          <p className='text-center text-lg mb-6 text-white'>
            {backupMessage}
          </p>
        )}

        {/* Form for creating or editing articles */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded-lg shadow-lg border border-lime-600">
          {/* Title input field */}
          <div>
            <label htmlFor="title" className="block text-white text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter article title..."
              className="p-3 w-full rounded-lg bg-zinc-800 text-white border-2 border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200 ease-in-out shadow-md placeholder-zinc-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content textarea */}
          <div>
            <label htmlFor="content" className="block text-white text-lg font-medium mb-2">Content</label>
            <textarea
              id="content"
              placeholder="Write article content..."
              rows="10"
              className="p-3 w-full rounded-lg bg-zinc-800 text-white border-2 border-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200 ease-in-out shadow-md placeholder-zinc-400 resize-y"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* References textarea */}
          <div>
            <label htmlFor="references" className="block text-white text-lg font-medium mb-2">References</label>
            <textarea
              id="references"
              placeholder="List your references..."
              rows="5"
              className="p-3 w-full rounded-lg bg-zinc-800 text-white border-2 border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200 ease-in-out shadow-md placeholder-zinc-400"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-bold text-xl uppercase tracking-wider"
          >
            {editingArticleId ? 'Save Changes' : 'Create Article'}
          </button>

          {/* Backup and Restore buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={handleBackup}
              className="flex-1 px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
            >
              Backup
            </button>
            <button
              type="button"
              onClick={handleRestore}
              className="flex-1 px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
            >
              Restore
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the CreateArticle component as default
export default CreateArticle;