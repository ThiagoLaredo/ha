import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Seo from './components/Seo/Seo';

function App() {
  return (
    <>
      <Seo />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<About />} />
        <Route path="/who" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/cases" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;