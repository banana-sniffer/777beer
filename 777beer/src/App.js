import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';

function App() {
  const [beerCount, setBeerCount] = useState(770); // Current dummy beer count
  const [revealed, setRevealed] = useState(false);

  // Animation for revealing the 777th beer
  const revealAnimation = useSpring({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 }
  });

  // Function to increase beer count
  const incrementBeer = () => {
    if (beerCount < 777) {
      setBeerCount(prev => prev + 1);
    }
  };

  // Reveal action for 777th beer
  const revealBeer = () => {
    if (beerCount === 777) {
      setRevealed(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Brandon and Sean's Beer Journey</h1>
        <p>They've tasted {beerCount} beers!</p>
        
        {/* Beer increment button */}
        <button onClick={incrementBeer}>Taste another beer 🍻</button>

        {/* Flexbox container for images and button */}
        <div className="beer-reveal-container">
          <img src="/sean.png" alt="Sean" className="image-left" />
          
          {beerCount === 777 && (
            <div>
              <button onClick={revealBeer} className="reveal-button">Reveal the 777th Beer</button>
              <animated.div style={revealAnimation}>
                {revealed && (
                  <h2>The 777th Beer is... <strong>A work in progress</strong>! 🐉🍺</h2>
                )}
              </animated.div>
            </div>
          )}

          <img src="/brandon.png" alt="Brandon" className="image-right" />
        </div>
      </header>
    </div>
  );
}

export default App;
