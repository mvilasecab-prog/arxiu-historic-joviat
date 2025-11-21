import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist folder (built frontend)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Configuració de multer per gestionar pujada de fitxers
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Determinar carpeta segons el tipus MIME del fitxer
    let folder = 'documents';

    if (file.mimetype.startsWith('image/')) {
      folder = 'fotos';
    } else if (file.mimetype.startsWith('video/')) {
      folder = 'videos';
    }

    const uploadPath = path.join(__dirname, '..', 'public', 'assets', folder);

    // Crear carpeta si no existeix
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      console.log(`📁 Carpeta de destinació: ${uploadPath}`);
    } catch (error) {
      console.error('❌ Error creant carpeta:', error);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Netejar nom del fitxer (eliminar espais, caràcters especials)
    const cleanName = file.originalname
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar accents
      .replace(/[^a-z0-9.-]/g, '-'); // Substituir caràcters especials per -

    const uniqueSuffix = Date.now();
    const extension = path.extname(cleanName);
    const baseName = path.basename(cleanName, extension);

    const finalName = `${baseName}-${uniqueSuffix}${extension}`;
    console.log(`📄 Nom del fitxer: ${finalName}`);

    cb(null, finalName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB màxim
});

// Ruta al fitxer de dades
const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'inventari.json');

// Funcions auxiliars per llegir/escriure dades
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error llegint dades:', error);
    return { documents: [], categories: [] };
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error escrivint dades:', error);
    return false;
  }
}

// ENDPOINTS API

// GET /api/documents - Obtenir tots els documents
app.get('/api/documents', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error obtenint documents' });
  }
});

// POST /api/documents - Crear nou document amb fitxer
app.post('/api/documents', upload.single('fitxer'), async (req, res) => {
  console.log('📨 Nova petició POST rebuda');
  console.log('📝 Body:', req.body);
  console.log('📎 Fitxer:', req.file);

  try {
    const data = await readData();

    // Generar nou ID
    const newId = data.documents.length > 0
      ? Math.max(...data.documents.map(d => d.id)) + 1
      : 1;

    // Construir ruta del fitxer
    let filePath = '';
    if (req.file) {
      // Determinar carpeta segons tipus MIME
      let folder = 'documents';
      if (req.file.mimetype.startsWith('image/')) {
        folder = 'fotos';
      } else if (req.file.mimetype.startsWith('video/')) {
        folder = 'videos';
      }

      filePath = `/assets/${folder}/${req.file.filename}`;
      console.log(`✅ Fitxer guardat a: ${filePath}`);
    } else {
      console.log('⚠️ No s\'ha rebut cap fitxer');
    }

    // Crear nou document
    const newDocument = {
      id: newId,
      tipus: req.body.tipus || 'document',
      any: parseInt(req.body.any) || new Date().getFullYear(),
      mes: req.body.mes ? parseInt(req.body.mes) : null,
      dia: req.body.dia ? parseInt(req.body.dia) : null,
      titol: req.body.titol || '',
      descripcio: req.body.descripcio || '',
      autor: req.body.autor || '',
      categories: req.body.categories ? JSON.parse(req.body.categories) : [],
      fitxer: filePath,
      public: req.body.public === 'true' || req.body.public === true,
    };

    data.documents.push(newDocument);

    const success = await writeData(data);

    if (success) {
      res.json({ success: true, document: newDocument });
    } else {
      res.status(500).json({ error: 'Error desant document' });
    }
  } catch (error) {
    console.error('Error creant document:', error);
    res.status(500).json({ error: 'Error creant document', details: error.message });
  }
});

// PUT /api/documents/:id - Actualitzar document
app.put('/api/documents/:id', upload.single('fitxer'), async (req, res) => {
  try {
    const data = await readData();
    const documentId = parseInt(req.params.id);

    const index = data.documents.findIndex(d => d.id === documentId);

    if (index === -1) {
      return res.status(404).json({ error: 'Document no trobat' });
    }

    // Si hi ha nou fitxer, actualitzar ruta
    let filePath = data.documents[index].fitxer;
    if (req.file) {
      const tipus = req.body.tipus || data.documents[index].tipus;
      let folder = 'documents';
      if (tipus === 'foto') folder = 'fotos';
      else if (tipus === 'video') folder = 'videos';

      filePath = `/assets/${folder}/${req.file.filename}`;

      // Opcional: eliminar fitxer anterior
      // (comentat per seguretat, es pot activar si cal)
      // const oldFilePath = path.join(__dirname, '..', 'public', data.documents[index].fitxer);
      // await fs.unlink(oldFilePath).catch(() => {});
    }

    // Actualitzar document
    data.documents[index] = {
      ...data.documents[index],
      tipus: req.body.tipus || data.documents[index].tipus,
      any: req.body.any ? parseInt(req.body.any) : data.documents[index].any,
      mes: req.body.mes ? parseInt(req.body.mes) : data.documents[index].mes,
      dia: req.body.dia ? parseInt(req.body.dia) : data.documents[index].dia,
      titol: req.body.titol || data.documents[index].titol,
      descripcio: req.body.descripcio || data.documents[index].descripcio,
      autor: req.body.autor || data.documents[index].autor,
      categories: req.body.categories ? JSON.parse(req.body.categories) : data.documents[index].categories,
      fitxer: filePath,
      public: req.body.public !== undefined ? (req.body.public === 'true' || req.body.public === true) : data.documents[index].public,
    };

    const success = await writeData(data);

    if (success) {
      res.json({ success: true, document: data.documents[index] });
    } else {
      res.status(500).json({ error: 'Error actualitzant document' });
    }
  } catch (error) {
    console.error('Error actualitzant document:', error);
    res.status(500).json({ error: 'Error actualitzant document', details: error.message });
  }
});

// DELETE /api/documents/:id - Eliminar document
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const data = await readData();
    const documentId = parseInt(req.params.id);

    const index = data.documents.findIndex(d => d.id === documentId);

    if (index === -1) {
      return res.status(404).json({ error: 'Document no trobat' });
    }

    // Opcional: eliminar fitxer físic
    // const filePath = path.join(__dirname, '..', 'public', data.documents[index].fitxer);
    // await fs.unlink(filePath).catch(() => {});

    data.documents.splice(index, 1);

    const success = await writeData(data);

    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Error eliminant document' });
    }
  } catch (error) {
    console.error('Error eliminant document:', error);
    res.status(500).json({ error: 'Error eliminant document' });
  }
});

// POST /api/categories - Afegir nova categoria
app.post('/api/categories', async (req, res) => {
  try {
    const data = await readData();
    const { category } = req.body;

    if (!category || data.categories.includes(category)) {
      return res.status(400).json({ error: 'Categoria invàlida o ja existent' });
    }

    data.categories.push(category);
    const success = await writeData(data);

    if (success) {
      res.json({ success: true, categories: data.categories });
    } else {
      res.status(500).json({ error: 'Error afegint categoria' });
    }
  } catch (error) {
    console.error('Error afegint categoria:', error);
    res.status(500).json({ error: 'Error afegint categoria' });
  }
});

// Catch-all route for React Router (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend funcionant a http://localhost:${PORT}`);
  console.log(`📁 Fitxers es guardaran a: public/assets/`);
  console.log(`💾 Dades es guardaran a: src/data/inventari.json`);
});
