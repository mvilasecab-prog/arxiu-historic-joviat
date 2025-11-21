import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Filtres({
  isOpen,
  onClose,
  categories,
  selectedTipus,
  selectedCategories,
  onTipusChange,
  onCategoryChange,
  onClear,
  resultCount,
}) {
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
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />

          {/* Sidebar Filtres */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed left-0 top-24 bottom-0 w-80 bg-white border-r border-[#E5E5E5] z-50 overflow-y-auto md:relative md:sticky md:h-auto md:w-auto md:top-32 md:border-b md:border-r-0"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h3 className="text-lg font-bold text-black">Filtres</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tipus */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-black mb-3">Tipus de document</h4>
                <div className="space-y-2">
                  {['foto', 'video', 'document'].map((tipus) => (
                    <label key={tipus} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTipus.includes(tipus)}
                        onChange={() => onTipusChange(tipus)}
                        className="w-4 h-4 rounded border-[#CCCCCC] cursor-pointer"
                      />
                      <span className="text-sm text-[#666666] capitalize">{tipus}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-black mb-3">Categories</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => onCategoryChange(cat)}
                        className="w-4 h-4 rounded border-[#CCCCCC] cursor-pointer"
                      />
                      <span className="text-sm text-[#666666]">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Comptador */}
              <div className="mb-6 p-4 bg-[#F5F5F5] rounded-lg text-center">
                <p className="text-sm text-[#666666]">
                  {resultCount} document{resultCount !== 1 ? 's' : ''} trobat{resultCount !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Botons */}
              <div className="flex gap-3">
                <button
                  onClick={onClear}
                  className="flex-1 px-4 py-2 bg-white border border-black text-black rounded-lg hover:bg-[#F5F5F5] transition-colors text-sm font-medium"
                >
                  Netejar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#333333] transition-colors text-sm font-medium"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
