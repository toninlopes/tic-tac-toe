import { TicTacToe } from "@/modules";
import { Board as BoardType } from "@/modules/TicTacToe/types";
import { useContext, useEffect } from "react";

import { Button } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Tile } from "./Tile";

export function Board() {
  const navigation = useNavigation();
  const { victory, resetGame, board } = useContext(TicTacToe.Context);

  useEffect(() => {
    navigation.setOptions({
      headerRight: !victory
        ? undefined
        : () => (
            <Button variant="plain" onPress={resetGame}>
              Reset
            </Button>
          ),
    });
  }, [victory, resetGame, navigation]);

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <Tile
              key={cellIndex}
              value={cell}
              coordinates={[
                rowIndex as BoardType["Ordinal"],
                cellIndex as BoardType["Ordinal"],
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    padding: 10,
  },

  row: {
    height: "33.33%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
