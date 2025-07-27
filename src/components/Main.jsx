import React from 'react';
import FamilyWorship from './FamilyWorship.jsx';

export default function Main() {
  return (
    <main className="bg-zinc-900 text-white w-[400px] sm:w-[540px] md:w-[668px] lg:w-[924px] py-5 flex items-center h-auto px-5 rounded-lg text-center flex-col my-12 mx-auto justify-self-center wrap-break-word">
      <section id="home" className="mb-8">
        <h2 className="bg-zinc-950 rounded-lg text-lg font-thin p-[10px]">"He has told you, O man, what is good. And what is Jehovah requiring of you? Only to exercise justice, to cherish loyalty, And to walk in modesty with your God!"- Micah 6:8</h2>
        <input type="text" placeholder="Search topics or people..." className="mt-8 p-2 w-full rounded-md bg-zinc-950 text-white border-2 border-lime-600 placeholder:text-center" />
        <FamilyWorship />
      </section>
    </main>
  );
}
