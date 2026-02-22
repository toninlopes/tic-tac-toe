import * as Constants from "./constants";
import { TicTacToeContext, TicTacToeProvider } from "./Context";
import * as Types from "./types";
import { useScore } from './useScore';

export const TicTacToe = {
  Constants,
  Context: TicTacToeContext,
  Provider: TicTacToeProvider,
  Types,
  useScore,
};
