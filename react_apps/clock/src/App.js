import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';

function App() {
	// react sets a hook 
	var [time, setTime] = useState("00:00:00"); 

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
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	camera.position.z = 5;

	// uses the native webgl animation rendering to update objects 
	function animate() {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
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
