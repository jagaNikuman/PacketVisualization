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


//mesh
// -geometry
// -material
var boxSize = 5;
var boxSideOffset = 5;
var boxHeightOffset = 5;
box1 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box1.position.set(-boxSideOffset*9,boxHeightOffset,0);
scene.add(box1);

box2 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box2.position.set(-boxSideOffset*7,boxHeightOffset,0);
scene.add(box2);

box3 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box3.position.set(-boxSideOffset*5,boxHeightOffset,0);
scene.add(box3);

box4 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box4.position.set(-boxSideOffset*3,boxHeightOffset,0);
scene.add(box4);

box5 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box5.position.set(-boxSideOffset*1,boxHeightOffset,0);
scene.add(box5);

box6 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box6.position.set(boxSideOffset*1,boxHeightOffset,0);
scene.add(box6);

box7 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box7.position.set(boxSideOffset*3,boxHeightOffset,0);
scene.add(box7);

box8 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box8.position.set(boxSideOffset*5,boxHeightOffset,0);
scene.add(box8);

box9 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box9.position.set(boxSideOffset*7,boxHeightOffset,0);
scene.add(box9);

box10 = new THREE.Mesh(
	new THREE.BoxGeometry(boxSize,boxSize, boxSize),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac, wireframe: false})
);
box10.position.set(boxSideOffset*9,boxHeightOffset,0);
scene.add(box10);



//sphere
var sphere = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshPhongMaterial({color: 0xffffff}));
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);
sphere.position.set(0,30,-30);


//line 

var staticLineGeometry = new THREE.Geometry();
staticLineGeometry.vertices.push(new THREE.Vector3(box2.position.x,box2.position.y + boxSize/2,box2.position.z));
staticLineGeometry.vertices.push(new THREE.Vector3(box2.position.x,box2.position.y + boxSize + 10,box2.position.z));
var material = new THREE.LineBasicMaterial({color: 0x00FFFF, linewidth: 10});
var staticLine = new THREE.Line(staticLineGeometry, material);
scene.add(staticLine);


// dynamic line
var dynamicLinePoints = 1000;
var dynamicLineGeometry = new THREE.BufferGeometry();
var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
var array = dynamicLineGeometry.attributes.position.array;


var dynamicLineLengthOffset = 1;
var dynamicLineLength = 0;
var dynamicLineCounter = 0;
var _debugCounter = 0;
console.log("heightArray");
var dynamicLineHeightMin = box1.position.y + boxSize/2;
var dynamicLineHeightMax = sphere.position.y;
var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
dynamicLineLength = dynamicLineHeightLength;
console.log(dynamicLineHeightLength);
for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
	array[i-3] = box1.position.x;		//x
	array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
	array[i-1] = 0;		//z
	dynamicLineCounter++;
	console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
	_debugCounter++;

	// console.log(i);

}

console.log("depthArray");
var dynamicLineDepthMin = sphere.position.z;
var dynamicLineDepthMax = box1.position.z + boxSize/2;
var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
dynamicLineLength += dynamicLineDepthLength;
dynamicLineCounter = 0;
console.log(dynamicLineDepthLength);
for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
	array[i-3] = box1.position.x;		//x
	array[i-2] = dynamicLineHeightMax;		//y
	array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
	dynamicLineCounter++;
	console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
	_debugCounter++;
	// console.log(i);
}

console.log("widthArray");
var dynamicLineWidthMin = box1.position.x + boxSize/2;
var dynamicLineWidthMax = sphere.position.x;
var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
dynamicLineLength += dynamicLineWidthLength;
dynamicLineCounter = 0;
console.log(dynamicLineWidthLength);
for(var i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
	array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
	array[i-2] = dynamicLineHeightMax;		//y
	array[i-1] = dynamicLineDepthMin;		//z
	dynamicLineCounter++;
	console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
	_debugCounter++;
	// console.log(i);
}
dynamicLineGeometry.addGroup(0, 2, 0);

var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 5});
var dynamicLine = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

scene.add(dynamicLine);




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


//renderer
renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x3B3B3D);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('stage').appendChild(renderer.domElement);


function Sleep( T ){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1+1000*T ){    //T秒待つ 
       d2=new Date().getTime(); 
   } 
   return; 
} 
//1秒待つ 

//Rendering Loop
var i = 1;
function loop() {
	requestAnimationFrame(loop);
	dynamicLine.geometry.setDrawRange(i,i+10);
	i++;
	Sleep( 0.05 );
	controls.update();
	renderer.render(scene, camera);
}
loop();

