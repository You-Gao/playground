import logo from './logo.svg';
import './App.css';
import  { useState, useEffect } from 'react';

import TextArea from './components/TextArea';
import ColorBlocks from './components/ColorBlocks';

function App() {

  const [colors, setColors] = useState([]);

  useEffect(() => {
    console.log("Updated colors:", colors);
  }, [colors]); // Runs whenever 'colors' changes

  return (
    /* return the component TextArea */
    <div className="App">
      <TextArea colors={colors} setColors={setColors} />
      <ColorBlocks colors={colors} />
    </div>
  );
}

export default App;
