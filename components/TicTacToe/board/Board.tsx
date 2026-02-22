import { ThemedText } from "@/components/text/ThemedText";
import { TicTacToe } from "@/modules";
import { Board as BoardType } from "@/modules/TicTacToe/types";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import { useContext, useEffect } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Tile } from "./Tile";

export function Board() {
  const navigation = useNavigation();

  const {
    victory,
    resetGame,
    board,
    undoLastMove,
    canUndo,
    currentPlayer,
    isDraw,
  } = useContext(TicTacToe.Context);

  useEffect(() => {
    navigation.setOptions({
      headerRight: (victory || isDraw)
        ? () => (
          <Button variant="plain" onPress={resetGame}>
            Reset
          </Button>
        )
        : undefined,
    });
  }, [victory, resetGame, navigation]);

  return (
    <>
      <ThemedText style={styles.currentPlayer}>
        {`Current Player -> ${currentPlayer.symbol}`}
      </ThemedText>
      <View style={styles.container}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Tile
                key={`${rowIndex}-${cellIndex}`}
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
      <Pressable
        style={[styles.undeButton, !canUndo && styles.disabledUndoButton] as StyleProp<ViewStyle>}
        disabled={!canUndo}
        onPress={undoLastMove}
      >
        <ThemedText>Undo</ThemedText>
      </Pressable>
      {isDraw && (
        <ThemedText style={styles.drawText}>The match has drawn.</ThemedText>
      )}
    </>
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
  currentPlayer: {
    marginTop: 12,
    textAlign: 'center'
  },
  row: {
    height: "33.33%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  undeButton: {
    margin: 10,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  disabledUndoButton: {
    opacity: .4,
  },
  drawText: {
    textAlign: 'center',
  },
});
