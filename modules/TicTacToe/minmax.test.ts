import { minimax } from "./minmax";
import { Board, Player } from "./types";

describe('unit tests for Minmax class', () => {

  test('should predict the next move', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const board = [
      [p1.symbol, p2.symbol, null],
      [null, null, null],
      [p1.symbol, null, null],
    ] as Board["Value"];

    const nextBestMovement = minimax.getBestMove(board, p2.symbol);

    expect(nextBestMovement).toBeDefined();
    expect(nextBestMovement?.[0]).toBe(1);
    expect(nextBestMovement?.[1]).toBe(0);

  });

  test('should predict the next move to win', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const board = [
      [p1.symbol, p2.symbol, p1.symbol],
      [p2.symbol, p2.symbol, p1.symbol],
      [p1.symbol, null, null],
    ] as Board["Value"];

    const nextBestMovement = minimax.getBestMove(board, p2.symbol);

    expect(nextBestMovement).toBeDefined();
    expect(nextBestMovement?.[0]).toBe(2);
    expect(nextBestMovement?.[1]).toBe(1);
  });

});