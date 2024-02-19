export const canvas = document.querySelector("canvas")

export const context =canvas.getContext("2d")

 export const timeDiv = document.getElementById("currentTime")

 export const characterButton = document.getElementById("b1")

 export const hideButton = document.getElementById("b2")

 export const scrollSound = document.getElementById("scroll-sound")

 export const cityName = document.getElementById("cityName")

 export const coatOfArms = document.getElementById("coat-of-arms")

 export const start = document.querySelector(".first")

 export const form = document.querySelector(".first form")

 export const input = document.querySelectorAll(".first form input")

 export const end = document.querySelector(".end")

 export const newGameButton = document.querySelector(".end button")

 export const characterName = document.getElementById("characterName")

 export const musicButton = document.getElementById("musicButton")

 export const audioPlayer = document.getElementById("soundtrack")

 export const workSound = document.getElementById("work-sound")

 export const travelButton = document.getElementById("t")

export const localization = document.querySelector(".localization p")

export const workButton = document.getElementById("w")

export const upperBarMoney = document.querySelector(".money")

export const date = document.getElementById("date_var")

const upperBarLocalization = document.querySelector(".city")

export const sleepButton = document.getElementById("s")

export const staminaInfo = document.querySelector("#sideMenu ul div")

const sideMenu = document.getElementById("sideMenu")

const characterCard = document.getElementById("characterCard")

const money = document.getElementById("m")

const age = document.getElementById("a")

export const currentTime = () => {
    const currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()
  
    minutes = (minutes < 10 ? "0" : "") + minutes
    seconds = (seconds < 10 ? "0" : "") + seconds
    return `${hours}:${minutes}:${seconds}`  
}

export const changeCursor = () => {
    document.body.classList.toggle("active")
}

export const hideScrollBar = () => {
    setTimeout(() => { 
        document.documentElement.style.setProperty("--scroll-bar-size", 0)}, 0.000001)
}

export const showScrollBar = () => {
    setTimeout(() => { 
        document.documentElement.style.setProperty("--scroll-bar-size", "1.5vh")}, 0.000001)
}

export const scrollBarSwitch = () => {
    if (getComputedStyle(document.documentElement).getPropertyValue("--scroll-bar-size") == 0) showScrollBar()
    else hideScrollBar()
}

export const menuSwitch = () => {
    scrollSound.play()
    sideMenu.classList.toggle("active")
}

export const characterCardSwitch = () => {
    scrollSound.play()
    characterCard.classList.toggle("active")
}

export const travelButtonSwitch = () => {
    travelButton.classList.toggle("disable")
}

export const updateCharacterCard = (Player) => {
    localization.innerHTML = Player.currentCity.name
    upperBarLocalization.innerHTML = Player.currentCity.name
    upperBarMoney.innerHTML = Player.money
    money.innerHTML = Player.money
    age.innerHTML = Player.age
    staminaInfo.innerHTML = `Ilość staminy: ${Player.stamina} na 3`
}

export const workButtonSwitch = () => {
    workButton.classList.toggle("disable")
}

export const sleepButtonSwitch = () => {
    sleepButton.classList.toggle("disable")
}