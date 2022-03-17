import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import LoadingScreen from "./App/LoadingScreen";
import Main from "./App/Main/Main";
import Fonts from "./assets/fonts";
import store from "./redux";
import theme from "./utils/theme";
export default function App() {
    const [LoadingFonts] = useFonts({ ...Fonts.Raleway, ...Fonts.Gisha });
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NativeBaseProvider theme={theme}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {!LoadingFonts ? <LoadingScreen /> : <Main />}
                    </GestureHandlerRootView>
                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
    );
}
