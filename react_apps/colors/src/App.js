import logo from './logo.svg';
import './App.css';
import  { useState, useEffect, useRef } from 'react';
import {Route, Routes } from 'react-router-dom';
import TextArea from './components/TextArea';
import ColorBlocks from './components/ColorBlocks';
import Plan from './components/Plan';

function App() {

  const [colors, setColors] = useState([]);
  const prevServerColorsRef = useRef([]);
  const colorsRef = useRef([]);

  useEffect(() => {
    console.log("Updated colors:", colors);
  }, [colors]); 
  return (
	  <Routes>
  <Route 
    path="/" 
    element={
      <>
        <TextArea 
          colors={colors} 
          setColors={setColors} 
          prevServerColorsRef={prevServerColorsRef} 
          colorsRef={colorsRef} 
        />
        <ColorBlocks 
          colors={colors} 
          setColors={setColors} 
          prevServerColorsRef={prevServerColorsRef} 
          colorsRef={colorsRef} 
        />
      </>
    } 
  />
  <Route path="/plan" element={<Plan />} />
</Routes>
  );
}

export default App;
