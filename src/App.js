import React, { Suspense, useState, useEffect } from "react";
import Popup from "./components/Popup";
import axios from 'axios';
import Purchase from "./components/Purchase";
import Error from "./components/Error";
// import Spinner from "react-loader-spinner";
//Styles
import "./assets/styles/App.scss";
//Three
import { Canvas, useThree } from "react-three-fiber";
import Lights from './components/Three/lights';
import Floor from './components/Three/floor';
import { softShadows, Loader, OrbitControls } from "@react-three/drei";
import { useSpring } from "react-spring/three";
//Model
import Model from './components/Three/chest';
//Sounds
import chestOpenSound from './assets/sound/open-chest.mp3';
const openChest = new Audio(chestOpenSound);

softShadows()

// on Load zoom effect
const ZoomWithOrbital = () => {
  const {gl, camera} = useThree()
  useSpring ({
    from: {
      z: 30,
    },
    x: -5,
    y: 4,
    z: 4,
    //On Frame
    onFrame: ({x, y, z}) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
  })
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      target={[0,0,0]}
      args={[camera, gl.domElement]}
    />
  )
}

const App = () => {
  const [open, setOpen] = useState(false)
  const [process, setProcess] = useState(false)
  const [data, setData] = useState({});
  const [credit, setCredit] = useState(0);
  const [error, setError] = useState(false)

  async function handleProcess() {
    if(credit >= 15 ) {
      const randomNumber =  Math.floor(Math.random()* 100);
      let res = await axios ("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
      setData(res.data);
      console.log("Random Number: " + randomNumber)
      setProcess(true)
      setOpen(true)
      openChest.volume = 0.3;
      openChest.play()
    }
    else {
      setError(true);
    }
  }

  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{position: [-5, 4, 4], fov: 40}}
      >
        <Lights />
        <Suspense fallback={null
        }>
          <Model open={open} setOpen={setOpen} />
          <Floor />
          <ZoomWithOrbital />
        </Suspense>
      </Canvas>
      <Suspense fallback={null}>
        <h4 style={{position: "absolute", top: "2em", left: "3em"}}>Credit: {credit}</h4>
        <Error credit={credit} error={error} setError={setError} />
        <Purchase credit={credit} setCredit={setCredit} error={error} setError={setError} />
        <Popup process={process} setProcess={setProcess} open={open} setOpen={setOpen} data={data} setCredit={setCredit} credit={credit} />
        <button onClick={handleProcess} style={{position: "absolute", bottom: "3em", left: "50%"}} >Buy Now - 15</button>
      </Suspense>
      <Loader />
    </>
  );
};

export default App;