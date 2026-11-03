import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { INITIAL_MISSIONS } from '../data/missions';
import { ACHIEVEMENTS, RANK_TIERS } from '../data/achievements';
import { EXTENSION_ENTITIES } from '../data/extensions';
import { Achievement, RankTier } from '../types';
import { soundEffects } from '../utils/sound';
import { fireConfetti } from '../hooks/useConfetti';

interface ToastState {
  message: string;
  visible: boolean;
}

interface GamificationContextType {
  completedMissions: number[];
  exploredExtensions: string[];
  soundEnabled: boolean;
  toast: ToastState;
  isLevelModalOpen: boolean;
  totalXP: number;
  totalMaxXP: number;
  currentRank: RankTier;
  nextRank?: RankTier;
  progressPercentage: number;
  completedMissionsCount: number;
  totalMissionsCount: number;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
  isMissionCompleted: (id: number) => boolean;
  isExtensionExplored: (id: string) => boolean;
  isAchievementUnlocked: (achievement: Achievement) => boolean;
  toggleMission: (id: number) => void;
  toggleExtension: (id: string) => void;
  toggleSound: () => void;
  openLevelModal: () => void;
  closeLevelModal: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'ufrj_ic_calouros_progress_v1';
const LEGACY_STORAGE_KEY = 'ic_calouro_missions_progress_v1';
const EXTENSIONS_STORAGE_KEY = 'ufrj_ic_calouros_extensions_v1';
const SOUND_STORAGE_KEY = 'ufrj_ic_calouros_sound_v1';

const DEFAULT_COMPLETED_MISSIONS: number[] = [];
const DEFAULT_EXPLORED_EXTENSIONS: string[] = [];

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completedMissions, setCompletedMissions] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_COMPLETED_MISSIONS;
  });

  const [exploredExtensions, setExploredExtensions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(EXTENSIONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_EXPLORED_EXTENSIONS;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return true;
  });

  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMissions));
    } catch {
      // Ignore
    }
  }, [completedMissions]);

  useEffect(() => {
    try {
      localStorage.setItem(EXTENSIONS_STORAGE_KEY, JSON.stringify(exploredExtensions));
    } catch {
      // Ignore
    }
  }, [exploredExtensions]);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(soundEnabled));
    } catch {
      // Ignore
    }
  }, [soundEnabled]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
  };

  // Calculations
  const missionsXP = useMemo(() => {
    return completedMissions.reduce((acc, id) => {
      const m = INITIAL_MISSIONS.find((mission) => mission.id === id);
      return acc + (m ? m.xp : 0);
    }, 0);
  }, [completedMissions]);

  const extensionsXP = useMemo(() => {
    return exploredExtensions.reduce((acc, id) => {
      const ext = EXTENSION_ENTITIES.find((e) => e.id === id);
      return acc + (ext ? ext.xpReward : 0);
    }, 0);
  }, [exploredExtensions]);

  const totalXP = missionsXP + extensionsXP;

  const totalMaxXP = useMemo(() => {
    const mMax = INITIAL_MISSIONS.reduce((acc, m) => acc + m.xp, 0);
    const eMax = EXTENSION_ENTITIES.reduce((acc, e) => acc + e.xpReward, 0);
    return mMax + eMax;
  }, []);

  const currentRank = useMemo(() => {
    for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
      if (totalXP >= RANK_TIERS[i].minXp) {
        return RANK_TIERS[i];
      }
    }
    return RANK_TIERS[0];
  }, [totalXP]);

  const nextRank = useMemo(() => {
    const currentIndex = RANK_TIERS.findIndex((r) => r.level === currentRank.level);
    if (currentIndex >= 0 && currentIndex < RANK_TIERS.length - 1) {
      return RANK_TIERS[currentIndex + 1];
    }
    return undefined;
  }, [currentRank]);

  const progressPercentage = useMemo(() => {
    if (totalMaxXP === 0) return 0;
    return Math.min(100, Math.round((totalXP / totalMaxXP) * 100));
  }, [totalXP, totalMaxXP]);

  const isMissionCompleted = (id: number) => completedMissions.includes(id);
  const isExtensionExplored = (id: string) => exploredExtensions.includes(id);

  const isAchievementUnlocked = (achievement: Achievement) => {
    if (achievement.requiredMissionIds.length === 0) return false;
    return achievement.requiredMissionIds.every((id) => completedMissions.includes(id));
  };

  const unlockedAchievementsCount = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => isAchievementUnlocked(a)).length;
  }, [completedMissions]);

  const toggleMission = (id: number) => {
    const mission = INITIAL_MISSIONS.find((m) => m.id === id);
    const isCompleted = completedMissions.includes(id);

    if (isCompleted) {
      setCompletedMissions((prev) => prev.filter((mId) => mId !== id));
    } else {
      setCompletedMissions((prev) => [...prev, id]);
      if (mission) {
        showToast(`+${mission.xp} XP! Mandou bem, bixo!`);
      }
      if (soundEnabled) {
        soundEffects.playMissionComplete();
      }
      fireConfetti();
    }
  };

  const toggleExtension = (id: string) => {
    const ext = EXTENSION_ENTITIES.find((e) => e.id === id);
    const isExplored = exploredExtensions.includes(id);

    if (isExplored) {
      setExploredExtensions((prev) => prev.filter((eId) => eId !== id));
    } else {
      setExploredExtensions((prev) => [...prev, id]);
      if (ext) {
        showToast(`+${ext.xpReward} XP! Entidade explorada!`);
      }
      if (soundEnabled) {
        soundEffects.playMissionComplete();
      }
      fireConfetti();
    }
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const resetProgress = () => {
    setCompletedMissions([]);
    setExploredExtensions([]);
    showToast('Progresso reiniciado!');
  };

  return (
    <GamificationContext.Provider
      value={{
        completedMissions,
        exploredExtensions,
        soundEnabled,
        toast,
        isLevelModalOpen,
        totalXP,
        totalMaxXP,
        currentRank,
        nextRank,
        progressPercentage,
        completedMissionsCount: completedMissions.length,
        totalMissionsCount: INITIAL_MISSIONS.length,
        unlockedAchievementsCount,
        totalAchievementsCount: ACHIEVEMENTS.length,
        isMissionCompleted,
        isExtensionExplored,
        isAchievementUnlocked,
        toggleMission,
        toggleExtension,
        toggleSound,
        openLevelModal: () => setIsLevelModalOpen(true),
        closeLevelModal: () => setIsLevelModalOpen(false),
        resetProgress,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

