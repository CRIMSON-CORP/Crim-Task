import Main from "./App/Main";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux";
import { useFonts } from "expo-font";
import Fonts from "./assets/fonts";
import theme from "./utils/theme";
export default function App() {
    const Raleway = useFonts(Fonts.Raleway);

    if (!Raleway) {
        return <View />;
    }
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NativeBaseProvider theme={theme}>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <Main />
                    </GestureHandlerRootView>
                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
    );
}
