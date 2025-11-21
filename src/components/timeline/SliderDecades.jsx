import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SliderDecades({ decadasDisponibles, decadaActiva, onSelectDecada }) {
  const [scrollPos, setScrollPos] = useState(0);

  const scrollLeft = () => {
    const container = document.getElementById('slider-container');
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
      setScrollPos(container.scrollLeft - 200);
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('slider-container');
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
      setScrollPos(container.scrollLeft + 200);
    }
  };

  return (
    <div className="bg-white border-b border-[#E5E5E5] sticky top-24 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-6">
          {/* Botó esquerra */}
          <button
            onClick={scrollLeft}
            className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors text-[#666666] hover:text-black"
            aria-label="Anterior dècada"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slider */}
          <div
            id="slider-container"
            className="flex-1 overflow-x-auto flex gap-3 px-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {decadasDisponibles.map((decada) => (
              <button
                key={decada}
                onClick={() => onSelectDecada(decada)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  decadaActiva === decada
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-[#E5E5E5] hover:border-black'
                }`}
              >
                {decada}s
              </button>
            ))}
          </div>

          {/* Botó dreta */}
          <button
            onClick={scrollRight}
            className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors text-[#666666] hover:text-black"
            aria-label="Següent dècada"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
