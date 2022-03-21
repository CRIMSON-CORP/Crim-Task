import { Box, HStack, Pressable, Text } from "native-base";
import Animated, {
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
import { UPDATE_TASK, DELETE_TASK } from "../../../redux/tasks/components/task.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { MotiView } from "moti";
import SwipableView from "../SwipableView";
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const SWIPE_LIMIT = -120;
const TaskItem = ({ task, completed, categoryColor, categoryId, itemId, index }) => {
    const dispath = useDispatch();
    const AnimatedTextOpacityShared = useSharedValue(1);
    const AnimatedTextTranslateShared = useSharedValue(0);
    const AnimatedStrokeShared = useSharedValue(0);

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
        <MotiView
            from={{
                marginBottom: -60,
            }}
            animate={{
                marginBottom: 30,
            }}
            exit={{
                marginBottom: -60,
            }}
        >
            <SwipableView
                swipeExe={() =>
                    dispath({
                        type: DELETE_TASK,
                        payload: {
                            categoryId,
                            itemId,
                        },
                    })
                }
            >
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
                    <HStack
                        alignItems={"center"}
                        p="5"
                        bg="primary.300"
                        rounded="15"
                        space="15"
                        shadow="5"
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
                    </HStack>
                </Pressable>
            </SwipableView>
        </MotiView>
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
