import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "@use-expo/font";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import LoadingScreen from "./App/LoadingScreen";
import Main from "./App/Main/Main";
import Fonts from "./assets/fonts";
import store from "./redux";
import { theme, navigationCardTheme } from "./utils/theme";
enableScreens();

export default function App() {
    const [LoadingFonts] = useFonts({ ...Fonts.Raleway, ...Fonts.Gisha });
    return (
        <Provider store={store}>
            <NavigationContainer theme={navigationCardTheme}>
                <NativeBaseProvider theme={theme}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {!LoadingFonts ? <LoadingScreen /> : <Main />}
                    </GestureHandlerRootView>
                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
    );
}
