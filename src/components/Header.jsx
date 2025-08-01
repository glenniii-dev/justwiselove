import jwl from '../../public/jwl.png';

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white w-[400px] sm:w-[540px] md:w-[668px] lg:w-[924px] py-4 flex items-center h-auto rounded-lg text-center flex-col my-12 mx-auto justify-self-center flex-wrap">
      <img src={jwl} alt="Jwl" className="w-50 -mb-3 -mt-3" />
      <h2 className="font-['Audiowide'] text-[17.5px] font-thin mx-auto w-5xs text-shadow-black text-shadow-lg pt-2 border-t-3 border-t-lime-600">Just Wise Love</h2>
    </header>
  );
}
