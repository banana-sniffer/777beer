import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Papa from 'papaparse';
import './App.css';
import beerList from './artifacts/beer_list.csv'; // Ensure this path matches your file location
import BeerTable from './BeerTable'

function App() {
  const [beerCount, setBeerCount] = useState(770); // Current dummy beer count
  const [revealed, setRevealed] = useState(false);
  const [beerData, setBeerData] = useState([]); // For table data
  const [newBeer, setNewBeer] = useState({ name: '', type: '', rating: '' }); // New row data

  // Animation for revealing the 777th beer
  const revealAnimation = useSpring({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
  });

  // Function to increase beer count
  const incrementBeer = () => {
    if (beerCount < 777) {
      setBeerCount((prev) => prev + 1);
    }
  };

  // Reveal action for 777th beer
  const revealBeer = () => {
    if (beerCount === 777) {
      setRevealed(true);
    }
  };

  // Load and parse CSV file
  useEffect(() => {
    Papa.parse(beerList, {
      download: true,
      header: true,
      complete: (result) => {
        setBeerData(result.data);
      },
    });
  }, []);

  // Add new beer to the table
  const addNewBeer = () => {
    setBeerData([...beerData, newBeer]);
    setNewBeer({ name: '', type: '', rating: '' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Brandon and Sean's Journey to 777 beers</h1>
        <p>They've tasted {beerCount} beers!</p>

        {/* Beer increment button */}
        <button onClick={incrementBeer}>Taste another beer 🍻</button>

        {/* Flexbox container for images and button */}
        <div className="beer-reveal-container">
          <img src="./artifacts/sean.png" alt="Sean" className="image-left" />

          {beerCount === 777 && (
            <div>
              <button onClick={revealBeer} className="reveal-button">
                Reveal the 777th Beer
              </button>
              <animated.div style={revealAnimation}>
                {revealed && (
                  <h2>
                    The 777th Beer is... <strong>A work in progress</strong>! 🐉🍺
                  </h2>
                )}
              </animated.div>
            </div>
          )}

          <img src="./artifacts/brandon.png" alt="Brandon" className="image-right" />
        </div>

        <BeerTable/>
      </header>
    </div>
  );
}

export default App;