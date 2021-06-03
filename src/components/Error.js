import React from 'react'

const Error = ({error, setError,  credit}) => {
    return (
        <div style={{position: "absolute", top: "6em", left: "3em", background: "red", padding: "1em", display: `${error === false || credit <= 15 ? "none" : "block"}`}}>
           <h3>Do not have Enough Credit, Purchase Credit</h3> 
        </div>
    )
}

export default Error
