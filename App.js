import React from "react";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { Box, NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import Main from "./App/Main/Main";
import Fonts from "./assets/fonts";
import { store, persistor } from "./redux";
import { theme } from "./utils/theme";
import { PersistGate } from "redux-persist/integration/react";
import UserContextProvider from "./utils/contexts/userContext";
import NewUser from "./App/NewUser";
import NavigationProvider from "./utils/contexts/navigationContext";
import { useCallback } from "react";

enableScreens();

export default function App() {
    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                    <MainWrapper />
                </PersistGate>
            </Provider>
        </NativeBaseProvider>
    );
}
function MainWrapper() {
    const [fontsLoaded] = useFonts({ ...Fonts.Raleway, ...Fonts.Gisha });
    useEffect(() => {
        (async () => await preventAutoHideAsync())();
    }, []);

    const onLayout = useCallback(async () => {
        fontsLoaded && hideAsync();
    }, [fontsLoaded]);

    return (
        <NavigationProvider>
            <Box flex={1} onLayout={onLayout}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <UserContextProvider>
                        {(userExist) => (userExist ? <Main /> : <NewUser />)}
                    </UserContextProvider>
                </GestureHandlerRootView>
            </Box>
        </NavigationProvider>
    );
}

function LoadingScreen() {
    useEffect(() => {
        console.log("loading mounted");
        (async () => {
            await preventAutoHideAsync();
        })();

        return () => {
            console.log("loading removed");
            (async () => {
                await hideAsync();
            })();
        };
    }, []);
    return <Box positon="absolute" top={0} bottom={0} left={0} right={0} bg="primary.200" />;
}
