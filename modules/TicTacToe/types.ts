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

    if (!match) return null;

    const [row, column] = match[0];
    return new Victory(
      players.find((p) => p.symbol === board[row][column])!,
      match
    );
  }

  evaluateTile = (coordinates: Board["Coordinates"]): boolean =>
    this.coordinates.some(
      ([row, column]) => row === coordinates[0] && column === coordinates[1]
    );
}
