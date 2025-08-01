import React, { useState, useEffect } from 'react';

const CreateArticle = () => {
  // State variables to hold the input values for title, content, and references
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [references, setReferences] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages for article creation
  const [backupMessage, setBackupMessage] = useState(''); // To display messages for backup/restore operations

  // State to store all articles, loaded from local storage ('searchArticlesData')
  const [articles, setArticles] = useState(() => {
    // Initialize articles state from local storage on component mount
    try {
      const storedArticles = localStorage.getItem('searchArticlesData'); // Using a specific key for search data
      return storedArticles ? JSON.parse(storedArticles) : [];
    } catch (error) {
      console.error("Failed to parse articles from local storage:", error);
      return []; // Return an empty array if parsing fails
    }
  });

  // useEffect to save articles to local storage whenever the 'articles' state changes
  useEffect(() => {
    try {
      localStorage.setItem('searchArticlesData', JSON.stringify(articles));
      console.log("CreateArticle: Articles successfully saved to localStorage:", articles); // Added log
    } catch (error) {
      console.error("Failed to save articles to local storage:", error);
      setMessage('Error saving article. Please try again.');
    }
  }, [articles]); // Dependency array: this effect runs when 'articles' state changes

  // Function to handle the submission of the new article
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation to ensure all fields are filled
    if (!title.trim() || !content.trim() || !references.trim()) {
      setMessage('Please fill in all fields to create the article.');
      return;
    }

    // Create an object with the new article data
    const newArticle = {
      // Use a timestamp or unique ID for a simple unique key, useful for lists
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      references: references.trim(),
    };

    // Add the new article to the existing list of articles
    setArticles((prevArticles) => [...prevArticles, newArticle]);

    // Display a success message to the user
    setMessage(`Article "${newArticle.title}" created successfully!`);
    setBackupMessage(''); // Clear any previous backup/restore messages
    
    // Clear the form fields after successful submission
    setTitle('');
    setContent('');
    setReferences('');
  };

  // Function to handle backing up articles to a JSON file
  const handleBackup = () => {
    try {
      const json = JSON.stringify(articles, null, 2); // Pretty print JSON
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'articles_backup.json'; // Suggested filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object

      setBackupMessage('Articles backed up successfully to articles_backup.json!');
      setMessage(''); // Clear any previous article creation messages
    } catch (error) {
      console.error("Failed to backup articles:", error);
      setBackupMessage('Error backing up articles. Please try again.');
    }
  };

  // Function to handle restoring articles from an uploaded JSON file
  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json'; // Only accept JSON files

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const restoredArticles = JSON.parse(e.target.result);
            // Basic validation: ensure it's an array and contains expected properties
            if (Array.isArray(restoredArticles) && restoredArticles.every(item => item.title && item.content && item.references)) {
              setArticles(restoredArticles); // Overwrite current articles with backup
              setBackupMessage('Articles restored successfully from file!');
              setMessage(''); // Clear any previous article creation messages
            } else {
              setBackupMessage('Invalid file format. Please upload a valid articles JSON file.');
            }
          } catch (parseError) {
            console.error("Failed to parse restored file:", parseError);
            setBackupMessage('Error parsing file. Please ensure it is a valid JSON.');
          }
        };
        reader.readAsText(file); // Read the file as text
      } else {
        setBackupMessage('No file selected for restore.');
      }
    };
    input.click(); // Programmatically click the hidden file input
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">Create Article</h1>

        {/* Display messages to the user */}
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

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded-lg shadow-lg border border-lime-600">
          {/* Title Input */}
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

          {/* Content Textarea */}
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

          {/* References Input */}
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

          {/* Create Article Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-bold text-xl uppercase tracking-wider"
          >
            Create
          </button>

          {/* Backup and Restore Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button" // Important: type="button" to prevent form submission
              onClick={handleBackup}
              className="flex-1 px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
            >
              Backup
            </button>
            <button
              type="button" // Important: type="button" to prevent form submission
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

export default CreateArticle;