import React from "react";
import { Box } from "native-base";
import SidePanel from "./SidePanel/SidePanel";
import MainPanel from "./MainPanel/MainPanel";
function Main() {
    return (
        <Box flex={1} bg="primary.500">
            <SidePanel />
            <MainPanel />
        </Box>
    );
}

export default Main;
