import { Box, Center } from "native-base";
import React from "react";
import ClosePanelButton from "./ClosePanelButton";

const SidePanel = () => {
    return (
        <Box flex={1} padding={60} pr={95}>
            <Center alignItems={"flex-end"}>
                <ClosePanelButton />
            </Center>
        </Box>
    );
};

export default SidePanel;
