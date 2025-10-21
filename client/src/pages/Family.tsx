import type { JSX } from "react";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import family from "../utils/family";

interface WeekItem {
  D: string;
  T: string;
  R: string;
  T1?: string;
  R1?: string;
  T2?: string;
  R2?: string;
  T3?: string;
  R3?: string;
  T4?: string;
  R4?: string;
}

const renderWeekContent = (item: WeekItem): JSX.Element => (
  <div key={item.D} className="p-4 rounded-lg mb-4 space-y-3 text-justify">
    <h3 className="text-3xl font-semibold m-4 text-center">{item.D}</h3>
    <p className="text-2xl text-center font-semibold text-green">{item.T}</p>
    <p className="text-lg">{item.R}</p>
    {item.T1 && <p className="text-2xl text-center font-semibold text-green">{item.T1}</p>}
    {item.R1 && <p className="text-lg">{item.R1}</p>}
    {item.T2 && <p className="text-2xl text-center font-semibold text-green">{item.T2}</p>}
    {item.R2 && <p className="text-lg">{item.R2}</p>}
    {item.T3 && <p className="text-2xl text-center font-semibold text-green">{item.T3}</p>}
    {item.R3 && <p className="text-lg">{item.R3}</p>}
    {item.T4 && <p className="text-2xl text-center font-semibold text-green">{item.T4}</p>}
    {item.R4 && <p className="text-lg">{item.R4}</p>}
  </div>
);

export default function Family(): JSX.Element {
  const today = new Date();

  let currentWeek: WeekItem | null = null;
  let futureWeeks: WeekItem[] = [];
  let currentWeekFoundIndex = -1;

  for (let i = 0; i < family.length; i++) {
    const itemDate = new Date(family[i].D);
    const endOfWeek = new Date(itemDate);
    endOfWeek.setDate(itemDate.getDate() + 3);

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
    <>
      <Header />
      <main>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-center text-green">
            Family Worship
          </h1>
          <p className="text-xl text-center">
            Each week, we explore distinct study topics, updated every Saturday
            for the upcoming Friday, to strengthen our faith and equip us with
            scriptural truth. These lessons, rooted in the Bible, guide our
            families to live for Jehovah's Kingdom, preparing for eternal life
            in paradise (John 17:3). Engage in heartfelt discussions to deepen
            your love for Jehovah and His standards.
          </p>
        </div>
        <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {currentWeek ? (
              <>
                {renderWeekContent(currentWeek)}
                {futureWeeks.map(renderWeekContent)}
              </>
            ) : (
              <p>No content available for the current week or upcoming weeks.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
