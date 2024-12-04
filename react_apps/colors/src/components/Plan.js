import { useEffect, useState } from 'react';
import './Plan.css';

function Plan(){
	const [loggedIn, setLoggedIn] = useState(false);

	function listenForPassword(){
		const password = document.getElementById('password').value;
		if (password === ' '){
			setLoggedIn(true);
			// animate later
			const password = document.getElementById('password');
			password.style.opacity = 0;
		}
	}

	// function animateLogin(){
	// 	// shrink the lines of the textarea together towards the center
	// 	const password = document.getElementById('password');
	// 	password.style.opacity = 0;

	// 	// make 2 lines appear from the center and 
	// 	// expand towards the edges of the screen
	// 	const line1 = document.createElement('div');
	// 	line1.className = 'line';
	// 	const line2 = document.createElement('div');
	// 	line2.className = 'line';
	// 	document.body.appendChild(line1);
	// 	document.body.appendChild(line2);

	// 	setTimeout(() => {
	// 		line1.style.left = '0';
	// 		line2.style.right = '0';
	// 	}, 1000);
		
	// 	setTimeout(() => {
	// 		line1.style.left = '-100%';
	// 		line2.style.right = '-100%';
	// 	}, 2000);

	// 	setTimeout(() => {
	// 		line1.remove();
	// 		line2.remove();
	// 	}, 4000);

	// }


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
		// animate the title by adding each letter one by one
		const title = document.getElementById('PlanTitle');
		const titleText = "Project Briefing: Colors (JAADCEW)"; // just another aesthetic data capture and exfiltration website (JAADCEW)
		let i = 0;
		const interval = setInterval(() => {
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

		return () => {
			// set the title back to empty
			title.innerHTML = '';
			clearInterval(interval);
		}
	}, []);

	return (
		<div className="PlanBody">
			<div className="PlanHeader">
				<h1 className="PlanTitle" id="PlanTitle"></h1>
				<ul className="PlanList">
					<li> 
						Market Analysis
					</li>
					<li>
						The Website
					</li>
					<li>
						Data Capture and Exfiltration
					</li>
				</ul>
			</div>
			<h1 id ="Time"></h1>
			<div className="TestLink">logged in as: ceo</div>
		</div>
	);
}

export default Plan;
