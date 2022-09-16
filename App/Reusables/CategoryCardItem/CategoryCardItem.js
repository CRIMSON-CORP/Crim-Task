import { Box, Pressable, useTheme, VStack } from "native-base";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useEffect, useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";
import { SharedElement } from "react-navigation-shared-element";
import { useFab } from "../../../utils/contexts/fabContext";
import { useNavigation } from "../../../utils/contexts/navigationContext";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width } = Dimensions.get("window");

function CategoryCardItem({
    tasks = [],
    categoryTitle = "Grocery",
    categoryColor = "#DB00FF",
    categoryId,
    fwidth,
    ...props
}) {
    const taskCount = tasks.length;
    const taskCompletedCount = tasks.filter((item) => item.completed).length;
    let progress = (taskCompletedCount / taskCount) * 100 || 0;

    const AnimatedWidthShared = useSharedValue(progress);
    const AnimatedOpacityShared = useSharedValue(progress);
    const AnimatedCelebrationOpacityShared = useSharedValue(0);

    const { NavigationRef } = useNavigation();
    const {
        colors: { primary },
    } = useTheme();
    const { setFlag, setFabPanelOpen } = useFab();

    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        width: AnimatedWidthShared.value + "%",
        opacity: AnimatedOpacityShared.value,
    }));

    const AnimatedCelebrationOpacityStyles = useAnimatedStyle(() => ({
        opacity: AnimatedCelebrationOpacityShared.value,
    }));

    const backgroundStyles = useMemo(
        () => ({ backgroundColor: primary[300], ...styles.background }),
        [primary[300]]
    );

    const onPress = useCallback(() => {
        NavigationRef.navigate("singleCategory", {
            categoryId,
            taskCount,
            categoryTitle,
        });
    }, []);

    const onLongPress = useCallback(() => {
        setFlag({
            flag: "EDIT_CATEGORY",
            title: categoryTitle,
            color: categoryColor,
            categoryId,
        });
        setFabPanelOpen(true);
    }, []);

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

    const FULL_WIDTH = fwidth ? "100%" : width * 0.6;
    const BACKGROUND_SHARED = `item.${categoryId}.bg`;
    const TASK_SHARED = `item.${categoryId}.tasks`;
    const TITLE_SHARED = `item.${categoryId}.title`;

    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <Box
                {...props}
                bg="primary.300"
                rounded="15"
                overflow={"hidden"}
                w={FULL_WIDTH}
                h={120}
            >
                <SharedElement id={BACKGROUND_SHARED} style={StyleSheet.absoluteFillObject}>
                    <View style={backgroundStyles} />
                </SharedElement>
                <VStack p="5" w={fwidth ? "100%" : width * 0.6} space={15}>
                    <SharedElement id={TASK_SHARED} style={styles.titleShared}>
                        <Text style={styles.task}>{taskCount} Tasks</Text>
                    </SharedElement>
                    <SharedElement id={TITLE_SHARED} style={styles.titleShared}>
                        <Text numberOfLines={1} style={styles.title}>
                            {categoryTitle}
                        </Text>
                    </SharedElement>
                    <Box
                        bg="gray.600"
                        w="full"
                        h={0.5}
                        rounded="full"
                        overflow="hidden"
                        style={styles.progress}
                    >
                        <AnimatedBox style={AnimatedBoxStyles}>
                            <Shadow
                                viewStyle={styles.shadow}
                                startColor={categoryColor + "35"}
                                finalColor="#ffffff00"
                            >
                                <Box position="absolute" bg={categoryColor} w={"full"} h={0.5} />
                            </Shadow>
                        </AnimatedBox>
                        <AnimatedBox style={AnimatedCelebrationOpacityStyles}>
                            <Shadow
                                viewStyle={styles.shadow}
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
}
CategoryCardItem.propTypes = {
    tasks: PropTypes.array.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    fwidth: PropTypes.bool,
    categoryId: PropTypes.string,
};

export default CategoryCardItem;

const styles = StyleSheet.create({
    background: {
        borderRadius: 15,
        position: "absolute",
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
    },
    titleShared: {
        position: "absolute",
    },
    title: {
        left: 20,
        top: 55,
        fontSize: 20,
        fontFamily: "Raleway-Bold",
        lineHeight: 20,
        color: "white",
        position: "absolute",
    },
    task: {
        left: 20,
        top: 20,
        opacity: 0.7,
        position: "absolute",
        fontFamily: "Raleway-Medium",
        fontSize: 18,
        color: "white",
    },
    progress: {
        top: 95,
        left: 20,
        position: "absolute",
    },
    shadow: {
        width: "100%",
    },
});
