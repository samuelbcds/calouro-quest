import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { EXTENSION_ENTITIES } from '../../data/extensions';

export const ExtensionHero: React.FC = () => {
  const { exploredExtensions } = useGamification();

  const total = EXTENSION_ENTITIES.length;
  const exploredCount = exploredExtensions.length;
  const percentage = total > 0 ? Math.round((exploredCount / total) * 100) : 0;

  const currentExtXP = exploredExtensions.reduce((acc, id) => {
    const ext = EXTENSION_ENTITIES.find((e) => e.id === id);
    return acc + (ext ? ext.xpReward : 0);
  }, 0);

  return (
    <div className="extension-hero-card">
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-space-xs">
          <span
            className="material-symbols-outlined text-secondary-fixed text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            groups
          </span>
          <span className="font-label-caps text-label-caps text-secondary-fixed tracking-wider">
            ECOSSISTEMA IC/UFRJ
          </span>
        </div>
        <div className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-0.5 rounded-full shadow-sm">
          <span
            className="material-symbols-outlined text-[16px] text-tertiary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stars
          </span>
          <span className="font-label-caps text-label-caps text-tertiary font-bold">
            +{currentExtXP} XP
          </span>
        </div>
      </div>

      <div className="z-10">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-on-primary">
          Projetos &amp; Entidades
        </h1>
        <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
          Descubra onde aplicar seu código além da sala de aula, integre-se à comunidade do Fundão e pontue na sua jornada de calouro.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="z-10 bg-primary-container text-on-primary rounded-lg p-space-sm flex flex-col gap-1 mt-1">
        <div className="flex justify-between items-center text-on-primary">
          <span className="font-label-caps text-label-caps text-on-primary-container">
            {exploredCount} de {total} exploradas
          </span>
          <span className="font-label-caps text-label-caps text-secondary-fixed font-bold">
            {percentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-primary rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary-container rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-container opacity-40 pointer-events-none"></div>
    </div>
  );
};
