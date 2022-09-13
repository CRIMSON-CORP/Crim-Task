import React from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { loadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { Box, NativeBaseProvider } from "native-base";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider, useSelector } from "react-redux";
import CreateAccount from "./App/CreateAccount";
import EnteringScreen from "./App/EnteringScreen";
import Main from "./App/Main/Main";
import Onboarding from "./App/Onboarding";
import Fonts from "./assets/fonts";
import { store, persistor } from "./redux";
import { AuthContext, NavigationContext } from "./utils/context";
import { navigationCardTheme, theme } from "./utils/theme";
import { PersistGate } from "redux-persist/integration/react";
import UserContextProvider from "./utils/contexts/userContext";

enableScreens();
const Stack = createStackNavigator();

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
    const [userExist, setUserExist] = useState(false);
    const [loading, setLoading] = useState(true);
    const NavigationRef = useNavigationContainerRef();
    const state = useSelector((state) => state.account.userExist);
    useEffect(() => {
        async function getData() {
            try {
                await loadAsync({ ...Fonts.Raleway, ...Fonts.Gisha });
                if (state) {
                    setUserExist(true);
                } else {
                    setUserExist(false);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [state]);

    return (
        <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
            {!loading && (
                <Box flex={1}>
                    <NavigationContext.Provider value={{ NavigationRef: NavigationRef.current }}>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <AuthContext.Provider value={{ userExist, setUserExist }}>
                                <Stack.Navigator
                                    screenOptions={{
                                        headerMode: "none",
                                        cardStyle: {
                                            overflow: "visible",
                                        },
                                    }}
                                >
                                    {state ? (
                                        <Stack.Screen name="main" component={Main} />
                                    ) : (
                                        <>
                                            <Stack.Screen
                                                name="entering"
                                                component={EnteringScreen}
                                            />
                                            <Stack.Screen
                                                name="onboarding"
                                                component={Onboarding}
                                            />
                                            <Stack.Screen
                                                name="createAcc"
                                                component={CreateAccount}
                                            />
                                        </>
                                    )}
                                </Stack.Navigator>
                            </AuthContext.Provider>
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
