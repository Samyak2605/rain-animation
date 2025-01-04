import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [raindrops, setRaindrops] = useState([]);
  const GRID_SIZE = {
    rows: 15,
    cols: 20
  };

  const COLORS = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#9C27B0', // Purple
    '#F44336', // Red
    '#FFC107'  // Yellow
  ];

  useEffect(() => {
    const createVerticalGroup = () => {
      const groupSize = Math.floor(Math.random() * 2) + 4; // Random size between 4-5
      const col = Math.floor(Math.random() * GRID_SIZE.cols);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const groupId = Math.random();

      // Create a vertical group starting from top
      return Array.from({ length: groupSize }, (_, index) => ({
        id: `${groupId}-${index}`,
        col: col,
        row: -index, // Start above the grid and fall in
        color,
        groupId
      }));
    };

    const updateRaindrops = () => {
      setRaindrops(prevDrops => {
        // Move existing drops down
        const updatedDrops = prevDrops
          .map(drop => ({
            ...drop,
            row: drop.row + 1
          }))
          .filter(drop => drop.row < GRID_SIZE.rows);

        // Add new vertical groups randomly
        if (Math.random() < 0.1) {
          const newGroup = createVerticalGroup();
          updatedDrops.push(...newGroup);
        }

        return updatedDrops;
      });
    };

    const intervalId = setInterval(updateRaindrops, 150);
    return () => clearInterval(intervalId);
  }, []);

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_SIZE.rows; row++) {
      for (let col = 0; col < GRID_SIZE.cols; col++) {
        const raindrop = raindrops.find(drop => drop.row === row && drop.col === col);
        grid.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${raindrop ? 'active' : ''}`}
            style={{
              backgroundColor: raindrop ? raindrop.color : 'transparent'
            }}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Rainfall Animation</h1>
        <p className="subtitle">A soothing, dynamic rain effect</p>
        <div className="grid-container">
          {renderGrid()}
        </div>
      </div>
    </div>
  );
}

export default App;