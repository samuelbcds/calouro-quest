import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GamificationProvider } from './context/GamificationContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastXP } from './components/common/ToastXP';
import { LevelModal } from './components/common/LevelModal';
import { MissionsPage } from './pages/MissionsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { MapPage } from './pages/MapPage';
import { ExtensionsPage } from './pages/ExtensionsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GamificationProvider>
        <div className="flex flex-col min-h-screen bg-surface">
          {/* Global Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
            <Routes>
              <Route path="/" element={<Navigate to="/missoes" replace />} />
              <Route path="/missoes" element={<MissionsPage />} />
              <Route path="/conquistas" element={<AchievementsPage />} />
              <Route path="/mapa" element={<MapPage />} />
              <Route path="/extensoes" element={<ExtensionsPage />} />
              <Route path="*" element={<Navigate to="/missoes" replace />} />
            </Routes>
          </main>

          {/* Global Bottom Navigation */}
          <BottomNav />

          {/* Global Gamification Overlays */}
          <ToastXP />
          <LevelModal />
        </div>
      </GamificationProvider>
    </BrowserRouter>
  );
};

export default App;

