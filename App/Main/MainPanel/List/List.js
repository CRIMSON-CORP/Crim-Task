import React from "react";
import { VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Topbar from "../../../Reusables/TopBar";
import ListWrapper from "./ListWrapper/";
function List() {
    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <VStack space="16">
                <Topbar />
                <ListWrapper />
            </VStack>
        </SafeAreaView>
    );
}

export default List;
