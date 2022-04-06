import { Box, VStack } from "native-base";
import React from "react";
import ClosePanelButton from "./ClosePanelButton";
import NavBar from "./NavBar";
import Profile from "./Profile";

const SidePanel = () => {
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
};

export default SidePanel;
