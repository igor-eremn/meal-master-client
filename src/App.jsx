import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function Home() {
  return <h2>Home Page</h2>;
}

function Header() {
  return (
    <header>
      <h1 className="header-title">Meal Master</h1>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
