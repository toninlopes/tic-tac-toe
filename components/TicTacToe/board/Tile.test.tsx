import { Player, Victory } from "@/modules/TicTacToe/types";
import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Tile } from "./Tile";

describe('unit tests for Tile component', () => {

  test('should render the tile with the correct value when value is null', () => {
    const { getByText, toJSON } = render(<Tile value={null} coordinates={[0, 0]} />);

    expect(getByText('')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render the tile with the correct value when value is "X"', () => {
    const { getByText, toJSON } = render(<Tile value="X" coordinates={[1, 1]} />);

    expect(getByText('X')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render the tile with the correct value when value is "O"', () => {
    const { getByText, toJSON } = render(<Tile value="O" coordinates={[2, 2]} />);

    expect(getByText('O')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render the tile with when value is "X" and victory is true', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({
      victory: new Victory(new Player("1", "X"), [[0, 0], [1, 1], [2, 2]]),
      handleMove: jest.fn(),
    });

    const { getByText, toJSON } = render(<Tile value="X" coordinates={[1, 1]} />);

    expect(getByText('X')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();

    jest.spyOn(React, 'useContext').mockRestore();
  });

  test('should fire handleMove when the tile is pressed and value is null', () => {
    const handleMove = jest.fn();
    jest.spyOn(React, 'useContext').mockReturnValue({
      victory: null,
      handleMove: handleMove,
    });

    const { getByText } = render(<Tile value={null} coordinates={[1, 1]} />);

    act(() => {
      fireEvent.press(getByText(''));
    });

    expect(handleMove).toHaveBeenCalledTimes(1);

    jest.spyOn(React, 'useContext').mockRestore();
  });
});