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

// var staticLineGeometry = new THREE.Geometry();
// staticLineGeometry.vertices.push(new THREE.Vector3(box2.position.x,box2.position.y + boxSize/2,box2.position.z));
// staticLineGeometry.vertices.push(new THREE.Vector3(box2.position.x,box2.position.y + boxSize + 10,box2.position.z));
// var material = new THREE.LineBasicMaterial({color: 0x00FFFF, linewidth: 10});
// var staticLine = new THREE.Line(staticLineGeometry, material);
// scene.add(staticLine);


// dynamic line
var dynamicLine;
var dynamicLinePoints;
function drawDynamicLine() {
	dynamicLinePoints = 88;
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
	var i;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLinePoints = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 1});
	dynamicLine = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine);

};
drawDynamicLine();

//##############################################################DynamicLine2#######################################################
var dynamicLine2;
var dynamicLine2Points;
function drawDynamicLine2() {
	dynamicLine2Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box2.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box2.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box2.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box2.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMin = box2.position.x + boxSize/2;
	var dynamicLineWidthMax = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine2Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 1});
	dynamicLine2 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine2);

};
drawDynamicLine2();

//###########################################################################################################################


//##############################################################DynamicLine3#######################################################
var dynamicLine3;
var dynamicLine3Points;
function drawDynamicLine3() {
	dynamicLine3Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box3.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box3.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box3.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box3.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMin = box3.position.x + boxSize/2;
	var dynamicLineWidthMax = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine3Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 100});
	dynamicLine3 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine3);

};
drawDynamicLine3();

//###########################################################################################################################


//##############################################################DynamicLine4#######################################################
var dynamicLine4;
var dynamicLine4Points;
function drawDynamicLine4() {
	dynamicLine4Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box4.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box4.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box4.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box4.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMin = box4.position.x + boxSize/2;
	var dynamicLineWidthMax = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine4Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 100});
	dynamicLine4 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine4);

};
drawDynamicLine4();

//###########################################################################################################################


//##############################################################DynamicLine5#######################################################
var dynamicLine5;
var dynamicLine5Points = 88;
function drawDynamicLine5() {
	dynamicLine5Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box2.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box5.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box5.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box5.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMin = box5.position.x + boxSize/2;
	var dynamicLineWidthMax = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine5Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 100});
	dynamicLine5 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine5);

};
drawDynamicLine5();

//###########################################################################################################################


//##############################################################DynamicLine6#######################################################
var dynamicLine6;
var dynamicLine6Points;
function drawDynamicLine6() {
	dynamicLine6Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box6.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box6.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box6.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box6.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMax = box6.position.x + boxSize/2;
	var dynamicLineWidthMin = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i = 0;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMax - dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine6Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 100});
	dynamicLine6 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine6);

};
drawDynamicLine6();

//###########################################################################################################################


//##############################################################DynamicLine6#######################################################
var dynamicLine7;
var dynamicLine7Points;
function drawDynamicLine7() {
	dynamicLine7Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box7.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box7.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box7.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box7.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMax = box7.position.x + boxSize/2;
	var dynamicLineWidthMin = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i = 0;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMax - dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine7Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 100});
	dynamicLine7 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine7);

};
drawDynamicLine7();

//###########################################################################################################################


//##############################################################DynamicLine8#######################################################
var dynamicLine8;
var dynamicLine8Points;
function drawDynamicLine8() {
	dynamicLine8Points = 88;
	var dynamicLineGeometry = new THREE.BufferGeometry();
	var dynamicLinePositions = new Float32Array(dynamicLinePoints * 32);
	dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
	var array = dynamicLineGeometry.attributes.position.array;


	var dynamicLineLengthOffset = 1;
	var dynamicLineLength = 0;
	var dynamicLineCounter = 0;
	var _debugCounter = 0;
	console.log("heightArray");
	var dynamicLineHeightMin = box8.position.y + boxSize/2;
	var dynamicLineHeightMax = sphere.position.y;
	var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
	dynamicLineLength = dynamicLineHeightLength;
	console.log(dynamicLineHeightLength);
	for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
		array[i-3] = box8.position.x;		//x
		array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
		array[i-1] = 0;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;

		// console.log(i);

	}

	console.log("depthArray");
	var dynamicLineDepthMin = sphere.position.z;
	var dynamicLineDepthMax = box8.position.z + boxSize/2;
	var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
	dynamicLineLength += dynamicLineDepthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineDepthLength);
	for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
		array[i-3] = box8.position.x;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}

	console.log("widthArray");
	var dynamicLineWidthMax = box8.position.x + boxSize/2;
	var dynamicLineWidthMin = sphere.position.x;
	var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
	dynamicLineLength += dynamicLineWidthLength;
	dynamicLineCounter = 0;
	console.log(dynamicLineWidthLength);
	var i = 0;
	for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
		array[i-3] = dynamicLineWidthMax - dynamicLineLengthOffset*dynamicLineCounter;		//x
		array[i-2] = dynamicLineHeightMax;		//y
		array[i-1] = dynamicLineDepthMin;		//z
		dynamicLineCounter++;
		console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
		_debugCounter++;
		// console.log(i);
	}
	dynamicLine8Points = i/3;
	dynamicLineGeometry.addGroup(0, 2, 0);

	var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 100});
	dynamicLine8 = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

	scene.add(dynamicLine8);

};
drawDynamicLine8();

//###########################################################################################################################

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

var drawLine1Flag = false;
var drawLine2Flag = false;
var drawLine3Flag = false;
var drawLine4Flag = false;
var drawLine5Flag = false;
var drawLine6Flag = false;
var drawLine7Flag = false;
var drawLine8Flag = false;
//Debug dynamicLine by Keyboard
/*
1: 49
2: 50
3: 51
4: 52
5: 53
6: 54
7: 55
8: 56
9: 57
0: 48
*/
document.onkeydown = function (e) {
	var key_code = e.keyCode;
	console.log(key_code);
	if(key_code == 49) {
		console.log("draw box1 line");
		drawLine1Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 50) {
		console.log("draw box2 line");
		drawLine2Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 51) {
		console.log("draw box3 line");
		drawLine3Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 52) {
		console.log("draw box4 line");
		drawLine4Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 53) {
		console.log("draw box5 line");
		drawLine5Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 54) {
		console.log("draw box6 line");
		drawLine6Flag = true;
		console.log(drawLine1Flag);
		drawLine6Flag = true;
	}else if (key_code == 55) {
		console.log("draw box7 line");
		drawLine7Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 56) {
		console.log("draw box8 line");
		drawLine8Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 57) {
		console.log("draw box9 line");
		drawLine9Flag = true;
		console.log(drawLine1Flag);
	}else if (key_code == 48) {
		console.log("draw box10 line");
		drawLine10Flag = true;
		console.log(drawLine1Flag);
	}

	camera.lookAt(scene.position);
}


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
var i = 0;
var dLine1cnt = 0;
var dLine2cnt = 0;
var dLine3cnt = 0;
var dLine4cnt = 0;
var dLine5cnt = 0;
var dLine6cnt = 0;
var dLine7cnt = 0;
var dLine8cnt = 0;
function loop() {
	requestAnimationFrame(loop);
	console.log(drawLine1Flag);
	// console.log(i);

	if(dLine1cnt+10 < dynamicLinePoints && drawLine1Flag == true) {
		dynamicLine.geometry.setDrawRange(dLine1cnt,10);
		dLine1cnt++;
	}else{
		dynamicLine.geometry.setDrawRange(0,1);
		dLine1cnt = 0;
		drawLine1Flag = false;
		console.log(dynamicLinePoints);
	}
	
	if(dLine2cnt+10 < dynamicLine2Points && drawLine2Flag == true) {
		dynamicLine2.geometry.setDrawRange(dLine2cnt,10);
		dLine2cnt++;
	}else{
		dynamicLine2.geometry.setDrawRange(0,1);
		dLine2cnt = 0;
		drawLine2Flag = false;
	}
	
	if(dLine3cnt+10 < dynamicLine3Points && drawLine3Flag == true) {
		dynamicLine3.geometry.setDrawRange(dLine3cnt,10);
		dLine3cnt++;
	}else{
		dynamicLine3.geometry.setDrawRange(0,1);
		dLine3cnt = 0;
		drawLine3Flag = false;
	}
	
	if(dLine4cnt+10 < dynamicLine4Points && drawLine4Flag == true) {
		dynamicLine4.geometry.setDrawRange(dLine4cnt,10);
		dLine4cnt++;
	}else{
		dynamicLine4.geometry.setDrawRange(0,1);
		dLine4cnt = 0;
		drawLine4Flag = false;
	}
	
	if(dLine5cnt+10 < dynamicLine5Points && drawLine5Flag == true) {
		dynamicLine5.geometry.setDrawRange(dLine5cnt,10);
		dLine5cnt++;
	}else{
		dynamicLine5.geometry.setDrawRange(0,1);
		dLine5cnt = 0;
		drawLine5Flag = false;
	}
		
	if(dLine6cnt+10 < dynamicLine6Points && drawLine6Flag == true) {
		dynamicLine6.geometry.setDrawRange(dLine6cnt,10);
		dLine6cnt++;
	}else{
		dynamicLine6.geometry.setDrawRange(0,1);
		dLine6cnt = 0;
		drawLine6Flag = false;
	}
		
	if(dLine7cnt+10 < dynamicLine7Points && drawLine7Flag == true) {
		dynamicLine7.geometry.setDrawRange(dLine7cnt,10);
		dLine7cnt++;
	}else{
		dynamicLine7.geometry.setDrawRange(0,1);
		dLine7cnt = 0;
		drawLine7Flag = false;
	}
		
	if(dLine8cnt+10 < dynamicLine8Points && drawLine8Flag == true) {
		dynamicLine8.geometry.setDrawRange(dLine8cnt,10);
		dLine8cnt++;
	}else{
		dynamicLine8.geometry.setDrawRange(0,1);
		dLine8cnt = 0;
		drawLine8Flag = false;
	}
	
	// if(dLine6cnt+10 < dynamicLine6Points && drawLine6Flag == true) {
	// 	dynamicLine6.geometry.setDrawRange(dLine6cnt,10);
	// 	dLine6cnt++;
	// }else{
	// 	dynamicLine6.geometry.setDrawRange(0,1);
	// 	dLine6cnt = 0;
	// 	drawLine6Flag = false;
	// }
	
	// if(dLine6cnt+10 < dynamicLine6Points && drawLine6Flag == true) {
	// 	dynamicLine6.geometry.setDrawRange(dLine6cnt,10);
	// 	dLine6cnt++;
	// }else{
	// 	dynamicLine6.geometry.setDrawRange(0,1);
	// 	dLine6cnt = 0;
	// 	drawLine6Flag = false;
	// }
	
	Sleep( 0.05 );
	controls.update();
	renderer.render(scene, camera);
}
loop();


