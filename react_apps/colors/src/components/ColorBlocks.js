import './ColorBlocks.css';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';

function ColorBlocks({colors, setColors, prevServerColorsRef, colorsRef}) {

    return (
        <div className="color-blocks">
            <ColorTable colors={colors} setColors={setColors} prevServerColorsRef={prevServerColorsRef} colorsRef={colorsRef}/>
        </div>
    );
}

export default ColorBlocks;

function ColorTable({ colors, setColors, prevServerColorsRef, colorsRef}) {
    const [col, setCol] = useState(0);
    const [row, setRow] = useState(0);
    const [prevServerColors, setPrevServerColors] = useState([]);
    const rowRef = useRef(0);
    const colRef = useRef(0);

    function updateColorsFromServer() {
        const url = `https://playground.yougao.dev/mood/api/colors/`;
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(async data => {
            // theres 2 logics here, one is just setting if prevServerColors is empty
            // the other is if prevServerColors is not empty, then we only add the new colors
            console.log("PrevServerColors:", prevServerColorsRef.current);
            console.log("Length:", prevServerColorsRef.current.length);
            if (prevServerColorsRef.current.length === 2) {
                const newColors = [];
                for (let i = 0; i < data.length; i++) {
                    if (colorsRef.current.includes(data[i]['hex']))  {
                        continue;
                    }
                    addNewColorToTable(data[i]['hex'], data[i]['text']);
                    newColors.push(data[i]);
                }
                setPrevServerColors(newColors);
                prevServerColorsRef.current = [...prevServerColorsRef.current, ...newColors];
            }
            else {
                console.log("ELSE BLOCK");
                const newColors = [];
                for (let i = 0; i < data.length; i++) {
                    try {
                        if ((prevServerColorsRef.current.find(color => color['hex'] === data[i]['hex']) &&
                        prevServerColorsRef.current.find(color => color['text'] === data[i]['text'])) || 
                        colorsRef.current.includes(data[i]['hex'])) {
                            console.log("Color already exists in colors or prevServerColors");
                            continue;
                        }
                    } catch (error) {
                        console.error('Error comparing colors:', error);
                    }
                    if (colorsRef.current.includes(data[i]['hex']))  {
                        continue;
                    }
                    addNewColorToTable(data[i]['hex'], data[i]['text']);
                    newColors.push(data[i]);
                }
                setPrevServerColors(newColors);
                prevServerColorsRef.current = [...prevServerColorsRef.current, ...newColors];
            }
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }


    async function animateHorizontalScroll() {
        /*  gsap can't be used because it doesn't support horizontal scrolling (only vertical *horizontal* scrolling) */
        await new Promise(r => setTimeout(r, 1000));
        const lastCol = document.getElementById(col);
        lastCol.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      async function addNewColorToTable(hex, msg) {
        const table = document.getElementById("blocks");

        if (rowRef.current  === 4) {
            rowRef.current = 0;
            colRef.current = colRef.current + 1;
            const newCol = document.createElement("td");
            newCol.id = colRef.current;
            table.appendChild(newCol);
        }

        const cell = document.getElementById(colRef.current);
        const tr = document.createElement("tr");
        tr.style.backgroundColor = hex;
	tr.setAttribute("data-info", msg); 
	cell.appendChild(tr);

        rowRef.current = rowRef.current + 1;
        setRow(rowRef.current);
        setCol(colRef.current);

        tr.style.width = "0px";
        await new Promise(r => setTimeout(r, 500));
        tr.style.width = "250px";
        return 1;

    }

  async function createInfoBox(msg){
	const infoBox = document.createElement("div");
        const lastCol = document.getElementById(col);
        const colPosition = lastCol.getBoundingClientRect().left;

	infoBox.textContent = msg;
	infoBox.id = "info";

	infoBox.style.position = "absolute"
	infoBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
	infoBox.style.color = "white";
	infoBox.style.padding = "10px";
	infoBox.style.borderRadius = "5px";
	infoBox.style.zIndex = 1000;
	infoBox.style.maxWidth = "200px";
	infoBox.style.whiteSpace = "nowrap";
	infoBox.style.textOverflow = "ellipsis";
	infoBox.style.overflow = "hidden";
	infoBox.style.top = "40%";  // Position it at the center of the page
	infoBox.style.left = `${colPosition}px`;	
	infoBox.style.transform = "translate(-50%, -50%)";  // Center alignment
	infoBox.style.transition = "opacity 0.3s ease";
	infoBox.style.opacity = "1";  // Ensure it is visible

	document.body.appendChild(infoBox);
	console.log("made box");
	return 0;
  };

  useEffect(() => {
    const rows = document.querySelectorAll("tr");
    rows.forEach((tr) => {
      const handleMouseOver = (event) => {
        const msg = tr.getAttribute("data-info");
	createInfoBox(msg);
        console.log(msg); // Show the msg (you can modify this to display it in a UI element)
      };

      const handleMouseLeave = () => {
	const ibox = document.getElementById("info");
      	ibox.remove();
      };

      tr.addEventListener("mouseover", handleMouseOver);
      tr.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        tr.removeEventListener("mouseover", handleMouseOver);
	tr.removeEventListener("mouseleave", handleMouseLeave);	
      };
    });
  }, [row, col]);

    useLayoutEffect(() => {
        if (colors.length > 0) {
            addNewColorToTable(colors[colors.length - 1]);
        }
    }, [colors]);

    useEffect(() => {
        animateHorizontalScroll();
    }, [col, row]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateColorsFromServer();
        }, 5000);

        return () => clearInterval(interval);
    }, [prevServerColors]);

    useEffect(() => {
        updateColorsFromServer();
    }, []);

    return (
    <div className="table_container" id="tablecontainer">
      <table id="blocks" style={{ border: "none", borderCollapse: "collapse"}}>
            <td id="0">
            </td>
      </table>
      </div>
    );
  }
