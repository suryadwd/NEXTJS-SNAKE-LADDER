import React, { useState, useEffect, useCallback, JSX } from "react";
import "./board.css";

const snakesAndLadders: Record<number, number> = {
  16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78,
  2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98, 77: 94,
};

const Board = () => {
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);

  // Move player logic
  const movePlayer = useCallback((dice: number) => {
    if (currentPlayer === 1) {
      setPlayer1((prev) => {
        const newPos = prev + dice;
        if (newPos > 100) return prev;
        return snakesAndLadders[newPos] || newPos;
      });
      setCurrentPlayer(2);
    } else {
      setPlayer2((prev) => {
        const newPos = prev + dice; // ✅ Changed to const
        if (newPos > 100) return prev;
        return snakesAndLadders[newPos] || newPos;
      });
      setCurrentPlayer(1);
    }
  }, [currentPlayer]);

  // Dice roller
  const rollDice = useCallback(() => {
    const dice = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(dice);
    movePlayer(dice);
  }, [movePlayer]);

  // Trigger computer turn
  useEffect(() => {
    if (currentPlayer === 2) {
      setTimeout(() => rollDice(), 1000);
    }
  }, [currentPlayer, rollDice]); // ✅ rollDice added here

  // Winner check
  useEffect(() => {
    if (player1 === 100) {
      setTimeout(() => {
        alert("🎉 Player 1 Wins!");
        window.location.href = "/";
      }, 100);
    }
    if (player2 === 100) {
      setTimeout(() => {
        alert("🎉 Computer (Player 2) Wins!");
        window.location.href = "/";
      }, 100);
    }
  }, [player1, player2]);

  // Board UI
  const renderCells = () => {
    const cells: JSX.Element[] = [];
    for (let i = 100; i >= 1; i--) {
      let className = "cell";
      if (snakesAndLadders[i] && snakesAndLadders[i] < i) className += " snake";
      if (snakesAndLadders[i] && snakesAndLadders[i] > i) className += " ladder";

      cells.push(
        <div key={i} className={className}>
          {i}
          {i === player1 && <span className="player player1">P1</span>}
          {i === player2 && <span className="player player2">P2</span>}
        </div>
      );
    }
    return cells;
  };

  return (
    <div>
      <div className="board">{renderCells()}</div>
      <div className="controls">
        {currentPlayer === 1 ? (
          <button className="text-3xl" onClick={rollDice}>🎲 Roll Dice</button>
        ) : (
          <h3>Wait for Jarvis</h3>
        )}
        {diceRoll && <p>Dice: {diceRoll}</p>}
        <p>Current Turn: {currentPlayer === 1 ? "Your Turn" : "Jarvis Turn"}</p>
      </div>
    </div>
  );
};

export default Board;
