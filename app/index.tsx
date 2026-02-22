import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { ButtonList } from "@/components/lists/ButtonList";
import { ThemedText } from "@/components/text/ThemedText";
import { ParallaxScrollView, ThemedView } from "@/components/views";
import { useScore } from "@/modules/TicTacToe/useScore";
import { router } from "expo-router";

export default function HomeScreen() {
  const { score, resetScores } = useScore();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Tic Tac Toe
        </ThemedText>
      </ThemedView>

      <ButtonList
        buttons={[
          {
            title: "Play vs Friend", onPress: () => router.push({
              pathname: "/board",
              params: { mode: "friend" }
            })
          },
          {
            title: "Play vs Computer", onPress: () => router.push({
              pathname: "/board",
              params: { mode: "computer" }
            })
          },
        ]}
      />

      <ThemedView style={styles.summaryContainer}>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Scoreboard
        </ThemedText>
      </ThemedView>
      <ThemedText>{`X wins: ${score.X}`}</ThemedText>
      <ThemedText>{`O wins: ${score.O}`}</ThemedText>
      <ThemedText>{`Draws: ${score.draw}`}</ThemedText>
      <Pressable
        style={styles.clearButton}
        onPress={resetScores}
      >
        <ThemedText>Reset Scores</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clearButton: {
    margin: 10,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
