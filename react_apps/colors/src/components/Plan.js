import { useEffect, useState } from 'react';
import './Plan.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Plan(){
	const [loggedIn, setLoggedIn] = useState(false);

	function listenForPassword(){
		const password = document.getElementById('password').value;
		if (password === 'axciom_group'){
			setLoggedIn(true);
			// animate later
			const password = document.getElementById('password');
			password.style.opacity = 0;
		}
	}

	useEffect(() => {
		try {
			document.getElementById('password').addEventListener('keyup', listenForPassword);
		} catch(e){
			console.log(e);
		}
		return () => {
			try {
			document.getElementById('password').removeEventListener('keyup', listenForPassword);
			} catch(e){
			console.log(e);
	
			}
		}
	}
	, []);


  return (
	loggedIn ? <EvilPlan /> : <Login />
  );
}


function Login(){
	return (
		<body className="PlanBody">
			<textarea type="password" id="password" placeholder="Enter password"></textarea>
		</body>
	);
}

function EvilPlan(){

	useEffect(() => {
		try {
			// animate the title by adding each letter one by one
			const title = document.getElementById('PlanTitle');
			const titleText = "Project Briefing: Colors (JAADCEW)"; // just another aesthetic data capture and exfiltration website (JAADCEW)
			title.innerHTML = '';
			let i = 0;
			const interval = setInterval(() => {
				// if innerHTML is null (like when on subpage), set it to empty string
				try {
					if (title.innerHTML === 'null'){
						title.innerHTML = '';
					}
				}
				catch (e){
					console.log(e);
					return;
				}
				title.innerHTML += titleText[i];
				i++;
				if (i === titleText.length){
					clearInterval(interval);
				}
			}, 100);

			// animate the time by updating it every second
			const time = document.getElementById('Time');
			const date = new Date();
			time.innerHTML = date.toLocaleTimeString();
			setInterval(() => {
				const date = new Date();
				time.innerHTML = date.toLocaleTimeString();
			}, 1000);
		} catch (e) {
			console.log(e);
		}

		return () => {
			// set the title back to empty
			try {
				const title = document.getElementById('PlanTitle');
			} catch (e) {
				console.log(e);
			}
		}
	}, []);

	const location = useLocation();

    return (
        <div className="PlanBody">
            {location.pathname === '/plan' && (
                <div className="PlanHeader">
                    <h1 className="PlanTitle" id="PlanTitle">Project Briefing: Colors (JAADCEW)</h1>
                    <ul className="PlanList">
                        <li> 
                        <Link to="/plan/market">Economics of Data</Link>
                        </li>
                        <li>
						<Link to="/plan/website">Colors: User/Data Strategy</Link>
                        </li>
                        <li>
                            <Link to="/plan/data">Technical Report</Link>
                        </li>
                        <li>
                            <Link to="/plan/demo">Fingerprinting Demo</Link>
                        </li>
                    </ul>
                </div>
            )}
			<div className="TIME"><h1 id="Time"></h1></div>
            <div className="CEO">logged in as: ceo</div>
            <Outlet />
        </div>
    );
}

export default Plan;
