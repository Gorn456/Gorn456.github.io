import React, { memo, useEffect, useRef, useState } from "react";
import Card from "./Card.jsx";

function Board(props) {
    const cards = props.board
    const phaseDigital = props.phase.current
    return (
        <div className="board">
            <Card  image={cards[0].obverse} displayed={phaseDigital}/>
            <Card  image={cards[1].obverse} displayed={phaseDigital}/>
            <Card  image={cards[2].obverse} displayed={phaseDigital}/>
            <Card  image={cards[3].obverse} displayed={phaseDigital > 1}/>
            <Card  image={cards[4].obverse} displayed={phaseDigital > 2}/>
        </div>
    )
}

export default Board