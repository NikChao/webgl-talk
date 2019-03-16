if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var container, stats;

var camera, scene, renderer;

var mouseX = 0,
  mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var sphere;

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1800;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 1);
  scene.add(light);

  // shadow

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;

  var context = canvas.getContext('2d');
  var gradient = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  gradient.addColorStop(0.1, 'rgba(210,210,210,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,1)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  var shadowTexture = new THREE.CanvasTexture(canvas);

  var shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture });
  var shadowGeo = new THREE.PlaneBufferGeometry(300, 300, 1, 1);

  var shadowMesh;

  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.y = -250;
  shadowMesh.rotation.x = -Math.PI / 2;
  scene.add(shadowMesh);

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: THREE.VertexColors,
    shininess: 0
  });

  // scene.add(mesh);
  var geometry = new THREE.SphereGeometry( 150, 32, 32 );
  sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

//

// var UP_OR_DOWN = 1;
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
