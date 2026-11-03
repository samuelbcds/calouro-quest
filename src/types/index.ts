export type MissionCategory = 'fundao' | 'ic' | 'social' | 'extensoes';

export interface Mission {
  id: number;
  title: string;
  description: string;
  category: MissionCategory;
  xp: number;
  tag?: string;
  location?: string;
  codeSnippet?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  requiredMissionIds: number[];
  variant?: 'primary' | 'secondary' | 'tertiary' | 'legendary';
  hint?: string;
  codeSnippet?: string;
}

export interface RankTier {
  level: number;
  name: string;
  minXp: number;
  maxXp: number;
  description: string;
  icon: string;
}

export type LocationFilterCategory = 'all' | 'ccmn' | 'nce' | 'ct' | 'restaurantes' | 'transporte';

export interface CampusLocation {
  id: string;
  name: string;
  category: 'ccmn' | 'nce' | 'ct' | 'restaurantes' | 'transporte';
  building: string;
  description: string;
  howToGetThere: string;
  ninjaTip?: string;
  icon: string;
  badge: string;
  lat: number;
  lng: number;
  missionIds?: number[];
}

export interface BusLine {
  id: string;
  name: string;
  color: string;
  interval: string;
  route: string[];
  operatingHours: string;
}

export interface ExtensionEntity {
  id: string;
  name: string;
  category: 'extensao' | 'pesquisa' | 'representacao' | 'empresa_junior' | 'cultura';
  tagline: string;
  description: string;
  tags: string[];
  icon: string;
  xpReward: number;
  links: {
    label: string;
    url: string;
    icon: string;
  }[];
  highlight?: string;
}

