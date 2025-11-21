import { useState, useEffect } from 'react';
import FormulariDocument from '../components/gestor/FormulariDocument';
import LlistaDocuments from '../components/gestor/LlistaDocuments';
import PasswordProtection from '../components/gestor/PasswordProtection';
import { getDocuments, addDocument, deleteDocument, updateDocument } from '../services/api';

export default function GestorInventari() {
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('gestorAuthenticated') === 'true'
  );

  // Carregar documents al montar
  useEffect(() => {
    cargarDocuments();
  }, []);

  const cargarDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data.documents || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error carregant documents:', error);
    }
  };

  const handleAfegirDocument = async (formData) => {
    setCargando(true);
    try {
      const response = await addDocument(formData);
      setDocuments([response, ...documents]);
      cargarDocuments(); // Recarregar per asegurar sincronització
    } catch (error) {
      throw new Error(error.message || 'Error al afegir document');
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments(documents.filter((d) => d.id !== id));
    } catch (error) {
      alert('Error eliminant document: ' + error.message);
    }
  };

  const handleEditar = (document) => {
    // Per ara, mostrem un missatge. La funcionalitat completa d'edició es pot afegir més tard
    alert('Funcionalitat d\'edició en desenvolupament');
    setEditMode(document.id);
  };

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-8 md:px-16 py-20 p-8 md:p-12" style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '40px', paddingBottom: '40px' }}>
      {/* Sección del formulario */}
      <section className="mb-24">
        <FormulariDocument
          categories={categories}
          onAfegirDocument={handleAfegirDocument}
          cargando={cargando}
        />
      </section>

      {/* Sección de la lista */}
      <section>
        <LlistaDocuments
          documents={documents}
          onEliminar={handleEliminar}
          onEditar={handleEditar}
        />
      </section>
    </div>
  );
}
