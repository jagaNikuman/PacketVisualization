


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
box = new THREE.mesh(new THREE.BoxGeometry(50,50,50), new THREE.MeshLmbertMaterial({color: 0xff0000}));
box.position.set(0,0,0);
scene.add(box);

//camera
camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
camera.position.set(200, 100, 300);
camera.lookAt(scene.position);


//renderer
renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(width/height);
renderer.setClearColor(0xefefef);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById('stage').appendChild(renderer.domElement);


renderer.render(scene, camera);