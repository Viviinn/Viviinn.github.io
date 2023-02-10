var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    gobalLight, shadowLight, backLight,
    renderer,
    container,
    controls;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH, windowHalfX, windowHalfY,
    mousePos = { x: 0, y: 0 },
    oldMousePos = {x:0, y:0},
    ballWallDepth = 28;


//3D OBJECTS VARIABLES

var hero;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function initScreenAnd3D() {
  
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  camera.position.x = 0;
  camera.position.z = 300;
  camera.position.y = 250;
  camera.lookAt(new THREE.Vector3(0, 60, 0));

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  
  window.addEventListener('resize', handleWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  
  /*
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = -Math.PI / 2; 
  controls.maxPolarAngle = Math.PI / 2;
  controls.noZoom = true;
  controls.noPan = true;
  //*/


}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
  mousePos = {x:event.clientX, y:event.clientY};
} 

function handleTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
  }
}

function createLights() {
  globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
  
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = .2;
  shadowLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;
  
  backLight = new THREE.DirectionalLight(0xffffff, .4);
  backLight.position.set(-100, 100, 100);
  backLight.castShadow = true;
  backLight.shadowDarkness = .1;
  backLight.shadowMapWidth = shadowLight.shadowMapHeight = 2048;
  
  scene.add(globalLight);
  scene.add(shadowLight);
  scene.add(backLight);
}

function createFloor(){ 
  floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000), new THREE.MeshBasicMaterial({color: 0x6ecccc}));
  floor.rotation.x = -Math.PI/2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);
}

function createHero() {
  hero = new Cat();
  scene.add(hero.threeGroup);
}

function createBall() {
  ball = new Ball();
  scene.add(ball.threeGroup);
}

// BALL RELATED CODE


var woolNodes = 10,
	woolSegLength = 2,
	gravity = -.8,
	accuracy =1;


Ball = function(){

	var redMat = new THREE.MeshLambertMaterial ({
	    color: 0x630d15, 
	    shading:THREE.FlatShading
	});

	var stringMat = new THREE.LineBasicMaterial({
    	color: 0x630d15,
    	linewidth: 3
	});

	this.threeGroup = new THREE.Group();
	this.ballRay = 8;

	this.verts = [];

	// string
	var stringGeom = new THREE.Geometry();

	for (var i=0; i< woolNodes; i++	){
		var v = new THREE.Vector3(0, -i*woolSegLength, 0);
		stringGeom.vertices.push(v);

		var woolV = new WoolVert();
		woolV.x = woolV.oldx = v.x;
		woolV.y = woolV.oldy = v.y;
		woolV.z = 0;
		woolV.fx = woolV.fy = 0;
		woolV.isRootNode = (i==0);
		woolV.vertex = v;
		if (i > 0) woolV.attach(this.verts[(i - 1)]);
		this.verts.push(woolV);
		
	}
  	this.string = new THREE.Line(stringGeom, stringMat);

  	// body
  	var bodyGeom = new THREE.SphereGeometry(this.ballRay, 5,4);
	this.body = new THREE.Mesh(bodyGeom, redMat);
  	this.body.position.y = -woolSegLength*woolNodes;

  	var wireGeom = new THREE.TorusGeometry( this.ballRay, .5, 3, 10, Math.PI*2 );
  	this.wire1 = new THREE.Mesh(wireGeom, redMat);
  	this.wire1.position.x = 1;
  	this.wire1.rotation.x = -Math.PI/4;

  	this.wire2 = this.wire1.clone();
  	this.wire2.position.y = 1;
  	this.wire2.position.x = -1;
  	this.wire1.rotation.x = -Math.PI/4 + .5;
  	this.wire1.rotation.y = -Math.PI/6;

  	this.wire3 = this.wire1.clone();
  	this.wire3.rotation.x = -Math.PI/2 + .3;

  	this.wire4 = this.wire1.clone();
  	this.wire4.position.x = -1;
  	this.wire4.rotation.x = -Math.PI/2 + .7;

  	this.wire5 = this.wire1.clone();
  	this.wire5.position.x = 2;
  	this.wire5.rotation.x = -Math.PI/2 + 1;

  	this.wire6 = this.wire1.clone();
  	this.wire6.position.x = 2;
  	this.wire6.position.z = 1;
  	this.wire6.rotation.x = 1;

  	this.wire7 = this.wire1.clone();
  	this.wire7.position.x = 1.5;
  	this.wire7.rotation.x = 1.1;

  	this.wire8 = this.wire1.clone();
  	this.wire8.position.x = 1;
  	this.wire8.rotation.x = 1.3;

  	this.wire9 = this.wire1.clone();
  	this.wire9.scale.set(1.2,1.1,1.1);
  	this.wire9.rotation.z = Math.PI/2;
  	this.wire9.rotation.y = Math.PI/2;
  	this.wire9.position.y = 1;
  	
  	this.body.add(this.wire1);
  	this.body.add(this.wire2);
  	this.body.add(this.wire3);
  	this.body.add(this.wire4);
  	this.body.add(this.wire5);
  	this.body.add(this.wire6);
  	this.body.add(this.wire7);
  	this.body.add(this.wire8);
  	this.body.add(this.wire9);

  	this.threeGroup.add(this.string);
	this.threeGroup.add(this.body);

	this.threeGroup.traverse( function ( object ) {
    if ( object instanceof THREE.Mesh ) {
      object.castShadow = true;
      object.receiveShadow = true;
    }});

}