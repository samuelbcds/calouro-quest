import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { RANK_TIERS } from '../../data/achievements';

export const LevelModal: React.FC = () => {
  const { isLevelModalOpen, closeLevelModal, currentRank, totalXP, resetProgress } = useGamification();

  if (!isLevelModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary to-primary-container p-5 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px]">military_tech</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-primary-container uppercase tracking-wider block">
                Roadmap de Patentes
              </span>
              <h2 className="font-headline-sm text-headline-sm text-white font-bold">
                Evolução do Calouro
              </h2>
            </div>
          </div>
          <button
            onClick={closeLevelModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Current Status Badge */}
        <div className="p-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant block">Patente Atual:</span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {currentRank.name} (Nível {currentRank.level})
            </span>
          </div>
          <div className="text-right">
            <span className="font-label-caps text-label-caps text-on-surface-variant block">XP Acumulado:</span>
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
              {totalXP} XP
            </span>
          </div>
        </div>

        {/* Ranks List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {RANK_TIERS.map((tier) => {
            const isCurrent = tier.level === currentRank.level;
            const isUnlocked = totalXP >= tier.minXp;

            return (
              <div
                key={tier.level}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-primary-fixed/30 border-primary shadow-sm'
                    : isUnlocked
                    ? 'bg-surface-container-lowest border-outline-variant/60'
                    : 'bg-surface-container-low/60 border-transparent opacity-75'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-primary text-on-primary'
                      : isUnlocked
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-surface-dim text-outline'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{tier.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`font-headline-sm text-[15px] font-bold truncate ${
                        isCurrent ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      Nível {tier.level}: {tier.name}
                    </h3>
                    <span className="font-code-snippet text-[12px] text-on-surface-variant shrink-0">
                      {tier.minXp} – {tier.maxXp >= 99999 ? '∞' : tier.maxXp} XP
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {tier.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Tem certeza que deseja reiniciar todo o seu progresso?')) {
                resetProgress();
              }
            }}
            className="text-error hover:text-error/80 font-label-caps text-[12px] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reiniciar Progresso</span>
          </button>
          <button
            onClick={closeLevelModal}
            className="px-4 py-2 bg-primary text-on-primary rounded-xl font-label-caps text-label-caps hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

