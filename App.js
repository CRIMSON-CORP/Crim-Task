import Main from "./App/Main";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <GestureHandlerRootView>
                    <Main />
                </GestureHandlerRootView>
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
