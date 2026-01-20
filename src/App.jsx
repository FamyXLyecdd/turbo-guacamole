import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Shell } from './components/Layout/Shell';
import { Home } from './pages/Home';
import { Map } from './pages/Map';
import { Lesson } from './pages/Lesson';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing is standalone */}
          <Route path="/" element={<Home />} />

          {/* Main App wrapped in Shell */}
          <Route element={<Shell />}>
            <Route path="/map" element={<Map />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            {/* Catch all redirect to map? Or 404? */}
            <Route path="*" element={<Map />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
