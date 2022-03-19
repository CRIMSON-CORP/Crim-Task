import { VStack } from "native-base";
import React from "react";
import Topbar from "../../../Reusables/TopBar";
import ListWrapper from "./ListWrapper/";
const List = () => {
    return (
        <VStack space="10">
            <Topbar />
            <ListWrapper />
        </VStack>
    );
};

export default List;
