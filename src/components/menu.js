import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div style={{ backgroundColor: '#0c64c9', color: 'white', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={toggleMenu} style={{ marginRight: '16px', background: 'none', border: 'none', color: 'white' }}>
          &#9776; 
        </button>
      </div>

      {showMenu && (
        <div style={{ position: 'absolute', backgroundColor: '#0c64c9', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', zIndex: 1 }}>
          <Link to="/customers" style={{ padding: '12px', display: 'block', color: 'white', textDecoration: 'none' }} onClick={() => setShowMenu(false)}>Customers</Link>
          <Link to="/packages" style={{ padding: '12px', display: 'block', color: 'white', textDecoration: 'none' }} onClick={() => setShowMenu(false)}>Packages</Link>
          <Link to="/invoices" style={{ padding: '12px', display: 'block', color: 'white', textDecoration: 'none' }} onClick={() => setShowMenu(false)}>Invoices</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
