import React, { useState } from 'react'
import * as THREE from 'three';
import { useSpring, animated } from 'react-spring/three';

const amber = '#E7C251';

function Sphere({ x, y, z, color }) {
  const [active, setActive] = useState(false)
  const [hovered, setHover] = useState(false)

  function bounce () {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 300);
  }

  const { pos, ...props } = useSpring({
    color: active ? 'hotpink' : 'white',
    position: [x, y, z],
    scale: active ? [1.2, 1.2, 1.2] : [0.7, 0.7, 0.7],
    rotation: active ? [THREE.Math.degToRad(180), 0, THREE.Math.degToRad(45)] : [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  })

  return (
    <group>
      <animated.mesh
        onClick={bounce}
        onHover={e => setHover(true)}
        onUnhover={e => setHover(false)}
        {...props}
      >
        <sphereGeometry args={[1, 128, 128]} name="geometry" />
        <meshStandardMaterial name="material" color={color} emissive={hovered ? amber : 'black'} />
      </animated.mesh>
    </group>
  )
}

export default Sphere;