import { act, fireEvent, render } from '@testing-library/react-native';
import { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { EMPTY_BOARD } from './constants';
import { TicTacToeContext, TicTacToeProvider } from './Context';
import { Board, Move, Player, Victory } from './types';

const players = [new Player("1", "X"), new Player("2", "O")] as const;

export function createMockContextValue(overrides: {
  victory?: Victory | null;
  handleMove?: (row: 0 | 1 | 2, column: 0 | 1 | 2) => void;
  moves?: Move[];
  board?: Board["Value"];
  isDraw?: boolean;
}) {
  return {
    currentPlayer: players[0],
    board: EMPTY_BOARD(),
    players,
    canUndo: false,
    moves: [],
    victory: null as Victory | null,
    resetGame: jest.fn(),
    handleMove: jest.fn(),
    undoLastMove: jest.fn(),
    isDraw: false,
    ...overrides,
  };
}

const TestingComponent = () => {
  const { resetGame, victory, board, handleMove, undoLastMove, canUndo } = useContext(TicTacToeContext);

  return (
    <>
      <Button title='Reset' onPress={resetGame} />
      <Button title='Undo' onPress={undoLastMove}
        disabled={!canUndo}
      />
      <Text>
        {victory
          ? `Player: ${victory?.player.id}, Coordinates: ${victory?.coordinates.join(' ')}`
          : 'No Winning Player yet'
        }
      </Text>
      {board.map((row, rowIndex) => (
        <View key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Text
              key={cellIndex}
              onPress={() =>
                handleMove(
                  rowIndex as 0 | 1 | 2,
                  cellIndex as 0 | 1 | 2
                )
              }
            >
              {`Cell Index: ${cellIndex}, rowIndex: ${rowIndex}, Value: ${cell || 'Empty'}`}
            </Text>
          ))}
        </View>
      ))}
    </>
  )
}

describe('render tests for <TicTacToeProvider />', () => {

  test('initial provider states', () => {
    const { getByText, } = render(
      <TicTacToeProvider>
        <TestingComponent />
      </TicTacToeProvider>
    );

    getByText('No Winning Player yet');

    [0, 1, 2].forEach((_, rowIndex) => {
      [0, 1, 2].forEach((_, cellIndex) => {
        expect(getByText(`Cell Index: ${cellIndex}, rowIndex: ${rowIndex}, Value: Empty`)).toBeDefined();
      });
    });
  });

  test('provide states when moving', () => {
    const { getByText, } = render(
      <TicTacToeProvider>
        <TestingComponent />
      </TicTacToeProvider>
    );

    const cell1 = getByText(`Cell Index: ${0}, rowIndex: ${0}, Value: Empty`);
    act(() => {
      fireEvent.press(cell1);
    });

    expect(getByText(`Cell Index: ${0}, rowIndex: ${0}, Value: X`)).toBeDefined();

    const cell2 = getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: Empty`);
    act(() => {
      fireEvent.press(cell2);
    });

    expect(getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: O`)).toBeDefined();
  });

  test('provide states when resetting', () => {
    const { getByText, } = render(
      <TicTacToeProvider>
        <TestingComponent />
      </TicTacToeProvider>
    );

    const cell1 = getByText(`Cell Index: ${0}, rowIndex: ${0}, Value: Empty`);
    act(() => {
      fireEvent.press(cell1);
    });

    const cell2 = getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: Empty`);
    act(() => {
      fireEvent.press(cell2);
    });

    expect(getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: O`)).toBeDefined();

    const button = getByText('Reset');

    act(() => {
      fireEvent.press(button);
    });

    [0, 1, 2].forEach((_, rowIndex) => {
      [0, 1, 2].forEach((_, cellIndex) => {
        expect(getByText(`Cell Index: ${cellIndex}, rowIndex: ${rowIndex}, Value: Empty`)).toBeDefined();
      });
    });
  });

  test('reset button is disable when the game starts', () => {
    const { getByText } = render(
      <TicTacToeProvider>
        <TestingComponent />
      </TicTacToeProvider>
    );

    const undoButton = getByText('Undo');
    expect(undoButton).toHaveProp('disabled', true);
  });

  test('reset button is disable when the game finishes', () => {
    const { getByText } = render(
      <TicTacToeProvider>
        <TestingComponent />
      </TicTacToeProvider>
    );

    act(() => {
      [0, 1, 2].forEach((_, rowIndex) => {
        [0, 1, 2].forEach((_, cellIndex) => {
          const tile = getByText(`Cell Index: ${cellIndex}, rowIndex: ${rowIndex}, Value: Empty`);
          fireEvent.press(tile);
        });
      });

    });

    const undoButton = getByText('Undo');
    expect(undoButton).toHaveProp('disabled', true);
  });

  test('undo the last moving', () => {
    const { getByText } = render(
      <TicTacToeProvider>
        <TestingComponent />
      </TicTacToeProvider>
    );

    const undoButton = getByText('Undo');
    const tile = getByText(`Cell Index: ${1}, rowIndex: ${0}, Value: Empty`);

    act(() => fireEvent.press(tile));
    expect(undoButton).toHaveProp('disabled', false);
    expect(tile).toHaveProp('children', `Cell Index: ${1}, rowIndex: ${0}, Value: X`);

    act(() => fireEvent.press(undoButton));
    expect(undoButton).toHaveProp('disabled', true);
    expect(tile).toHaveProp('children', `Cell Index: ${1}, rowIndex: ${0}, Value: Empty`);
  });
});