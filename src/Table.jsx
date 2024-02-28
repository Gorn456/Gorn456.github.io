import React from "react"
import Board from "./Board"

function Table(props) {
    const deck = props.deck
    const playerChips = props.playerChips
    const blind = props.blind
    const handCounter = props.hand
    const phase = props.phase.current

    return (
        <div className="table">
            <div className="upper chips">{!phase && blind(handCounter + 1)}</div>
            <Board board={deck.slice(4, 9)} phase ={props.phase}/>
            <div className="pot chips">{phase && props.pot}</div>
            <div className="lower chips player">{!phase && blind(handCounter)}</div>
        </div>
    )
}

export default Table