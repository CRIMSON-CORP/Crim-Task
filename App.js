import React from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { loadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { Box, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import Main from "./App/Main/Main";
import Fonts from "./assets/fonts";
import { store, persistor } from "./redux";
import { NavigationContext } from "./utils/context";
import { navigationCardTheme, theme } from "./utils/theme";
import { PersistGate } from "redux-persist/integration/react";
import UserContextProvider from "./utils/contexts/userContext";
import NewUser from "./App/NewUser";

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
    const [loading, setLoading] = useState(true);
    const NavigationRef = useNavigationContainerRef();
    useEffect(() => {
        async function getData() {
            try {
                await loadAsync({ ...Fonts.Raleway, ...Fonts.Gisha });
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
            {!loading && (
                <Box flex={1}>
                    <NavigationContext.Provider value={{ NavigationRef: NavigationRef.current }}>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <UserContextProvider>
                                {(userExist) => (userExist ? <Main /> : <NewUser />)}
                            </UserContextProvider>
                        </GestureHandlerRootView>
                    </NavigationContext.Provider>
                </Box>
            )}
        </NavigationContainer>
    );
}

function LoadingScreen() {
    useEffect(() => {
        (async () => {
            await preventAutoHideAsync();
        })();

        return () => {
            (async () => {
                hideAsync();
            })();
        };
    }, []);
    return <Box positon="absolute" top={0} bottom={0} left={0} right={0} bg="primary.200" />;
}
