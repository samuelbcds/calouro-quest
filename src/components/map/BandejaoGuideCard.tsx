import React from 'react';

export const BandejaoGuideCard: React.FC = () => {
  return (
    <div className="bandejao-guide-card p-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">restaurant</span>
          </span>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Guia de Sobrevivência: Bandejão (RU)
            </h3>
            <span className="font-label-caps text-[11px] text-outline block">
              Refeitório Universitário Central & CT
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-[11px] font-bold">
          R$ 2,00
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center pt-1">
        <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high/50">
          <span className="font-label-caps text-[11px] text-outline uppercase block">Almoço</span>
          <span className="font-headline-sm text-[15px] text-primary font-bold block mt-0.5">
            11h30 – 14h00
          </span>
          <span className="text-[11px] text-error font-medium">Pico: 12h15 – 13h10</span>
        </div>
        <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high/50">
          <span className="font-label-caps text-[11px] text-outline uppercase block">Jantar</span>
          <span className="font-headline-sm text-[15px] text-primary font-bold block mt-0.5">
            17h30 – 20h00
          </span>
          <span className="text-[11px] text-secondary font-medium">Mais tranquilo</span>
        </div>
      </div>

      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 flex flex-col gap-1">
        <span className="font-label-caps text-[12px] text-primary font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-tertiary">stars</span>
          Dica de Veterano:
        </span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Saia da aula às 11h40 ou vá almoçar às 13h30. Você pegará fila praticamente zero e almoçará com tranquilidade com a galera!
        </p>
      </div>
    </div>
  );
};
