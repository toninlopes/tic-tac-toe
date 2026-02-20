import { act, fireEvent, render } from '@testing-library/react-native';
import { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { TicTacToeContext, TicTacToeProvider } from './Context';

const TestingComponent = () => {
  const { resetGame, victory, board, handleMove } = useContext(TicTacToeContext);

  return (
    <>
      <Button title='Reset' onPress={resetGame} />
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
        getByText(`Cell Index: ${cellIndex}, rowIndex: ${rowIndex}, Value: Empty`);
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

    getByText(`Cell Index: ${0}, rowIndex: ${0}, Value: X`);

    const cell2 = getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: Empty`);
    act(() => {
      fireEvent.press(cell2);
    });

    getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: O`);
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

    getByText(`Cell Index: ${1}, rowIndex: ${1}, Value: O`);

    const button = getByText('Reset');

    act(() => {
      fireEvent.press(button);
    });

    [0, 1, 2].forEach((_, rowIndex) => {
      [0, 1, 2].forEach((_, cellIndex) => {
        getByText(`Cell Index: ${cellIndex}, rowIndex: ${rowIndex}, Value: Empty`);
      });
    });
  });
});