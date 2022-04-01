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
import { AuthContext, NavigationContext } from "./utils/context";
import { theme, navigationCardTheme } from "./utils/theme";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnteringScreen from "./App/EnteringScreen";
import Onboarding from "./App/Onboarding";
import CreateAccount from "./App/CreateAccount";
enableScreens();
const Stack = createStackNavigator();
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
                const AsyncData = await AsyncStorage.getItem("crim-task-data");
                await loadAsync({ ...Fonts.Raleway, ...Fonts.Gisha });
                if (AsyncData) {
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
    }, []);
    return (
        <NavigationContainer theme={navigationCardTheme} ref={NavigationRef}>
            <NativeBaseProvider theme={theme}>
                {Loading ? (
                    <LoadingScreen />
                ) : (
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
                )}
            </NativeBaseProvider>
        </NavigationContainer>
    );
}
