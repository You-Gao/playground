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
                    addNewColorToTable(data[i]['hex']);
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
                        prevServerColorsRef.current.find(color => color['data'] === data[i]['data'])) || 
                        colorsRef.current.includes(data[i]['hex'])) {
                            console.log("Color already exists in colors or prevServerColors");
                            continue;
                        }
                    } catch (error) {
                        console.error('Error comparing colors:', error);
                        console.error('Still adding new color to table:', data[i]['hex'], data[i]);
                    }
                    if (colorsRef.current.includes(data[i]['hex']))  {
                        continue;
                    }
                    addNewColorToTable(data[i]['hex']);
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
        /*  So, we use the native scrollIntoView method */
        // wait for the animation to finish
        await new Promise(r => setTimeout(r, 1000));
        const table = document.getElementById("blocks");
        const tableContainer = document.getElementById("tablecontainer");
        const lastCol = document.getElementById(col);
        lastCol.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

      async function addNewColorToTable(hex) {
        const table = document.getElementById("blocks");

        if (rowRef.current  === 4) {
            rowRef.current = 0;
            colRef.current = colRef.current + 1;
            const newCol = document.createElement("td");
            newCol.id = colRef.current;
            table.appendChild(newCol);
        }

        // add row to table
        const cell = document.getElementById(colRef.current);

        // add TR to the cell
        const tr = document.createElement("tr");
        tr.style.backgroundColor = hex;
        cell.appendChild(tr);

        rowRef.current = rowRef.current + 1;

        setRow(rowRef.current);
        setCol(colRef.current);

        // animate the row by setting width to 0 then to 250px
        tr.style.width = "0px";

        await new Promise(r => setTimeout(r, 500));
        tr.style.width = "250px";
        return 1;

    }

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