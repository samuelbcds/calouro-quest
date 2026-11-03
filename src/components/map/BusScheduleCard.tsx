import React from 'react';
import { BUS_LINES } from '../../data/locations';

export const BusScheduleCard: React.FC = () => {
  return (
    <div className="bus-schedule-card p-space-md gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">directions_bus</span>
          </span>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Ônibus Circulares Internos
            </h3>
            <span className="font-label-caps text-[11px] text-outline block">
              Transporte 100% Gratuito no Campus
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-[11px] font-bold">
          Gratuito
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {BUS_LINES.map((line) => (
          <div
            key={line.id}
            className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-[15px] text-primary font-bold">
                {line.name}
              </span>
              <span className="font-label-caps text-[11px] bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant font-bold">
                {line.interval}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-secondary">schedule</span>
              <span>Funcionamento: {line.operatingHours}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-label-caps text-[11px] text-outline">Paradas:</span>
              {line.route.map((stop, idx) => (
                <span
                  key={stop}
                  className="inline-flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded text-[11px] font-body-sm text-on-surface-variant border border-surface-container-high"
                >
                  {stop}
                  {idx < line.route.length - 1 && (
                    <span className="text-outline-variant font-bold">➔</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
