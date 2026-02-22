import { EMPTY_BOARD } from "./constants";
import { Board, Move, Player, Victory } from "./types";


describe('unit tests for Move class', () => {

  test('', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const move1 = new Move(p1.id, p1.symbol, [0, 0], new Date(2026, 1, 19, 18, 30, 0));
    const move2 = new Move(p2.id, p2.symbol, [0, 1], new Date(2026, 1, 19, 18, 31, 0));

    expect(move1.toString()).toBe(`1X00${Number(new Date(2026, 1, 19, 18, 30, 0))}`);
    expect(move2.toString()).toBe(`2O01${Number(new Date(2026, 1, 19, 18, 31, 0))}`);
  });
});

describe('unit tests for Victory class', () => {

  test('evaluateGame should return null when the board is empty', () => {
    const victory = Victory.evaluateGame({
      board: EMPTY_BOARD(),
      players: [new Player("1", "X"), new Player("2", "O")] as const,
    });

    expect(victory).toBeNull();
  });

  test('evaluateGame should return null when there is no victory condition', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const board_with_no_victory = () => [
      [p1.symbol, p2.symbol, p1.symbol],
      [p1.symbol, p2.symbol, p2.symbol],
      [p2.symbol, p1.symbol, p1.symbol],
    ] as Board["Value"];

    const victory = Victory.evaluateGame({
      board: board_with_no_victory(),
      players: [p1, p2] as const,
    });

    expect(victory).toBeNull();
  });

  test('evaluateGame should return Player 1 when there is victory condition for it', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const board_with_p1_victory = () => [
      [p1.symbol, p2.symbol, null],
      [null, p1.symbol, p2.symbol],
      [null, null, p1.symbol],
    ] as Board["Value"];

    const victory = Victory.evaluateGame({
      board: board_with_p1_victory(),
      players: [p1, p2] as const,
    });

    expect(victory).not.toBeNull();
    expect(victory?.player).toMatchObject(p1);
    expect(victory?.coordinates).toEqual([[0, 0], [1, 1], [2, 2]]);

    expect(victory?.evaluateTile([0, 0])).toBeTruthy();
    expect(victory?.evaluateTile([1, 1])).toBeTruthy();
    expect(victory?.evaluateTile([2, 2])).toBeTruthy();
  });

  test('evaluateGame should return Player 2 when there is victory condition for it', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const board_with_p2_victory = () => [
      [p1.symbol, p1.symbol, p2.symbol],
      [p1.symbol, p2.symbol, null],
      [p2.symbol, null, null],
    ] as Board["Value"];

    const victory = Victory.evaluateGame({
      board: board_with_p2_victory(),
      players: [p1, p2] as const,
    });

    expect(victory).not.toBeNull();
    expect(victory?.player).toMatchObject(p2);
    expect(victory?.coordinates).toEqual([[0, 2], [1, 1], [2, 0]]);

    expect(victory?.evaluateTile([0, 2])).toBeTruthy();
    expect(victory?.evaluateTile([1, 1])).toBeTruthy();
    expect(victory?.evaluateTile([2, 0])).toBeTruthy();
  });

  test('evaluteTile should be trutly for the victory coordinates and be falsy for others', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const board_with_victory = () => [
      [p1.symbol, p2.symbol, null],
      [null, p1.symbol, p2.symbol],
      [null, null, p1.symbol],
    ] as Board["Value"];

    const victory = Victory.evaluateGame({
      board: board_with_victory(),
      players: [p1, p2] as const,
    });

    expect(victory?.evaluateTile([0, 0])).toBeTruthy();
    expect(victory?.evaluateTile([1, 1])).toBeTruthy();
    expect(victory?.evaluateTile([2, 2])).toBeTruthy();

    expect(victory?.evaluateTile([0, 1])).toBeFalsy();
    expect(victory?.evaluateTile([1, 2])).toBeFalsy();
    expect(victory?.evaluateTile([2, 1])).toBeFalsy();
  });

  test('predictDraw should return false when there is a chance for victory condition', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const boards_with_change_for_victory = [
      // First board
      [
        [p1.symbol, null, p2.symbol],
        [null, p1.symbol, p2.symbol],
        [null, null, null],
      ] as Board["Value"],
      // Second board
      [
        [p1.symbol, p2.symbol, p1.symbol],
        [p2.symbol, p2.symbol, null],
        [null, null, p1.symbol],
      ] as Board["Value"],
      // Second board
      [
        [p2.symbol, p1.symbol, p1.symbol],
        [null, p2.symbol, null],
        [null, null, p1.symbol],
      ] as Board["Value"],
    ];

    boards_with_change_for_victory.forEach(board => {
      const isDrawPredicted = Victory.predictDraw({
        board,
      });

      expect(isDrawPredicted).toBeFalsy();
    });
  });

  test('predictDraw should return true when there is no chance for victory condition', () => {
    const p1 = new Player("1", "X");
    const p2 = new Player("2", "O");

    const boards_with_no_change_for_victory = [
      // First board
      [
        [p1.symbol, p1.symbol, p2.symbol],
        [p2.symbol, p2.symbol, p1.symbol],
        [p1.symbol, p2.symbol, null],
      ] as Board["Value"],
      // Second board
      [
        [p1.symbol, p2.symbol, p1.symbol],
        [null, p1.symbol, null],
        [p2.symbol, p1.symbol, p2.symbol],
      ] as Board["Value"],
    ];

    boards_with_no_change_for_victory.forEach(board => {
      const isDrawPredicted = Victory.predictDraw({
        board,
      });

      expect(isDrawPredicted).toBeTruthy();
    });
  });
});