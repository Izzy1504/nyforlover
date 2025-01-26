import React from 'react';

const Background = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(26,0,0,0.95) 50%, rgba(45,0,0,0.95) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Background;
