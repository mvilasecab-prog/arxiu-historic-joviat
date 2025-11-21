import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDocuments } from '../services/api';

const useHover = () => {
  const [isHovered, setIsHovered] = useState(null);
  return { isHovered, setIsHovered };
};

export default function Portada() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const { isHovered, setIsHovered } = useHover();

  // Carregar documents per saber quines dècades mostrar
  useEffect(() => {
    const cargarDocuments = async () => {
      try {
        const data = await getDocuments();
        const publicDocs = (data.documents || []).filter((d) => d.public !== false);
        setDocuments(publicDocs);
      } catch (error) {
        console.error('Error carregant documents:', error);
      }
    };
    cargarDocuments();
  }, []);

  // Obtenir TOTES les dècades de 1960 a 2020
  const todasDecadas = [1960, 1970, 1980, 1990, 2000, 2010, 2020];

  // Contar documents per dècada
  const contarDocumentsDecada = (decada) => {
    const decadaEnd = decada + 9;
    return documents.filter((d) => d.any >= decada && d.any <= decadaEnd).length;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -4,
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className="min-h-screen bg-white p-8 md:p-12" style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32 text-center">
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-6xl font-bold text-black mb-4"
        >
          Arxiu Històric Joviat
        </motion.h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl text-[#666666] font-medium mb-2"
        >
          1960-2024
        </motion.p>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-[#666666] mb-16"
        >
          65 anys impulsant carreres professionals
        </motion.p>

        {/* Grid de Dècades */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-5 gap-6"
        >
          {todasDecadas.map((decada) => {
            const count = contarDocumentsDecada(decada);
            const cardIsHovered = isHovered === decada;
            return (
              <motion.button
                key={decada}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => navigate(`/decada/${decada}`)}
                onMouseEnter={() => setIsHovered(decada)}
                onMouseLeave={() => setIsHovered(null)}
                style={{
                  height: '200px',
                  backgroundColor: cardIsHovered ? 'black' : 'white',
                  border: cardIsHovered ? '2px solid white' : '2px solid #E5E5E5',
                  borderRadius: '12px',
                  padding: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: cardIsHovered ? '0 12px 24px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
                  transform: cardIsHovered ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: cardIsHovered ? 'white' : 'black',
                  transition: 'all 0.3s ease'
                }}>
                  {decada}s
                </div>
                <div style={{
                  fontSize: '14px',
                  color: cardIsHovered ? '#CCCCCC' : '#666666',
                  transition: 'color 0.3s ease'
                }}>
                  {count} document{count !== 1 ? 's' : ''}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[#666666] mb-8">
            ¿Vols afegir documents a l'arxiu?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/gestor')}
            className="px-8 py-4 bg-black text-white rounded-lg font-medium text-lg hover:bg-[#333333] transition-colors"
          >
            Accedir al Gestor d'Inventari
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
