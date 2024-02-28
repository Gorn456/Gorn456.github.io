import React from "react"
import Card from "./Card.jsx"


function PlayersCards(props) {
    let cards = props.cards
    return (
        <div className="players-cards">
            <Card image={props.hero || props.phase === "showdown" ? cards[0].obverse : cards[0].reverse} displayed={true} />
            <Card image={props.hero || props.phase === "showdown" ? cards[1].obverse : cards[1].reverse} displayed={true} />
        </div>
    )
}

export default PlayersCards