import React, { useState } from 'react';
import questions from '../utils/questions.js';

const AccurateKnowledge = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const articles = [...questions].sort((a, b) => a.title.localeCompare(b.title));

  const handleToggleItem = (id) => {
    setExpandedItemId((prevId) => (prevId === id ? null : id));
  };

  const handleToggleDisplay = () => {
    setIsDisplayed(!isDisplayed);
    setExpandedItemId(null);
  };

  return (
    <div className="min-h-50 bg-zinc-950 p-8 flex flex-col items-center font-inter mt-6 rounded-lg text-left">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-lime-600 mb-3 text-center">Accurate Knowledge</h1>
        <p className="font-['Barlow'] text-white text-lg text-center mb-3">Test and deepen your understanding of Bible truth with interactive questions and answers. This section guides you along the way to a closer relationship with Jehovah.</p>
        <p className="font-['Barlow'] text-lime-600 text-lg text-center">“Whose will is that all sorts of people should be saved and come to an accurate knowledge of truth.”<br />— 1 Timothy 2:4</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <button
            onClick={handleToggleDisplay}
            className="w-50 mx-auto px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-600 transition duration-200 ease-in-out shadow-md font-medium"
          >
            {isDisplayed ? "HIDE" : "SHOW"}
          </button>
        </div>

        <div className="space-y-6 [&>*:first-child]:mt-6">
            {isDisplayed && articles.map((item) => {
              const contentP = item.content.split(/\r?\n\s*\r?\n/).filter(p => p.trim() !== '');
              const referencesP = item.references.split(/\r?\n\s*\r?\n/).filter(p => p.trim() !== '');
              const isExpanded = expandedItemId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-zinc-900 p-6 pb-2 rounded-lg shadow-lg border border-lime-600"
                >
                  {/* Clickable header */}
                  <div
                    className="flex justify-between items-center mb-4 cursor-pointer"
                    onClick={() => handleToggleItem(item.id)}
                  >
                    <h2 className="mx-auto text-center text-2xl text-lime-600">{item.title}</h2>
                  </div>

                  {isExpanded && (
                    <>
                      <div className="font-['Barlow'] text-white leading-relaxed">
                        {contentP.map((p, index) => (
                          <p key={index}>
                            {p.trim()}
                            <br /><br />
                          </p>
                        ))}
                      </div>
                      <div className="font-['Barlow'] text-lime-600 italic">
                        {referencesP.map((p, index) => (
                          <p key={index}>
                            {p.trim()}
                            <br /><br />
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })
            }
        </div>
      </div>
    </div>
  );
};

export default AccurateKnowledge;