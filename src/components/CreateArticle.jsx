import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [references, setReferences] = useState('');
  const [message, setMessage] = useState('');
  const [backupMessage, setBackupMessage] = useState('');
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [articles, setArticles] = useState(() => {
    try {
      const storedArticles = localStorage.getItem('searchArticlesData');
      return storedArticles ? JSON.parse(storedArticles) : [];
    } catch (error) {
      console.error('Failed to parse articles from local storage:', error);
      return [];
    }
  });

  const location = useLocation();

  useEffect(() => {
    // Check for articleToEdit in navigation state
    const articleToEdit = location.state?.articleToEdit;
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setContent(articleToEdit.content);
      setReferences(articleToEdit.references);
      setEditingArticleId(articleToEdit.id);
      setMessage(`Editing article: "${articleToEdit.title}"`);
    }
  }, [location.state]); // Run when location.state changes

  useEffect(() => {
    try {
      localStorage.setItem('searchArticlesData', JSON.stringify(articles));
      console.log('CreateArticle: Articles successfully saved to localStorage:', articles);
    } catch (error) {
      console.error('Failed to save articles to local storage:', error);
      setMessage('Error saving article. Please try again.');
    }
  }, [articles]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !references.trim()) {
      setMessage('Please fill in all fields to create the article.');
      return;
    }

    if (editingArticleId) {
      const updatedArticles = articles.map((item) =>
        item.id === editingArticleId
          ? { ...item, title: title.trim(), content: content.trim(), references: references.trim() }
          : item
      );
      setArticles(updatedArticles);
      setMessage(`Article "${title.trim()}" updated successfully!`);
    } else {
      const newArticle = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        title: title.trim(),
        content: content.trim(),
        references: references.trim(),
        isUserCreated: true,
      };
      setArticles((prevArticles) => [newArticle, ...prevArticles]);
      setMessage(`Article "${newArticle.title}" created successfully!`);
    }

    setTitle('');
    setContent('');
    setReferences('');
    setEditingArticleId(null);
    setBackupMessage('');
  };

  const handleBackup = () => {
    try {
      const json = JSON.stringify(articles, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
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
      console.error('Failed to backup articles:', error);
      setBackupMessage('Error backing up articles. Please try again.');
    }
  };

  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const restoredArticles = JSON.parse(e.target.result);
            if (
              Array.isArray(restoredArticles) &&
              restoredArticles.every((item) => item.title && item.content && item.references)
            ) {
              const validatedArticles = restoredArticles.map((article) => ({
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
            console.error('Failed to parse restored file:', parseError);
            setBackupMessage('Error parsing file. Please ensure it is a valid JSON.');
          }
        };
        reader.readAsText(file);
      } else {
        setBackupMessage('No file selected for restore.');
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">
          {editingArticleId ? 'Edit Article' : 'Create Article'}
        </h1>

        {message && <p className="text-center text-lg mb-6 text-white">{message}</p>}
        {backupMessage && <p className="text-center text-lg mb-6 text-white">{backupMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded-lg shadow-lg border border-lime-600">
          <div>
            <label htmlFor="title" className="block text-white text-lg font-medium mb-2">
              Title
            </label>
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

          <div>
            <label htmlFor="content" className="block text-white text-lg font-medium mb-2">
              Content
            </label>
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

          <div>
            <label htmlFor="references" className="block text-white text-lg font-medium mb-2">
              References
            </label>
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

          <button
            type="submit"
            className="w-full px-6 py-3 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-bold text-xl uppercase tracking-wider"
          >
            {editingArticleId ? 'Save Changes' : 'Create Article'}
          </button>

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

export default CreateArticle;