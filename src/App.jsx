import React, { useEffect, useRef, useState } from 'react';
import Table from './Table';
import PlayersCards from './PlayersCards';
import Buttons from './Buttons';
import Modal from './End.jsx';
import { createNewDeck, shuffleDeck } from './Card.js';
import { EvaluateHand, CompareHands } from "./Logic.js"


function App() {
  const handWin = useRef(false)
  const [end, setEnd] = useState(false)
  const [init, setInit] = useState(false)
  const [foldCounter, setfoldCounter] = useState(0)
  const phases = ["preflop", "flop", "turn", "river", "showdown"]
  const Pcounter = useRef(0)
  const [currentPhase, setCurrentPhase] = useState(phases[0])
  const [deck, setDeck] = useState(shuffleDeck(createNewDeck()))
  const [cardsForPlayers, setCardsForPlayers] = useState(deck.slice(0, 4))
  const [handCounter, setHandCounter] = useState(1)
  const board = deck.slice(4, 9)

  const [playerChips, setPlayerChips] = useState(995)
  const [playerHand, setPlayerHand] = useState()

  const [pot, setPot] = useState(15)

 

  useEffect(() => {
    if (init && currentPhase === "preflop") {
      if (handWin.current) {
        if (handWin.current == "split") setPlayerChips(c => c + pot / 2)
        else setPlayerChips(c => c + pot)
      }
      else if (playerChips <= 0) setEnd(true)
      handWin.current = false
      const temp = shuffleDeck(createNewDeck())
      setPlayerHand(null)
      setDeck(temp)
      setCardsForPlayers(temp.slice(0, 4))
      setHandCounter(h => h + 1)
      setPlayerChips(c => c - blind(handCounter + 1))
      setPot(15)
    }
  }, [currentPhase, foldCounter])

  const fold = () => {
    Pcounter.current = 0
    setInit(true)
    setCurrentPhase(phases[Pcounter.current])
    setfoldCounter(d => d + 1)
  }

  const nextPhase = () => {
    Pcounter.current++
    if (Pcounter.current > 0) {
      setPlayerHand(EvaluateHand(cardsForPlayers.slice(2, 4).concat(board.slice(0, 2 + Pcounter.current))))
      // console.log(playerHand)
    }
    if (Pcounter.current === 4) {
      const player = EvaluateHand(cardsForPlayers.slice(2, 4).concat(board.slice(0, 2 + Pcounter.current)))
      const enemy = EvaluateHand(cardsForPlayers.slice(0, 2).concat(board.slice(0, 2 + Pcounter.current)))
      console.log(player, enemy)
      console.log((CompareHands(player, enemy)))
      if (CompareHands(player, enemy)) {
        if (CompareHands(player, enemy) === "split") handWin.current = "split"
        else handWin.current = true
      }
    }
    if (Pcounter.current === 5) Pcounter.current = 0
    setInit(true)
    setCurrentPhase(phases[Pcounter.current])
  }

  const blind = (handCounter) => {
    const smallBlind = 5
    if (handCounter % 2) return smallBlind
    else return smallBlind * 2
  }


  return (
    <>
      <Modal showModal={end} />
      <PlayersCards cards={cardsForPlayers.slice(0, 2)} hero={false} phase={currentPhase}></PlayersCards>
      <Table deck={deck} phase={Pcounter} playerChips={playerChips} hand={handCounter} blind={blind} pot={pot}>
      </Table>
      <PlayersCards cards={cardsForPlayers.slice(2, 4)} hero={true} phase={currentPhase}></PlayersCards>
      <Buttons phase={nextPhase} currentPhase={currentPhase} fold={fold} playerChips={playerChips} playerHand={playerHand} setPot={setPot} setPlayerChips={setPlayerChips}/>
    </>
  );
}

export default App;
