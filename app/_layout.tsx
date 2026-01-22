import { useColorScheme } from "@/styles/useColorScheme";
import "@/types/Array";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="board"
          options={{
            headerShown: true,
            title: "Board",
            headerBackTitle: "Exit",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
