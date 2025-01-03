import React, { useState, useEffect } from "react";
import "./App.css";

const GRID_ROWS = 20;
const GRID_COLS = 15;

function App() {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const generateRaindrops = () => {
      const drops = Array.from({ length: GRID_COLS }, () => ({
        row: Math.floor(Math.random() * GRID_ROWS),
        col: Math.floor(Math.random() * GRID_COLS),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }));
      setRaindrops(drops);
    };

    generateRaindrops();

    const interval = setInterval(() => {
      setRaindrops((prevDrops) =>
        prevDrops.map((drop) => {
          let newRow = drop.row + 1;
          if (newRow >= GRID_ROWS) newRow = 0; // Reset to top
          return { ...drop, row: newRow };
        })
      );
    }, 200); // Adjust speed of raindrop movement

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="grid">
        {Array.from({ length: GRID_ROWS }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: GRID_COLS }).map((_, colIndex) => {
              const isRaindrop = raindrops.some(
                (drop) => drop.row === rowIndex && drop.col === colIndex
              );
              const dropColor = isRaindrop
                ? raindrops.find(
                    (drop) => drop.row === rowIndex && drop.col === colIndex
                  )?.color
                : "";

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${isRaindrop ? "raindrop" : ""}`}
                  style={{ backgroundColor: isRaindrop ? dropColor : "" }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="game-ui">
        <h1 className="title">Rainfall Animation</h1>
        <p className="description">A soothing, dynamic rain effect.</p>
      </div>
    </div>
  );
}

export default App;
