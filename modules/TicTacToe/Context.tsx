import { createContext, useMemo, useState } from "react";

import { EMPTY_BOARD } from "./constants";
import { Board, Move, Player, Victory } from "./types";

const initialPlayers = [new Player("1", "X"), new Player("2", "O")] as const;

export const TicTacToeContext = createContext({
  players: initialPlayers,
  currentPlayer: null! as Player,
  moves: [] as Move[],
  board: EMPTY_BOARD() as Board["Value"],
  victory: null! as Victory | null,
  resetGame: null! as () => void,
  handleMove: null! as (
    row: Board["Ordinal"],
    column: Board["Ordinal"]
  ) => void,
});

export function TicTacToeProvider({ children }: { children: React.ReactNode }) {
  const [players] = useState(initialPlayers);
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [board, setBoard] = useState<Board["Value"]>(EMPTY_BOARD());
  const victory = useMemo(
    () => Victory.evaluateGame({ board, players }),
    [board, players]
  );

  const resetGame = () => {
    setMoves([]);
    setBoard(EMPTY_BOARD());
    setCurrentPlayer(players[0]);
  };

  const handleMove = (row: Board["Ordinal"], column: Board["Ordinal"]) => {
    setMoves((prevMoves) => [
      ...prevMoves,

      new Move(
        currentPlayer.id,
        currentPlayer.symbol,
        [row, column],
        new Date()
      ),
    ]);

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][column] = currentPlayer.symbol;
      return newBoard;
    });

    setCurrentPlayer((p) => players.nextOrFirst(p));
  };

  return (
    <TicTacToeContext.Provider
      value={{
        board,
        players,
        currentPlayer,
        moves,
        handleMove,
        victory,
        resetGame,
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
}
