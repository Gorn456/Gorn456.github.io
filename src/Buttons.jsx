import React, { useEffect, useState } from "react";

function Buttons(props) {
    const setPot = props.setPot
    const setPlayerChips = props.setPlayerChips
    const currentPhase = props.currentPhase
    const hand = () => {
        try {
            if (props.playerHand.name === "two pairs") return [props.playerHand.name, " ", props.playerHand.highestCard, " and ", props.playerHand.kicker]
            else
            return [props.playerHand.name, " ", props.playerHand.highestCard]
        } catch (error) {
            return ""
        }
    }

    const handInstance = hand()

    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        if (event.target.value > props.playerChips) setValue(props.playerChips)
        if (event.target.value < 0) setValue(0)
        else setValue(event.target.value)
    }
    return (
        <div className='left-bottom'>
            <div className="input">
            <input type="range"
                value={value}
                min={0} max={props.playerChips} 
                onChange={handleChange}/>

            <input type="number"
                value={value}
                pattern="[0-9.]*"
                min={0} max={props.playerChips}
                onChange={handleChange} />
            </div>

            <div className="buttons">
                <button className="button"
                    onClick={() =>{props.fold()}}
                    disabled={(currentPhase === "showdown")}>
                    Pas</button>

                <button className="button"

                    onClick={() => {
                        setPlayerChips(c => c - value)
                        setPot(p => p + value * 2)
                        setValue(0)
                        props.phase()}
                    }
                    disabled={(currentPhase === "showdown")}
                 >Postaw</button>
                 <button className="button"
                    disabled={!(currentPhase === "showdown")}
                    onClick={props.phase}>Następne rozdanie</button>
                <p>Twój stos: {props.playerChips}</p>
                <p>Twój układ: {handInstance}</p>
            </div>
        </div>
    )

}

export default Buttons