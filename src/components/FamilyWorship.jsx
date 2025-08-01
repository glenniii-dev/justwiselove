import React, { useState } from 'react';
import family from '../family.js';

const renderWeekContent = (item) => (
  <div key={item.D} className="bg-zinc-950 p-4 rounded-lg mb-4">
    <h3 className="text-2xl font-semibold m-4">{item.D}</h3>
    <p className="text-lime-600 text-xl mb-3">{item.T}</p>
    <p className="font-[Roboto] text-lg">{item.R}</p>
    <p className="text-lime-600 text-xl m-3">{item.T1}</p>
    <p className="font-[Roboto] text-lg">{item.R1}</p>
    <p className="text-lime-600 text-xl m-3">{item.T2}</p>
    <p className="font-[Roboto] text-lg">{item.R2}</p>
    <p className="text-lime-600 text-xl m-3">{item.T3}</p>
    <p className="font-[Roboto] text-lg">{item.R3}</p>
    <p className="text-lime-600 text-xl m-3">{item.T4}</p>
    <p className="font-[Roboto] text-lg">{item.R4}</p>
  </div>
);

function FamilyWorship() {
  const [showFutureWeeks, setShowFutureWeeks] = useState(false);

  const today = new Date();

  let currentWeek = null;
  let futureWeeks = [];
  let currentWeekFoundIndex = -1;

  for (let i = 0; i < family.length; i++) {
    const itemDate = new Date(family[i].D);

    const endOfWeek = new Date(itemDate);
    endOfWeek.setDate(itemDate.getDate() + 1);

    if (today >= itemDate && today <= endOfWeek) {
      currentWeek = family[i];
      currentWeekFoundIndex = i;
      break;
    }
  }

  if (currentWeekFoundIndex !== -1) {
    futureWeeks = family.slice(currentWeekFoundIndex + 1);
  } else {
    for (let i = 0; i < family.length; i++) {
      const itemDate = new Date(family[i].D);
      if (itemDate > today) {
        currentWeek = family[i];
        futureWeeks = family.slice(i + 1);
        break;
      }
    }
  }

  return (
    <div className="mt-10 bg-zinc-950 w-full text-white pt-4 rounded-lg shadow-lg">
      <h2 className="text-lime-600 text-4xl font-black mb-5">Family Worship</h2>
      <div className="bg-zinc-950 rounded-lg">
        {currentWeek ? (
          <>
            {renderWeekContent(currentWeek)}

            {futureWeeks.length > 0 && ( 
              <button
                onClick={() => setShowFutureWeeks(!showFutureWeeks)}
                className="bg-zinc-900 hover:bg-zinc-800 px-[50px] text-lime-600 font-bold py-2 rounded-lg mt-4 mb-6"
              >
                {showFutureWeeks ? 'HIDE' : 'SHOW'}
              </button>
            )}

            {showFutureWeeks && futureWeeks.length > 0 && (
              <div>
                <h3 className="text-lime-600 text-3xl font-bold mb-4 mt-6">Next</h3>
                {futureWeeks.map(renderWeekContent)}
              </div>
            )}
          </>
        ) : (
          <p>No content available for the current week or upcoming weeks.</p>
        )}
      </div>
    </div>
  );
}

export default FamilyWorship;
