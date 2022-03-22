import { VStack } from "native-base";
import React from "react";
import { SharedElement } from "react-navigation-shared-element";
import ScreenAnimatePrescence from "../../../Reusables/ScreenAnimatePrescence";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import Topbar from "../../../Reusables/TopBar";
import ListWrapper from "./ListWrapper/";
const List = () => {
    return (
        <ScreenPaddingWrapper>
            <ScreenAnimatePrescence>
                <VStack space="10">
                    <Topbar />
                    <ListWrapper />
                </VStack>
            </ScreenAnimatePrescence>
        </ScreenPaddingWrapper>
    );
};

export default List;
