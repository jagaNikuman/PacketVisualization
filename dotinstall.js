var scene;
var box;
var camera;
var renderer;
var width = 600;
var height = 600;


//scene
scene = new THREE.Scene();


//mesh
// -geometry
// -material
var boxSize = 5;
box = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box.position.set(0,5,0);
scene.add(box);

box2 = new THREE.Mesh(
	new THREE.BoxGeometry(5,5,5),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: true})
);
box2.position.set(10,5,0);
scene.add(box2);

box3 = new THREE.Mesh(
	new THREE.BoxGeometry(5,5,5),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box3.position.set(20,5,0);
scene.add(box3);

box4 = new THREE.Mesh(
	new THREE.BoxGeometry(5,5,5),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box4.position.set(30,5,0);
scene.add(box4);

box5 = new THREE.Mesh(
	new THREE.BoxGeometry(5,5,5),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box5.position.set(40,5,0);
scene.add(box5);


//line 

var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(box2.position.x,box2.position.y + boxSize/2,box2.position.z));
lineGeometry.vertices.push(new THREE.Vector3(box2.position.x,box2.position.y + boxSize + 10,box2.position.z));
var material = new THREE.LineBasicMaterial({color: 0x00FFFF, linewidth: 10});
line = new THREE.Line(lineGeometry, material);
scene.add(line);


//plane
var plane = new THREE.Mesh(
	new THREE.PlaneGeometry(100, 50),
	new THREE.MeshBasicMaterial({color: 0xcccccc})
);
plane.rotation.x = -0.5* Math.PI;
scene.add(plane);


//camera
camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
camera.position.set(80, 50, 100);
camera.lookAt(scene.position);


//light
var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    scene.add(directionalLight);
// var ambientLight = new THREE.AmbientLight(0xffffff); // 光源色を指定して生成
// scene.add(ambientLight);


//axes
var axes = new THREE.AxisHelper(2000);
scene.add(axes);


//renderer
renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x3B3B3D);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('stage').appendChild(renderer.domElement);

//Move Camera from key input
document.onkeydown = function (e) {
	var key_code = e.keyCode;
	console.log(key_code);
	if(key_code == 37) {
		// ←
		camera.position.x -= 1;
	}else if (key_code == 38) {
		// ↑
		camera.position.y += 1;
	}else if (key_code == 39) {
		// →
		camera.position.x += 1;
	}else if (key_code == 40) {
		// ↓
		camera.position.y -= 1;
	}else if (key_code == 34) {
		// PageDown
		// camera.position.z -= 1;
	}else if (key_code == 35) {
		// End
		camera.position.z -= 1;
	}else if (key_code == 36) {
		// Home
		camera.position.z += (1/Math.PI);
	}else if (key_code == 33) {
		// PageUP
		// camera.rotation.z += (1/Math.PI);
	}

	camera.lookAt(scene.position);
}

//Rendering Loop
function loop() {
	requestAnimationFrame(loop);
	renderer.render(scene, camera);
}
loop();

