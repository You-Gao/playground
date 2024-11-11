import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
 
function App() {
  const [color, setColor] = useState('black');
  const [hex, setHex] = useState('#000000');

  function changeColor() {
    // js can use document to access the DOM
    const mood = document.getElementById('input_box').value;
    document.getElementById('input_box').value = '';
    if ((mood === "") || (mood === " ")){ return; }
    console.log(mood);
    const hex_string = getRandomHexColor();
    setColor(hex_string);
    setHex(hex_string);

    if (hex_string === "#000000") {
	    document.getElementById('input_box').style.setProperty('--placeholder-color', 'white');
	    document.getElementById('input_box').style.borderBottom = '2px solid white';
    	    document.getElementById('input_box').style.color = 'white';
	    document.getElementById('hex_string').style.color = 'white';
    }
    
    if (hex_string === "#ffffff") {
	    document.getElementById('input_box').style.setProperty('--placeholder-color', 'black');
	    document.getElementById('input_box').style.borderBottom = '2px solid black';
	    document.getElementById('input_box').style.color = 'black';
	    document.getElementById('hex_string').style.color = 'black';

    }
  }

  function getRandomHexColor() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // Ensure the hex code is always 6 characters (padding with leading zeros if necessary)
    return "#" + randomColor.padStart(6, '0');
}


  function handleThresholdReached() {
    const inputBox = document.getElementById('input_box');
    console.log("Threshold reached!");
	// Reset styles
	inputBox.style.top = '0%';        // Set top to 0%
	inputBox.style.left = '5%';       // Set left to 0%
	inputBox.style.transform = 'none'; // Reset transform to none
	inputBox.style.width = '90%';
	inputBox.style.height = '93%';
	inputBox.style.lineHeight = 'normal';
	
  }

  function handleBoxReset() {
    const inputBox = document.getElementById('input_box');
    console.log("Setting the box back!");
    inputBox.style.top = '50%';
    inputBox.style.left = '50%';
    inputBox.style.transform = 'translate(-50%,-50%)';
    inputBox.style.width = '';
    inputBox.style.height = '';
    inputBox.style.lineHeight = '50%';

  }
  function listenForEnter(e) {
      if (e.key === 'Enter' && !e.repeat) {
        changeColor();
	handleBoxReset();
    }
}

function listenForTreshold() {
   
	const inputBox = document.getElementById('input_box');
	const threshold = 20;
	document.getElementById('input_box').value = document.getElementById('input_box').value.replace(/[\r\n]+/g, '');
	const inputLength = inputBox.value.length;
    
    // Check if the input length exceeds the threshold
    if (inputLength >= threshold) {
	handleThresholdReached();
    }


}


  useEffect(() => {
    // listen to an enter key press in the input field
    window.addEventListener('keydown', listenForEnter);

    // listen to inputs into to input field
    const inputBox = document.getElementById('input_box');

    inputBox.addEventListener('input', listenForTreshold);

    // clean up
    return () => {
      window.removeEventListener('keydown', listenForEnter);
      window.removeEventListener('input', listenForTreshold); 
    }

    }, []);

  return (
    <div className="App" style={{background: color, width: "100%", height: "100%", position: "fixed"}}>
      <textarea id="input_box" type="text" placeholder="how you feeling?" />
      <h1 id="hex_string">{hex}</h1>
    </div>
  );
}

export default App;
