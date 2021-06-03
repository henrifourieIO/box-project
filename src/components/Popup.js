import React,{ useEffect, useState } from 'react'
import chestCloseSound from '../assets/sound/close-chest.mp3';
const closeChest = new Audio(chestCloseSound);



const Popup = ({ open , setOpen, process, setProcess, data, setCredit, credit }) => {
    
    
    
    const handleOpen = () => {
        closeChest.volume = 0.3
        closeChest.play()

        setCredit(credit - 15)
        setProcess(false)
        setOpen(false)
    }

    return (
        <div className="popup" style={{opacity:  `${process ? "1" : "0"}`, transition: "0.7s", display: `${process ? "block" : "none"}`}}>
            <h2>Your Reward is: </h2>

            <div> 
            <p> {data.name} </p>
            
            </div>

            <button onClick={handleOpen}>Claim</button>

        </div>
    )
}

export default Popup
