import React, { useState, useMemo } from 'react';
import { CAMPUS_LOCATIONS } from '../data/locations';
import { LeafletCampusMap } from '../components/map/LeafletCampusMap';
import { LocationCard } from '../components/map/LocationCard';
import { BusScheduleCard } from '../components/map/BusScheduleCard';
import { BandejaoGuideCard } from '../components/map/BandejaoGuideCard';
import { LocationFilterCategory } from '../types';

export const MapPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LocationFilterCategory>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const filteredLocations = useMemo(() => {
    return CAMPUS_LOCATIONS.filter((loc) => {
      const matchesCategory = selectedCategory === 'all' || loc.category === selectedCategory;
      const matchesSearch =
        search.trim() === '' ||
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.building.toLowerCase().includes(search.toLowerCase()) ||
        loc.description.toLowerCase().includes(search.toLowerCase()) ||
        loc.howToGetThere.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const handleSelectFromMap = (locationId: string) => {
    setHighlightedId(locationId);
    const el = document.getElementById(`loc-${locationId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFocusOnMap = (locationId: string) => {
    setHighlightedId(locationId);
    const mapEl = document.getElementById('campus-leaflet-map-wrapper');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const showBusSchedule = selectedCategory === 'all' || selectedCategory === 'transporte';
  const showBandejaoGuide = selectedCategory === 'all' || selectedCategory === 'restaurantes';

  return (
    <div className="page-container pb-12">
      {/* Search & Tactical Quick Filters Bar */}
      <div className="flex flex-col gap-space-sm">
        <div className="search-bar-wrapper">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar prédio, laboratório ou bandejão..."
            className="search-input"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="search-clear-btn"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Filters Scroll Tray */}
        <div className="filter-chips-scroll">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`filter-chip uppercase ${selectedCategory === 'all' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            <span>Todos</span>
          </button>

          <button
            onClick={() => setSelectedCategory('ccmn')}
            className={`filter-chip uppercase ${selectedCategory === 'ccmn' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>CCMN &amp; IC</span>
          </button>

          <button
            onClick={() => setSelectedCategory('nce')}
            className={`filter-chip uppercase ${selectedCategory === 'nce' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">memory</span>
            <span>NCE</span>
          </button>

          <button
            onClick={() => setSelectedCategory('ct')}
            className={`filter-chip uppercase ${selectedCategory === 'ct' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>CT &amp; Letras</span>
          </button>

          <button
            onClick={() => setSelectedCategory('restaurantes')}
            className={`filter-chip uppercase ${selectedCategory === 'restaurantes' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">restaurant</span>
            <span>Bandejão &amp; Cobal</span>
          </button>

          <button
            onClick={() => setSelectedCategory('transporte')}
            className={`filter-chip uppercase ${selectedCategory === 'transporte' ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined text-[16px]">directions_bus</span>
            <span>Circulares</span>
          </button>
        </div>
      </div>

      {/* Interactive Leaflet Campus Map */}
      <div id="campus-leaflet-map-wrapper">
        <LeafletCampusMap
          locations={filteredLocations}
          highlightedId={highlightedId}
          onSelectLocation={handleSelectFromMap}
        />
      </div>

      {/* Points of Interest Feed */}
      <div className="poi-feed" id="poi-container">
        {filteredLocations.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc}
            isHighlighted={highlightedId === loc.id}
            onFocusOnMap={handleFocusOnMap}
          />
        ))}

        {filteredLocations.length === 0 && (
          <div className="bg-surface-container-low p-8 rounded-xl text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[36px] text-outline mb-2">
              location_off
            </span>
            <p className="font-body-base">Nenhum ponto encontrado com esse termo de busca.</p>
          </div>
        )}

        {/* Bus Schedules */}
        {showBusSchedule && <BusScheduleCard />}

        {/* Bandejão Survival Guide */}
        {showBandejaoGuide && <BandejaoGuideCard />}
      </div>
    </div>
  );
};
