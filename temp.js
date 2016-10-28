var scene;
var box;
var camera;
var renderer;
// var width = 600;
var width = window.parent.screen.width;
// var height = 600;
var height = window.parent.screen.height;

//scene
scene = new THREE.Scene();

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x3B3B3D);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('stage').appendChild(renderer.domElement);
//plane
var plane = new THREE.Mesh(
	new THREE.PlaneGeometry(500, 500),
	new THREE.MeshBasicMaterial({color: 0xcccccc})
);
plane.rotation.x = -0.5* Math.PI;
scene.add(plane);

//camera
camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
camera.position.set(0, 70, 125);
camera.lookAt(scene.position);

//mouse contol
var controls = new THREE.OrbitControls(camera);

//light
var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0.7, 0.7);
    scene.add(directionalLight);
// var ambientLight = new THREE.AmbientLight(0xffffff); // 光源色を指定して生成
// scene.add(ambientLight);

//axes
var axes = new THREE.AxisHelper(2000);
scene.add(axes);

//===========================================================================
var boxSize = 5;
var boxSideOffset = 5;
var boxHeightOffset = 5;
var boxArray = Array();
var boxNum = 1;

for(var i = 0; i < boxNum; i++) {
	var box = new THREE.Mesh(
		new THREE.BoxGeometry(boxSize, boxSize, boxSize),
		new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false,})
	);
	if(i < boxNum/2) {
		box.position.set(-boxSideOffset * (boxNum - (i * 2 + 1)), boxHeightOffset, 0); 
	}else{
		box.position.set(boxSideOffset * ((i - boxNum/2) * 2 + 1), boxHeightOffset, 0);
	}
	boxArray[i] = box;
	scene.add(boxArray[i]);
}


//====================================================================================
function Sleep( T ){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1+1000*T ){    //T秒待つ 
       d2=new Date().getTime(); 
   } 
   return; 
} 

var x, y, z;
x = 0;
y = 10;
z = 0;

var x2, y2, z2;
x2 = 50;
y2 = 10;
z2 = 50;

var dx = 0.02;
var i = 50/0.5;
function loop() {
	requestAnimationFrame(loop);
	if(x < x2) {
		x += 0.5;
	}
	if(z < z2) {
		z += 0.5;
	}
	if(x < x2 / 2) {
		y += 0.1+dx*i;
		i--;
	}else{
		y -= 0.1+dx*i;
		i--;
	}
	boxArray[0].position.set(x, y, z);
	//周期調整
	// Sleep( 0.05 );
	controls.update();
	renderer.render(scene, camera);
}
loop();


