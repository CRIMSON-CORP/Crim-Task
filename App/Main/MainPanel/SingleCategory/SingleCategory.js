import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { Box, Text, useTheme, VStack } from "native-base";
import { SharedElement } from "react-navigation-shared-element";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import TopBar from "../../../Reusables/TopBar";
const SingleCategory = ({ route }) => {
    const { categoryId, taskCount } = route.params;
    const {
        colors: { primary },
    } = useTheme();
    return (
        <Box style={StyleSheet.absoluteFillObject}>
            <ScreenPaddingWrapper>
                <SharedElement id={`item.${categoryId}.bg`} style={StyleSheet.absoluteFillObject}>
                    <View
                        style={[{ backgroundColor: primary[300] }, StyleSheet.absoluteFillObject]}
                    />
                </SharedElement>
                <VStack space="10">
                    <TopBar back />
                    <VStack>
                        <SharedElement
                            id={`item.${categoryId}.tasks`}
                            style={{
                                position: "absolute",
                            }}
                        >
                            <Text
                                opacity={0.7}
                                position={"absolute"}
                                style={{
                                    textAlignVertical: "center",
                                    left: 20,
                                    top: 20,
                                }}
                            >
                                {taskCount} Tasks
                            </Text>
                        </SharedElement>
                    </VStack>
                </VStack>
            </ScreenPaddingWrapper>
        </Box>
    );
};

SingleCategory.sharedElements = ({ route }) => {
    const { categoryId } = route.params;
    return [
        { id: `item.${categoryId}.bg`, resize: "clip" },
        { id: `item.${categoryId}.tasks` },
        { id: "item.menu", animation: "fade" },
        { id: "item.back", animation: "fade" },
        { id: "item.search" },
        { id: "item.bell" },
    ];
};

export default SingleCategory;
