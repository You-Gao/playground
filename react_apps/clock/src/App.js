import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';

function App() {
	// react sets a hook 
	var [time, setTime] = useState("");

	function TimeToPoints(radius = 2.5) {
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

		const secondHand = new THREE.Vector3(
			Math.cos(secondAngleRad - (Math.PI/2)) * radius * 1,
			-Math.sin(secondAngleRad - (Math.PI/2)) * radius * 1,
			0 
		);
		
		const minuteHand = new THREE.Vector3(
		    Math.cos(minuteAngleRad - (Math.PI/2)) * radius * .9, // x = radius * cos(angle)
		    -Math.sin(minuteAngleRad - (Math.PI/2)) * radius * .9, // y = radius * sin(angle)
		    0 // z = 0 (since we're working on a 2D plane, z is flat)
		  );

		const hourHand = new THREE.Vector3(
		    Math.cos(hourAngleRad - (Math.PI/2)) * radius * .7,
		    -Math.sin(hourAngleRad - (Math.PI/2)) * radius * .7,
		    0
		  );

		  const points = []
      points.push(secondHand)
      points.push(minuteHand)
      points.push(hourHand)
		  return points;
	}

  function compareSecondPoints(point1, point2, tolerance = 1e-6) {
    return Math.abs(point1.x - point2.x) < tolerance &&
            Math.abs(point1.y - point2.y) < tolerance &&
            Math.abs(point1.z - point2.z) < tolerance;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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
  const clocks = {};
  const hands = {}; // [second, minute, hour]

  const screen_width = window.innerWidth;
  const screen_height = window.innerHeight;

  const clock_amnt = 70;
  for (let i = 0; i < clock_amnt; i++) {
    const random_rad = getRandomArbitrary(.5, 1.5);

    // object creation defines which object is on top of the other
    // the clock is on top of the outline
    // scnee.add does not define the order of the objects
    const outlineGeometry = new THREE.CircleGeometry(random_rad + 0.05, 64);
    const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);

    const clockGeometry = new THREE.CircleGeometry(random_rad, 64);
    const clockMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide });
    const clock = new THREE.Mesh(clockGeometry, clockMaterial);
    
    scene.add(outline);
    scene.add(clock);

    clocks[i] = [clock, random_rad];

    // the minute and hour hand 
    const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    const points = [];
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 0, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add(line);

    // the second hand
    const material_shand = new THREE.LineBasicMaterial( {color: 0xff0000 } );
    const points_shand = [];
    points_shand.push( new THREE.Vector3(0,0,0) );
    points_shand.push( new THREE.Vector3(0,0,0) );
    const geometry_shand = new THREE.BufferGeometry().setFromPoints( points_shand );
    const line_shand = new THREE.Line( geometry_shand, material_shand );
    scene.add(line_shand);
    hands[i] = [geometry_shand, geometry];

    // set it randomly on the screen
    clock.position.x = getRandomArbitrary(-8, 8);
    clock.position.y = getRandomArbitrary(-8, 8);
    outline.position.x = clock.position.x;
    outline.position.y = clock.position.y;
    line.position.x = clock.position.x;
    line.position.y = clock.position.y;
    line_shand.position.x = clock.position.x;
    line_shand.position.y = clock.position.y;
  }

  const outlineGeometry = new THREE.CircleGeometry(2.5 + 0.05, 64);
  const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
  scene.add(outline);

	const clockGeometry = new THREE.CircleGeometry(2.5, 64);
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

    // 0 is second, 1 is minute, 2 is hour
		const clockVectors = TimeToPoints();

    // if the second hand has not moved, don't update the scene
    const secondHand_old = new THREE.Vector3(geometry_shand.attributes.position.getX(1), geometry_shand.attributes.position.getY(1), 0);
    const secondHand_new = clockVectors[0];
    if (compareSecondPoints(secondHand_new, secondHand_old)) {
      return;
    }
    geometry_shand.attributes.position.setXYZ(1, clockVectors[0].x, clockVectors[0].y, 0);
    geometry.attributes.position.setXYZ(0, clockVectors[1].x, clockVectors[1].y, 0);
    geometry.attributes.position.setXYZ(2, clockVectors[2].x, clockVectors[2].y, 0);
    geometry.attributes.position.needsUpdate = true;
    geometry_shand.attributes.position.needsUpdate = true;

    // loop through all the clocks and update the hands
    for (let i = 0; i < clock_amnt; i++) {
      const clock = clocks[i][0];
      const radius = clocks[i][1];
      const hand = hands[i];
      const clockVectors = TimeToPoints(radius);
      // second hand
      hand[0].attributes.position.setXYZ(1, clockVectors[0].x, clockVectors[0].y, 0);
      // hand[0].attributes.position.setXYZ(0, clock.position.x, clock.position.y, 0); // already set when created
      // minute and hour hand
      hand[1].attributes.position.setXYZ(0, clockVectors[1].x, clockVectors[1].y, 0);
      hand[1].attributes.position.setXYZ(2, clockVectors[2].x, clockVectors[2].y, 0);
      hand[0].attributes.position.needsUpdate = true;
      hand[1].attributes.position.needsUpdate = true;
    
    }

    renderer.render( scene, camera );

	}
	renderer.setAnimationLoop( animate );	

  // canvas resize listeners
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // canvas load listener
  window.addEventListener('DOMContentLoaded', () => {
    setIsLoaded(true);
  });

  window.addEventListener('load', () => {
    setIsLoaded(true);
  });

  if (document.readyState === "complete") {
	  setIsLoaded(true);
}

	return () => {
		renderer.dispose()
	    if (renderer.domElement.parentElement) {
		renderer.domElement.parentElement.removeChild(renderer.domElement);
	    }
    window.removeEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    window.removeEventListener('DOMContentLoaded', () => {
      setIsLoaded(true);
    });
    window.removeEventListener('load', () => {
      setIsLoaded(true);
    });
	};
	}, []); // empty array means useeffect will never re-render or "react"

  const [isLoaded, setIsLoaded] = useState(false);
  // if not loaded return different html
return (
    <div className="App">
      { isLoaded ?
       <h1>{time}</h1> : 
       <h1>Loading...</h1>
      }
	  
    </div>
  );
}

export default App;
