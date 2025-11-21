import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModalDetall({ document, isOpen, onClose }) {
  if (!document || !isOpen) return null;

  const formatarData = (any, mes, dia) => {
    if (!any) return '';
    if (!mes) return any.toString();
    const date = new Date(any, mes - 1, dia || 1);
    return date.toLocaleDateString('ca-ES', {
      year: 'numeric',
      month: 'long',
      day: dia ? 'numeric' : undefined,
    });
  };

  const getTipusEmoji = (tipus) => {
    switch (tipus) {
      case 'foto':
        return '📷';
      case 'video':
        return '🎬';
      case 'document':
        return '📄';
      default:
        return '📎';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 overflow-y-auto max-h-screen md:max-h-[90vh]"
          >
            {/* Botó Tancar */}
            <button
              onClick={onClose}
              className="sticky top-0 right-0 p-4 hover:bg-[#F5F5F5] rounded-full transition-colors text-[#666666] hover:text-black float-right"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              {/* Tipus + Any */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{getTipusEmoji(document.tipus)}</span>
                <div>
                  <p className="text-sm text-[#666666]">
                    {document.tipus.charAt(0).toUpperCase() + document.tipus.slice(1)}
                  </p>
                  <p className="text-2xl font-bold text-black">{document.any}</p>
                </div>
              </div>

              {/* Títol */}
              <h2 className="text-3xl font-bold text-black mb-2">{document.titol}</h2>

              {/* Data Completa */}
              {document.any && (
                <p className="text-[#666666] mb-6">{formatarData(document.any, document.mes, document.dia)}</p>
              )}

              {/* Preview */}
              {document.fitxer && (
                <div className="mb-8 border border-[#E5E5E5] rounded-lg overflow-hidden bg-[#F5F5F5] min-h-[200px] flex items-center justify-center">
                  {document.tipus === 'foto' && (
                    <img
                      src={document.fitxer}
                      alt={document.titol}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {document.tipus === 'video' && (
                    <video
                      controls
                      className="w-full h-full object-cover"
                      style={{ maxHeight: '400px' }}
                    >
                      <source src={document.fitxer} />
                      El teu navegador no suporta vídeo.
                    </video>
                  )}
                  {document.tipus === 'document' && (
                    <div className="text-center p-8">
                      <p className="text-5xl mb-4">📄</p>
                      <p className="text-[#666666] mb-4">Document PDF</p>
                      <a
                        href={document.fitxer}
                        download
                        className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-[#333333] transition-colors"
                      >
                        Descarregar
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Descripció */}
              {document.descripcio && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-black mb-2">Descripció</h3>
                  <p className="text-[#666666] leading-relaxed whitespace-pre-wrap">
                    {document.descripcio}
                  </p>
                </div>
              )}

              {/* Autor */}
              {document.autor && (
                <div className="mb-8 p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-sm text-[#666666]">Autor / Font</p>
                  <p className="font-medium text-black">{document.autor}</p>
                </div>
              )}

              {/* Categories */}
              {document.categories && document.categories.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-black mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-xs text-[#CCCCCC] pt-8 border-t border-[#E5E5E5]">
                <p>ID: {document.id}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
