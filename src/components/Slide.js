import React, { useEffect } from 'react';
import '../styles/Slide.css';

const Slide = ({ content, duration, onSlideChange }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSlideChange();
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, onSlideChange]);

  return (
    <div className="slide-content">
      <p className="wish-text">{content}</p>
    </div>
  );
};

export default Slide;