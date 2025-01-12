import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import HomePage from './components/HomePage';
    import SeriesPage from './components/SeriesPage';

    function App() {
      return (
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/series/:seriesId" element={<SeriesPage />} />
          </Routes>
        </div>
      );
    }

    export default App;
