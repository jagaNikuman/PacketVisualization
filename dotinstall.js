var scene;
var box;
var camera;
var renderer;
var width = 500;
var height = 500;


//scene
scene = new THREE.Scene();


//mesh
// -geometry
// -material
box = new THREE.Mesh(
	new THREE.BoxGeometry(200,50,50),
	new THREE.MeshLambertMaterial({color: 0x9aa1ac})
);
box.position.set(0,0,0);
scene.add(box);

// var box2 = new THREE.Mesh(
// 	new THREE.BoxGeometry(200,50,50),
// 	new THREE.MeshLambertMaterial({color: 0x66cdaa })
// );
// box.position.set(300,100,100);
// scene.add(box2);

//camera
camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
camera.position.set(200, 100, 400);
camera.lookAt(scene.position);

//light
// var directionalLight = new THREE.DirectionalLight(0xffffff);
//     directionalLight.position.set(0, 0.7, 0.7);
//     scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff); // 光源色を指定して生成
scene.add(ambientLight);

//axes
var axes = new THREE.AxisHelper(2000);
scene.add(axes);

//renderer
renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x3B3B3D);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('stage').appendChild(renderer.domElement);


renderer.render(scene, camera); 
