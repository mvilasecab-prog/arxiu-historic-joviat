const API_URL = 'http://localhost:3000/api';

// Obtenir tots els documents
export async function getAllDocuments() {
  try {
    const response = await fetch(`${API_URL}/documents`);
    if (!response.ok) throw new Error('Error obtenint documents');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Alias de getAllDocuments per compatibilitat
export async function getDocuments() {
  return getAllDocuments();
}

// Crear nou document amb fitxer
export async function createDocument(formData) {
  try {
    const response = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      body: formData, // FormData amb fitxer i metadades
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error creant document');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Alias de createDocument per compatibilitat amb el codi
export async function addDocument(formData) {
  return createDocument(formData);
}

// Actualitzar document existent
export async function updateDocument(id, formData) {
  try {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'PUT',
      body: formData, // FormData amb fitxer i metadades
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error actualitzant document');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Eliminar document
export async function deleteDocument(id) {
  try {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error eliminant document');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Afegir nova categoria
export async function addCategory(category) {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error afegint categoria');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
