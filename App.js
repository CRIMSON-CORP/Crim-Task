import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { loadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { Box, NativeBaseProvider } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import CreateAccount from "./App/CreateAccount";
import EnteringScreen from "./App/EnteringScreen";
import Main from "./App/Main/Main";
import Onboarding from "./App/Onboarding";
import Fonts from "./assets/fonts";
import store from "./redux";
import { AuthContext, NavigationContext } from "./utils/context";
import { navigationCardTheme, theme } from "./utils/theme";
import { getAsyncTaskData, getAsyncUIData } from "./utils/utils";
import { useDispatch } from "react-redux";
import { getAsyncAccountData } from "./redux/account/component/account.reducer";
enableScreens();
const Stack = createStackNavigator();

store.dispatch(getAsyncAccountData());
export default function App() {
    return (
        <Provider store={store}>
            <MainWrapper />
        </Provider>
    );
}
function MainWrapper() {
    const [Loading, setLoading] = useState(true);
    const [userExist, setUserExist] = useState(false);
    const NavigationRef = useRef();
    useEffect(() => {
        async function getData() {
            try {
                await preventAutoHideAsync();
                const AsyncData = await AsyncStorage.getItem("crim-task-data");
                await loadAsync({ ...Fonts.Raleway, ...Fonts.Gisha });
                if (AsyncData) {
                    setUserExist(true);
                    await Promise.all([getAsyncTaskData(), getAsyncUIData()]);
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
    }, []);
    const onLayOutView = useCallback(async () => {
        if (!Loading) {
            setTimeout(async () => await hideAsync(), 500);
        }
    }, [Loading]);
    return (
        <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
            <NativeBaseProvider theme={theme}>
                {!Loading ? (
                    <Box onLayout={onLayOutView} flex={1}>
                        <NavigationContext.Provider
                            value={{ NavigationRef: NavigationRef.current }}
                        >
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
                                        {userExist && <Stack.Screen name="main" component={Main} />}
                                        {!userExist && (
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
                ) : (
                    <Box
                        positon="absolute"
                        top={0}
                        bottom={0}
                        left={0}
                        right={0}
                        bg="primary.200"
                    />
                )}
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
