import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [hoverInici, setHoverInici] = useState(false);
  const [hoverGestor, setHoverGestor] = useState(false);

  const linkStyle = (isHovered) => ({
    fontSize: '36px',
    fontWeight: 'bold',
    color: isHovered ? 'black' : 'white',
    textDecoration: 'none',
    border: '2px solid white',
    padding: '12px 24px',
    borderRadius: '8px',
    backgroundColor: isHovered ? 'white' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  return (
    <header style={{ backgroundColor: 'black', padding: '24px 48px' }}>
      <div className="max-w-7xl mx-auto px-12">
        <nav className="flex items-center justify-center" style={{ gap: '80px' }}>
          <Link
            to="/"
            style={linkStyle(hoverInici)}
            onMouseEnter={() => setHoverInici(true)}
            onMouseLeave={() => setHoverInici(false)}
          >
            Inici
          </Link>
          <Link
            to="/gestor"
            style={linkStyle(hoverGestor)}
            onMouseEnter={() => setHoverGestor(true)}
            onMouseLeave={() => setHoverGestor(false)}
          >
            Gestor
          </Link>
        </nav>
      </div>
    </header>
  );
}
