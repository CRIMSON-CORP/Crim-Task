import { extendTheme } from "native-base";
import Fonts from "../assets/fonts";

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
            100: {
                normal: "thin",
            },
            200: { normal: "light" },
            300: { normal: "regular" },
            400: { normal: "medium" },
            500: { normal: "bold" },
            600: { normal: "extrabold" },
            700: { normal: "black" },
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
    fonts: { heading: "Roboto", body: "Roboto", mono: "Roboto" },
    config: {
        initialColorMode: "light",
    },
});

export default theme;
