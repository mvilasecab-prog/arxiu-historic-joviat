import { useState } from 'react';
import { Upload, X, Check, AlertCircle, Music } from 'lucide-react';

export default function FormulariDocument({ categories, onAfegirDocument, cargando }) {
  const [formData, setFormData] = useState({
    tipus: 'foto',
    any: new Date().getFullYear(),
    mes: null,
    dia: null,
    titol: '',
    descripcio: '',
    autor: '',
    categories: [],
    fitxer: null,
    public: true,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [hoverType, setHoverType] = useState(null);

  // Validació
  const validar = () => {
    const newErrors = {};
    if (!formData.titol.trim()) newErrors.titol = 'El títol és obligatori';
    if (!formData.any) newErrors.any = 'L\'any és obligatori';
    if (!formData.fitxer) newErrors.fitxer = 'Selecciona un fitxer';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'categories') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key !== 'fitxer') {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (formData.fitxer) {
      formDataToSend.append('fitxer', formData.fitxer);
    }

    try {
      await onAfegirDocument(formDataToSend);
      setSuccess('Document afegit correctament! ✅');
      setFormData({
        tipus: 'foto',
        any: new Date().getFullYear(),
        mes: null,
        dia: null,
        titol: '',
        descripcio: '',
        autor: '',
        categories: [],
        fitxer: null,
        public: true,
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.categories.includes(tagInput)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, tagInput],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((t) => t !== tag),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-12 max-w-2xl mx-auto" style={{ border: 'none' }}>
      <h2 className="text-3xl font-bold mb-12 text-black">Afegir Nou Document</h2>

      {/* Missatges */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
          <Check size={20} />
          {success}
        </div>
      )}
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          {errors.submit}
        </div>
      )}

      {/* Selector de Tipus */}
      <div className="mb-20">
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '16px', fontFamily: '"Hanken Grotesk", sans-serif' }}>
          Tipus de document <span style={{ color: '#ff0000' }}>*</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {['foto', 'video', 'document', 'audio'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, tipus: type })}
              onMouseEnter={() => setHoverType(type)}
              onMouseLeave={() => setHoverType(null)}
              style={{
                padding: '24px',
                borderRadius: '12px',
                border: formData.tipus === type ? '3px solid black' : '2px solid #E5E5E5',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                height: '136px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: formData.tipus === type ? 'black' : hoverType === type ? '#F5F5F5' : 'white',
                color: formData.tipus === type ? 'white' : 'black',
                cursor: 'pointer',
                boxShadow: hoverType === type ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
                transform: hoverType === type ? 'translateY(-4px)' : 'translateY(0)',
                fontSize: '48px'
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                {type === 'foto' && '📷'}
                {type === 'video' && '🎬'}
                {type === 'document' && '📄'}
                {type === 'audio' && '🎵'}
              </div>
              <div style={{ fontWeight: '500', fontSize: '14px', textTransform: 'capitalize' }}>{type}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dades Temporals */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px', fontFamily: '"Hanken Grotesk", sans-serif' }}>
            Any <span style={{ color: '#ff0000' }}>*</span>
          </label>
          <input
            type="number"
            value={formData.any}
            onChange={(e) => setFormData({ ...formData, any: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #D0D0D0',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              backgroundColor: '#FAFAFA',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'black';
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D0D0D0';
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.boxShadow = 'none';
            }}
            min="1960"
            max={new Date().getFullYear()}
          />
          {errors.any && <p className="text-red-600 text-sm mt-2">{errors.any}</p>}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#666666', marginBottom: '8px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Mes (opcional)</label>
          <input
            type="number"
            value={formData.mes || ''}
            onChange={(e) => setFormData({ ...formData, mes: e.target.value ? parseInt(e.target.value) : null })}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #D0D0D0',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              backgroundColor: '#FAFAFA',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'black';
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D0D0D0';
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.boxShadow = 'none';
            }}
            min="1"
            max="12"
            placeholder="1-12"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: '#666666', marginBottom: '8px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Dia (opcional)</label>
          <input
            type="number"
            value={formData.dia || ''}
            onChange={(e) => setFormData({ ...formData, dia: e.target.value ? parseInt(e.target.value) : null })}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #D0D0D0',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              backgroundColor: '#FAFAFA',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'black';
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D0D0D0';
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.boxShadow = 'none';
            }}
            min="1"
            max="31"
            placeholder="1-31"
          />
        </div>
      </div>

      {/* Títol */}
      <div className="mb-12">
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px', fontFamily: '"Hanken Grotesk", sans-serif' }}>
          Títol <span style={{ color: '#ff0000' }}>*</span>
        </label>
        <input
          type="text"
          value={formData.titol}
          onChange={(e) => setFormData({ ...formData, titol: e.target.value })}
          placeholder="Títol descriptiu del document"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #D0D0D0',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#FAFAFA',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'black';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#D0D0D0';
            e.target.style.backgroundColor = '#FAFAFA';
            e.target.style.boxShadow = 'none';
          }}
        />
        {errors.titol && <p className="text-red-600 text-sm mt-2">{errors.titol}</p>}
      </div>

      {/* Descripció */}
      <div className="mb-12">
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Descripció</label>
        <textarea
          value={formData.descripcio}
          onChange={(e) => setFormData({ ...formData, descripcio: e.target.value })}
          placeholder="Descripció detallada del document (opcional)"
          rows="5"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #D0D0D0',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#FAFAFA',
            transition: 'all 0.2s ease',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'black';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#D0D0D0';
            e.target.style.backgroundColor = '#FAFAFA';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Autor */}
      <div className="mb-12">
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Autor / Font</label>
        <input
          type="text"
          value={formData.autor}
          onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
          placeholder="Qui ha donat / creat el document (opcional)"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #D0D0D0',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#FAFAFA',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'black';
            e.target.style.backgroundColor = 'white';
            e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#D0D0D0';
            e.target.style.backgroundColor = '#FAFAFA';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Toggle Públic */}
      <div className="mb-12">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '16px', fontWeight: '500', color: 'black', margin: 0, fontFamily: '"Hanken Grotesk", sans-serif' }}>
            Visible a la timeline pública?
          </label>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, public: !formData.public })}
            style={{
              width: '42px',
              height: '24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: formData.public ? 'black' : '#CCCCCC',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.3s ease',
              padding: 0
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '2px',
                left: formData.public ? '20px' : '2px',
                transition: 'left 0.3s ease'
              }}
            />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-16">
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '16px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Categories</label>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="Escriu una categoria i prem Enter"
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #D0D0D0',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              backgroundColor: '#FAFAFA',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'black';
              e.target.style.backgroundColor = 'white';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#D0D0D0';
              e.target.style.backgroundColor = '#FAFAFA';
              e.target.style.boxShadow = 'none';
            }}
            list="categoriesList"
          />
          <datalist id="categoriesList">
            {categories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={handleAddTag}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-[#333333] transition-colors font-medium"
          >
            Afegir
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {formData.categories.map((cat) => (
            <div
              key={cat}
              className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
            >
              {cat}
              <button
                type="button"
                onClick={() => handleRemoveTag(cat)}
                className="hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fitxer */}
      <div className="mb-16">
        <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '16px', fontFamily: '"Hanken Grotesk", sans-serif' }}>
          Fitxer <span style={{ color: '#ff0000' }}>*</span>
        </label>
        <div
          className="border-2 border-dashed border-[#CCCCCC] rounded-lg p-12 text-center cursor-pointer hover:border-black hover:bg-[#F5F5F5] transition-colors min-h-56 flex flex-col items-center justify-center"
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) {
              setFormData({ ...formData, fitxer: e.dataTransfer.files[0] });
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Upload size={64} className="mx-auto mb-4 text-[#666666]" />
          <p className="text-black font-medium text-lg mb-3">Arrossega un fitxer aquí</p>
          <p className="text-base text-[#666666] mb-6">o</p>
          <label className="inline-block px-8 py-3 bg-black text-white rounded-lg cursor-pointer hover:bg-[#333333] transition-colors font-medium text-lg">
            Seleccionar fitxer
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFormData({ ...formData, fitxer: e.target.files[0] })}
            />
          </label>
        </div>
        {formData.fitxer && (
          <p className="text-green-600 text-sm mt-3">✓ Fitxer seleccionat: {formData.fitxer.name}</p>
        )}
        {errors.fitxer && <p className="text-red-600 text-sm mt-3">{errors.fitxer}</p>}
      </div>

      {/* Botó Guardar */}
      <button
        type="submit"
        disabled={cargando || !formData.titol || !formData.any || !formData.fitxer}
        style={{
          width: '100%',
          padding: '16px 32px',
          backgroundColor: cargando || !formData.titol || !formData.any || !formData.fitxer ? '#999999' : 'black',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '16px',
          border: 'none',
          cursor: cargando || !formData.titol || !formData.any || !formData.fitxer ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          opacity: cargando || !formData.titol || !formData.any || !formData.fitxer ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!(cargando || !formData.titol || !formData.any || !formData.fitxer)) {
            e.target.style.backgroundColor = '#1a1a1a';
            e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
            e.target.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'black';
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        {cargando ? 'Guardant...' : 'Guardar Document'}
      </button>
    </form>
  );
}
