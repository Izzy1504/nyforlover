import React, { useState, useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [audioSource, setAudioSource] = useState(null);

  const initializeAudio = async () => {
    try {
      const baseUrl = window.location.origin;
      const audioFormats = [
        { path: '/ny.mp3', type: 'audio/mpeg' },
        { path: '/ny.wav', type: 'audio/wav' }
      ];

      let selectedSource = null
      const audio = new Audio();
      console.log("Starting audio loading");

      for (const format of audioFormats) {
        const source = document.createElement('source');
        source.src = baseUrl + format.path;
        source.type = format.type;
        audio.appendChild(source);
        console.log(`Attempting to load: ${format.path}`)

        try {
          await new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', () => {
              selectedSource = source.src;
              console.log("Audio can play through with source: ", selectedSource);
              resolve();
            }, { once: true });
            audio.addEventListener('error', (e) => {
              const errorDetails = {
                code: audio.error?.code,
                message: audio.error?.message,
                src: audio.currentSrc
              };
              setErrorDetails(errorDetails)
              reject(new Error(`Error loading audio with source: ${format.path}, details: ${JSON.stringify(errorDetails)}`));
            }, { once: true });
            audio.load();
          })
          break;
        } catch (error) {
          console.error(`Error loading format: ${format.path}, error:`, error)
          audio.removeChild(source);
        }
      }
      if (!selectedSource) {
        setError(true);
        console.error('Could not find a suitable audio format.');
        return;
      }
      audio.loop = true;
      audio.volume = 1;
      audioRef.current = audio;
      setAudioSource(selectedSource)
      setError(false);
      console.log('Audio loaded successfully with source:', selectedSource);


    } catch (err) {
      console.error("Error initializing audio:", err);
      setError(true);
    }
  };

  const attemptPlay = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        audioRef.current.volume = 0;
        await audioRef.current.play();
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 1) {
            vol = Math.min(vol + 0.1, 1); // Ensure volume never exceeds 1
            audioRef.current.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
        setIsPlaying(true);
        console.log("Playback started successfully");
      } catch (error) {
        console.error("Playback failed:", error);
        setError(true);
      }
    }
  };

  useEffect(() => {
    initializeAudio();

    // Only listen for click event
    const playOnClick = () => {
      console.log("Click detected, attempting to play");
      attemptPlay();
      // Remove listener after successful click
      document.removeEventListener('click', playOnClick);
    };

    document.addEventListener('click', playOnClick);

    return () => {
      document.removeEventListener('click', playOnClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSource]);

  return error ? (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 0, 0, 0.7)',
      padding: '10px',
      borderRadius: '5px',
      color: 'white',
      fontSize: '14px',
      maxWidth: '200px',
      wordWrap: 'break-word',
      zIndex: 1000
    }}>
      Unable to play audio: {errorDetails ? JSON.stringify(errorDetails) : 'Unknown error'}
    </div>
  ) : null;
};

export default BackgroundMusic;