import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

 
function App() {
  const [color, setColor] = useState('black');
  const [hex, setHex] = useState('#000000');

  function getData(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      return data;
    }).catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }
  
  async function changeColor(input) {
    // js can use document to access the DOM
    if ((input === "") || (input === " ")){ return; }
    console.log(input);

    const url = `http://localhost:5000/mood/api/hex/`;
    const json = await getData(url);
    const hex_string = json['hex'];
    console.log(hex_string);
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

  async function changePlaceholderText(input) {
    const inputBox = document.getElementById('input_box');
    const url = `http://localhost:5000/mood/api/placeholder/`;
    const json = await getData(url);
    const placeholderText = json['placeholder'];
    const placeholderColor = "white";
    inputBox.placeholder = placeholderText;
    inputBox.style.setProperty('--placeholder-color', placeholderColor);
  }

  function handleThresholdReached() {
    const inputBox = document.getElementById('input_box');
    console.log("Threshold reached!");
    // Reset styles
    inputBox.style.top = '15%';        // Set top to 0%
    inputBox.style.left = '5%';       // Set left to 0%
    inputBox.style.transform = 'none'; // Reset transform to none
    inputBox.style.width = '90%';
    inputBox.style.height = '95%';
    inputBox.style.lineHeight = 'normal';
    inputBox.style.border = 'none';
	
  }

  function handleBoxReset() {
    const inputBox = document.getElementById('input_box');
    console.log("Setting the box back!");
    inputBox.style.top = null;
    inputBox.style.left = null;
    inputBox.style.transform = null;
    inputBox.style.width = null;
    inputBox.style.height = null;
    inputBox.style.lineHeight = null;
    inputBox.style.border = null;

  }

  function listenForEnter(e) {
      if (e.key === 'Enter' && !e.repeat) {
        const input = document.getElementById('input_box').value;
        document.getElementById('input_box').value = '';
        changeColor(input);
        changePlaceholderText(input);
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
    else {
      handleBoxReset();
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
