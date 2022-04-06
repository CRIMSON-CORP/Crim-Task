import { VStack } from "native-base";
import React from "react";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import Topbar from "../../../Reusables/TopBar";
import ListWrapper from "./ListWrapper/";
const List = () => {
    return (
        <ScreenPaddingWrapper>
            <VStack space="10">
                <Topbar />
                <ListWrapper />
            </VStack>
        </ScreenPaddingWrapper>
    );
};

export default List;
