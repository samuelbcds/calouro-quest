import React from 'react';
import { MissionCategory } from '../../types';

interface MissionFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalCount: number;
  filteredCount: number;
}

const CATEGORIES: { id: string; label: string; cat?: MissionCategory }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'fundao', label: '🏛️ Fundão & Locais' },
  { id: 'ic', label: '💻 Sobrevivência IC' },
  { id: 'social', label: '🤝 Social & CAINFO' },
  { id: 'extensoes', label: '🚀 Extensões' },
];

export const MissionFilters: React.FC<MissionFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  totalCount,
  filteredCount,
}) => {
  return (
    <section className="space-y-1">
      <div className="flex items-center justify-between px-0.5">
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
          Filtrar Missões
        </span>
        <span className="font-body-sm text-body-sm text-secondary font-semibold">
          {filteredCount} de {totalCount} disponíveis
        </span>
      </div>

      <div className="filter-chips-scroll pt-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`filter-chip ${isActive ? 'active' : ''}`}
            >
              <span>{cat.label}</span>
              {cat.id === 'todas' && (
                <span className="bg-white/20 text-white px-1.5 py-0.2 rounded-full text-[11px]">
                  {totalCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
