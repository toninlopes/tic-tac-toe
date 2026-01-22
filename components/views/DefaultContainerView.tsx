import { useThemeColor } from "@/styles/useThemeColor";
import { StyleSheet, View, type ViewProps } from "react-native";

export type DefaultContainerViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function DefaultContainerView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: DefaultContainerViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={{ ...styles.container, backgroundColor }} {...otherProps} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    overflow: "hidden",
  },
});
