import React from 'react';

export const RewardClaimCard: React.FC = () => {
  return (
    <div className="claim-card">
      <div className="flex items-start gap-space-sm">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container shrink-0">
          <span className="material-symbols-outlined text-[24px]">redeem</span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
              Resgate seus Brindes!
            </h4>
            <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider bg-secondary-fixed px-2 py-0.5 rounded-full">
              Presencial
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
            Todas as suas conquistas são persistidas localmente no dispositivo (LocalStorage). Mostre sua tela na sede do{' '}
            <strong className="text-primary font-bold">CAINFO</strong> ou na recepção do{' '}
            <strong className="text-primary font-bold">IC</strong> para resgatar adesivos e brindes exclusivos de calouro!
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-3 pt-2">
            <div className="flex items-center gap-1 text-on-surface-variant font-label-caps text-label-caps">
              <span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>{' '}
              Bloco E - Sala do CAINFO
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-caps text-label-caps">
              <span className="material-symbols-outlined text-secondary text-[16px]">devices</span>{' '}
              Sincronizado Offline
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
