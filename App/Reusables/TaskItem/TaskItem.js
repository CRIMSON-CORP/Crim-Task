import { Box, HStack, Pressable, Text } from "native-base";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import AnimatedCheckBox from "./AnimatedCheckBox/";
import PropTypes from "prop-types";
import { UPDATE_TASK } from "../../../redux/tasks/components/task.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const { width } = Dimensions.get("window");
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const SWIPE_LIMIT = -120;
const TaskItem = ({ task, completed, categoryColor, categoryId, itemId }) => {
    const dispath = useDispatch();
    const scaleShared = useSharedValue(1);
    const transitionX = useSharedValue(0);
    const AnimatedTextOpacityShared = useSharedValue(1);
    const AnimatedTextTranslateShared = useSharedValue(0);
    const AnimatedStrokeShared = useSharedValue(0);
    const gesture = useAnimatedGestureHandler({
        onStart: () => {
            scaleShared.value = withTiming(0.95, { duration: 200 });
        },
        onActive: (e) => {
            transitionX.value = Math.min(0, Math.max(SWIPE_LIMIT, e.translationX));
        },
        onFinish: () => {
            scaleShared.value = withSpring(1, { damping: 1 });
            if (transitionX.value < -80) {
                transitionX.value = withTiming(-width);
            } else {
                transitionX.value = withSpring(0);
            }
        },
    });
    const AnimatedHSTackStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scaleShared.value }, { translateX: transitionX.value }],
    }));

    useEffect(() => {
        if (completed) {
            AnimatedTextTranslateShared.value = withSequence(
                withTiming(6, { duration: 400 }),
                withTiming(0, { duration: 300 }, () => {
                    AnimatedTextOpacityShared.value = withDelay(400, withTiming(0.5));
                    AnimatedStrokeShared.value = withDelay(400, withTiming(100, { duration: 700 }));
                })
            );
        } else {
            AnimatedTextOpacityShared.value = withTiming(1);
            AnimatedStrokeShared.value = withDelay(400, withTiming(0, { duration: 500 }));
        }
    }, [completed]);

    const AnimatedTextStyles = useAnimatedStyle(() => ({
        opacity: AnimatedTextOpacityShared.value,
        transform: [{ translateX: AnimatedTextTranslateShared.value }],
    }));
    const AnimatedStrokeStyles = useAnimatedStyle(() => ({
        width: AnimatedStrokeShared.value + "%",
    }));
    return (
        <Pressable
            onLongPress={() => null}
            onPress={() => {
                dispath({
                    type: UPDATE_TASK,
                    payload: {
                        categoryId,
                        itemId,
                    },
                });
            }}
        >
            <PanGestureHandler onGestureEvent={gesture}>
                <AnimatedHStack
                    alignItems={"center"}
                    p="5"
                    bg="primary.300"
                    rounded="15"
                    space="15"
                    shadow="5"
                    style={AnimatedHSTackStyles}
                >
                    <AnimatedCheckBox completed={completed} color={categoryColor} />
                    <Box justifyContent={"center"}>
                        <AnimatedText
                            style={AnimatedTextStyles}
                            fontWeight={400}
                            lineHeight={20}
                            fontSize="sm"
                        >
                            {task}
                        </AnimatedText>
                        <AnimatedBox
                            style={[
                                AnimatedStrokeStyles,
                                {
                                    left: 0,
                                },
                            ]}
                            position="absolute"
                            h={0.5}
                            bg="white"
                            opacity={0.5}
                        />
                    </Box>
                </AnimatedHStack>
            </PanGestureHandler>
        </Pressable>
    );
};

TaskItem.prototype = {
    itemId: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    categoryColor: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
};
export default TaskItem;
