import React from 'react'
import * as THREE from 'three';

function App({ vertices, color}) {

  return (
    <group ref={ref => console.log('we have access to the instance')}>
      <line>
        <geometry
          name="geometry"
          vertices={vertices.map(v => new THREE.Vector3(...v))}
          onUpdate={self => (self.verticesNeedUpdate = true)}
        />
        <lineBasicMaterial name="material" color="rebeccapurple" />
      </line>
      <mesh 
        onClick={e => console.log('click')} 
        onHover={e => console.log('hover')} 
        onUnhover={e => console.log('unhover')}>
        <octahedronGeometry name="geometry" />
        <meshBasicMaterial name="material" color="lavender" opacity={0.5} transparent />
      </mesh>
    </group>
  )
}

export default App;