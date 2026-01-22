import { ThemedText } from "@/components/text/ThemedText";
import { TicTacToe } from "@/modules";
import { Board } from "@/modules/TicTacToe/types";
import { Colors } from "@/styles/theme";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

type TileProps = {
  value: null | "X" | "O";
  coordinates: Board["Coordinates"];
};

export function Tile({ value = null, coordinates: [row, col] }: TileProps) {
  const { handleMove, victory } = useContext(TicTacToe.Context);
  const backgroundColor =
    value === null
      ? "#e0e0e0"
      : victory?.evaluateTile([row, col])
      ? "green"
      : Colors.light.tint;

  const handlePress = () => {
    if (!!value || !!victory) return;
    handleMove(row, col);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={!!value || !!victory}
      style={{ ...styles.container, backgroundColor }}
    >
      <ThemedText style={styles.text}>{value}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
