# Arxiu Històric de l'Escola (1960-Actualitat)

Projecte React per gestionar i visualitzar l'arxiu històric de l'escola Joviat.

## Estructura del Projecte

```
arxiu-historic-escola/
├── public/
│   └── assets/
│       ├── fotos/          # Imatges històriques
│       ├── videos/         # Vídeos històrics
│       └── documents/      # Documents PDF, etc.
├── src/
│   ├── components/
│   │   ├── DocumentCard.jsx          # Targeta per mostrar documents
│   │   ├── GestorInventari.jsx       # Vista privada de gestió
│   │   └── TimelinePublica.jsx       # Vista pública cronològica
│   ├── data/
│   │   └── inventari.json            # Base de dades de metadades
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Instal·lació i Ús

### 1. Iniciar el projecte (Frontend + Backend)

**Opció A: Utilitzant el fitxer .bat**
```bash
# Fes doble clic a:
INICIAR_PROJECTE.bat
```

**Opció B: Manualment**
```bash
cd C:\Projecte_Repositori_Joviat\arxiu-historic-escola
npm start
```

Aquest comando iniciarà:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5176 (o un port disponible)

### 2. Build per producció

```bash
npm run build
```

Els fitxers de producció es generaran a la carpeta `dist/`

## Funcionalitats

### Timeline Pública (/)

- Visualització cronològica dels documents marcats com a públics
- Filtres per tipus de document (foto, vídeo, document)
- Filtres per categories
- Previsualització de continguts
- Disseny responsiu amb Tailwind CSS

### Gestor d'Inventari (/gestor)

- Afegir nous documents amb metadades completes
- Editar documents existents
- Eliminar documents
- Marcar documents com a públics o privats
- Gestió dinàmica de categories
- Selecció de fitxers locals

## Metadades dels Documents

Cada document conté la següent informació:

- **id**: Identificador únic
- **tipus**: foto | video | document
- **any**: Any del document (1960-actualitat)
- **mes**: Mes (opcional, 1-12)
- **dia**: Dia (opcional, 1-31)
- **titol**: Títol descriptiu
- **descripcio**: Descripció detallada
- **autor**: Autor o font (opcional)
- **categories**: Array de categories
- **fitxer**: Ruta al fitxer a /public/assets/
- **public**: true/false (visible a la timeline pública)

## Persistència de Dades

Les dades es guarden automàticament a:
- **Metadades**: `src/data/inventari.json` (al servidor)
- **Fitxers**: `public/assets/[fotos|videos|documents]/` (al servidor)

Això significa:
- Les dades són compartides entre tots els usuaris
- Els fitxers es pugen automàticament al servidor
- Les dades persisteixen fins i tot si tanques el navegador

## Notes Importants

### Gestió de Fitxers (Automàtica) ✅

Ara el sistema gestiona automàticament la pujada de fitxers:

1. **Des del Gestor d'Inventari**:
   - Clica "Afegir document"
   - Selecciona un fitxer del teu ordinador
   - Omple les metadades (títol, descripció, any, etc.)
   - Clica "Afegir document"

2. **Procés automàtic**:
   - El fitxer es copia automàticament a `public/assets/[tipus]/`
   - Les metadades es guarden a `src/data/inventari.json`
   - El nom del fitxer es neteja (sense espais ni accents)
   - S'afegeix un timestamp per evitar duplicats

## Tecnologies Utilitzades

### Frontend
- **React 19** - Framework principal
- **Vite** - Build tool i servidor de desenvolupament
- **React Router** - Navegació entre pàgines
- **Tailwind CSS** - Estils i disseny responsiu

### Backend
- **Node.js + Express** - Servidor API REST
- **Multer** - Gestió de pujada de fitxers
- **CORS** - Comunicació frontend-backend
- **JSON** - Emmagatzematge de metadades

## Properes Millores Possibles

1. ✅ ~~Implementar un backend~~ (IMPLEMENTAT)
2. ✅ ~~Pujada real de fitxers~~ (IMPLEMENTAT)
3. Base de dades real (MySQL, PostgreSQL, MongoDB)
4. Sistema d'autenticació per al gestor
5. Cerca avançada de documents (text complet)
6. Exportar inventari a PDF o Excel
7. Sistema de còpies de seguretat
8. Integració amb xarxes socials
9. Comentaris i valoracions
10. Estadístiques d'ús
11. Miniatures automàtiques per a imatges
12. Reproductor de vídeo integrat

## Suport

Per qualsevol dubte o problema, revisa aquest document o consulta la documentació oficial de React i Vite.
