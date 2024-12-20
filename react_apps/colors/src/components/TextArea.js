import './TextArea.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TextArea({colors, setColors, colorsRef, prevServerColorsRef}) {    
    const [color, setColor] = useState('');
    const [hex, setHex] = useState('#FFFFFF');

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
changeQOTD(): updates the QOTD
*/
      async function changeColor(input) {
        if ((input === "") || (input === " ")){ return; }
        
        const qotd = document.getElementById('QOTD');
        const qotdText = qotd.innerHTML;
        console.log(qotdText);
        changeQOTD();

        const msg = qotdText + ": " + input 
        console.log(msg);

        const url = `https://playground.yougao.dev/mood/api/hex/`;
        const json = await getData(url, msg);
        const hex_string = json['hex'];

        const hex_dict = {hex: hex_string, data: msg};
        colorsRef.current = [...colorsRef.current, hex_dict];
        setColors([...colors, hex_dict]);
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

      async function changeQOTD() {
        const QOTD = document.getElementById('QOTD');
        const url = 'https://playground.yougao.dev/mood/api/questions/';
        console.log(url);
        const json = await getData(url);
        const qotd = json['question'];
        QOTD.innerHTML = qotd;
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
        inputBox.style.top = '15%';
        inputBox.style.left = '5%';
        inputBox.style.transform = 'none'; 
        inputBox.style.width = '90%';
        inputBox.style.height = '95%';
        inputBox.style.lineHeight = 'normal';
        inputBox.style.border = 'none';

        const QOTD = document.getElementById('QOTD');
        QOTD.style.visibility = 'hidden';
        
      }
      
      function handleBoxReset() {
        const inputBox = document.getElementById('input_box');
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
      
        const QOTD = document.getElementById('QOTD');
        QOTD.style.visibility = 'hidden';

	setTimeout(function() {
const inputBox = document.getElementById('input_box');
	inputBox.addEventListener('mouseover', handleScreenReset);
	}, 2000); // 2000 milliseconds (2 seconds) delay before adding the event listener

      }

      function handleScreenReset() {
        const screenDiv = document.getElementById('textapp');
        const QOTD = document.getElementById('QOTD');

	try {
const inputBox = document.getElementById('input_box');
		inputBox.removeEventListener("mouseover", handleScreenReset);
	}
	      catch (e) {
		      console.log(e)
	      }

	if (screenDiv.style.height !== '100%') {
	  QOTD.style.visibility = '';  // Make QOTD visible only if the height is not 100%
	}
	
	screenDiv.style.width = null;
        screenDiv.style.height = '100%';
        screenDiv.style.bottom = '0';
        
      }

/*
i think the initcolor can be removed

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
*/

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
        // initColor();
        // ! ADHOC FIX
        setColor("#ffffff");
        document.getElementById('input_box').style.setProperty('--placeholder-color', 'black !important');
        document.getElementById('input_box').style.borderBottom = '2px solid black';
        document.getElementById('input_box').style.color = 'black';
        document.getElementById('hex_string').style.color = 'black';
        changeQOTD();
        window.addEventListener('keydown', listenForEnter);
        const inputBox = document.getElementById('input_box'); 
        inputBox.addEventListener('input', listenForTreshold);
      
        return () => {
          window.removeEventListener('keydown', listenForEnter);
          window.removeEventListener('input', listenForTreshold);
        }
      
        }, []);

        useEffect(() => {
          const interval = setInterval(() => {
              // send a msg that says
              // "psst... hover over the hidden link in the bottom left corner"
              try {
                // skip if the last color contains the msg
                console.log(colors[colors.length - 1]['data']);
                if (colors[colors.length - 1]['data'] === "psst... i found the admin login. hover over the hidden link in the bottom left corner \n password is: axciom_group") {
                  console.log(colors[colors.length - 1]['data']);
                  console.log("skipping");
                  return;
                }

                const hex_dict = {hex: "#000000", data: "psst... i found the admin login. hover over the hidden link in the bottom left corner \n password is: axciom_group"};
                colorsRef.current = [...colorsRef.current, hex_dict];
                setColors([...colors, hex_dict]);
                prevServerColorsRef.current = [...prevServerColorsRef.current, hex_dict];
                setColor("#000000");
                setHex("#000000");

		document.getElementById('input_box').style.setProperty('--placeholder-color', 'white !important');
            	document.getElementById('input_box').style.borderBottom = '2px solid white';
            	document.getElementById('input_box').style.color = 'white';
		document.getElementById('input_box').value = 'check the wall';
            	document.getElementById('hex_string').style.color = 'white';
		document.getElementById('QOTD').style.color = 'white';

              } catch (e) {
              }
          }, 65000);
          return () => clearInterval(interval);
      }, [colors]);

        return (
            <div className="TextAreaApp" id="textapp" style={{"background": color}}>
                <div className="QOTD" id="QOTD"></div> 
                <div className="TestLink"><Link to="/plan">super secret login link...</Link></div>
                <textarea id="input_box" type="text" placeholder="[...]" />
                <h1 id="hex_string">{hex}</h1>
            </div>
        );
      
}

export default TextArea;
