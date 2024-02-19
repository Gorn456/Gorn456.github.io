import { canvas , currentTime, start, timeDiv, form, input, characterName, updateCharacterCard, localization, end, newGameButton, menuSwitch, staminaInfo } from "./graphics.js"
import Game, { Player } from "./classes.js"
import { maps } from "./maps.js"
import { randomInt } from "./music.js"
import { changeMenuFlag, sideMenuShowed_f } from "./eventListeners.js"
export let newGame = new Game(maps, 0)
newGame.loadMap()

function createPlayer(name, age) {
    if (name === "") {
        name = "Bezimienny"
    }
    const randomCity = newGame.citesArray[randomInt(0, newGame.citesArray.length - 1)]
    newGame.Player = new Player(name, validAge(age), randomCity)
    characterName.innerHTML = name
    updateCharacterCard(newGame.Player)
    console.log(newGame)
}

function setNeighbourhood() {
    newGame.citesArray.forEach(city => {
        // console.log(city.setNeighboursArray)
        city.setNeighboursArray(newGame.citesArray)
    })
}

function validAge (age) {
    age = Math.floor(age)
    if (age > 15 && age < 51) return age
    else return 18
}



// show modal at start
window.onload = () => {
    start.showModal()
}

// submit start formula
form.addEventListener("submit", (event) => {
    event.preventDefault()

    start.close()
})

// handle closing start modal
start.addEventListener("close", (event) => {
    console.log(input[1].value)
    setNeighbourhood()
    createPlayer(input[0].value, input[1].value)

})

newGameButton.addEventListener("click", () => {
    const tempName = newGame.Player.name
    // newGame = null
    if (sideMenuShowed_f) {
        changeMenuFlag()
        menuSwitch()
    }
    newGame = new Game(maps, 0)
    newGame.loadMap()
    setNeighbourhood()
    createPlayer(tempName, 18)
    end.close()
})

console.log(canvas.width, canvas.height)
console.log(document.body.style.width, document.body.style.height)
console.log(Boolean(getComputedStyle(document.documentElement).getPropertyValue("--scroll-bar-size")))
// console.log(localization.innerHTML)
console.log(localization)
console.log(end)
console.log(newGameButton)
console.log(staminaInfo)


setInterval(() => {
    timeDiv.innerHTML = currentTime()
}, 1000)
