import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';

function App() {
	// react sets a hook 
	var [time, setTime] = useState("00:00:00");

	function TimeToPoints() {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

    // test 9:15:45
    // const hours = 12;
    // const minutes = 0;
    // const seconds = 0;

		const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
		const hourAngle = ( (hours % 12) / 12 ) * 360 + (minutes / 60) * 30 + (seconds / 60) * (30/60); // its 30 because the angle between hours in 30
		const secondAngle = ( seconds / 60 ) * 360;

		const minuteAngleRad = (minuteAngle) * (Math.PI / 180);
		const hourAngleRad = (hourAngle) * (Math.PI / 180);
		const secondAngleRad = (secondAngle) * (Math.PI / 180); 

		const radius = 2.5;

		const secondHand = new THREE.Vector3(
			Math.cos(secondAngleRad - (Math.PI/2)),
			-Math.sin(secondAngleRad - (Math.PI/2)),
			0 
		);
		
		const minuteHand = new THREE.Vector3(
		    Math.cos(minuteAngleRad - (Math.PI/2)), // x = radius * cos(angle)
		    -Math.sin(minuteAngleRad - (Math.PI/2)), // y = radius * sin(angle)
		    0 // z = 0 (since we're working on a 2D plane, z is flat)
		  );

		const hourHand = new THREE.Vector3(
		    Math.cos(hourAngleRad - (Math.PI/2)),
		    -Math.sin(hourAngleRad - (Math.PI/2)),
		    0
		  );

		  // secondHand.x = -secondHand.x
		  // minuteHand.x = -minuteHand.x;
		  // hourHand.x = -hourHand.x;

		  // Return the two Vector3 points
		  return { secondHand, minuteHand, hourHand };
	}

	// runs 1-2 times on render
	useEffect(() => {
	    // every 1s update the time 
	    setInterval(() => {
	      const dateObject = new Date().toLocaleTimeString();
	      setTime(dateObject)
	    }, 1000)
	
	// base objects: scene and camera 
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// sets up the canvas for WebGl 
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// objects that are added to the scene
	const clockGeometry = new THREE.CircleGeometry(3, 64);  // radius 5, 64 segments
	const clockMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
	const clock = new THREE.Mesh(clockGeometry, clockMaterial);
	scene.add(clock);
	
	const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const points = [];
	points.push( new THREE.Vector3( 0, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 0, 0 ) );

	const geometry = new THREE.BufferGeometry().setFromPoints( points );	
	const line = new THREE.Line( geometry, material );
	scene.add(line);

	const material_shand = new THREE.LineBasicMaterial( {color: 0xff0000 } );
	const points_shand = [];
	points_shand.push( new THREE.Vector3(0,0,0) );
	points_shand.push( new THREE.Vector3(0,0,0) );	
	const geometry_shand = new THREE.BufferGeometry().setFromPoints( points_shand );	
	const line_shand = new THREE.Line( geometry_shand, material_shand );
	scene.add(line_shand);

	camera.position.z = 5;

	// uses the native webgl animation rendering to update objects 
	function animate() {
		const clockVectors = TimeToPoints();
		geometry.attributes.position.setXYZ(0, clockVectors.hourHand.x, clockVectors.hourHand.y, clockVectors.hourHand.z);
		geometry.attributes.position.setXYZ(1, 0, 0, 0);  // Center of the clock (origin)
		geometry.attributes.position.setXYZ(2, clockVectors.minuteHand.x, clockVectors.minuteHand.y, clockVectors.minuteHand.z);
		geometry_shand.attributes.position.setXYZ(1, clockVectors.secondHand.x, clockVectors.secondHand.y, 0);
		geometry.attributes.position.needsUpdate = true;
		geometry_shand.attributes.position.needsUpdate = true;
		renderer.render( scene, camera );
	}
	renderer.setAnimationLoop( animate );	

	return () => {
		renderer.dispose()
	    if (renderer.domElement.parentElement) {
		renderer.domElement.parentElement.removeChild(renderer.domElement);
	    }
	};
	}, []); // empty array means useeffect will never re-render or "react"

return (
    <div className="App">
	  <h1>{time}</h1>
    </div>
  );
}

export default App;
