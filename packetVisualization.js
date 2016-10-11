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

//mesh
// -geometry
// -material
var boxSize = 5;
var boxSideOffset = 5;
var boxHeightOffset = 5;
var boxArray = Array();
var boxNum = 30;

var loader = new THREE.TextureLoader();
loader.crossOrigin = 'Anonymous';
var mapTexture = loader.load( 'texture/mario.jpg');
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

//sphere
var sphere = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshPhongMaterial({color: 0xffffff}));
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);
sphere.position.set(0,30,-30);

// dynamic line
var dynamicLineArray = new Array();
var dynamicLinePointsArray = new Array();

for(var num = 0; num < boxNum; num++) {
	function drawDynamicLine() {
		dynamicLinePointsArray[num] = 100;
		var dynamicLineGeometry = new THREE.BufferGeometry();
		var dynamicLinePositions = new Float32Array(dynamicLinePointsArray[num] * 32);
		dynamicLineGeometry.addAttribute('position', new THREE.BufferAttribute(dynamicLinePositions, 3));
		var array = dynamicLineGeometry.attributes.position.array;

		var dynamicLineLengthOffset = 1;
		var dynamicLineLength = 0;
		var dynamicLineCounter = 0;
		var _debugCounter = 0;
		// console.log("heightArray");
		var dynamicLineHeightMin = boxArray[num].position.y + boxSize/2;
		var dynamicLineHeightMax = sphere.position.y;
		var dynamicLineHeightLength = dynamicLineHeightMax - dynamicLineHeightMin;
		dynamicLineLength = dynamicLineHeightLength;
		// console.log(dynamicLineHeightLength);
		for(var i=3; i < dynamicLineLength*3 +3; i = i+3) {
			array[i-3] = boxArray[num].position.x;		//x
			array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
			array[i-1] = 0;		//z
			dynamicLineCounter++;
			// console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
			_debugCounter++;

			// console.log(i);

		}

		// console.log("depthArray");
		var dynamicLineDepthMin = sphere.position.z;
		var dynamicLineDepthMax = boxArray[num].position.z + boxSize/2;
		var dynamicLineDepthLength = dynamicLineDepthMax - dynamicLineDepthMin;
		dynamicLineLength += dynamicLineDepthLength;
		dynamicLineCounter = 0;
		// console.log(dynamicLineDepthLength);
		for(var i=Math.floor((dynamicLineLength - dynamicLineDepthLength)*3 +5); i < dynamicLineLength*3 +5; i = i+3) {
			array[i-3] = boxArray[num].position.x;		//x
			array[i-2] = dynamicLineHeightMax;		//y
			array[i-1] = dynamicLineDepthMax - dynamicLineLengthOffset*dynamicLineCounter;		//z
			dynamicLineCounter++;
			// console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
			_debugCounter++;
			// console.log(i);
		}

		// console.log("widthArray");
		if(num < boxNum/2) {
			var dynamicLineWidthMin = boxArray[num].position.x + boxSize/2;
			var dynamicLineWidthMax = sphere.position.x;
			var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
			dynamicLineLength += dynamicLineWidthLength;
			dynamicLineCounter = 0;
			// console.log(dynamicLineWidthLength);
			var i;
			for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
				if(num < boxNum/2) {
					array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
					array[i-2] = dynamicLineHeightMax;		//y
					array[i-1] = dynamicLineDepthMin;		//z
				}else{
					array[i-3] = boxArray[num].position.x;		//x
					array[i-2] = dynamicLineHeightMin + dynamicLineLengthOffset*dynamicLineCounter;		//y
					array[i-1] = 0;		//z
				}
				array[i-3] = dynamicLineWidthMin + dynamicLineLengthOffset*dynamicLineCounter;		//x
				array[i-2] = dynamicLineHeightMax;		//y
				array[i-1] = dynamicLineDepthMin;		//z
				dynamicLineCounter++;
				// console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
				_debugCounter++;
				// console.log(i);
			}
		}else{
			var dynamicLineWidthMax = boxArray[num].position.x + boxSize/2;
			var dynamicLineWidthMin = sphere.position.x;
			var dynamicLineWidthLength = dynamicLineWidthMax - dynamicLineWidthMin;
			dynamicLineLength += dynamicLineWidthLength;
			dynamicLineCounter = 0;
			// console.log(dynamicLineWidthLength);
			var i = 0;
			for(i=(dynamicLineLength - dynamicLineWidthLength)*3 +6; i < dynamicLineLength*3 +6; i = i+3) {
				array[i-3] = dynamicLineWidthMax - dynamicLineLengthOffset*dynamicLineCounter;		//x
				array[i-2] = dynamicLineHeightMax;		//y
				array[i-1] = dynamicLineDepthMin;		//z
				dynamicLineCounter++;
				// console.log("%d: Array[%d - %d] = {%d, %d, %d}",_debugCounter ,i-3, i-1, array[i-3], array[i-2], array[i-1]);
				_debugCounter++;
				// console.log(i);
			}
		}
		dynamicLinePointsArray[num] = i/3;
		dynamicLineGeometry.addGroup(0, 2, 0);

		var dynamicLineMaterial = new THREE.LineBasicMaterial({color: 0x99000, linewidth: 1});
		dynamicLineArray[num] = new THREE.Line(dynamicLineGeometry, dynamicLineMaterial);

		scene.add(dynamicLineArray[num]);
	};
	drawDynamicLine();
}


// //Debug dynamicLine by Keyboard
// /*
// 1: 49
// 2: 50
// 3: 51
// 4: 52
// 5: 53
// 6: 54
// 7: 55
// 8: 56
// 9: 57
// 0: 48
// */
var drawLineFragArray = new Array();
for(var i = 0; i < boxNum; i++) {
	drawLineFragArray[i] = false;
}

document.onkeydown = function (e) {
	var key_code = e.keyCode;
	console.log(key_code);
	if(key_code == 49) {
		console.log("draw box0 line");
		drawLineFragArray[0] = true;
		console.log(drawLineFragArray[0]);
	}else if (key_code == 50) {
		console.log("draw box1 line");
		drawLineFragArray[1] = true;
		console.log(drawLineFragArray[1]);
	}else if (key_code == 51) {
		console.log("draw box2 line");
		drawLineFragArray[2] = true;
		console.log(drawLineFragArray[2]);
	}else if (key_code == 52) {
		console.log("draw box3 line");
		drawLineFragArray[3] = true;
		console.log(drawLineFragArray[3]);
	}else if (key_code == 53) {
		console.log("draw box4 line");
		drawLineFragArray[4] = true;
		console.log(drawLineFragArray[4]);
	}else if (key_code == 54) {
		console.log("draw box5 line");
		drawLineFragArray[5] = true;
		console.log(drawLineFragArray[5]);
	}else if (key_code == 55) {
		console.log("draw box6 line");
		drawLineFragArray[6] = true;
		console.log(drawLineFragArray[6]);
	}else if (key_code == 56) {
		console.log("draw box7 line");
		drawLineFragArray[7] = true;
		console.log(drawLineFragArray[7]);
	}else if (key_code == 57) {
		console.log("draw box8 line");
		drawLineFragArray[8] = true;
		console.log(drawLineFragArray[8]);
	}else if (key_code == 48) {
		console.log("draw box9 line");
		drawLineFragArray[9] = true;
		console.log(drawLineFragArray[9]);
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

//Rendering Loop
var i = 0;
var drawLineCountArray = new Array();
for(var i = 0; i < boxNum; i++) {
	drawLineCountArray[i] = 0;
}

var cnt = 0;
function loop() {
	requestAnimationFrame(loop);
	for(var i = 0; i < boxNum; i++) {
		if(drawLineCountArray[i]+10 < dynamicLinePointsArray[i] && drawLineFragArray[i] == true) {
			dynamicLineArray[i].geometry.setDrawRange(drawLineCountArray[i], 10);
			drawLineCountArray[i]++;
		}else{
			dynamicLineArray[i].geometry.setDrawRange(0, 1);
			drawLineCountArray[i] = 0;
			drawLineFragArray[i] = true;
		}
	}
	
	//周期調整
	// Sleep( 0.05 );
	controls.update();
	renderer.render(scene, camera);
}
loop();


