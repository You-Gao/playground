import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
 
function App() {
  const [color, setColor] = useState('black');

  function changeColor() {
    // js can use document to access the DOM
    const mood = document.querySelector('input').value;
    document.querySelector('input').value = '';
    console.log(mood)
    setColor(mood);

    if (mood === "black") {
	    document.getElementById('input_box').style.setProperty('--placeholder-color', 'white');
	    document.getElementById('input_box').style.borderBottom = '2px solid white';
    	    document.getElementById('input_box').style.color = 'white';
    }
    
    if (mood === "white") {
	    document.getElementById('input_box').style.setProperty('--placeholder-color', 'black');
	    document.getElementById('input_box').style.borderBottom = '2px solid black';
	    document.getElementById('input_box').style.color = 'black';

    }
  }

  function listenForEnter(e) {
      if (e.key === 'Enter' && !e.repeat) {
        changeColor();
      }
    }

  useEffect(() => {
    // listen to an enter key press in the input field
    window.addEventListener('keydown', listenForEnter);

    // clean up
    return () => {
      window.removeEventListener('keydown', listenForEnter);
    }

    }, []);

  return (
    <div className="App" style={{background: color, width: "100%", height: "100%", position: "fixed"}}>
      <input id="input_box" type="text" placeholder="Enter your mood" />
    </div>
  );
}

export default App;
