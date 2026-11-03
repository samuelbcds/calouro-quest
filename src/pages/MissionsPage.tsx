import React, { useState, useMemo } from 'react';
import { INITIAL_MISSIONS } from '../data/missions';
import { GamificationHero } from '../components/missions/GamificationHero';
import { MissionFilters } from '../components/missions/MissionFilters';
import { MissionCard } from '../components/missions/MissionCard';

export const MissionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const filteredMissions = useMemo(() => {
    if (selectedCategory === 'todas') return INITIAL_MISSIONS;
    return INITIAL_MISSIONS.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="page-container">
      {/* Gamification Dashboard Hero */}
      <GamificationHero />

      {/* Filter Chips Bar */}
      <MissionFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalCount={INITIAL_MISSIONS.length}
        filteredCount={filteredMissions.length}
      />

      {/* Missions Stream */}
      <section className="missions-list" id="missions-list">
        {filteredMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </section>

      {/* Motivational Veteran Tip Card */}
      <aside className="veteran-tip-card">
        <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
          <span className="material-symbols-outlined text-[28px]">tips_and_updates</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">
            Dica de Veterano
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Não tente gabaritar tudo na primeira semana! O Fundão é gigante e cada etapa tem o seu tempo. Dúvidas? Cole no CAINFO!
          </span>
        </div>
      </aside>
    </div>
  );
};
