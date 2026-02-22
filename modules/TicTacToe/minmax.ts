import { Board, Player, Tile, Victory } from "./types";

const DUMMY_PLAYERS = [
  new Player("1", "X", "self"),
  new Player("2", "O", "computer"),
] as const;

const SCORE_WIN = 10;
const SCORE_LOSE = -10;
const SCORE_DRAW = 0;

class Minimax {

  /**
   * Returns a deep copy of the board with one cell updated.
   */
  cloneBoardWithMove = (
    board: Board["Value"],
    row: Board["Ordinal"],
    column: Board["Ordinal"],
    symbol: NonNullable<Tile["State"]>
  ): Board["Value"] => {
    return board.map((r, rIdx) =>
      r.map((cell, cIdx) =>
        rIdx === row && cIdx === column ? symbol : cell
      )
    ) as Board["Value"];
  };

  /**
   * Returns coordinates of all empty cells.
   */
  getEmptyCells = (board: Board["Value"]): Board["Coordinates"][] => {
    const cells: Board["Coordinates"][] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === null) {
          cells.push([r as Board["Ordinal"], c as Board["Ordinal"]]);
        }
      }
    }
    return cells;
  }

  /**
   * Minimax evaluation. Returns a score from the AI's perspective:
   * positive = good for AI, negative = good for human.
   */
  minimax = (
    board: Board["Value"],
    isMaximizing: boolean,
    computerSymbol: NonNullable<Tile["Value"]>,
  ): number => {
    const humanSymbol = computerSymbol === "X" ? "O" : "X";
    const victory = Victory.evaluateGame({
      board,
      players: DUMMY_PLAYERS,
    });

    if (victory !== null) {
      if (victory.player.symbol === computerSymbol) {
        return SCORE_WIN;
      }
      return SCORE_LOSE;
    }

    if (Victory.predictDraw({ board })) {
      return SCORE_DRAW;
    }

    const emptyCells = this.getEmptyCells(board);
    if (emptyCells.length === 0) {
      return SCORE_DRAW;
    }

    if (isMaximizing) {
      let best = 0;
      for (const [row, column] of emptyCells) {
        const newBoard = this.cloneBoardWithMove(board, row, column, computerSymbol);
        const score = this.minimax(newBoard, false, computerSymbol);
        best = Math.max(best, score);
      }
      return best;
    } else {
      let best = 0;
      for (const [row, column] of emptyCells) {
        const newBoard = this.cloneBoardWithMove(board, row, column, humanSymbol);
        const score = this.minimax(newBoard, true, computerSymbol);
        best = Math.min(best, score);
      }
      return best;
    }
  }

  /**
   * Returns the best move for the AI using the Minimax algorithm.
   * @param board - Current board state
   * @param aiSymbol - Symbol played by the computer ("X" or "O")
   * @returns Best move coordinates, or null if no moves available
   */
  getBestMove = (
    board: Board["Value"],
    computerSymbol: NonNullable<Tile["Value"]>
  ): Board["Coordinates"] | null => {
    const emptyCells = this.getEmptyCells(board);
    if (emptyCells.length === 0) {
      return null;
    }

    let bestMove: Board["Coordinates"] = emptyCells[0];
    let bestScore = -Infinity;

    for (const [row, column] of emptyCells) {
      const newBoard = this.cloneBoardWithMove(board, row, column, computerSymbol);
      const score = this.minimax(newBoard, false, computerSymbol);
      if (score > bestScore) {
        bestScore = score;
        bestMove = [row, column];
      }
    }

    return bestMove;
  }
}

export const minimax = new Minimax();