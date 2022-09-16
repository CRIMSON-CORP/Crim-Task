// eslint-disable-next-line no-unused-vars
import React from "react";
import { loadAsync } from "expo-font";
import { Box, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
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
import LoadingScreen from "./App/Reusables/LoadingScreen";

enableScreens();

export default function App() {
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationProvider>
                <Provider store={store}>
                    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                        <MainWrapper />
                    </PersistGate>
                </Provider>
            </NavigationProvider>
        </NativeBaseProvider>
    );
}
function MainWrapper() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadAsync({ ...Fonts.Raleway, ...Fonts.Gisha })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }
    return (
        <Box flex={1} zIndex={5}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <UserContextProvider>
                    {(userExist) => (userExist ? <Main /> : <NewUser />)}
                </UserContextProvider>
            </GestureHandlerRootView>
        </Box>
    );
}
