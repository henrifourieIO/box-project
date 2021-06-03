import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from 'react-spring/three'

// Chest Sound
import chestOpenSound from '../../assets/sound/open-chest.mp3';
import chestCloseSound from '../../assets/sound/close-chest.mp3';
const openChest = new Audio(chestOpenSound);
const closeChest = new Audio(chestCloseSound);

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('../../../coffre-minecraft.glb')

  //Open Function
  const handleOpen = () => {
    props.setOpen(!props.open)
    openChest.volume = 0.3;
    closeChest.volume = 0.3;
    props.open ? closeChest.play() : openChest.play()
  }

  const openChestAnimation = useSpring({
    rotation: props.open ? [0, 0, 0] : [1.61, 0, 0],
    position: props.open ? [0, -1.5, 0] : [0, 0, 0],

  })

  return (
    <group ref={group} {...props} dispose={null}>
      <a.group rotation={openChestAnimation.position} name="Armature" position={[0, -0.99, 0]}>
        <primitive object={nodes.Bone} />
        <a.primitive 
        rotation={openChestAnimation.rotation}  
        object={nodes.Bone001} 
        />
        <skinnedMesh 
        geometry={nodes.Cube.geometry} 
        material={materials.Material} 
        skeleton={nodes.Cube.skeleton} 
        castShadow
        />
      </a.group>
    </group>
  )
}

useGLTF.preload('../../../coffre-minecraft.glb')
