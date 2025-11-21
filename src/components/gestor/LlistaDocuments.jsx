import { useState, useMemo } from 'react';
import { Search, Edit2, Trash2, Image, Video, FileText, Eye, EyeOff } from 'lucide-react';

export default function LlistaDocuments({ documents, onEliminar, onEditar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipus, setFilterTipus] = useState('tots');
  const [filterYear, setFilterYear] = useState('tots');

  // Lògica de filtratge
  const documentsFiltrats = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch = doc.titol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTipus = filterTipus === 'tots' || doc.tipus === filterTipus;
      const matchYear = filterYear === 'tots' || doc.any === parseInt(filterYear);
      return matchSearch && matchTipus && matchYear;
    });
  }, [documents, searchTerm, filterTipus, filterYear]);

  // Anys únics per al dropdown
  const anys = useMemo(() => {
    return [...new Set(documents.map((d) => d.any))].sort((a, b) => b - a);
  }, [documents]);

  // Icones per tipus
  const getTipusIcon = (tipus) => {
    switch (tipus) {
      case 'foto':
        return <Image size={18} />;
      case 'video':
        return <Video size={18} />;
      case 'document':
        return <FileText size={18} />;
      default:
        return null;
    }
  };

  const handleEliminar = (id) => {
    if (window.confirm('Estàs segur que vols eliminar aquest document?')) {
      onEliminar(id);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8" style={{ border: 'none' }}>
      <h2 className="text-2xl font-bold mb-8 text-black">Documents Guardats</h2>

      {/* Barra de cerca i filtres */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3 items-end">
          {/* Cerca */}
          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-[#666666] mb-2">Cercar per títol</label>
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-[#666666]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Escriu un títol..."
                className="w-full pl-10 px-4 py-2 border border-[#CCCCCC] rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Filter Tipus */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#666666] mb-2">Tipus</label>
            <select
              value={filterTipus}
              onChange={(e) => setFilterTipus(e.target.value)}
              className="w-full px-4 py-2 border border-[#CCCCCC] rounded-lg focus:outline-none focus:border-black"
            >
              <option value="tots">Tots</option>
              <option value="foto">Fotos</option>
              <option value="video">Vídeos</option>
              <option value="document">Documents</option>
            </select>
          </div>

          {/* Filter Any */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#666666] mb-2">Any</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-4 py-2 border border-[#CCCCCC] rounded-lg focus:outline-none focus:border-black"
            >
              <option value="tots">Tots</option>
              {anys.map((any) => (
                <option key={any} value={any}>
                  {any}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comptador */}
        <div className="text-sm text-[#666666]">
          {documentsFiltrats.length} de {documents.length} document{documents.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Taula */}
      {documentsFiltrats.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
              <tr className="text-left text-sm font-medium text-[#666666]">
                <th className="px-4 py-3">Tipus</th>
                <th className="px-4 py-3">Títol</th>
                <th className="px-4 py-3">Any</th>
                <th className="px-4 py-3">Públic</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Accions</th>
              </tr>
            </thead>
            <tbody>
              {documentsFiltrats.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-[#666666]">
                      {getTipusIcon(doc.tipus)}
                      <span className="text-sm capitalize">{doc.tipus}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-black">{doc.titol}</p>
                    {doc.descripcio && (
                      <p className="text-sm text-[#666666] truncate">{doc.descripcio}</p>
                    )}
                  </td>
                  <td className="px-4 py-4 font-medium text-black">{doc.any}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      {doc.public ? (
                        <>
                          <Eye size={18} className="text-green-600" />
                          <span className="text-sm text-green-600">Sí</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={18} className="text-[#CCCCCC]" />
                          <span className="text-sm text-[#CCCCCC]">No</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {doc.categories && doc.categories.slice(0, 2).map((cat, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-[#F5F5F5] text-[#666666] text-xs px-2 py-1 rounded"
                        >
                          {cat}
                        </span>
                      ))}
                      {doc.categories && doc.categories.length > 2 && (
                        <span className="inline-block text-xs text-[#999999]">
                          +{doc.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEditar(doc)}
                        className="p-2 hover:bg-[#E5E5E5] rounded-lg transition-colors text-[#666666] hover:text-black"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleEliminar(doc.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-[#CCCCCC] hover:text-red-600"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#666666]">Cap document trobat</p>
        </div>
      )}
    </div>
  );
}
