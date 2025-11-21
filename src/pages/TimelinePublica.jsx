import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, ArrowLeft } from 'lucide-react';
import SliderDecades from '../components/timeline/SliderDecades';
import LlistaDocumentsDecada from '../components/timeline/LlistaDocumentsDecada';
import ModalDetall from '../components/timeline/ModalDetall';
import Filtres from '../components/shared/Filtres';
import { getDocuments } from '../services/api';

export default function TimelinePublica() {
  const { decade } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [decadaActiva, setDecadaActiva] = useState(parseInt(decade) || 2020);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFiltres, setShowFiltres] = useState(false);

  // Filtres
  const [selectedTipus, setSelectedTipus] = useState(['foto', 'video', 'document']);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Carregar documents al montar
  useEffect(() => {
    cargarDocuments();
  }, []);

  const cargarDocuments = async () => {
    try {
      const data = await getDocuments();
      // Només mostrar documents públics
      const publicDocuments = (data.documents || []).filter((d) => d.public !== false);
      setDocuments(publicDocuments);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error carregant documents:', error);
    }
  };

  // Obtenir dècades disponibles
  const decadasDisponibles = useMemo(() => {
    const anys = documents.map((d) => {
      const decada = Math.floor(d.any / 10) * 10;
      return decada;
    });
    return [...new Set(anys)].sort((a, b) => a - b);
  }, [documents]);

  // Filtrar documents per dècada i filtres actius
  const documentsFiltrats = useMemo(() => {
    const decadaStart = decadaActiva;
    const decadaEnd = decadaActiva + 9;

    return documents.filter((doc) => {
      // Filtrar per dècada
      if (doc.any < decadaStart || doc.any > decadaEnd) return false;

      // Filtrar per tipus
      if (!selectedTipus.includes(doc.tipus)) return false;

      // Filtrar per categories
      if (selectedCategories.length > 0) {
        const hasSelectedCategory = doc.categories.some((cat) =>
          selectedCategories.includes(cat)
        );
        if (!hasSelectedCategory) return false;
      }

      return true;
    });
  }, [documents, decadaActiva, selectedTipus, selectedCategories]);

  const handleTipusChange = (tipus) => {
    setSelectedTipus((prev) =>
      prev.includes(tipus) ? prev.filter((t) => t !== tipus) : [...prev, tipus]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFiltres = () => {
    setSelectedTipus(['foto', 'video', 'document']);
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-white p-8 md:p-12" style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Slider de dècades */}
      {decadasDisponibles.length > 0 && (
        <SliderDecades
          decadasDisponibles={decadasDisponibles}
          decadaActiva={decadaActiva}
          onSelectDecada={setDecadaActiva}
        />
      )}

      {/* Capçalera amb filtres */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#666666] hover:text-black transition-colors mb-8 font-medium"
            >
              <ArrowLeft size={20} />
              Tornar a l'inici
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                Dècada dels {decadaActiva}s
              </h1>
              <p className="text-base text-[#666666]">
                {documentsFiltrats.length} document{documentsFiltrats.length !== 1 ? 's' : ''} trobat
                {documentsFiltrats.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Botó filtres */}
            <button
              onClick={() => setShowFiltres(!showFiltres)}
              className="flex items-center gap-2 px-6 py-3 border border-[#CCCCCC] text-[#666666] rounded-lg hover:border-black hover:text-black transition-colors font-medium"
            >
              <Filter size={20} />
              Filtres
            </button>
          </div>
        </div>
      </div>

      {/* Contingut principal */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sidebar Filtres (Desktop) */}
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-40">
              <Filtres
                isOpen={true}
                onClose={() => {}}
                categories={categories}
                selectedTipus={selectedTipus}
                selectedCategories={selectedCategories}
                onTipusChange={handleTipusChange}
                onCategoryChange={handleCategoryChange}
                onClear={handleClearFiltres}
                resultCount={documentsFiltrats.length}
              />
            </div>
          </aside>

          {/* Llista documents */}
          <main className="md:col-span-3">
            <LlistaDocumentsDecada
              documents={documentsFiltrats}
              onSelectDocument={(doc) => {
                setSelectedDocument(doc);
                setShowModal(true);
              }}
            />
          </main>
        </div>
      </div>

      {/* Modal Filtres (Mobile) */}
      {showFiltres && (
        <div className="md:hidden">
          <Filtres
            isOpen={showFiltres}
            onClose={() => setShowFiltres(false)}
            categories={categories}
            selectedTipus={selectedTipus}
            selectedCategories={selectedCategories}
            onTipusChange={handleTipusChange}
            onCategoryChange={handleCategoryChange}
            onClear={handleClearFiltres}
            resultCount={documentsFiltrats.length}
          />
        </div>
      )}

      {/* Modal Detall */}
      <ModalDetall
        document={selectedDocument}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
