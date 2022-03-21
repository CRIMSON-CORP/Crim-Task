import { VStack } from "native-base";
import React from "react";
import ScreenAnimatePrescence from "../../../Reusables/ScreenAnimatePrescence";
import Topbar from "../../../Reusables/TopBar";
import ListWrapper from "./ListWrapper/";
const List = () => {
    return (
        <ScreenAnimatePrescence>
            <VStack space="10">
                <Topbar />
                <ListWrapper />
            </VStack>
        </ScreenAnimatePrescence>
    );
};

export default List;
