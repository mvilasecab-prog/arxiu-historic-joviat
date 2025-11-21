import { useState } from 'react';

export default function PasswordProtection({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // The password is "arxiu2024" - you can change this in production
    const correctPassword = 'arxiu2024';

    if (password === correctPassword) {
      // Store in sessionStorage so it persists during the session
      sessionStorage.setItem('gestorAuthenticated', 'true');
      onAuthenticated();
    } else {
      setError('Contrasenya incorrecta');
      setPassword('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '48px',
          borderRadius: '12px',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '24px',
            textAlign: 'center',
            color: 'black',
            fontFamily: 'Hanken Grotesk, sans-serif',
          }}
        >
          Accés Gestor
        </h2>

        <p
          style={{
            fontSize: '14px',
            color: '#666666',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Introduïu la contrasenya per accedir al gestor de documents
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'black',
                marginBottom: '8px',
                fontFamily: 'Hanken Grotesk, sans-serif',
              }}
            >
              Contrasenya
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduïu la contrasenya"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #D0D0D0',
                borderRadius: '8px',
                boxSizing: 'border-box',
                backgroundColor: '#FAFAFA',
                fontFamily: 'Hanken Grotesk, sans-serif',
                transition: 'all 0.2s ease',
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

          {error && (
            <div
              style={{
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'Hanken Grotesk, sans-serif',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1f2937';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'black';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Accedir
          </button>
        </form>
      </div>
    </div>
  );
}
