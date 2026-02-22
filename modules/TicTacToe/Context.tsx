import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { EMPTY_BOARD } from "./constants";
import { minimax } from "./minmax";
import { Board, Move, Player, PlayerType, Victory } from "./types";

const initialPlayers = (mode?: PlayerType) => [new Player("1", "X", 'self'), new Player("2", "O", mode || 'friend')] as const;

export const TicTacToeContext = createContext({
  players: initialPlayers(),
  currentPlayer: null! as Player,
  moves: [] as Move[],
  board: EMPTY_BOARD() as Board["Value"],
  victory: null! as Victory | null,
  resetGame: null! as () => void,
  handleMove: null! as (
    row: Board["Ordinal"],
    column: Board["Ordinal"]
  ) => void,
  undoLastMove: null! as () => void,
  canUndo: null! as boolean,
  isDraw: null! as boolean,
});

export function TicTacToeProvider({ children }: { children: React.ReactNode }) {
  const screenProps = useLocalSearchParams();

  const [players] = useState(initialPlayers(screenProps?.mode && screenProps.mode as PlayerType || undefined));
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [board, setBoard] = useState<Board["Value"]>(EMPTY_BOARD());
  const victory = useMemo(
    () => Victory.evaluateGame({ board, players }),
    [board, players]
  );
  /**
   * Checks whether the game can have the last move undone or not.
   */
  const canUndo = useMemo(
    () => moves.length !== 0 && moves.length !== 9 && victory === null,
    [moves, victory]
  );

  /**
   * Checks whether the game is draw or not.
   */
  const isDraw = useMemo(
    () => Victory.predictDraw({ board }),
    [board]
  )

  const resetGame = () => {
    setMoves([]);
    setBoard(EMPTY_BOARD());
    setCurrentPlayer(players[0]);
  };

  const handleMove = useCallback(
    (row: Board["Ordinal"], column: Board["Ordinal"]) => {
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

      setCurrentPlayer((p) => (
        players.nextOrFirst && players.nextOrFirst(p)) || players[p.id === players[0].id ? 1 : 0],
      );
    },
    [moves, board, currentPlayer]
  );

  /**
   * Undo the last move.
   */
  const undoLastMove = useCallback(
    () => {
      setMoves((previousMoves) => {
        const allMoves = [...previousMoves]
        const lastMove = allMoves.pop();
        if (!lastMove) {
          return previousMoves;
        }

        const [row, column] = lastMove.coordinates;

        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[row][column] = null;
          return newBoard;
        });

        setCurrentPlayer((p) => (
          players.nextOrFirst && players.nextOrFirst(p)) || players[p.id === players[0].id ? 1 : 0],
        );

        return allMoves;
      });

    },
    [moves]
  );

  useEffect(() => {
    if (currentPlayer.who === 'computer') {
      const nextBestMoviment = minimax.getBestMove(board, currentPlayer.symbol);
      if (!nextBestMoviment) {
        return;
      }

      const [row, column] = nextBestMoviment;
      handleMove(row, column)
    }
  }, [currentPlayer])

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
        undoLastMove,
        canUndo,
        isDraw
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
}
