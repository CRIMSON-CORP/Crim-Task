import React from "react";
import { Box } from "native-base";
import SidePanel from "./SidePanel/SidePanel";
import MainPanel from "./MainPanel/MainPanel";
import { getAsyncAccountData, getAsyncTaskData, getAsyncUIData } from "../../utils/utils";
function Main() {
    getAsyncAccountData();
    getAsyncTaskData();
    getAsyncUIData();
    return (
        <Box flex={1} bg="primary.500">
            <SidePanel />
            <MainPanel />
        </Box>
    );
}

export default Main;
