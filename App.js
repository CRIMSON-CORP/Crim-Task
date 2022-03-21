import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "@use-expo/font";
import { NativeBaseProvider } from "native-base";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider, useDispatch } from "react-redux";
import LoadingScreen from "./App/LoadingScreen";
import Main from "./App/Main/Main";
import Fonts from "./assets/fonts";
import store from "./redux";
import { SET_NAVIGATION_REF } from "./redux/ui/components/ui.actions";
import { theme, navigationCardTheme } from "./utils/theme";
enableScreens();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationWrapper />
        </Provider>
    );
}

function NavigationWrapper() {
    const [LoadingFonts] = useFonts({ ...Fonts.Raleway, ...Fonts.Gisha });
    const NavigationRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: SET_NAVIGATION_REF, payload: { navigation_ref: NavigationRef.current } });
    }, []);
    return (
        <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
            <NativeBaseProvider theme={theme}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {!LoadingFonts ? <LoadingScreen /> : <Main />}
                </GestureHandlerRootView>
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
