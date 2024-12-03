import './TextArea.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TextArea({colors, setColors, colorsRef, prevServerColorsRef}) {    
    const [color, setColor] = useState('');
    const [hex, setHex] = useState('');

    function getData(url, input="") {
        if (input !== "") {
          url = url + "?text=" + input;
        }
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

/*
CHANGE FUNCTIONS:
changeColor(): updates the screen colors
changePlaceholderText(): updates the input_box with text 
*/
      async function changeColor(input) {
        // js can use document to access the DOM
        if ((input === "") || (input === " ")){ return; }
      
        const url = `https://playground.yougao.dev/mood/api/hex/`;
        const json = await getData(url, input);
        const hex_string = json['hex'];


        colorsRef.current = [...colorsRef.current, hex_string];
        setColors([...colors, hex_string]);
        const hex_dict = {hex: hex_string, data: input};
        prevServerColorsRef.current = [...prevServerColorsRef.current, hex_dict];
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
        if ((input === "") || (input === " ")){ return; }
        const url = `https://playground.yougao.dev/mood/api/placeholder/`;
        const json = await getData(url, input);
        const placeholderText = json['placeholder'];
        const placeholderColor = "white";
        inputBox.placeholder = placeholderText;
        inputBox.style.setProperty('--placeholder-color', placeholderColor);
      }

/*
HANDLE FUNCTIONS:
handleTreshholdReached(): sets the input_box to "fullscreen"
handleBoxReset(): resets the input_box 
handleScreenShrink(): "moves" the 1st screen down to show wall
handleScreenReset(): resets the 1st screen when typing another input
*/

      function handleThresholdReached() {
        const inputBox = document.getElementById('input_box');
        console.log("Threshold reached!");
        inputBox.style.top = '15%';
	inputBox.style.left = '5%';
	inputBox.style.transform = 'none'; 
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

      function handleScreenShrink(input) {
        const screenDiv = document.getElementById('textapp');
        if (input === "") { return; }
        screenDiv.style.width = '100%';
        screenDiv.style.height = '20%';
        screenDiv.style.bottom = '0';
      }

      function handleScreenReset() {
        const screenDiv = document.getElementById('textapp');
        screenDiv.style.width = null;
        screenDiv.style.height = '100%';
        screenDiv.style.bottom = '0';
        }

/*
i think the initcolor can be removed
*/
      function initColor() {
        const url = `https://playground.yougao.dev/mood/api/hex/`;
        getData(url).then(data => {
          const hex_string = data['hex'];
          const hex_dict = {hex: hex_string, data: ""};
          setColor(hex_string);
          setHex(hex_string);
          prevServerColorsRef.current = [...prevServerColorsRef.current, hex_dict];
          colorsRef.current = [...colorsRef.current, hex_string];
          setColors([...colors, hex_string]);

        });
      }

/*
LISTEN FUNCTIONS:
listenForEnter(): listen for enter and then dispatches changeColor() and changePlaceholderText()
listenForThreshold(): listen for text amnt to dispatch screen changes
*/
      function listenForEnter(e) {
          if (e.key === 'Enter' && !e.repeat) {
            const input = document.getElementById('input_box').value;
            document.getElementById('input_box').value = '';
	    // the input coupling is really bad
            changeColor(input);
            changePlaceholderText(input);
            handleBoxReset();
            handleScreenShrink(input);
        }
      }
      
      function listenForTreshold() { 
        const inputBox = document.getElementById('input_box');
        const threshold = 20;
        document.getElementById('input_box').value = document.getElementById('input_box').value.replace(/[\r\n]+/g, '');
        const inputLength = inputBox.value.length;
          
        if (inputLength >= threshold) {
            handleThresholdReached();
        }
        else {
          handleBoxReset();
        }

        if (inputLength === 5) {
          handleScreenReset();
        }
      }
      
      // uses the functions above to set-up the first screen
      useEffect(() => {
        initColor();
        window.addEventListener('keydown', listenForEnter);
        const inputBox = document.getElementById('input_box');
      
        inputBox.addEventListener('input', listenForTreshold);
      
        return () => {
          window.removeEventListener('keydown', listenForEnter);
          window.removeEventListener('input', listenForTreshold); 
        }
      
        }, []);

        return (
            <div className="TextAreaApp" id="textapp" style={{"background": color}}>
	    	<div className="TestLink"><Link to="/plan">Test</Link></div>
		<textarea id="input_box" type="text" placeholder="[...]" />
                <h1 id="hex_string">{hex}</h1>
            </div>
        );
      
}

export default TextArea;
