import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { CampusLocation, Mission } from '../../types';
import { INITIAL_MISSIONS } from '../../data/missions';
import { useGamification } from '../../context/GamificationContext';

interface LeafletCampusMapProps {
  locations: CampusLocation[];
  highlightedId: string | null;
  onSelectLocation: (locationId: string) => void;
}

export const LeafletCampusMap: React.FC<LeafletCampusMapProps> = ({
  locations,
  highlightedId,
  onSelectLocation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const { isMissionCompleted, toggleMission } = useGamification();

  // Helper to build popup HTML
  const buildPopupContent = (loc: CampusLocation): string => {
    const locMissions = (loc.missionIds || [])
      .map((id) => INITIAL_MISSIONS.find((m) => m.id === id))
      .filter((m): m is Mission => !!m);

    const missionsHtml =
      locMissions.length > 0
        ? `
        <div class="mt-2.5 pt-2 border-t border-gray-200">
          <div class="flex items-center gap-1 text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            <span class="material-symbols-outlined text-[14px] text-blue-700">flag</span>
            <span>Tarefas neste Local (${locMissions.length})</span>
          </div>
          <div class="flex flex-col gap-1.5 max-h-44 overflow-y-auto pr-1">
            ${locMissions
              .map((m) => {
                const done = isMissionCompleted(m.id);
                return `
                <div class="flex items-center justify-between p-1.5 rounded-lg text-xs ${
                  done ? 'bg-green-50 text-green-900 border border-green-200' : 'bg-gray-50 text-gray-800 border border-gray-200'
                }">
                  <div class="flex items-center gap-1.5 min-w-0 pr-2">
                    <span class="material-symbols-outlined text-[16px] ${done ? 'text-green-600' : 'text-gray-400'}">
                      ${done ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span class="truncate font-medium">${m.title}</span>
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${done ? 'bg-green-200 text-green-900' : 'bg-amber-100 text-amber-900'}">
                      +${m.xp} XP
                    </span>
                    <button 
                      data-mission-toggle="${m.id}"
                      class="px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-all ${
                        done ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }"
                    >
                      ${done ? 'Desfazer' : 'Concluir'}
                    </button>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      `
        : '';

    return `
      <div class="p-1 min-w-[260px] max-w-[320px] font-sans">
        <div class="flex items-center justify-between gap-2">
          <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-900">
            ${loc.badge}
          </span>
          <span class="text-[11px] font-semibold text-gray-500 uppercase">
            ${loc.category}
          </span>
        </div>
        <h3 class="text-sm font-bold text-gray-900 mt-1 leading-snug">
          ${loc.name}
        </h3>
        <p class="text-xs text-gray-600 mt-0.5">
          ${loc.building}
        </p>
        <p class="text-xs text-gray-700 mt-1.5 line-clamp-2">
          ${loc.description}
        </p>
        ${missionsHtml}
      </div>
    `;
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center of Fundão Campus
    const initialCenter: [number, number] = [-22.859, -43.23];
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 15,
      minZoom: 13,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // CartoDB Positron / OSM style
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Handle button clicks inside popups (toggle missions)
    const container = mapContainerRef.current;
    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest('[data-mission-toggle]') as HTMLElement | null;
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const missionId = Number(btn.getAttribute('data-mission-toggle'));
        if (!isNaN(missionId)) {
          toggleMission(missionId);
        }
      }
    };
    container.addEventListener('click', handlePopupClick);

    return () => {
      container.removeEventListener('click', handlePopupClick);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when locations or completion state change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    locations.forEach((loc) => {
      const isHighlighted = highlightedId === loc.id;

      // Color scheme based on category
      let pinColor = '#00335b'; // primary
      if (loc.category === 'restaurantes') pinColor = '#fca416';
      else if (loc.category === 'nce') pinColor = '#006398';
      else if (loc.category === 'ct') pinColor = '#286198';
      else if (loc.category === 'transporte') pinColor = '#004a80';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            position: relative;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${pinColor};
            color: #ffffff;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(0,0,0,0.35);
            border: 2.5px solid #ffffff;
            transform: translate(-50%, -50%);
            transition: all 0.25s ease;
            ${isHighlighted ? 'transform: translate(-50%, -50%) scale(1.25); ring: 4px rgba(0,99,152,0.4); z-index: 1000;' : ''}
          ">
            <span class="material-symbols-outlined" style="font-size: 20px;">
              ${loc.icon}
            </span>
            ${
              loc.missionIds && loc.missionIds.length > 0
                ? `<span style="
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    background: #ba1a1a;
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                    width: 17px;
                    height: 17px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1.5px solid white;
                  ">${loc.missionIds.length}</span>`
                : ''
            }
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        popupAnchor: [0, -22],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(buildPopupContent(loc), {
        maxWidth: 340,
        className: 'custom-campus-popup',
      });

      marker.on('click', () => {
        onSelectLocation(loc.id);
      });

      markersRef.current[loc.id] = marker;
    });
  }, [locations, highlightedId, isMissionCompleted]);

  // Fly to highlighted location
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !highlightedId) return;

    const targetLoc = locations.find((l) => l.id === highlightedId);
    const targetMarker = markersRef.current[highlightedId];

    if (targetLoc) {
      map.flyTo([targetLoc.lat, targetLoc.lng], 17, {
        duration: 0.9,
      });

      if (targetMarker) {
        targetMarker.openPopup();
      }
    }
  }, [highlightedId]);

  // Recenter button
  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([-22.859, -43.23], 15, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-surface-container-high bg-surface-container-lowest">
      {/* Top Banner overlay */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-gray-100">
        <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
        <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-wider">
          Mapa UFRJ · Ilha do Fundão
        </span>
      </div>

      {/* Recenter button */}
      <button
        onClick={handleRecenter}
        title="Recentrar no Campus"
        className="absolute top-3 right-3 z-[1000] bg-white/95 hover:bg-white text-primary p-2 rounded-xl shadow-md border border-gray-100 flex items-center gap-1 text-xs font-bold font-label-caps cursor-pointer active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-[18px]">my_location</span>
        <span className="hidden sm:inline">Recentrar</span>
      </button>

      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="w-full h-[360px] md:h-[420px] z-0" />
    </div>
  );
};

