import logo from './logo.svg';
import './App.css';
import  { useState, useEffect, useRef } from 'react';

import TextArea from './components/TextArea';
import ColorBlocks from './components/ColorBlocks';

function App() {

  const [colors, setColors] = useState([]);
  const prevServerColorsRef = useRef([]);
  const colorsRef = useRef([]);

  useEffect(() => {
    console.log("Updated colors:", colors);
  }, [colors]); // Runs whenever 'colors' changes

  return (
    /* return the component TextArea */
    <div className="App">
      <TextArea colors={colors} setColors={setColors} prevServerColorsRef={prevServerColorsRef} colorsRef={colorsRef} />
      <ColorBlocks colors={colors} setColors={setColors} prevServerColorsRef={prevServerColorsRef} colorsRef={colorsRef} />
    </div>
  );
}

export default App;
