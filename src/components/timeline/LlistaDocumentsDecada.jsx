import { Image, Video, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LlistaDocumentsDecada({ documents, onSelectDocument }) {
  // Ordenar per any (més recent primer)
  const documentsOrdrats = [...documents].sort((a, b) => b.any - a.any);

  const getTipusIcon = (tipus) => {
    switch (tipus) {
      case 'foto':
        return <Image size={16} />;
      case 'video':
        return <Video size={16} />;
      case 'document':
        return <FileText size={16} />;
      default:
        return null;
    }
  };

  const getThumbnail = (document) => {
    if (document.tipus === 'foto' && document.fitxer) {
      return document.fitxer;
    } else if (document.tipus === 'video') {
      return null; // Video no té thumbnail
    } else if (document.tipus === 'document') {
      return null; // Document no té thumbnail
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {documentsOrdrats.length > 0 ? (
        documentsOrdrats.map((doc, idx) => {
          const thumbnail = getThumbnail(doc);
          return (
            <motion.button
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectDocument(doc)}
              className="w-full p-6 border border-[#E5E5E5] rounded-lg hover:border-black hover:shadow-md transition-all bg-white text-left mb-6"
            >
              <div className="flex gap-6">
                {/* Thumbnail - 200x200px FIXA */}
                {thumbnail ? (
                  <div className="flex-shrink-0 w-[200px] h-[200px] bg-[#F5F5F5] rounded-lg overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={doc.titol}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-[200px] h-[200px] bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#CCCCCC]">
                    {doc.tipus === 'video' && <Video size={56} />}
                    {doc.tipus === 'document' && <FileText size={56} />}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-black text-xl mb-3 line-clamp-2">
                        {doc.titol}
                      </h3>
                      {doc.descripcio && (
                        <p className="text-base text-[#666666] line-clamp-2 mb-3">
                          {doc.descripcio}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-3xl font-bold text-black">{doc.any}</p>
                      {doc.mes && (
                        <p className="text-sm text-[#666666]">
                          {new Date(doc.any, doc.mes - 1).toLocaleDateString('ca-ES', {
                            month: 'short',
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer amb tipus i categories */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E5E5]">
                    <div className="flex items-center gap-2 text-[#666666]">
                      {getTipusIcon(doc.tipus)}
                      <span className="text-sm capitalize font-medium">{doc.tipus}</span>
                    </div>
                    {doc.categories && doc.categories.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {doc.categories.slice(0, 2).map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-sm bg-[#F5F5F5] text-[#666666] px-3 py-1 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                        {doc.categories.length > 2 && (
                          <span className="text-sm text-[#999999]">
                            +{doc.categories.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })
      ) : (
        <div className="text-center py-12">
          <p className="text-[#666666]">Cap document en aquesta dècada amb els filtres aplicats</p>
        </div>
      )}
    </div>
  );
}
