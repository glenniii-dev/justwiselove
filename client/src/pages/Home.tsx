import Articles from "../components/home/Articles";
import Hero from "../components/home/Hero";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";

export default function Home() {
  return (
    <div className="bg-stone-300 min-h-screen">
      <Header />
      <Hero />
      <Articles />
      <Footer />
    </div>
  )
}
