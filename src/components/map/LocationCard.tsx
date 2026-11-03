import React from 'react';
import { CampusLocation, Mission } from '../../types';
import { INITIAL_MISSIONS } from '../../data/missions';
import { useGamification } from '../../context/GamificationContext';

interface LocationCardProps {
  location: CampusLocation;
  isHighlighted?: boolean;
  onFocusOnMap?: (locationId: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  isHighlighted,
  onFocusOnMap,
}) => {
  const { isMissionCompleted, toggleMission } = useGamification();

  const locMissions = (location.missionIds || [])
    .map((id) => INITIAL_MISSIONS.find((m) => m.id === id))
    .filter((m): m is Mission => !!m);

  return (
    <article
      id={`loc-${location.id}`}
      className={`location-card ${isHighlighted ? 'highlighted' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">{location.icon}</span>
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold truncate">
              {location.name}
            </h3>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            {location.building}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onFocusOnMap && (
            <button
              onClick={() => onFocusOnMap(location.id)}
              title="Localizar no Mapa Leaflet"
              className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary hover:text-on-secondary font-label-caps text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px]">pin_drop</span>
              <span>No Mapa</span>
            </button>
          )}
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-caps text-[11px] font-bold">
            {location.badge}
          </span>
        </div>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
        {location.description}
      </p>

      {/* Associated Missions Box */}
      {locMissions.length > 0 && (
        <div className="bg-surface-container-lowest rounded-lg p-3 border border-secondary/20 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-primary">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">flag</span>
              Tarefas neste local ({locMissions.length})
            </span>
            <span className="text-[11px] text-on-surface-variant font-normal">
              {locMissions.filter((m) => isMissionCompleted(m.id)).length} de {locMissions.length} concluídas
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {locMissions.map((m) => {
              const done = isMissionCompleted(m.id);
              return (
                <div
                  key={m.id}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                    done
                      ? 'bg-green-50 text-green-900 border border-green-200/80'
                      : 'bg-surface-container-low text-on-surface border border-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <button
                      onClick={() => toggleMission(m.id)}
                      className="cursor-pointer text-left flex items-center gap-1.5"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] shrink-0 ${
                          done ? 'text-green-600' : 'text-outline'
                        }`}
                      >
                        {done ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span className={`font-medium ${done ? 'line-through opacity-80' : ''}`}>
                        {m.title}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        done
                          ? 'bg-green-200 text-green-900'
                          : 'bg-tertiary-fixed text-on-tertiary-fixed'
                      }`}
                    >
                      +{m.xp} XP
                    </span>
                    <button
                      onClick={() => toggleMission(m.id)}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-all active:scale-95 ${
                        done
                          ? 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      {done ? 'Desfazer' : 'Concluir'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Directions Box */}
      <div className="bg-surface-container-low rounded-lg p-3 flex flex-col gap-1.5 border border-surface-container-high/60">
        <div className="flex items-center gap-1.5 text-primary font-label-caps text-label-caps font-bold">
          <span className="material-symbols-outlined text-[16px] text-secondary">navigation</span>
          <span>Como chegar:</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {location.howToGetThere}
        </p>
      </div>

      {location.ninjaTip && (
        <div className="flex items-center gap-2 text-tertiary bg-tertiary-fixed/30 px-3 py-1.5 rounded-lg font-body-sm text-[13px]">
          <span className="material-symbols-outlined text-[18px] shrink-0">tips_and_updates</span>
          <span>
            <strong>Dica Ninja:</strong> {location.ninjaTip}
          </span>
        </div>
      )}
    </article>
  );
};
