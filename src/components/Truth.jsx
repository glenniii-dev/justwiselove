import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import truth from '../truth.js';

const Truth = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const articles = [...truth].sort((a, b) => a.title.localeCompare(b.title));

  const handleExpand = (id) => {
    setExpandedItemId(id);
  };

  const handleClose = () => {
    setExpandedItemId(null);
  };

  const handleToggleDisplay = () => {
    setIsDisplayed(!isDisplayed);
    setExpandedItemId(null);
  };

  return (
    <div className="min-h-50 bg-zinc-950 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-inter mt-8 rounded-lg text-left">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-lime-600 mb-8 text-center">Examine Truth</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleToggleDisplay}
            className="w-50 mx-auto px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium flex-shrink-0 flex flex-row justify-center align-center"
          >
            {isDisplayed ? "Close All" : "Display All"}
          </button>
        </div>
        <div className="space-y-6">
          {isDisplayed && articles.length === 0 ? (
            <p className="text-lime-600 text-center text-lg">No articles available. Create some!</p>
          ) : (
            isDisplayed && articles.map((item) => {
              const contentP = item.content.split(/\r?\n\s*\r?\n/).filter(contentP => contentP.trim() !== '');
              const referencesP = item.references.split(/\r?\n\s*\r?\n/).filter(referencesP => referencesP.trim() !== '');
              return (
                <div key={item.id} className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-lime-600">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl text-lime-600">{item.title}</h2>
                  </div>
                  {expandedItemId === item.id ? (
                    <>
                      <p className="font-['Roboto'] text-white mb-3 leading-relaxed">
                        {contentP.map((contentP, index) => (
                          <p key={index}>
                            {contentP.trim()}
                            <br />
                            <br />
                          </p>
                        ))}
                      </p>
                      <p className="font-['Roboto'] text-lime-600 italic">
                        {referencesP.map((referencesP, index) => (
                          <p key={index}>
                            {referencesP.trim()}
                            <br />
                            <br />
                          </p>
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
                    <button
                      onClick={() => handleExpand(item.id)}
                      className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-100 transition duration-200 ease-in-out shadow-md font-medium"
                    >
                      Expand
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Truth;