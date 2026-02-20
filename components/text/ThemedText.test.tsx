import { render } from "@testing-library/react-native";
import React from "react";
import * as RN from 'react-native';
import { ThemedText } from "./ThemedText";

describe('unit tests for ThemedText', () => {

  test('render ThemedText when type is default', () => {
    const { toJSON } = render(<ThemedText type="default" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('render ThemedText when type is defaultSemiBold', () => {
    const { toJSON } = render(<ThemedText type="defaultSemiBold" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('render ThemedText when type is link', () => {
    const { toJSON } = render(<ThemedText type="link" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('render ThemedText when type is subtitle', () => {
    const { toJSON } = render(<ThemedText type="subtitle" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('render ThemedText when type is title', () => {
    const { toJSON } = render(<ThemedText type="title" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('render ThemedText when is light theme', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { toJSON } = render(<ThemedText />);
    expect(toJSON()).toMatchSnapshot();

    jest.spyOn(RN, 'useColorScheme').mockRestore();
  })


  test('render ThemedText when is dark theme', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    const { toJSON } = render(<ThemedText />);
    expect(toJSON()).toMatchSnapshot();

    jest.spyOn(RN, 'useColorScheme').mockRestore();
  })
});