import { date, end } from "./graphics.js"
import { newGame } from "./main.js"

const months = ["Styczeń", "Luty", "Marzec", "Kwieceń", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]

let monthIndex = 0
let currentYear = 699

export const nextMonth = () => {
    if (monthIndex < 11) {
        monthIndex++
    }
    else {
        monthIndex = 0
        currentYear++
        newGame.Player.age++
        if (newGame.Player.death()) end.showModal()
    }
    date.innerHTML = `${months[monthIndex]} ${currentYear}`
}