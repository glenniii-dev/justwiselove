import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

export default function AboutUs() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-center text-stone-800">
              About Us
          </h1>
          <p className="text-xl text-stone-800 text-center mb-10">At <b>Just Wise Love</b>, we believe true wisdom begins with love — love for God, love for truth, and love for one another. Our mission is to help you live a life rich in purpose, peace, and spiritual clarity by applying timeless biblical principles to modern challenges.</p>

        </div>
          <div className="flex flex-col px-20 md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto pb-20 border-b border-b-green/30 border-dashed">
            <div className="w-full min-w-60 h-56 rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-stone-800/25 duration-300 cursor-pointer bg-stone-300/20 px-4 py-8">
              <h3 className="text-2xl font-bold mb-4 text-center text-green">Our Mission</h3>
              <p className="text-lg text-stone-800 text-center">To equip you with practical, scripturally grounded insights that transform everyday decisions into acts of faith, wisdom, and joy.</p>
            </div>
            <div className="w-full min-w-60 h-56 rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-stone-800/25 duration-300 cursor-pointer bg-stone-300/20 px-4 py-8">
              <h3 className="text-2xl font-bold mb-4 text-center text-green">Our Vision</h3>
              <p className="text-lg text-stone-800 text-center">A world where every heart seeks truth, every home reflects love, and every life is lived with eternal hope.</p>
            </div>
            <div className="w-full min-w-60 h-56 rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-stone-800/25 duration-300 cursor-pointer bg-stone-300/20 px-4 py-8">
              <h3 className="text-2xl font-bold mb-4 text-center text-green">Our Promise</h3>
              <p className="text-lg text-stone-800 text-center">Every article is carefully researched, rooted in Scripture, and written to uplift, inform, and inspire real change.</p>
            </div>
          </div>
          <div className="max-w-2xl px-10 py-15 mx-auto flex flex-col items-center justify-center gap-5 text-center">
            <svg className="h-7" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 18 L15 18 L23 35 L31 0  L39 35 L47 18 L55 35 L63 0 L71 35 L79 18 L94 18" stroke="#008000" strokeWidth="4" fill="none"/>
            </svg>
            <p className="italic text-stone-500 font-medium">“For the word of God is alive and exerts power and is sharper than any two-edged sword...” — Hebrews 4:12</p>

          </div>
      </main>
      <Footer />
    </>
  )
}
