import { Board } from "@/components/TicTacToe/board/Board";
import { DefaultContainerView } from "@/components/views/DefaultContainerView";
import { TicTacToe } from "@/modules";
import { StyleSheet } from "react-native";

export const BoardScreen = () => (
  <TicTacToe.Provider>
    <DefaultContainerView style={styles.container}>
      <Board />
    </DefaultContainerView>
  </TicTacToe.Provider>
);

export default BoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
