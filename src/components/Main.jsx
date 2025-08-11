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
        <h2 className="font-['Rubik'] bg-zinc-950 rounded-lg text-lg text-white font-thin p-[10px]">"Now these were more noble-minded than those in Thessalonica, for they accepted the word with the greatest eagerness of mind, carefully examining the Scriptures daily to see whether these things were so."- Acts 17:11</h2>
        <Search />
        <FamilyWorship />
        <CreateArticle />
        <FrequentlyAskedQuestions />
        <Truth />
      </section>
    </main>
  );
}
