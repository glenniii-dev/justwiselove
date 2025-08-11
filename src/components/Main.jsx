import React from 'react';
import FamilyWorship from './FamilyWorship.jsx';
import Search from './Search.jsx';
import CreateArticle from './CreateArticle.jsx';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions.jsx';
import Truth from './Truth.jsx';

export default function Main() {
  return (
    <main className="bg-zinc-900 text-white max-w-[540px] sm:max-w-[540px] md:max-w-[668px] lg:max-w-[924px] py-5 flex items-center h-auto px-5 rounded-lg text-center flex-col my-12 mx-auto justify-self-center wrap-break-word"> {/*max-w-[400px]*/}
      <section id="home" className="mb-8">
        <h2 className="bg-zinc-950 rounded-lg text-lg font-thin p-[10px]">"He has told you, O man, what is good. And what is Jehovah requiring of you? Only to exercise justice, to cherish loyalty, And to walk in modesty with your God!"- Micah 6:8</h2>
        <Search />
        <FamilyWorship />
        <CreateArticle />
        <FrequentlyAskedQuestions />
        <Truth />
      </section>
    </main>
  );
}
