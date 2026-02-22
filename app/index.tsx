import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { ButtonList } from "@/components/lists/ButtonList";
import { ThemedText } from "@/components/text/ThemedText";
import { ParallaxScrollView, ThemedView } from "@/components/views";
import { router } from "expo-router";

export default function HomeScreen() {
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
