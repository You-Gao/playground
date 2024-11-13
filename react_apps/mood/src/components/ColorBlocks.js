import './ColorBlocks.css';
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

function ColorBlocks({colors}) {



    useEffect(() => {
      }, [colors]); // Runs whenever 'colors' changes
      
    return (
        <div className="color-blocks">
            <ColorTable colors={colors} />
        </div>
    );
}

export default ColorBlocks;

function ColorTable({ colors }) {
    const [col, setCol] = useState(0);
    const [row, setRow] = useState(0);

    function animateHorizontalScroll() {
        /*  gsap can't be used because it doesn't support horizontal scrolling (only vertical *horizontal* scrolling) */
        /*  So, we use the native scrollIntoView method */
        const table = document.getElementById("blocks");
        const tableContainer = document.getElementById("tablecontainer");
        const lastCol = document.getElementById(col);
        lastCol.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
      }

    function addNewColorToTable(hex) {
        const table = document.getElementById("blocks");

        if ((col === 0) && (row === 3)) {
            // add row to table
            const cell = document.getElementById(col);

            // add TR to the cell
            const tr = document.createElement("tr");
            tr.style.backgroundColor = hex;
            cell.appendChild(tr);
            setRow(prev => 0);

            const newCol = document.createElement("td");
            newCol.id = col+1;
            table.appendChild(newCol);
            setCol(prev => prev + 1);

            return;
        }

        if (row === 4) {
            setRow(prev => 0);
            setCol(prev => prev + 1);
            const newCol = document.createElement("td");
            newCol.id = col+1;
            table.appendChild(newCol);
        }

        // add row to table
        const cell = document.getElementById(col);

        // add TR to the cell
        const tr = document.createElement("tr");
        tr.style.backgroundColor = hex;
        cell.appendChild(tr);

    }
    useEffect(() => {
        if (colors.length > 0) {
            addNewColorToTable(colors[colors.length - 1]);
            setRow(prev => prev + 1);
        }

        // Call this function when the table gets filled
        document.addEventListener('DOMContentLoaded', () => {
            // Assuming you have a way to detect when the table is filled
            // For example, you can call this function after populating the table
            animateHorizontalScroll();
        });

        return () => {
            document.removeEventListener('DOMContentLoaded', () => {
                animateHorizontalScroll();
            });
        }
    }, [colors]);

    useEffect(() => {
        animateHorizontalScroll();
    }, [col, row]);

    return (
    <div className="table_container" id="tablecontainer">
      <table id="blocks" style={{ border: "none", borderCollapse: "collapse"}}>
            <td id="0">
            </td>
      </table>
      </div>
    );
  }