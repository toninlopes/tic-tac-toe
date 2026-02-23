import { ThemedText } from "@/components/text/ThemedText";
import { TicTacToe } from "@/modules";
import { Board } from "@/modules/TicTacToe/types";
import { Colors } from "@/styles/theme";
import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OFFSET = 10;
const TIME = 200;
const DELAY = 200;

type TileProps = {
  value: null | "X" | "O";
  coordinates: Board["Coordinates"];
};

export const Tile = React.memo(
  ({ value = null, coordinates: [row, col] }: TileProps) => {
    const { handleMove, victory } = useContext(TicTacToe.Context);
    const backgroundColor =
      value === null
        ? "#e0e0e0"
        : victory?.evaluateTile([row, col])
          ? "green"
          : Colors.light.tint;

    const offset = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value }],
    }));

    if (backgroundColor === "green") {
      offset.value = withDelay(
        DELAY,
        withSequence(
          // start from -OFFSET
          withTiming(-OFFSET, { duration: TIME / 2 }),
          // shake between -OFFSET and OFFSET 5 times
          withRepeat(withTiming(OFFSET, { duration: TIME }), 5, true),
          // go back to 0 at the end
          withTiming(0, { duration: TIME / 2 })
        )
      );
    }

    const handlePress = () => {
      if (!!value || !!victory) return;
      handleMove(row, col);
    };

    return (
      <AnimatedPressable
        onPress={handlePress}
        disabled={!!value || !!victory}
        style={[
          styles.container,
          { backgroundColor },
          animatedStyle,
        ]}
      >
        <ThemedText style={styles.text}>{value || ''}</ThemedText>
      </AnimatedPressable>
    );
  },
);

Tile.displayName = 'Tile';

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
