import { Canvas } from '@react-three/fiber';
import SeparatorChild from './separatorChild';

export default function Separator() {
  return (
    <div className="test">
      <Canvas>
        <SeparatorChild />
      </Canvas>
    </div>
  );
}
