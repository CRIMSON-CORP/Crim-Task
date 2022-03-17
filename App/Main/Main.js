import { Dimensions } from "react-native";
import React from "react";
import { Box } from "native-base";
import SidePanel from "./SidePanel/SidePanel";
const Main = () => {
    return (
        <Box flex={1} bg="primary.400">
            <SidePanel />
        </Box>
    );
};

export default Main;
