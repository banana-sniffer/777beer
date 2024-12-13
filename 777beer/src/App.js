import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Papa from 'papaparse';
import './App.css';
import beerList from './artifacts/beer_list.csv'; // Ensure this path matches your file location
import BeerTable from './BeerTable'
import TitleCard from './TitleCard';

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
    <div>
      <TitleCard/>
      <BeerTable/>
    </div>
  );
}

export default App;