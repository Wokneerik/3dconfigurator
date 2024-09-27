import { OrbitControls, Stats } from '@react-three/drei'
import { Roof } from './Roof'

export const Experience = () => {
	return (
		<>
			<ambientLight color={0x404040} intensity={1} />

			<directionalLight
				color={0xffffff}
				intensity={1}
				position={[300, 150, 200]}
				castShadow
			/>

			<hemisphereLight
				skyColor={0xffffff}
				groundColor={0x080820}
				intensity={1}
			/>

			<Stats />

			<OrbitControls enableZoom={true} minDistance={5} maxDistance={20} />
			<Roof />
		</>
	)
}
