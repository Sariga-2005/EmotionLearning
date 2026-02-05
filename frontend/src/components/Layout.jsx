import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    }}>
      <Header />
      <main style={{
        flex: 1,
        marginTop: '20px',
        paddingBottom: '40px'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
