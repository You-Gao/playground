import logo from './logo.svg';
import './App.css';
import  { useState, useEffect, useRef } from 'react';
import {Route, Routes } from 'react-router-dom';
import TextArea from './components/TextArea';
import ColorBlocks from './components/ColorBlocks';
import Plan from './components/Plan';
import Demo from './components/plan_components/Demo';
import DataCapture from './components/plan_components/Data';
import Website from './components/plan_components/Website';
import Market from './components/plan_components/Market';

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
  <Route path="/plan" element={<Plan />} >
     <Route path="demo" element={<Demo />} />
     <Route path="data" element={<DataCapture />} />
     <Route path="website" element={<Website />} />
     <Route path="market" element={<Market />} />
  </Route>
</Routes>
  );
}

export default App;
