import { NavigationContainer } from "@react-navigation/native";
import { loadAsync } from "expo-font";
import { NativeBaseProvider } from "native-base";
import { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import LoadingScreen from "./App/LoadingScreen";
import Main from "./App/Main/Main";
import Fonts from "./assets/fonts";
import store from "./redux";
import { NavigationContext } from "./utils/context";
import { theme, navigationCardTheme } from "./utils/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAsyncAccountData, getAsyncTaskData, getAsyncUIData } from "./utils/utils";
import { AnimatePresence } from "moti";
enableScreens();

export default function App() {
    const [Loading, setLoading] = useState(true);
    const NavigationRef = useRef();
    useEffect(() => {
        async function getData() {
            const AsyncData = await AsyncStorage.getItem("crim-task-data");
            if (AsyncData) {
                await loadAsync({ ...Fonts.Raleway, ...Fonts.Gisha });
                setLoading(false);
            }
        }
        getData();
    }, []);
    return (
        <Provider store={store}>
            <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
                <AnimatePresence>
                    {!Loading && (
                        <NavigationContext.Provider
                            value={{ NavigationRef: NavigationRef.current }}
                        >
                            <NativeBaseProvider theme={theme}>
                                <GestureHandlerRootView style={{ flex: 1 }}>
                                    <Main />
                                </GestureHandlerRootView>
                            </NativeBaseProvider>
                        </NavigationContext.Provider>
                    )}
                    {Loading && <LoadingScreen />}
                </AnimatePresence>
            </NavigationContainer>
        </Provider>
    );
}
