import React, { useState } from 'react';
import Slide from './components/Slide';
import Countdown from './components/Countdown';
import Fireworks from './components/Fireworks';
import BackgroundMusic from './components/BackgroundMusic';
import './App.css';

function App() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(-1);
    const [startMusic, setStartMusic] = useState(false);
    const slides = [
        {content: "Chúc Mừng Năm Mới 2024! 🎊"},
    
        {content: "MADE BY KHOI MINH DOAN "},


    ];

    const handleSlideChange = () => {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }

    const onCountdownComplete = () => {
      setCurrentSlideIndex(0);
      setStartMusic(true);
    }

    return (
        <div className="app" style={{
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}>
          <Fireworks />
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '15px',
            textAlign: 'center',
            color: 'white',
            width: '100%',
            maxWidth: '600px',    // Giới hạn độ rộng tối đa
            margin: '0 auto'
          }}>
            <BackgroundMusic playOnMount={startMusic} />
            {currentSlideIndex === -1 ? (
              <Countdown 
                targetDate={new Date(new Date().getFullYear(), 11, 31, 23, 59, 59)} 
                onComplete={onCountdownComplete}
              />
            ) : (
              <>
                {slides.map((slide, index) => (
                  <div 
                    key={index}
                    className="slides-container" 
                    style={{
                      display: currentSlideIndex === index ? 'block' : 'none',
                      maxWidth: '100%',
                      margin: '0 auto',
                      padding: '10px',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    <Slide 
                      content={slide.content} 
                      duration={15} 
                      onSlideChange={handleSlideChange}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
    );
}

export default App;
