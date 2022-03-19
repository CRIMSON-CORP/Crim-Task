import { extendTheme } from "native-base";
import { DefaultTheme } from "@react-navigation/native";

const theme = extendTheme({
    colors: {
        primary: {
            accent: "#E91E63",
            100: "#DB00FF",
            200: "#602EA6",
            200: "#1A1040",
            300: "#372773",
            400: "#0C0826",
            500: "#00010D",
        },
    },
    fontConfig: {
        Raleway: {
            100: { normal: "Raleway-Thin" },
            200: { normal: "Raleway-Light" },
            300: { normal: "Raleway-Regular" },
            400: { normal: "Raleway-Medium" },
            500: { normal: "Raleway-SemiBold" },
            600: { normal: "Raleway-Bold" },
            700: { normal: "Raleway-Extrabold" },
            800: { normal: "Raleway-Black" },
        },
        Gisha: {
            100: { normal: "Gisha" },
            200: { normal: "Gisha" },
            300: { normal: "Gisha" },
            400: { normal: "Gisha" },
            500: { normal: "Gisha" },
            600: { normal: "Gisha" },
            700: { normal: "Gisha" },
            800: { normal: "Gisha" },
            900: { normal: "Gisha" },
        },
    },
    fontSizes: {
        "2xs": 10,
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 30,
        "4xl": 36,
        "5xl": 48,
        "6xl": 60,
        "7xl": 72,
        "8xl": 96,
        "9xl": 128,
    },
    fonts: { heading: "Raleway", body: "Raleway", logo: "Gisha" },
    config: {
        initialColorMode: "light",
    },
    components: {
        Heading: {
            baseStyle: {
                color: "white",
            },
            defaultProps: () => {
                const fontSize = 40;
                const lineHeight = 40 * 1.4;
                return {
                    fontSize,
                    lineHeight,
                };
            },
        },
        Text: {
            baseStyle: {
                color: "white",
            },
        },
    },
});

const navigationCardTheme = {
    ...DefaultTheme,
    colors: {
        backgroundColor: "transparent",
    },
};

export { theme, navigationCardTheme };
