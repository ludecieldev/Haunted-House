import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 300,
    title : 'GUI',
    closeFolders: true
})
const debugObject = {}
window.addEventListener('keydown', (event) => {
    if(event.key === 'h') {
        gui.show(gui._hidden)
    }
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

floorColorTexture.repeat.set(8, 8)
floorARMexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMexture.wrapS = THREE.RepeatWrapping
floorARMexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.colorSpace = THREE.SRGBColorSpace

// Walls
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallARMexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofARMexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMexture.wrapS = THREE.RepeatWrapping
roofARMexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.wrapT = THREE.RepeatWrapping
bushARMexture.wrapS = THREE.RepeatWrapping
bushARMexture.wrapT = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapT = THREE.RepeatWrapping

// Graves
const gravesColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const gravesARMexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const gravesNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')

gravesColorTexture.colorSpace = THREE.SRGBColorSpace

gravesColorTexture.repeat.set(0.3, 0.4)
gravesARMexture.repeat.set(0.3, 0.4)
gravesNormalTexture.repeat.set(0.3, 0.4)

gravesColorTexture.wrapS = THREE.RepeatWrapping
gravesColorTexture.wrapT = THREE.RepeatWrapping
gravesARMexture.wrapS = THREE.RepeatWrapping
gravesARMexture.wrapT = THREE.RepeatWrapping
gravesNormalTexture.wrapS = THREE.RepeatWrapping
gravesNormalTexture.wrapT = THREE.RepeatWrapping

// Door
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
const houseMesurements = {
    wallWidth: 4,
    wallHeight: 2.5,
    wallDepth: 4,
    planeWidth: 20,
    planeHeight: 20,
    roofRadius: 3.5,
    roofHeight: 1.5,
    roofRadialSegments: 4,
    doorWidth: 2.2,
    doorHeight: 2.2,
    bushesRadius: 1,
    bushesWidtSegments: 16,
    bushesHeightSegments: 16,
    gravesWidth: 0.6,
    gravesHeight: 0.8,
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(houseMesurements.planeWidth, houseMesurements.planeHeight, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMexture,
        roughnessMap: floorARMexture,
        metalnessMap: floorARMexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2,
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('displacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('displacementBias')

// Group
const houseGroup = new THREE.Group()
scene.add(houseGroup)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(houseMesurements.wallWidth, houseMesurements.wallHeight, houseMesurements.wallDepth),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMexture,
        roughnessMap: wallARMexture,
        metalnessMap: wallARMexture,
        normalMap: wallNormalTexture,
    })
)
walls.position.y += houseMesurements.wallHeight / 2
houseGroup.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(houseMesurements.roofRadius, houseMesurements.roofHeight, houseMesurements.roofRadialSegments),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMexture,
        roughnessMap: roofARMexture,
        metalnessMap: roofARMexture,
        normalMap: roofNormalTexture,
    })
)
roof.position.y += houseMesurements.wallHeight + houseMesurements.roofHeight / 2
roof.rotation.y += Math.PI * 0.25
houseGroup.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: doorAlphaTexture,
        transparent: true,
        map: doorColorTexture,
        aoMap: doorAmbientOcclusionTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
    })
)
door.position.y += 1
door.position.z += 2 + 0.01
houseGroup.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(houseMesurements.bushesRadius, houseMesurements.bushesWidtSegments, houseMesurements.bushesHeightSegments)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMexture,
    roughnessMap: bushARMexture,
    metalnessMap: bushARMexture,
    normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75

houseGroup.add(bush1, bush2, bush3, bush4)

// Graves
const gravesGeometry = new THREE.BoxGeometry(houseMesurements.gravesWidth, houseMesurements.gravesHeight,0.2)
const gravesMaterial = new THREE.MeshStandardMaterial({
    map: gravesColorTexture,
    aoMap: gravesARMexture,
    roughnessMap: gravesARMexture,
    metalnessMap: gravesARMexture,
    normalMap: gravesNormalTexture,
})

const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

for (let i = 0; i < 30; i++) {
    // Coordinates
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    // Mesh
    const graves = new THREE.Mesh(gravesGeometry, gravesMaterial)
    graves.position.x = x
    graves.position.z = z
    graves.position.y = Math.random() * 0.4
    graves.rotation.y = (Math.random() - 0.5) * 0.4
    graves.rotation.z = (Math.random() - 0.5) * 0.4
    graves.rotation.x = (Math.random() - 0.5) * 0.4

    // Add to group
    gravesGroup.add(graves)
}

/**
 * Lights
 */
// Ambient light
const LightTweaks = gui.addFolder('Lights')
const LightTweaksAmbient = LightTweaks.addFolder('Ambient')
const ambientLightColor = { color: '#86cdff' }
const ambientLight = new THREE.AmbientLight(ambientLightColor.color, 0.275)
LightTweaksAmbient.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientLightIntensity')
LightTweaksAmbient.addColor(ambientLightColor, 'color').onChange(() => {
    ambientLight.color.set(ambientLightColor.color)
})
scene.add(ambientLight)

// Directional light
const LightTweaksDirectional = LightTweaks.addFolder('Directional')
const directionalLightColor = { color: '#86cdff'}
const directionalLight = new THREE.DirectionalLight(directionalLightColor.color, 1)
directionalLight.position.set(3, 2, -8)
LightTweaksDirectional.addColor(directionalLightColor, 'color').onChange(() => {
    directionalLight.color.set(directionalLightColor.color)
})
LightTweaksDirectional.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('directionalLightIntensity')
LightTweaksDirectional.add(directionalLight.position, 'x').min(-10).max(10).step(0.001).name('directionalLightX')
LightTweaksDirectional.add(directionalLight.position, 'y').min(-10).max(10).step(0.001).name('directionalLightY')
LightTweaksDirectional.add(directionalLight.position, 'z').min(-10).max(10).step(0.001).name('directionalLightZ')
scene.add(directionalLight)

// Door light
const LightTweaksDoor = LightTweaks.addFolder('Door')
const doorLightColor = { color: '#ff7d46' }
const doorLight = new THREE.PointLight(doorLightColor.color, 5)
doorLight.position.set(0, 2.2, 2.5)
LightTweaksDoor.addColor(doorLightColor, 'color').onChange(() => {
    doorLight.color.set(doorLightColor.color)
})
LightTweaksDoor.add(doorLight, 'intensity').min(0).max(10).step(0.001).name('doorLightIntensity')
houseGroup.add(doorLight)

/**
 * Ghosts
 */
const GhostTweaks = gui.addFolder('Ghosts')
const ghost1Tweaks = GhostTweaks.addFolder('Ghost 1')
const ghost2Tweaks = GhostTweaks.addFolder('Ghost 2')
const ghost3Tweaks = GhostTweaks.addFolder('Ghost 3')
const ghost1Color = { color: '#8800ff' }
const ghost2Color = { color: '#ff0088' }
const ghost3Color = { color: '#ff0000' }
const ghost1 = new THREE.PointLight(ghost1Color.color, 6)
const ghost2 = new THREE.PointLight(ghost2Color.color, 6)
const ghost3 = new THREE.PointLight(ghost3Color.color, 6)
ghost1Tweaks.addColor(ghost1Color, 'color').onChange(() => {
    ghost1.color.set(ghost1Color.color)
})
ghost1Tweaks.add(ghost1, 'intensity').min(0).max(10).step(0.001).name('ghost1Intensity')
ghost2Tweaks.addColor(ghost2Color, 'color').onChange(() => {
    ghost2.color.set(ghost2Color.color)
})
ghost2Tweaks.add(ghost2, 'intensity').min(0).max(10).step(0.001).name('ghost2Intensity')
ghost3Tweaks.addColor(ghost3Color, 'color').onChange(() => {
    ghost3.color.set(ghost3Color.color)
})
ghost3Tweaks.add(ghost3, 'intensity').min(0).max(10).step(0.001).name('ghost3Intensity')
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and receive shadows
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const graves of gravesGroup.children) {
    graves.castShadow = true
    graves.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

/**
 * Sky
 */
const sky = new Sky()
sky.scale.setScalar(100)
sky.material.uniforms.turbidity.value = 10
sky.material.uniforms.rayleigh.value = 3
sky.material.uniforms.mieCoefficient.value = 0.1
sky.material.uniforms.mieDirectionalG.value = 0.95
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95)
scene.add(sky)

/**
 * Fog
 */
scene.fog = new THREE.Fog('#02343f', 1, 15)
/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghotsts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()