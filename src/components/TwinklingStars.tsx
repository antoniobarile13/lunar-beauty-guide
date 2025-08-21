import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Planet {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export function TwinklingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    // Generate random stars - bigger and shinier
    const generateStars = () => {
      const starCount = 40; // Slightly fewer for cleaner look
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // Percentage position
          y: Math.random() * 100,
          size: Math.random() * 4 + 2, // Size between 2-6px (bigger)
          delay: Math.random() * 5, // Animation delay 0-5s
        });
      }
      
      setStars(newStars);
    };

    // Generate floating planets
    const generatePlanets = () => {
      const planetCount = 6; // Few planets for subtle effect
      const newPlanets: Planet[] = [];
      const planetColors = ['bg-blue-400/20', 'bg-purple-400/15', 'bg-pink-400/15', 'bg-indigo-400/20', 'bg-cyan-400/15'];
      
      for (let i = 0; i < planetCount; i++) {
        newPlanets.push({
          id: i,
          x: Math.random() * 120 - 20, // Start from -20% to 100%
          y: Math.random() * 100,
          size: Math.random() * 20 + 15, // Size between 15-35px
          duration: Math.random() * 40 + 60, // Duration 60-100s for slow movement
          delay: Math.random() * 20, // Stagger start times
          color: planetColors[Math.floor(Math.random() * planetColors.length)],
        });
      }
      
      setPlanets(newPlanets);
    };

    generateStars();
    generatePlanets();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white/60 animate-twinkle" // Shinier with /60 opacity
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.3)', // Subtle glow
          }}
        />
      ))}
      
      {/* Floating Planets */}
      {planets.map((planet) => (
        <div
          key={`planet-${planet.id}`}
          className={`absolute rounded-full ${planet.color} animate-float-across opacity-40`}
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            animationDuration: `${planet.duration}s`,
            animationDelay: `${planet.delay}s`,
          }}
        />
      ))}
    </div>
  );
}