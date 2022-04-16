import { VStack, Box, Pressable, useTheme } from "native-base";
import { useContext, useEffect } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
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
import { SharedElement } from "react-navigation-shared-element";
import { View } from "react-native";
import { NavigationContext, useFab } from "../../../utils/context";
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
    const { NavigationRef } = useContext(NavigationContext);
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
    const { setFlag, ToggleOpenFab } = useFab();
    return (
        <Pressable
            onPress={() =>
                NavigationRef.navigate("singleCategory", {
                    categoryId,
                    taskCount,
                    categoryTitle,
                })
            }
            onLongPress={() => {
                setFlag({
                    flag: "EDIT_CATEGORY",
                    title: categoryTitle,
                    color: categoryColor,
                    categoryId,
                });
                ToggleOpenFab(true);
            }}
        >
            <Box
                {...props}
                bg="primary.300"
                rounded="15"
                overflow={"hidden"}
                w={fwidth ? "100%" : width * 0.6}
                h={120}
            >
                <SharedElement id={`item.${categoryId}.bg`} style={StyleSheet.absoluteFillObject}>
                    <View
                        style={[
                            {
                                backgroundColor: primary[300],
                                borderRadius: 15,
                                position: "absolute",
                                top: 5,
                                left: 5,
                                bottom: 5,
                                right: 5,
                            },
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
                            style={{
                                left: 20,
                                top: 20,
                                opacity: 0.7,
                                position: "absolute",
                                fontFamily: "Raleway-Medium",
                                fontSize: 18,
                                color: "white",
                            }}
                        >
                            {taskCount} Tasks
                        </Text>
                    </SharedElement>
                    <SharedElement
                        id={`item.${categoryId}.title`}
                        style={{
                            position: "absolute",
                        }}
                    >
                        <Text
                            style={{
                                left: 20,
                                top: 55,
                                fontSize: 20,
                                fontFamily: "Raleway-Bold",
                                lineHeight: 20,
                                color: "white",
                            }}
                            numberOfLines={1}
                            position={"absolute"}
                        >
                            {categoryTitle}
                        </Text>
                    </SharedElement>
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
