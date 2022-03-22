import { VStack, Text, Box, Pressable, useColorModeValue, useTheme } from "native-base";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import PropTypes from "prop-types";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { SharedElement } from "react-navigation-shared-element";
import { View } from "react-native";
const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width } = Dimensions.get("window");
const CategoryCardItem = ({
    tasks = [],
    categoryTitle = "Grocery",
    categoryColor = "#DB00FF",
    categoryId,
    fwidth,
    ...props
}) => {
    const taskCount = tasks.length;
    const taskCompletedCount = tasks.filter((item) => item.completed).length;
    let progress = (taskCompletedCount / taskCount) * 100 || 0;
    const AnimatedWidthShared = useSharedValue(progress);
    const AnimatedOpacityShared = useSharedValue(progress);
    const AnimatedCelebrationOpacityShared = useSharedValue(0);
    const Navigation = useSelector((state) => state.ui.navigation_ref);
    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        width: AnimatedWidthShared.value + "%",
        opacity: AnimatedOpacityShared.value,
    }));

    const AnimatedCelebrationOpacityStyles = useAnimatedStyle(() => ({
        opacity: AnimatedCelebrationOpacityShared.value,
    }));

    useEffect(() => {
        AnimatedWidthShared.value = withTiming(progress, {
            duration: 800,
            easing: Easing.out(Easing.quad),
        });
        if (progress <= 0) {
            AnimatedOpacityShared.value = withDelay(800, withTiming(0));
        } else {
            AnimatedOpacityShared.value = withTiming(1);
        }
        if (progress === 100) {
            AnimatedCelebrationOpacityShared.value = withDelay(
                600,
                withSequence(
                    withTiming(1, { duration: 800 }),
                    withDelay(500, withTiming(0, { duration: 800 }))
                )
            );
        }
    }, [progress]);
    const {
        colors: { primary },
    } = useTheme();
    return (
        <Pressable onPress={() => Navigation.navigate("singleCategory", { categoryId, taskCount })}>
            <Box
                {...props}
                bg="primary.300"
                rounded="15"
                overflow={"hidden"}
                w={fwidth && "100%"}
                h={120}
            >
                <SharedElement id={`item.${categoryId}.bg`} style={StyleSheet.absoluteFillObject}>
                    <View
                        style={[
                            { backgroundColor: primary[300], borderRadius: 15 },
                            StyleSheet.absoluteFillObject,
                        ]}
                    />
                </SharedElement>
                <VStack p="5" w={fwidth ? "100%" : width * 0.6} space={15}>
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
                    <Text
                        fontSize="md"
                        fontWeight="bold"
                        alignItems={"center"}
                        lineHeight={28}
                        style={{
                            textAlignVertical: "center",
                            left: 20,
                            top: 55,
                        }}
                        position={"absolute"}
                    >
                        {categoryTitle}
                    </Text>
                    <Box
                        bg="gray.600"
                        w="full"
                        h={0.5}
                        rounded="full"
                        position={"absolute"}
                        style={{
                            top: 95,
                            left: 20,
                        }}
                    >
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
                        <AnimatedBox style={AnimatedCelebrationOpacityStyles}>
                            <Shadow
                                viewStyle={{
                                    width: "100%",
                                }}
                                startColor={categoryColor + "65"}
                                distance={15}
                                finalColor="#ffffff00"
                            >
                                <Box position="absolute" bg={categoryColor} w={"full"} h={0.5} />
                            </Shadow>
                        </AnimatedBox>
                    </Box>
                </VStack>
            </Box>
        </Pressable>
    );
};
CategoryCardItem.propTypes = {
    tasks: PropTypes.array.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    fwidth: PropTypes.bool,
};

export default CategoryCardItem;
