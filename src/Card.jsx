import React, { useEffect, useState } from "react";


function Card(props) {

    const showed = props.displayed ? "card" : "card disactive"

    return (
        <div className={showed}>
            <p>{props.image}</p>
        </div>
    )
}

export default Card