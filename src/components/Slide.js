import React, { useState, useEffect } from 'react';
import '../styles/Slide.css';

const Slide = ({ content, duration, onSlideChange }) => {
    const [displayedContent, setDisplayedContent] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < content.length) {
            const timer = setTimeout(() => {
                setDisplayedContent(prev => prev + content[currentIndex]);
                setCurrentIndex(currentIndex + 1);
            }, 50); // Adjust speed of typing here (50ms per character)
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(onSlideChange, duration * 1000);
            return () => clearTimeout(timer);
        }
    }, [content, currentIndex, duration, onSlideChange]);

    return (
        <div className="slide-content">
            {displayedContent}
        </div>
    );
};

export default Slide;