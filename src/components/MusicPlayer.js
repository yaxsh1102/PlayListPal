import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = ({ nowPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(nowPlaying.url);

    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [nowPlaying.url]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="music-player bg-red-500 h-[20rem] z-50">
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;
