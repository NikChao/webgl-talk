if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

var container, stats;

var camera, scene, renderer, raycaster;

var mouse = new THREE.Vector2(), INTERSECTED;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var spheres = [];
var shadowMeshes = [];

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
  camera.position.z = 7600;
  camera.position.y = 1000;

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

  // scene.add(mesh);
  var geometry = new THREE.SphereGeometry( 150, 256, 256 );
  
  for (let i = 0; i < 10; i++) {
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    const xPos = Math.random() * 400 * i - 750;
    const yPos = 50 * i;
    const zPos = 2000 * Math.random() * (Math.random() >= 0.5 ? 1 : -1);

    shadowMesh.position.y = -250;
    shadowMesh.position.x = xPos;
    shadowMesh.position.z = zPos;
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMeshes.push(shadowMesh);
    scene.add(shadowMesh);

    var material = new THREE.MeshPhongMaterial({
      color: getRandomColor(),
      flatShading: true,
      vertexColors: THREE.VertexColors,
      shininess: 30,
      reflectivity: 1
    });
  
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.x += xPos;
    sphere.position.z = zPos;
    sphere.position.y = yPos;
    sphere.speed = Math.random() * 8;
    spheres.push(sphere);
    scene.add( sphere );
  }


  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();

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
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
}

//

// var UP_OR_DOWN = 1;
function animate() {
  requestAnimationFrame(animate);
  render();
}

var DIRECTION = 1;
function render() {
  camera.position.x += (mouse.x - camera.position.x) * 0.1;
  camera.position.y += (-mouse.y - camera.position.y) * 0.05;

  if (!DIRECTION) {
    return;
  }
  
  spheres.forEach((_, i) => {
    const sphere = spheres[i];
    const shadowMesh = shadowMeshes[i];

    if (sphere.position.y >= 1000) {
      DIRECTION = -1;
    }
  
    if (sphere.position.y <= 20) {
      DIRECTION = 1;
    }

    sphere.position.y += sphere.speed * DIRECTION;
    shadowMesh.scale.x += DIRECTION * 0.005;
    shadowMesh.scale.z += DIRECTION * 0.005;
  });

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      try {
        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );
      } catch (err) {
        // console.error(err)
        INTERSECTED = null;
      }
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}