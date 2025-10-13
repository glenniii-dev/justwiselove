import footer from "../../utils/footer";

export default function Footer() {
  return (
    <footer>
      <div  className="px-6 md:px-16 lg:px-24 xl:px-32 bg-linear-90 from-stone-800 via-stone-800/90 to-stone-800">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/30 text-white">
          
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <svg className="w-20 mr-3" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 18 L15 18 L23 35 L31 0  L39 35 L47 18 L55 35 L63 0 L71 35 L79 18 L94 18" stroke="#fff" strokeWidth="4" fill="none"/>
              </svg>
              <h1 className="font-bold text-3xl">Just Wise Love</h1>
            </div>
            <p className="m-w-[410px] mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="flex flex-row flex-wrap justify-between w-full md:w-[45%] gap-5">
            {footer.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-base text-white md:mb-5 mb-2">{section.title}</h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:underline transition">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
        <p className="py-4 text-center text-sm md:text-base text-white">Copyright {new Date().getFullYear()} &copy; Just Wise Love. All Rights Reserved</p>
      </div>
      
      {/* © Copyright Glenn Hensley III (DO NOT DELETE THE CODE BELOW) Credit Footer*/}
      <section className="bg-black text-white w-full h-5 text-sm font-bold text-center flex items-center justify-center hover:scale-105 transition-all hover:underline">
        <a href="https://www.glenniii.dev" target="_blank">Developed by Glenn Hensley III</a>
      </section>

    </footer>
  )
}