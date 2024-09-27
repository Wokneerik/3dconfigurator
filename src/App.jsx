import { Canvas } from '@react-three/fiber'
import './App.css'
import { Experience } from './components/Experience'

function App() {
	return (
		<Canvas
			camera={{
				fov: 30,
				far: 50000,
				near: 0.1,
				position: [7, 7, 7],
			}}
		>
			<Experience />
		</Canvas>
	)
}

export default App
