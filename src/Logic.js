import { createNewDeck, shuffleDeck } from "./Card.js";

const deck = createNewDeck()
// const dupa = []
// dupa.push(deck[13])
// dupa.push(deck[26])
// dupa.push(deck[15])
// dupa.push(deck[30])
// dupa.push(deck[2])

export function EvaluateHand(cardsArray) {
    const ranksStrength = {
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "5" : 5,
        "6" : 6,
        "7" : 7,
        "8" : 8,
        "9" : 9,
        "T" : 10,
        "J" : 11,
        "Q" : 12,
        "K" : 13,
        "A" : 14 
    }

    const compareRanks = (a, b) =>  {
        return ranksStrength[a.rank] - ranksStrength[b.rank]
    }

    const flush = (cardsArray) => {
        const colorCounter = {
            "s" : 0,
            "h" : 0,
            "d" : 0,
            "c" : 0

        }
        let highestRank = ""

        cardsArray.forEach(card => {
            colorCounter[card.suit] += 1
        });
        
        for (const suit in colorCounter) {
            if (colorCounter[suit] >= 5) {
                for (let i = cardsArray.length - 1; i > 0; i--) {
                    if (cardsArray[i].suit === suit) {
                        highestRank = cardsArray[i].rank
                        break
                    }
                }
                return [highestRank, suit]    
            }
        }
        return highestRank
    }

    const straight = (cardsArray) => {
        let highestRank = ""
        let returnStraight = []
        for (let i = 0; i < cardsArray.length; i++) {
            let counter = 0
            let finalStraight = []
            if (cardsArray.length - i < 5) break
            if (i === 0) { // Łataniec
                const pattern = ["2", "3", "4", "5", "A"]
                let temp = []
                let lastItem = null
                cardsArray.forEach(card => {
                   temp.push(card.rank) 
                });
                lastItem = temp[temp.length - 1]
                temp = temp.slice(0, 4)
                temp.push(lastItem)
                if (JSON.stringify(temp) === JSON.stringify(pattern)) return ["5", cardsArray.slice(0, 4).concat(cardsArray[cardsArray.length - 1])]
            }
            for (let j = i; j < cardsArray.length - 1; j++) {
                if (ranksStrength[cardsArray[j + 1].rank] - ranksStrength[cardsArray[j].rank] === 1) {
                    if (counter === 0) {finalStraight.push(cardsArray[j], cardsArray[j + 1])}
                    else finalStraight.push(cardsArray[j + 1])
                    counter++
                    if (counter > 3) {
                        returnStraight = [...finalStraight]
                        highestRank = cardsArray[j + 1].rank}
                }
                else if (ranksStrength[cardsArray[j + 1].rank] - ranksStrength[cardsArray[j].rank] === 0) continue
                else {
                    finalStraight = []
                    counter = 0}
            }
        }
        if (highestRank) return [highestRank, returnStraight]
        else false
    }

    const fourOfKind = (cardsArray) => {
        const rankCounter = {
            "2" : 0,
            "3" : 0,
            "4" : 0,
            "5" : 0,
            "6" : 0,
            "7" : 0,
            "8" : 0,
            "9" : 0,
            "T" : 0,
            "J" : 0,
            "Q" : 0,
            "K" : 0,
            "A" : 0 
        }
        let highestRank = ""

        cardsArray.forEach(card => {
            rankCounter[card.rank] += 1
        });
        
        for (const rank in rankCounter) {
            if (rankCounter[rank] === 4) {
                highestRank = rank
                break
            }
        }
        return highestRank
    }

    const threeOfKind = (cardsArray) => {
        const rankCounter = {
            "2" : 0,
            "3" : 0,
            "4" : 0,
            "5" : 0,
            "6" : 0,
            "7" : 0,
            "8" : 0,
            "9" : 0,
            "T" : 0,
            "J" : 0,
            "Q" : 0,
            "K" : 0,
            "A" : 0 
        }
        let highestRank = ""

        cardsArray.forEach(card => {
            rankCounter[card.rank] += 1
        });
        
        for (const rank in rankCounter) {
            if (rankCounter[rank] === 3) {
                highestRank = rank
            }
        }
        return highestRank
    }

    const pair = (cardsArray) => {
        const rankCounter = {
            "2" : 0,
            "3" : 0,
            "4" : 0,
            "5" : 0,
            "6" : 0,
            "7" : 0,
            "8" : 0,
            "9" : 0,
            "T" : 0,
            "J" : 0,
            "Q" : 0,
            "K" : 0,
            "A" : 0 
        }
        let highestRank = ""

        cardsArray.forEach(card => {
            rankCounter[card.rank] += 1
        });
        
        for (const rank in rankCounter) {
            if (rankCounter[rank] === 2) {
                highestRank = rank
            }
        }
        return highestRank
    }


   

    if (cardsArray.length > 7) return "Too many cards"
    cardsArray.sort(compareRanks)


    // WYKRYWANIE STRAIGHT FLUSH DO NAPISANIA (NIE DZIAŁA POPRAWNIE) 

    // if (flush(cardsArray) && straight(cardsArray)) {
    //     return {
    //     name: "straight flush",
    //     highestCard: flush(cardsArray),
    //     kicker: cardsArray.reverse().slice(0, 5)}}

    if (fourOfKind(cardsArray)) {
        const temp = cardsArray.filter(card => card.rank !== fourOfKind(cardsArray)) 
        return { 
        name:"four of kind",
        highestCard: fourOfKind(cardsArray),
        kicker: temp[temp.length - 1].rank} 
    }

    if (threeOfKind(cardsArray)) {
        const temp = cardsArray.filter(card => card.rank !== threeOfKind(cardsArray))
        if (pair(temp)) return { 
            name:"full house",
            highestCard: threeOfKind(cardsArray),
            kicker: pair(temp)}
    }

    if (flush(cardsArray)) return { 
        name:"flush",
        highestCard: flush(cardsArray)[0],
        kicker: cardsArray.filter(card => card.suit === flush(cardsArray)[1]).reverse().slice(0, 5)}

    if (straight(cardsArray)) return {
        name: "straight",
        highestCard: straight(cardsArray)[0],
        kicker: straight(cardsArray)[1].reverse()}

    if (threeOfKind(cardsArray)) return {
        name: "three of kind",
        highestCard: threeOfKind(cardsArray),
        kicker: cardsArray.filter(card => card.rank !== threeOfKind(cardsArray)).reverse().slice(0 , 2)}

    if (pair(cardsArray)) {
        const temp = cardsArray.filter(card => card.rank !== pair(cardsArray))
        if (pair(temp)) return { 
            name: "two pairs",
            highestCard: pair(cardsArray),
            kicker: pair(temp),
            secondKicker: temp.filter(card => card.rank !== pair(temp)).reverse()[0].rank}
    }

    if (pair(cardsArray)) return { 
        name:"pair",
        highestCard: pair(cardsArray),
        kicker: cardsArray.filter(card => card.rank !== pair(cardsArray)).reverse().slice(0, 3)}

    else return { 
        name: "high card",
        highestCard: cardsArray[cardsArray.length - 1].rank,
        kicker: cardsArray.reverse().slice(0, 5)}

}

export function CompareHands(playerHand, enemyHand) {
    const handStrength = {
        "high card" : 0,
        "pair" : 1,
        "two pairs" : 2,
        "three of kind" : 3,
        "straight" : 4,
        "flush" : 5,
        "full house" : 6,
        "four of kind" : 7,
        "straight flush" : 8
    }

    const ranksStrength = {
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "5" : 5,
        "6" : 6,
        "7" : 7,
        "8" : 8,
        "9" : 9,
        "T" : 10,
        "J" : 11,
        "Q" : 12,
        "K" : 13,
        "A" : 14 
    }

    const compare = (a, b) => {
        return handStrength[a.name] - handStrength[b.name]
    }

    const compareRanks = (a, b) => {
        return ranksStrength[a.highestCard] - ranksStrength[b.highestCard]
    }

    const compareKickers = (a, b) => {
        if (a.name === "two pairs") {
            if (ranksStrength[a.kicker] - ranksStrength[b.kicker] !== 0) return ranksStrength[a.kicker] - ranksStrength[b.kicker]
            else return ranksStrength[a.secondKicker] - ranksStrength[b.secondKicker]  
        }
        if (a.name === "four of kind" || a.name === "full house")
            return ranksStrength[a.kicker] - ranksStrength[b.kicker]
        else {
            for (let i = 0; i < a.kicker.length; i++) {
                // console.log(ranksStrength[a.kicker[i].rank])
                if (ranksStrength[a.kicker[i].rank] - ranksStrength[b.kicker[i].rank] === 0) continue
                else return ranksStrength[a.kicker[i].rank] - ranksStrength[b.kicker[i].rank] 
        }
        return 0}
    }

    if (compare(playerHand, enemyHand) > 0) return true
    if (compare(playerHand, enemyHand) === 0) {
        if (compareRanks(playerHand, enemyHand) > 0) return true
        if (compareRanks(playerHand, enemyHand) === 0) {
            if (compareKickers(playerHand, enemyHand) > 0) return true 
            if (compareKickers(playerHand, enemyHand) === 0) return "split"
            else return false 
        } 
        else return false
    }
    else return false
}

// console.log(dupa)
// console.log(EvaluateHand(dupa))

