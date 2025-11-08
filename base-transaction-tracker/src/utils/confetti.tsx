import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [confettiPieces, setConfettiPieces] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const confettiCount = 150;
    const newConfettiPieces: React.JSX.Element[] = [];
    
    for (let i = 0; i < confettiCount; i++) {
      const colors = ['#0052ff', '#00cfff', '#ff0055', '#ffcc00', '#00ff99'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      const size = Math.random() * 10 + 5;
      const animationDuration = Math.random() * 3 + 2;
      
      newConfettiPieces.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${left}%`,
            backgroundColor: color,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${animationDuration}s`
          }}
        />
      );
    }
    
    setConfettiPieces(newConfettiPieces);
    
    // Clean up after 5 seconds
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return <div className="confetti-container">{confettiPieces}</div>;
};

export default Confetti;