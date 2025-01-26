import React, { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';

const FireworksComponent = () => {
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Kiểm tra xem có phải mobile không
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

    const options = {
      autoresize: true,
      opacity: 1,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: isMobile ? 100 : 200,          // Giảm số hạt trên mobile
      traceLength: isMobile ? 3 : 5,            // Giảm độ dài vệt
      traceSpeed: isMobile ? 8 : 10,            // Giảm tốc độ
      explosion: isMobile ? 8 : 10,             // Giảm kích thước nổ
      intensity: isMobile ? 50 : 80,            // Giảm cường độ
      flickering: isMobile ? 20 : 30,
      lineStyle: 'round',
      hue: {
        min: 10,
        max: 50
      },
      delay: {
        min: isMobile ? 15 : 10,                // Tăng delay trên mobile
        max: isMobile ? 30 : 20
      },
      brightness: {
        min: isMobile ? 75 : 85,
        max: isMobile ? 90 : 100
      },
      decay: {
        min: isMobile ? 0.02 : 0.01,           // Tăng tốc độ tan
        max: isMobile ? 0.04 : 0.02
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    };

    try {
      fireworksRef.current = new Fireworks(canvasRef.current, options);
      setTimeout(() => {
        fireworksRef.current?.start();
      }, 100);
    } catch (error) {
      console.error("Error starting fireworks:", error);
    }

    // Thêm event listener để điều chỉnh khi resize
    const handleResize = () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop();
        fireworksRef.current = new Fireworks(canvasRef.current, {
          ...options,
          particles: window.innerWidth <= 768 ? 100 : 200
        });
        fireworksRef.current.start();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (fireworksRef.current) {
        fireworksRef.current.stop();
      }
    };
  }, []);

  return (
      <div
          ref={containerRef}
          style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(26,0,0,0.8) 50%, rgba(45,0,0,0.8) 100%)', // Thêm độ trong suốt
              boxShadow: 'inset 0 0 100px rgba(255, 165, 0, 0.1)',
               zIndex: 0,
              pointerEvents: 'none' // Tắt tương tác click để không ảnh hưởng đến các element khác
          }}
      >
        <canvas 
          ref={canvasRef} 
          style={{
            display: "block",
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>
  );
};

export default FireworksComponent;