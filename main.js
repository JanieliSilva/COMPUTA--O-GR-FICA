import * as THREE from 'three';

class Cube {
	constructor(cube) {
		let min = -0.1;
		let max = 0.1;
		this.velX = min + (max-min)*Math.random();
		this.velY = min + (max-min)*Math.random();
		this.velZ = min + (max-min)*Math.random();
		this.cube = cube;
	}

	update(){
		this.cube.position.x += this.velX;
		if(this.cube.position.x>2 || this.cube.position.x<-2)
			this.velX = -this.velX;
		this.cube.position.y += this.velY;
		if(this.cube.position.y>2 || this.cube.position.y<-2)
			this.velY = -this.velY;
		this.cube.position.z += this.velZ;
		if(this.cube.position.z>2 || this.cube.position.z<-2)
			this.velZ = -this.velZ;
	}
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 0.5, 3, 3 );
const material = new THREE.MeshBasicMaterial( { color: 0xFF33FF, wireframe:true,  } );


let cubes=[];

for (let i = 0; i < 5; i++) {
	const cube = new Cube(new THREE.Mesh( geometry, material ));
	scene.add( cube.cube );
	cubes.push(cube);
}



scene.background = new THREE.Color( 0x222);

camera.position.z = 10;

function animate() {
	renderer.render( scene, camera );
	for(var cube of cubes)
		cube.update();
}

renderer.setAnimationLoop( animate );