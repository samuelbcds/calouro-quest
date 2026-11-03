import React from 'react';
import { ExtensionEntity } from '../../types';
import { useGamification } from '../../context/GamificationContext';

interface ExtensionCardProps {
  entity: ExtensionEntity;
}

export const ExtensionCard: React.FC<ExtensionCardProps> = ({ entity }) => {
  const { isExtensionExplored, toggleExtension } = useGamification();
  const explored = isExtensionExplored(entity.id);

  return (
    <div className="extension-card">
      <div className="p-space-md flex flex-col gap-space-sm">
        {/* Top Tag & Title */}
        <div className="flex justify-between items-start gap-2">
          <div>
            {entity.highlight && (
              <span className="bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-label-caps text-[11px] font-bold inline-block mb-1">
                {entity.highlight}
              </span>
            )}
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              {entity.name}
            </h2>
            <span className="font-label-caps text-label-caps text-outline block">
              {entity.tagline}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[22px]">{entity.icon}</span>
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {entity.description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-space-xs flex-wrap">
          {entity.tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md font-label-caps text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links & Action Button */}
        <div className="flex items-center justify-between pt-space-xs mt-space-xs gap-space-sm flex-wrap border-t border-surface-container-high/50">
          <div className="flex items-center gap-3">
            {entity.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-caps text-label-caps text-secondary flex items-center gap-1 hover:underline active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <button
            onClick={() => toggleExtension(entity.id)}
            className={`font-label-caps text-label-caps px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
              explored
                ? 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                : 'bg-primary-container text-on-primary hover:bg-primary shadow-sm'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                explored ? 'text-secondary' : 'text-on-primary'
              }`}
            >
              {explored ? 'check_circle' : 'add_circle'}
            </span>
            <span>{explored ? `Explorado (+${entity.xpReward} XP)` : `Marcar (+${entity.xpReward} XP)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
