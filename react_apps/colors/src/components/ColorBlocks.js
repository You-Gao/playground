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
            if (prevServerColorsRef.current.length === 1) {
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
                const newColors = [];
                for (let i = 0; i < data.length; i++) {
                    try {
                        if ((prevServerColorsRef.current.find(color => color['hex'] === data[i]['hex']) &&
                        prevServerColorsRef.current.find(color => color['data'] === data[i]['data'])) || 
                        colorsRef.current.includes(data[i]['hex'])) {
                            continue;
                        }
                    } catch (error) {
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
        try {
            const lastCol = document.getElementById(col);
            lastCol.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
        } catch (error) {
            console.error('Error during horizontal scroll animation:', error);
        }
      }

    async function mouseScroll(event) {
        if (event.clientX < 200) {
            window.scrollBy({
                top: 0,
                left: -400,
                behavior: "smooth"
            });
        }

        if (event.clientX > 1000) {
            window.scrollBy({
                top: 0,
                left: 400,
                behavior: "smooth"
            });
        }
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

function createInfoBox(msg, colPosition, colTop){
	const infoBox = document.createElement("div");
	infoBox.textContent = msg;
	infoBox.id = "info";
    infoBox.className = "InfoBox";

	infoBox.style.top = `${colTop + window.scrollY}px`;
	infoBox.style.left = `${colPosition + window.scrollX}px`;	

	document.body.appendChild(infoBox);
	return 0;
  };

  useEffect(() => {
    const rows = document.querySelectorAll("tr");
    rows.forEach((tr) => {
      const handleMouseOver = (event) => {
        const msg = tr.getAttribute("data-info");
        const colPosition = tr.getBoundingClientRect().left;
        const colTop = tr.getBoundingClientRect().top;

        let infoBox = document.getElementById("info");
        if (!infoBox) {
            createInfoBox(msg, colPosition, colTop);
        }
      };

      const handleMouseLeave = () => {
        const infoBox = document.getElementById("info");
        if (infoBox) {
          infoBox.remove();
        }
      };

      tr.addEventListener("mouseover", handleMouseOver);
      tr.addEventListener("mouseleave", handleMouseLeave);
      tr.addEventListener("mousemove", mouseScroll);

      return () => {
        tr.removeEventListener("mouseover", handleMouseOver);
	    tr.removeEventListener("mouseleave", handleMouseLeave);
        tr.removeEventListener("mousemove", mouseScroll);
      };
    });
  }, [row, col]);

    useLayoutEffect(() => {
        if (colors.length > 0) {
            const newestColor = colors[colors.length - 1];
            const newestColorHex = colors[colors.length - 1]['hex'];
            const newestColorText = colors[colors.length - 1]['data'];
            addNewColorToTable(newestColorHex, newestColorText);

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
