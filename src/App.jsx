import { useState } from 'react'
import './App.css'
import { TURNS } from './logic/constants'
import { Square } from './components/Square.jsx'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal.jsx'


function App() {
  
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // Si el cuadrado ya está ocupado o si ya hay un ganador, no se puede hacer nada
    if (board[index] || winner) {
      return
    }
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    setTurn (turn === TURNS.X ? TURNS.O : TURNS.X)
    // Verificar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>
    <main className='board'>
      <h1>TA TE TI</h1>
      <button onClick= {resetGame} > Reset del juego </button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
              key= {index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
    </>
  )
}

export default App
