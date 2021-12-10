import React, {useState, useEffect} from 'react'

const Purchase = ({credit, setCredit, setError, error}) => {
    const [value, setValue] = useState(credit);

    function handlePruchase(e) {
        e.preventDefault();
        setCredit(Number(credit) + Number(value))
        if(error === true ){
            setError(false)
        }

        setValue(0)
    }


    return (
        <div className="purchaseWrapper">
            <h3>Purchase Credit</h3>

            <form onSubmit={handlePruchase}>
                <input
                className="input"
                type="number" 
                name="ammount"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Fill in ammount here" 
                />
                <input type="submit" value="Purchase" />
            </form>
        </div>
    )
}

export default Purchase
