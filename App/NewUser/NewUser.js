import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnteringScreen from "./EnteringScreen";
import CreateAccount from "./CreateAccount";
import Onboarding from "./Onboarding";

const Stack = createStackNavigator();

function NewUser() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "none",
            }}
        >
            <Stack.Screen name="entering" component={EnteringScreen} />
            <Stack.Screen name="onboarding" component={Onboarding} />
            <Stack.Screen name="createAcc" component={CreateAccount} />
        </Stack.Navigator>
    );
}

export default NewUser;
