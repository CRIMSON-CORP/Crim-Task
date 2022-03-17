import { Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Container, Box, useTheme } from "native-base";
const { width, height } = Dimensions.get("window");
const Main = () => {
    const { colors } = useTheme();
    return (
        <Box flex={1} bg={colors.primary[300]}>
            Box
        </Box>
    );
};

export default Main;
