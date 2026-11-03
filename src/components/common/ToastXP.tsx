import React from 'react';
import { useGamification } from '../../context/GamificationContext';

export const ToastXP: React.FC = () => {
  const { toast } = useGamification();

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-space-xs rounded-full shadow-xl ${
        toast.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      <span
        className="material-symbols-outlined text-tertiary-fixed text-[20px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        stars
      </span>
      <span className="font-headline-sm text-headline-sm tracking-tight text-white">
        {toast.message}
      </span>
    </div>
  );
};

