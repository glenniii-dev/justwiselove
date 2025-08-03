import React from 'react';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import CreateArticle from './components/CreateArticle';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="bg-zinc-950">
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/create-article" element={<CreateArticle />} />
        </Routes>
      </Main>
      <Footer />
    </div>
  )
}

export default App
