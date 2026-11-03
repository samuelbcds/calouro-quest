import React, { useState, useMemo } from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { useGamification } from '../context/GamificationContext';
import { TrophyOverview } from '../components/achievements/TrophyOverview';
import { AchievementCard } from '../components/achievements/AchievementCard';

export const AchievementsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const { isAchievementUnlocked, unlockedAchievementsCount, totalAchievementsCount } = useGamification();

  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((achievement) => {
      const unlocked = isAchievementUnlocked(achievement);
      if (filter === 'unlocked') return unlocked;
      if (filter === 'locked') return !unlocked;
      return true;
    });
  }, [filter, isAchievementUnlocked]);

  const lockedCount = totalAchievementsCount - unlockedAchievementsCount;

  return (
    <div className="page-container">
      {/* Trophy Progress Card */}
      <TrophyOverview />

      {/* Filter Tabs */}
      <div className="filter-bar">
        <button
          onClick={() => setFilter('all')}
          className={`badge-filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          Todos ({totalAchievementsCount})
        </button>

        <button
          onClick={() => setFilter('unlocked')}
          className={`badge-filter-btn ${filter === 'unlocked' ? 'active' : ''}`}
        >
          🏆 Desbloqueados ({unlockedAchievementsCount})
        </button>

        <button
          onClick={() => setFilter('locked')}
          className={`badge-filter-btn ${filter === 'locked' ? 'active' : ''}`}
        >
          🔒 Em Progresso ({lockedCount})
        </button>
      </div>

      {/* Badges Grid Stream */}
      <div className="badges-grid" id="badges-container">
        {filteredAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};
