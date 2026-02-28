import Header from "./components/Header";
import Banner from "./components/Banner";
import Sobre from "./components/Sobre";
import Depoimentos from "./components/Depoimentos";
import Galeria from "./components/Galeria"
import LocalRetiro  from "./components/LocalRetiro"; 
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <Banner />
      <Sobre />
      <Depoimentos />
      <Galeria />
      <LocalRetiro />
      <Footer />
    </main>
  );
}
