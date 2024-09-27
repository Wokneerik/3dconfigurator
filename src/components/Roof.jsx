import { useLoader, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export function Roof(props) {
	const { scene } = useThree()

	const textureLoader = new THREE.TextureLoader()
	const planeTexture = './textures/concrete_texture.jpg'

	const balk = useLoader(OBJLoader, './models/balk_150x150x2200.obj')

	const balkCorner = useLoader(OBJLoader, './models/balk_corner.obj')

	const horizontalBalk = useLoader(OBJLoader, './models/balk_150x150x1000.obj')

	const lodge20x200 = useLoader(OBJLoader, './models/Lodge_20x200x1000.obj')

	const lodge20x190 = useLoader(
		OBJLoader,
		'./models/Lodge_20x190x1000_bevel.obj'
	)

	const lodge150x50x1000 = useLoader(
		OBJLoader,
		'./models/lodge_150x50x1000.obj'
	)

	const lodge150x50x200 = useLoader(OBJLoader, './models/lodge_150x50x200.obj')

	const profileCanopy = useLoader(
		OBJLoader,
		'./models/profile_canopy_perimeter_closed.obj'
	)

	const gridHelper = new THREE.GridHelper(80, 45, 0xc1c1c1, 0x8d8d8d)
	gridHelper.position.y = -0.1
	gridHelper.name = 'Grid'
	scene.add(gridHelper)

	const createPatternTexture = url => {
		const texture = textureLoader.load(url)
		texture.repeat.set(4, 4)
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		texture.anisotropy = 4

		return texture
	}

	const textureOverlay = createPatternTexture(planeTexture)

	useEffect(() => {
		const plateGeometry = new THREE.BoxGeometry(3, 0.1, 5)
		const plateMaterial = new THREE.MeshStandardMaterial({
			map: textureOverlay,
			side: THREE.DoubleSide,
		})

		const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial)

		plateMesh.name = 'Plate'

		plateMesh.position.y = -0.049

		scene.add(plateMesh)

		const balkOffset = 0.075
		const balkPositions = [
			[-1.5 + balkOffset, 0, -2.5 + balkOffset], // bottom-left corner
			[1.5 - balkOffset, 0, -2.5 + balkOffset], // bottom-right corner
			[-1.5 + balkOffset, 0, 2.5 - balkOffset], // top-left corner
			[1.5 - balkOffset, 0, 2.5 - balkOffset], // top-right corner
			[-1.5 + balkOffset, 0, 0], // middle of bottom side
			[1.5 - balkOffset, 0, 0], // middle of top side
		]

		balkPositions.forEach(position => {
			const balkClone = balk.clone()
			balkClone.position.set(...position)

			scene.add(balkClone)
		})

		const bottomCornerBalks = [
			{ position: [-1.475, 0, -2.5], rotation: [0, -Math.PI / 2, 0] },
			{
				position: [-1.5, 0, -2.475],
				rotation: [0, 0, 0],
			},

			{ position: [1.475, 0, -2.5], rotation: [0, -Math.PI / 2, 0] },
			{
				position: [1.5 - balkOffset, 0, -2.475],
				rotation: [0, -Math.PI, 0],
			},
		]

		bottomCornerBalks.forEach(({ position, rotation }) => {
			const balkCornerClone = balkCorner.clone()
			balkCornerClone.position.set(...position)
			balkCornerClone.rotation.set(...rotation)
			scene.add(balkCornerClone)
		})

		const middleCornerBalks = [
			{ position: [-1.475, 0, 0], rotation: [0, -Math.PI / 2, 0] },
			{ position: [1.475, 0, 0], rotation: [0, -Math.PI / 2, 0] },

			{ position: [-1.475, 0, 0], rotation: [0, Math.PI / 2, 0] },
			{ position: [1.475, 0, 0], rotation: [0, Math.PI / 2, 0] },
		]

		middleCornerBalks.forEach(({ position, rotation }) => {
			const balkCornerClone = balkCorner.clone()
			balkCornerClone.position.set(...position)
			balkCornerClone.rotation.set(...rotation)
			scene.add(balkCornerClone)
		})

		const topCornerBalks = [
			{ position: [-1.475, 0, 2.5], rotation: [0, Math.PI / 2, 0] },
			{ position: [-1.5, 0, 2.475], rotation: [0, 0, 0] },

			{ position: [1.475, 0, 2.5], rotation: [0, Math.PI / 2, 0] },
			{ position: [1.5 - balkOffset, 0, 2.475], rotation: [0, Math.PI, 0] },
		]

		topCornerBalks.forEach(({ position, rotation }) => {
			const balkCornerClone = balkCorner.clone()
			balkCornerClone.position.set(...position)
			balkCornerClone.rotation.set(...rotation)
			scene.add(balkCornerClone)
		})

		const verticalBeamHeight = 2.2

		const horizontalBalks = [
			{
				position: [-1.5, verticalBeamHeight, 2.5 - balkOffset],
				scale: [3, 1, 1],
				rotation: [0, 0, 0],
			},
			{
				position: [-1.5, verticalBeamHeight, -2.5 + balkOffset],
				scale: [3, 1, 1],
				rotation: [0, 0, 0],
			},
		]

		horizontalBalks.forEach(({ position, scale, rotation }) => {
			const horizontalBalkClone = horizontalBalk.clone()
			horizontalBalkClone.position.set(...position)
			horizontalBalkClone.scale.set(...scale)
			horizontalBalkClone.rotation.set(...rotation)

			scene.add(horizontalBalkClone)
		})

		const longHorizontalBalks = [
			{
				position: [1.5 - balkOffset, verticalBeamHeight, -2.5],
				scale: [5 - balkOffset * 2, 1, 1],
				rotation: [0, -Math.PI / 2, 0],
			},
			{
				position: [-1.5 + balkOffset, verticalBeamHeight, 2.5],
				scale: [5 - balkOffset * 2, 1, 1],
				rotation: [0, Math.PI / 2, 0],
			},
		]

		longHorizontalBalks.forEach(({ position, scale, rotation }) => {
			const horizontalBalkClone = horizontalBalk.clone()
			horizontalBalkClone.position.set(...position)
			horizontalBalkClone.scale.set(...scale)
			horizontalBalkClone.rotation.set(...rotation)

			scene.add(horizontalBalkClone)
		})

		const friezeExtension = 0.18
		const friezeHeightOffset = 0.1

		const lodgeHorizontalFriezes = [
			{
				position: [
					-1.5 - friezeExtension,
					verticalBeamHeight + friezeHeightOffset,
					2.5 + friezeExtension,
				],
				scale: [3 + friezeExtension * 2, 1, 1],
				rotation: [0, 0, 0],
			},
			{
				position: [
					-1.5 - friezeExtension,
					verticalBeamHeight + friezeHeightOffset,
					-2.5 - friezeExtension,
				],
				scale: [3 + friezeExtension * 2, 1, 1],
				rotation: [0, 0, 0],
			},
		]

		lodgeHorizontalFriezes.forEach(({ position, scale, rotation }) => {
			const lodgeClone = lodge20x200.clone()
			lodgeClone.position.set(...position)
			lodgeClone.scale.set(...scale)
			lodgeClone.rotation.set(...rotation)

			scene.add(lodgeClone)
		})

		const longFriezeCorrection = friezeExtension * 2

		const lodgeLongHorizontalFriezes = [
			{
				position: [
					1.5 + friezeExtension,
					verticalBeamHeight + friezeHeightOffset,
					-2.5 - friezeExtension,
				],
				scale: [5 + longFriezeCorrection, 1, 1],
				rotation: [0, -Math.PI / 2, 0],
			},
			{
				position: [
					-1.5 - friezeExtension,
					verticalBeamHeight + friezeHeightOffset,
					2.5 + friezeExtension,
				],
				scale: [5 + longFriezeCorrection, 1, 1],
				rotation: [0, Math.PI / 2, 0],
			},
		]

		lodgeLongHorizontalFriezes.forEach(({ position, scale, rotation }) => {
			const lodgeClone = lodge20x200.clone()
			lodgeClone.position.set(...position)
			lodgeClone.scale.set(...scale)
			lodgeClone.rotation.set(...rotation)

			scene.add(lodgeClone)
		})

		const lodgeBevelSpacing = 0.191
		const lodgeBevelCount = Math.floor(
			(5 + longFriezeCorrection) / lodgeBevelSpacing
		)

		const lodgeFriezeMidHeight = verticalBeamHeight + friezeHeightOffset * 2

		const startPositionZ = -2.5 - friezeExtension / (2 + lodgeBevelSpacing)

		for (let i = 0; i < lodgeBevelCount; i++) {
			const lodgeBevelClone = lodge20x190.clone()
			lodgeBevelClone.name = 'RoofTop'

			lodgeBevelClone.position.set(
				-1.5 - friezeExtension,
				lodgeFriezeMidHeight,
				startPositionZ + i * lodgeBevelSpacing
			)

			lodgeBevelClone.rotation.set(0, -Math.PI / 2, 0)
			lodgeBevelClone.scale.set(1, 1, 3 + friezeExtension * 2)

			scene.add(lodgeBevelClone)
		}

		const beamSpacing = 0.487
		const numberOfBeams = 11

		const startLodgePositionZ = -2.5 + balkOffset / 2

		for (let i = 0; i < numberOfBeams; i++) {
			const lodgeClone = lodge150x50x1000.clone()

			lodgeClone.position.set(
				-1.5 - friezeExtension + 0.02,
				verticalBeamHeight,
				startLodgePositionZ + i * beamSpacing
			)

			lodgeClone.scale.set(3 + (friezeExtension - 0.02) * 2, 1, 1)
			scene.add(lodgeClone)
		}

		const startLodge150x50X = -2.5 + balkOffset / 2

		const starTopLodge150x50X = 2.5 + (balkOffset * 5) / 2

		const lodgeStep = 0.6
		const horizontalBalkLength = 3

		const lodgeCount = Math.floor(horizontalBalkLength / lodgeStep)

		for (let i = 0; i <= lodgeCount; i++) {
			const lodgeClone = lodge150x50x200.clone()

			lodgeClone.position.set(
				-1.5 + i * lodgeStep,
				verticalBeamHeight,
				startLodge150x50X
			)

			lodgeClone.rotation.set(0, Math.PI / 2, 0)

			const lodgeCloneTop = lodgeClone.clone()
			lodgeCloneTop.position.z = starTopLodge150x50X

			scene.add(lodgeClone, lodgeCloneTop)
		}

		const roofEdge = [
			{
				position: [
					-1.5 - friezeExtension,
					verticalBeamHeight + friezeHeightOffset + 0.2,
					2.5 + friezeExtension * 1.2,
				],
				scale: [3 + friezeExtension * 2, 1, 1],
				rotation: [0, 0, 0],
			},
			{
				position: [
					1.5 + friezeExtension,
					verticalBeamHeight + friezeHeightOffset + 0.2,
					-2.5 - friezeExtension * 1.1,
				],
				scale: [3 + friezeExtension * 2, 1, 1],
				rotation: [0, Math.PI, 0],
			},
		]

		roofEdge.forEach(({ position, scale, rotation }) => {
			const canopyClone = profileCanopy.clone()
			canopyClone.position.set(...position)
			canopyClone.scale.set(...scale)
			canopyClone.rotation.set(...rotation)

			scene.add(canopyClone)
		})

		const textureLoader = new THREE.TextureLoader()
		const woodTexture = './textures/texture_wood.jpg'

		textureLoader.load(woodTexture, texture => {
			scene.traverse(object => {
				if (object.isMesh && object.name !== 'Plate') {
					object.material.map = texture
					object.material.needsUpdate = true
				}
			})
		})
	}, [])
}
