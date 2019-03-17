import React from 'react'
import { Canvas, useRender } from 'react-three-fiber';
import Sphere from 'components/sphere';
import makeCoordinates from 'utils/make-coordinates';
import getRandomColor from 'utils/random-color';
import getKeys from 'utils/keys';
import getMouse, { yOutOfDeadzone, xOutOfDeadzone } from 'utils/mouse';

function Container ({ coords }) {
  useRender(({ camera }) => {
    const { fwd, back, up, down, left, right } = getKeys();
    const { x, y } = getMouse();

    if (fwd) { camera.position.y += 0.1 }
    if (back) { camera.position.y -= 0.1 }
    if (right) { camera.position.x += 0.1 }
    if (left) { camera.position.x -= 0.1 }
    if (up) { camera.position.z -= 0.1 }
    if (down) { camera.position.z += 0.1 }

    if (yOutOfDeadzone()) {
      camera.rotation.x -= y / 50;
    }
    if (xOutOfDeadzone()) {
      camera.rotation.y -= x / 50;
    }
  })

  return (
    <group>
      <ambientLight color="white" intensity={0.1} />
      <pointLight color="white" intensity={1} position={[10, 10, 10]} />

      {coords.map(coordinates => <Sphere {...coordinates} color={getRandomColor(coordinates)} />)}
    </group>
  )
}

function App() {
  const coords = makeCoordinates();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        <Container coords={coords} />
      </Canvas>
    </div>
  );
}


export default App;