import React, { useState, useRef, useMemo, useContext, useEffect, useCallback } from 'react'
import * as THREE from 'three';
import { MeshPhongMaterial } from 'three';
import { useSpring, animated } from 'react-spring/three'
import { Canvas, useRender, useThree } from 'react-three-fiber';
import { getRandomColor } from './utils/random-color';

function Sphere({ x, y, z, color }) {
  const [active, setActive] = useState(false)
  const [hovered, setHover] = useState(false)

  function pushBack () {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 300);
  }
  // We can tap into the eco system, this uses react-spring for animation
  const { pos, ...props } = useSpring({
    color: active ? 'hotpink' : 'white',
    position: [x, y, z],
    'material-opacity': hovered ? 0.8 : 0.7,
    scale: active ? [1.2, 1.2, 1.2] : [0.7, 0.7, 0.7],
    rotation: active ? [THREE.Math.degToRad(180), 0, THREE.Math.degToRad(45)] : [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  })

  return (
    <group>
      <animated.mesh
        onClick={pushBack}
        onHover={e => setHover(true)}
        onUnhover={e => setHover(false)}
        {...props}
      >
        
        <sphereGeometry args={[1, 128, 128]} name="geometry" />
        <meshStandardMaterial name="material" color={color} />
      </animated.mesh>
    </group>
  )
}

function makeCoordinates () {
  const coords = [];

  for (let i = -3; i < 4; i++) {
    const x = Math.random() * i * 4 - 2;
    const y = Math.random() * i * 3 - 2;
    const z = Math.random() * i * 3 - 2;

    coords.push({ x, y, z });
  }

  return coords;
}

function Container ({ coords }) {
  useRender(({ camera }) => {
    camera.position.z -= 0.03;
  });

  return (
    <group>
      <ambientLight color="white" intensity={0.1} />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />

      {coords.map(c => <Sphere {...c} color={getRandomColor(c)} />)}
    </group>
  )
}

function App() {
  const coords = makeCoordinates();
  // useRender(({ gl, canvas, scene, camera }) => console.log("i'm in the render-loop"))


  return (
    <div style={{ width: '800px', height: '800px' }} onKeyPress={console.log}>
      <Canvas>
        <Container coords={coords} />
      </Canvas>
    </div>
  );
}


export default App;