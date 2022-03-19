import { VStack } from "native-base";
import React from "react";
import Greeting from "./Greeting";
import Topbar from "./TopBar";
const List = () => {
    return (
        <VStack space="10">
            <Topbar />
            <Greeting />
        </VStack>
    );
};

export default List;
