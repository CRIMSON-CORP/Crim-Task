import { VStack, Text, Box, Pressable } from "native-base";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import PropTypes from "prop-types";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width } = Dimensions.get("window");
const CategoryCardItem = ({
    tasks = [],
    categoryTitle = "Grocery",
    categoryColor = "#DB00FF",
    ...props
}) => {
    const taskCount = tasks.length;
    const taskCompletedCount = tasks.filter((item) => item.completed).length;
    let progress = (taskCompletedCount / taskCount) * 100;
    const AnimatedWidthShared = useSharedValue(progress);
    const AnimatedOpacityShared = useSharedValue(progress);
    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        width: AnimatedWidthShared.value + "%",
        opacity: AnimatedOpacityShared.value,
    }));

    useEffect(() => {
        AnimatedWidthShared.value = withTiming(progress, {
            duration: 800,
            easing: Easing.out(Easing.quad),
        });
        if (progress <= 0) {
            AnimatedOpacityShared.value = withDelay(800, withTiming(progress <= 0 ? 0 : 1));
        } else {
            AnimatedOpacityShared.value = withTiming(progress <= 0 ? 0 : 1);
        }
    }, [progress]);
    return (
        <Box {...props} bg="primary.300" rounded="15">
            <Box bg="primary.300" rounded="15" style={StyleSheet.absoluteFillObject} />
            <VStack p="5" w={width * 0.6} space={15}>
                <Text opacity={0.7}>{taskCount} Tasks</Text>
                <Text
                    fontSize="md"
                    fontWeight="bold"
                    alignItems={"center"}
                    lineHeight={28}
                    style={{
                        textAlignVertical: "center",
                    }}
                >
                    {categoryTitle}
                </Text>
                <Box bg="gray.600" w="full" h={0.5} rounded="full">
                    <AnimatedBox style={AnimatedBoxStyles}>
                        <Shadow
                            viewStyle={{
                                width: "100%",
                            }}
                            startColor={categoryColor + "35"}
                            finalColor="#ffffff00"
                        >
                            <Box position="absolute" bg={categoryColor} w={"full"} h={0.5} />
                        </Shadow>
                    </AnimatedBox>
                </Box>
            </VStack>
        </Box>
    );
};
CategoryCardItem.prototype = {
    task: PropTypes.array.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
};

export default CategoryCardItem;
