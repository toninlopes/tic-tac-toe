import { TicTacToe } from "@/modules";
import { createMockContextValue } from "@/modules/TicTacToe/Context.test";
import { Board as B, Move } from '@/modules/TicTacToe/types';
import { render } from "@testing-library/react-native";
import { Board } from "./Board";

const NO_WIN_BOARD = () =>
  [
    ["X", "O", "X"],
    ["X", "X", "O"],
    ["O", "X", "O"],
  ] as B["Value"];


const X_WIN_BOARD = () =>
  [
    ["X", null, "O"],
    [null, "X", "O"],
    [null, null, "X"],
  ] as B["Value"];

const NO_WIN_MOVES: Move[] = [
  new Move('1', "X", [0, 0], new Date()),
  new Move('2', "O", [0, 1], new Date()),
  new Move('1', "X", [0, 2], new Date()),

  new Move('1', "X", [1, 0], new Date()),
  new Move('2', "O", [1, 2], new Date()),
  new Move('1', "X", [1, 1], new Date()),

  new Move('2', "O", [2, 0], new Date()),
  new Move('1', "X", [2, 1], new Date()),
  new Move('2', "O", [2, 2], new Date()),
];

const X_WIN_MOVES: Move[] = [
  new Move('1', "X", [0, 0], new Date()),
  new Move('2', "O", [0, 2], new Date()),
  new Move('1', "X", [1, 1], new Date()),
  new Move('2', "O", [1, 2], new Date()),
  new Move('1', "X", [2, 2], new Date()),
];

describe('unit tests for Board component', () => {

  test('should render when the Board is empty', () => {
    const value = createMockContextValue({});
    const { toJSON } = render(
      <TicTacToe.Context.Provider value={value}>
        <Board />
      </TicTacToe.Context.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render when the Board is full, but no win', () => {
    const value = createMockContextValue({
      board: NO_WIN_BOARD(),
      moves: NO_WIN_MOVES,
    });
    const { toJSON } = render(
      <TicTacToe.Context.Provider value={value}>
        <Board />
      </TicTacToe.Context.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render when the Board when X won', () => {
    const value = createMockContextValue({
      board: X_WIN_BOARD(),
      moves: X_WIN_MOVES,
    });
    const { toJSON } = render(
      <TicTacToe.Context.Provider value={value}>
        <Board />
      </TicTacToe.Context.Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});