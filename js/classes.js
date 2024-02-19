import {canvas, changeCursor, cityName, coatOfArms, context} from "./graphics.js"
export default class Game {
    constructor (maps, mapId) {
        this.Player = undefined
        this.map = maps[mapId]
        this.img = new Image()
        this.img.src = this.map.source
        this.citesArray = []
        this.map.cities.forEach(city => {
          this.citesArray.push(new City(this.img ,city.name ,this.map.width / city.xRatio ,this.map.height / city.yRatio, city.neighboursIndex))  
        })

    }
    loadMap() {
        document.body.style.width = `${this.map.width}px`
        document.body.style.height = `${this.map.height}px`
        canvas.width = this.map.width
        canvas.height = this.map.height
        this.img.onload = () => {
            context.drawImage(this.img, 0, 0)
        }
        setTimeout(() => {}, 1)
    }
}

class City {
    constructor (img, name, x, y, neighboursIndex, money = 5, logoSrc = "./img/coat-of-arms-background.png", radius = 100) {
        this.img = img
        this.name = name
        this.X = x
        this.Y = y
        this.coatOfArms = logoSrc
        this.radius = radius
        this.highlighted = false
        this.neighboursIndexes = neighboursIndex
        this.neighboursArray = []
        this.cityDisplayed = false
        this.workPayment = money
    }
    setNeighboursArray(citiesArray) {
        this.neighboursIndexes.forEach(index => {
            this.neighboursArray.push(citiesArray[index])
        })
        delete this.neighboursIndexes
    }

    cursorInRadius(cursorX, cursorY) {
        return ((cursorX - this.X) ** 2 + (cursorY - this.Y) ** 2 < this.radius ** 2)
    }

    highlightCity() {
        if (!this.highlighted) {
            this.highlighted = true
            context.beginPath()
            context.arc(this.X, this.Y, this.radius, 0, Math.PI * 2, false)
            context.fillStyle = "rgba(255, 255, 255, 0.4)"
            context.fill()
            changeCursor()
        }
    }

    removeHighlight() {
        if (this.highlighted) {
            this.highlighted = false
            context.reset()
            context.drawImage(this.img, 0, 0)
            changeCursor()}
    }

    displayMenu() {
        cityName.innerHTML = this.name
        coatOfArms.innerHTML = this.coatOfArms
    }

    travelPossible(currentCity) {
        return (this.neighboursArray.includes(currentCity))
    }
}

export class Player {
    constructor (name, age, startCity) {
        this.name = name
        this.currentCity = startCity
        this.money = 0
        this.age = age
        this.stamina = 3
    }

    death() {
        return (Math.atan((this.age - 70)/35) + 1) / (Math.PI/2 + 1) > Math.random() 


    }

}