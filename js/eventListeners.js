import { nextMonth } from "./calendar.js"
import {characterButton, hideButton, canvas, menuSwitch, characterCardSwitch, scrollBarSwitch, musicButton, audioPlayer, travelButton, travelButtonSwitch, updateCharacterCard, workButton, workButtonSwitch, workSound, sleepButton, sleepButtonSwitch } from "./graphics.js"
import { newGame } from "./main.js"
import { newMusicArray, playMusic, songsArray, stopMusic, unstopMusic } from "./music.js"

let upperBarHide = false
let sideMenuShowed = false
let characterCardShowed = false
// let travelButtonActive = true
let musicPlaying = false
let musicInit = false
let musicArray = newMusicArray(songsArray)

hideButton.addEventListener("click", () => {
    document.getElementById("upperBar").classList.toggle("active")
    scrollBarSwitch()
    // hideScrollBar()
    upperBarHide = true
})

characterButton.addEventListener("click", () => {
    characterCardShowed = !characterCardShowed
    scrollBarSwitch()
    characterCardSwitch()
})

musicButton.addEventListener("click", () => {
    if (musicPlaying) {
        musicPlaying = false
        musicButton.innerHTML = "Wznów muzykę"
        stopMusic(audioPlayer)
    }
    else if (!musicInit){
        musicPlaying = true
        musicInit = true
        musicButton.innerHTML = "Zastopuj muzykę"
        playMusic(musicArray, audioPlayer)
    }
    else {
        musicPlaying = true
        musicButton.innerHTML = "Zastopuj muzykę"
        unstopMusic(audioPlayer) 
    }
})

// side menu buttons
travelButton.addEventListener("click", () => {
    scrollBarSwitch()
    menuSwitch()
    sideMenuShowed = false
    newGame.Player.stamina--
    updateMenu()
    nextMonth()
    newGame.citesArray.forEach(city => {
      if (city.cityDisplayed) {
        newGame.Player.currentCity = city
        updateCharacterCard(newGame.Player)
        city.cityDisplayed = false
      }  
    })
})

workButton.addEventListener("click", () => {
    newGame.Player.money += newGame.Player.currentCity.workPayment
    workSound.play()
    newGame.Player.stamina--
    updateMenu()
    nextMonth()
    updateCharacterCard(newGame.Player)
})

sleepButton.addEventListener("click", () => {
    if (newGame.Player.stamina < 3) newGame.Player.stamina++
    updateMenu()
    nextMonth()
    updateCharacterCard(newGame.Player)
})

audioPlayer.addEventListener("ended", () => {
    console.log(musicArray)
    if (!musicArray.length) {
        musicArray = newMusicArray(songsArray)
    }
    playMusic(songsArray, audioPlayer)
})

canvas.addEventListener("click", (event) => {
    if (upperBarHide) {
        document.getElementById("upperBar").classList.toggle("active")
        scrollBarSwitch()
        // showScrollBar()
        upperBarHide = false
    }

    if (characterCardShowed) {
        characterCardShowed = false
        scrollBarSwitch()
        characterCardSwitch()}

    // newGame.citesArray.forEach(city => {
    //     if (city.cursorInRadius(event.pageX, event.pageY)) {
    //         city.displayMenu()
    //         if (!sideMenuShowed) {
    //             sideMenuShowed = true
    //             menuSwitch()
    //         }
    //     }
    //     })
    //     if (sideMenuShowed) {
    //         sideMenuShowed = false
    //         menuSwitch()
    //     }
    for (let i = 0; i < newGame.citesArray.length; i++) {
        const city = newGame.citesArray[i]
        if (city.cursorInRadius(event.pageX, event.pageY)) {
            if (city === newGame.Player.currentCity ) {
                if (workButton.disabled && newGame.Player.hasStamina()) {
                    workButton.disabled = false
                    workButtonSwitch()
                }

                if (sleepButton.disabled) {
                    sleepButton.disabled = false
                    sleepButtonSwitch()
                }
            }
            else {
                if (!workButton.disabled) {
                workButton.disabled = true
                workButtonSwitch()
                }

                if (!sleepButton.disabled) {
                    sleepButton.disabled = true
                    sleepButtonSwitch()
                }
            }
            if (city.travelPossible(newGame.Player.currentCity)) {
                if (travelButton.disabled && newGame.Player.hasStamina()) {
                    travelButton.disabled = false
                    travelButtonSwitch()
                    // travelButton.classList.remove("disable") 
                }
            }
            else if (!travelButton.disabled) {
                travelButton.disabled = true
                travelButtonSwitch()
                //travelButton.classList.add("disable")

            }
            newGame.citesArray.forEach(city => {
              city.cityDisplayed = false  
            })
            city.cityDisplayed = true
            city.displayMenu()
            if (!sideMenuShowed) {
                sideMenuShowed = true
                scrollBarSwitch()
                menuSwitch()
            }
            break
        }
        else if (i === newGame.citesArray.length - 1 && sideMenuShowed) {
            sideMenuShowed = false
            scrollBarSwitch()
            menuSwitch()
        }

    }    
})

canvas.addEventListener("mousemove", (event) => {
    console.log(event.pageX, event.pageY)
    newGame.citesArray.forEach(city => {
        if (city.cursorInRadius(event.pageX, event.pageY)) {
            city.highlightCity()
        }
        else {
            city.removeHighlight()
        }
    })
})

export const sideMenuShowed_f = () => {
    return sideMenuShowed
}

export const changeMenuFlag = () => {
    sideMenuShowed = !sideMenuShowed
}

const updateMenu = () => {
    if (!newGame.Player.hasStamina()) {
        if (!travelButton.disabled) {
            travelButton.disabled = true
            travelButtonSwitch()
        }

        if (!workButton.disabled) {
            workButton.disabled = true
            workButtonSwitch()
        }
    }

    else {
        let menuCity = undefined
        newGame.citesArray.forEach(city => {
            if (city.cityDisplayed) menuCity = city
        })

        if (travelButton.disabled && newGame.Player.stamina === 1
            && menuCity.travelPossible(newGame.Player.currentCity)) {
            travelButton.disabled = false
            travelButtonSwitch()
        }

        if (workButton.disabled && newGame.Player.stamina === 1 && menuCity === newGame.Player.currentCity) {
            workButton.disabled = false
            workButtonSwitch()
        }
    }

}