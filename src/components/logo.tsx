import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { fbmCloudMaterial } from '@/ions/fbmCloudMaterial';

export default function Logo() {
  const logo = useRef();
  const { scene } = useGLTF(`/iieinander.glb`);

  useEffect(() => {
    if (!scene || !logo.current) {
      return;
    }

    logo.current.traverse((node) => {
      if (node.isMesh) {
        node.material = fbmCloudMaterial;
        fbmCloudMaterial.uniforms.resolution.value.x = 2048;
        fbmCloudMaterial.uniforms.resolution.value.y = 1028;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (logo.current) {
      gsap.to(logo.current.rotation, {
        duration: 10,
        x: 0.2,
        y: 0.3,
        yoyo: true,
        repeat: -1,
        ease: `sine.inOut`,
      });
    }
  }, [logo]);

  useFrame((state, delta) => {
    fbmCloudMaterial.uniforms.time.value += delta * 0.7;
    fbmCloudMaterial.uniforms.cameraPosition.value = logo.current.rotation;
  });

  return (
    <>
      <ambientLight />

      <primitive object={scene} ref={logo} rotation={[-0.2, -0.3, 0]} />
    </>
  );
}
