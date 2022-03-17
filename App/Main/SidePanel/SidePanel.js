import { Box, Center } from "native-base";
import React from "react";
import ClosePanelButton from "./ClosePanelButton";
import Profile from "./Profile";

const SidePanel = () => {
    return (
        <Box flex={1} padding={60} pr={95}>
            <Box alignItems={"flex-end"}>
                <ClosePanelButton />
            </Box>
            <Box mt={-2.5}>
                <Profile />
            </Box>
        </Box>
    );
};

export default SidePanel;
