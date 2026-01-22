import { ThemedText } from "@/components/text/ThemedText";
import { ThemedView } from "@/components/views/ThemedView";
import { SymbolViewProps } from "expo-symbols";
import {
  OpaqueColorValue,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

type ButtonIcon = {
  name: SymbolViewProps["name"];
  color: OpaqueColorValue;
};

type Button = {
  icon?: ButtonIcon;
  title: string;
  onPress: () => void;
};

type Props = {
  buttons: Button[];
};

export function ButtonList({ buttons = [] }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1c1c1e" : "#ffffff" },
      ]}
    >
      {buttons.map(({ icon, ...button }) => (
        <Pressable
          key={button.title}
          onPress={button.onPress}
          style={({ pressed }) => [
            styles.item,
            pressed && { backgroundColor: isDark ? "#2c2c2e" : "#e5e5ea" },
          ]}
        >
          {icon && (
            <IconSymbol
              name={icon.name}
              size={14}
              color={icon.color || (isDark ? "#48484a" : "#c7c7cc")}
            />
          )}
          <ThemedText style={styles.itemText}>{button.title}</ThemedText>
          <IconSymbol
            name="chevron.right"
            size={14}
            color={isDark ? "#48484a" : "#c7c7cc"}
          />
        </Pressable>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 20,
  },
});
