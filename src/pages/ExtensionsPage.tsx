import React, { useState, useMemo } from 'react';
import { EXTENSION_ENTITIES } from '../data/extensions';
import { ExtensionHero } from '../components/extensions/ExtensionHero';
import { ExtensionCard } from '../components/extensions/ExtensionCard';

export const ExtensionsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredEntities = useMemo(() => {
    if (selectedFilter === 'all') return EXTENSION_ENTITIES;
    if (selectedFilter === 'pesquisa') {
      return EXTENSION_ENTITIES.filter((e) => e.category === 'pesquisa' || e.category === 'extensao');
    }
    if (selectedFilter === 'representacao') {
      return EXTENSION_ENTITIES.filter((e) => e.category === 'representacao');
    }
    if (selectedFilter === 'empresa_junior') {
      return EXTENSION_ENTITIES.filter((e) => e.category === 'empresa_junior');
    }
    if (selectedFilter === 'cultura') {
      return EXTENSION_ENTITIES.filter((e) => e.category === 'cultura');
    }
    return EXTENSION_ENTITIES;
  }, [selectedFilter]);

  return (
    <div className="page-container pb-12">
      {/* Gamification Progress Header Card */}
      <ExtensionHero />

      {/* Filter / Section Chips */}
      <div className="filter-chips-scroll">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`filter-chip ${selectedFilter === 'all' ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined text-[16px]">apps</span>
          <span>Todas ({EXTENSION_ENTITIES.length})</span>
        </button>

        <button
          onClick={() => setSelectedFilter('pesquisa')}
          className={`filter-chip ${selectedFilter === 'pesquisa' ? 'active' : ''}`}
        >
          Extensão &amp; Pesquisa
        </button>

        <button
          onClick={() => setSelectedFilter('representacao')}
          className={`filter-chip ${selectedFilter === 'representacao' ? 'active' : ''}`}
        >
          Representação &amp; CAINFO
        </button>

        <button
          onClick={() => setSelectedFilter('empresa_junior')}
          className={`filter-chip ${selectedFilter === 'empresa_junior' ? 'active' : ''}`}
        >
          Empresa Júnior
        </button>

        <button
          onClick={() => setSelectedFilter('cultura')}
          className={`filter-chip ${selectedFilter === 'cultura' ? 'active' : ''}`}
        >
          Cultura &amp; Memória
        </button>
      </div>

      {/* Entities Feed */}
      <div className="entities-feed">
        {filteredEntities.map((entity) => (
          <ExtensionCard key={entity.id} entity={entity} />
        ))}
      </div>

      {/* Calouro Community Tip Box */}
      <div className="veteran-tip-banner">
        <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">lightbulb</span>
        </div>
        <div className="flex flex-col">
          <span className="font-body-bold text-body-bold text-on-secondary-fixed leading-tight">
            Dica de Veterano
          </span>
          <span className="font-body-sm text-body-sm text-on-secondary-fixed-variant mt-0.5">
            Projetos de extensão contam como Horas Complementares obrigatórias para sua formatura em Ciência da Computação. Participe e pontue!
          </span>
        </div>
      </div>
    </div>
  );
};
