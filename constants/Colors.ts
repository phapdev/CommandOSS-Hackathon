/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#0077B6", // Ocean blue
    primaryLight: "#90E0EF",
    primaryDark: "#03045E",
    secondary: "#FFB703",
    background: "#FFFFFF",
    text: "#333333",
    textLight: "#666666",
    success: "#2CB67D",
    error: "#E63946",
    warning: "#F9C74F",
    card: "#F8F9FA",
    border: "#E0E0E0",
    placeholder: "#AAAAAA",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
