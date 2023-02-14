import { useFrame, useThree } from '@react-three/fiber';
import React from 'react';

import { fbmCloudMaterial } from '@/ions/fbmCloudMaterial';
import * as THREE from 'three';

export default function SeparatorChild() {
  const viewport = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    fbmCloudMaterial.uniforms.time.value += delta * 0.7;
    fbmCloudMaterial.uniforms.cameraPosition.value = new THREE.Vector3(
      0.1,
      0.4,
      0.1,
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          resolution: { value: { x: 1980, y: 1090 } },
        }}
      />
    </mesh>
  );
}
