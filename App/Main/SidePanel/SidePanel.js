import React from "react";
import { Box, VStack } from "native-base";
import ClosePanelButton from "./ClosePanelButton";
import NavBar from "./NavBar";
import Profile from "./Profile";

function SidePanel() {
    return (
        <Box flex={1} padding={60} pr={105}>
            <VStack>
                <Box alignItems={"flex-end"}>
                    <ClosePanelButton />
                </Box>
                <Box mt={-2.5}>
                    <Profile />
                </Box>
                <Box mt={50}>
                    <NavBar />
                </Box>
            </VStack>
        </Box>
    );
}

export default SidePanel;
