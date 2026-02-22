import { VICTORY_CONDITIONS } from "./constants";

export interface Tile {
  Value: "X" | "O";
  State: null | Tile["Value"];
}

export interface Board {
  Ordinal: 0 | 1 | 2;
  Coordinates: readonly [Board["Ordinal"], Board["Ordinal"]];
  Value: [Tile["State"], Tile["State"], Tile["State"]][];
}

export class Player {
  id: string;
  symbol: NonNullable<Tile["Value"]>;

  constructor(id: string, symbol: Tile["Value"]) {
    this.id = id;
    this.symbol = symbol;
  }
}

export class Move {
  id: string;
  value: Tile["Value"];
  coordinates: Board["Coordinates"];
  timestamp: Date;

  constructor(
    id: string,
    value: Tile["Value"],
    coordinates: Board["Coordinates"],
    timestamp: Date
  ) {
    this.id = id;
    this.value = value;
    this.coordinates = coordinates;
    this.timestamp = new Date(timestamp);
  }

  toString(): string {
    return [
      this.id,
      this.value,
      this.coordinates.join(""),
      Number(this.timestamp),
    ].join("");
  }
}

export namespace State {
  export type Value = {
    board: Board["Value"];
    players: readonly [Player, Player];
    currentPlayer: Player;
    moves: Move[];
  };
}


export class Victory {
  player: Player;
  coordinates: number[][];

  constructor(player: Player, coordinates: number[][]) {
    this.player = player;
    this.coordinates = coordinates;
  }

  static evaluateGame(
    game: Pick<State.Value, "board" | "players">
  ): Victory | null {
    const { board, players } = game;

    const match = VICTORY_CONDITIONS.find((condition) =>
      players
        .map((p) => p.symbol)
        .some((symbol) =>
          condition.every(([row, column]) => symbol === board[row][column])
        )
    );

    if (!match) {
      return null;
    }

    const [row, column] = match[0];
    return new Victory(
      players.find((p) => p.symbol === board[row][column])!,
      match
    );
  }

  /**
   * Predict whether the game is draw or not.
   * Considers alternation: a line is only winnable if the player can still
   * fill the remaining cells (they have enough moves left).
   */
  static predictDraw(
    game: Pick<State.Value, "board">
  ): boolean {
    const { board } = game;

    // Count how many moviments were done by each player.
    let nX = 0;
    let nO = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const v = board[r][c];
        if (v === "X") nX++;
        else if (v === "O") nO++;
      }
    }
    // How many remaining movements?
    const remaining = 9 - nX - nO;
    // Count how many moviments left for X
    const xMovesLeft = nX === nO ? Math.ceil(remaining / 2) : Math.floor(remaining / 2);
    // Count how many moviments left for O
    const oMovesLeft = remaining - xMovesLeft;

    const noLineWinnable = VICTORY_CONDITIONS.every((line) => {
      const symbols = line.map(([r, c]) => board[r][c]);
      const hasX = symbols.includes("X");
      const hasO = symbols.includes("O");
      const emptyCount = symbols.filter((s) => s === null).length;

      // X can win if there is no O in the line
      // and number of empty Tile is lesser
      // then the movements left for X.
      const xCanWin = !hasO && emptyCount <= xMovesLeft;

      // O can win if there is no X in the line
      // and number of empty Tile is lesser
      // then the movements left for O.
      const oCanWin = !hasX && emptyCount <= oMovesLeft;
      return !xCanWin && !oCanWin;
    });

    return noLineWinnable;
  }

  evaluateTile = (coordinates: Board["Coordinates"]): boolean =>
    this.coordinates.some(
      ([row, column]) => row === coordinates[0] && column === coordinates[1]
    );
}