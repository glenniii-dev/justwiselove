export default function Header() {
  return (
    <footer className="bg-zinc-900 text-white w-[400px] sm:w-[540px] md:w-[668px] lg:w-[924px] py-4 flex items-center h-auto rounded-lg text-center flex-col my-12 mx-auto justify-self-center flex-wrap">
      <h2 className="font-['Audiowide'] text-[17.5px] font-thin mx-auto w-5xs text-shadow-black text-shadow-lg">© {new Date().getFullYear()} Just Wise Love</h2>
    </footer>
  );
}