import Main from "./App/Main";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux";
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NativeBaseProvider>
                    <GestureHandlerRootView>
                        <Main />
                    </GestureHandlerRootView>
                </NativeBaseProvider>
            </NavigationContainer>
        </Provider>
    );
}
