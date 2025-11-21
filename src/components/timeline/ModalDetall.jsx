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
          {/* DEBUG: Visual guides for centering */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '100vh',
              backgroundColor: 'red',
              zIndex: 100,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: 'red',
              zIndex: 100,
              opacity: 0.5,
            }}
          />
          {/* END DEBUG */}

          {/* Overlay - darker for better viewing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          />

          {/* Modal - Centered on viewport with page margins */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(calc(-50% + 60px), calc(-50% + 40px))',
              width: 'calc(100% - 120px)',
              height: 'calc(100% - 80px)',
              maxWidth: '1200px',
              maxHeight: '90vh',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              zIndex: 50,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px', position: 'relative' }}>
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '24px',
                  cursor: 'pointer',
                  zIndex: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.9)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                }}
              >
                ✕
              </button>

              {/* Preview - Large image takes priority */}
              {document.fitxer && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    minHeight: '0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#F5F5F5',
                  }}
                >
                  {document.tipus === 'foto' && (
                    <img
                      src={document.fitxer}
                      alt={document.titol}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                  {document.tipus === 'video' && (
                    <video
                      controls
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    >
                      <source src={document.fitxer} />
                      El teu navegador no suporta vídeo.
                    </video>
                  )}
                  {document.tipus === 'document' && (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <p style={{ fontSize: '80px', marginBottom: '20px' }}>📄</p>
                      <p style={{ color: '#666666', marginBottom: '20px', fontSize: '18px' }}>
                        Document PDF
                      </p>
                      <a
                        href={document.fitxer}
                        download
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          backgroundColor: 'black',
                          color: 'white',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#333333';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'black';
                        }}
                      >
                        Descarregar
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Info Section - Below image */}
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {/* Tipus + Any */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>{getTipusEmoji(document.tipus)}</span>
                  <div>
                    <p style={{ fontSize: '14px', color: '#666666' }}>
                      {document.tipus.charAt(0).toUpperCase() + document.tipus.slice(1)}
                    </p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
                      {document.any}
                    </p>
                  </div>
                </div>

                {/* Títol */}
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginBottom: '8px' }}>
                  {document.titol}
                </h2>

                {/* Data Completa */}
                {document.any && (
                  <p style={{ color: '#666666', marginBottom: '16px' }}>
                    {formatarData(document.any, document.mes, document.dia)}
                  </p>
                )}

                {/* Descripció */}
                {document.descripcio && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', color: 'black', marginBottom: '8px' }}>
                      Descripció
                    </h3>
                    <p style={{ color: '#666666', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {document.descripcio}
                    </p>
                  </div>
                )}

                {/* Autor */}
                {document.autor && (
                  <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#F5F5F5', borderRadius: '8px' }}>
                    <p style={{ fontSize: '12px', color: '#666666' }}>Autor / Font</p>
                    <p style={{ fontWeight: '500', color: 'black' }}>{document.autor}</p>
                  </div>
                )}

                {/* Categories */}
                {document.categories && document.categories.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '500', color: 'black', marginBottom: '12px' }}>
                      Categories
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {document.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: 'inline-block',
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div style={{ fontSize: '12px', color: '#CCCCCC', paddingTop: '16px', borderTop: '1px solid #E5E5E5' }}>
                  <p>ID: {document.id}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
