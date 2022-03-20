import { HStack, Pressable, Text } from "native-base";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { Dimensions } from "react-native";
import AnimatedCheckBox from "./AnimatedCheckBox/";
import PropTypes from "prop-types";
import { UPDATE_TASK } from "../../../redux/tasks/components/task.actions";
import { useDispatch } from "react-redux";
const { width } = Dimensions.get("window");
const AnimatedHStack = Animated.createAnimatedComponent(HStack);

const SWIPE_LIMIT = -120;
const TaskItem = ({ task, completed, categoryColor, categoryId, itemId }) => {
    const dispath = useDispatch();
    const scaleShared = useSharedValue(1);
    const transitionX = useSharedValue(0);
    const gesture = useAnimatedGestureHandler({
        onStart: () => {
            scaleShared.value = withTiming(0.95);
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
    return (
        <Pressable
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
                    <Text fontWeight={400} lineHeight={20} fontSize="sm">
                        {task}
                    </Text>
                </AnimatedHStack>
            </PanGestureHandler>
        </Pressable>
    );
};

export default TaskItem;

TaskItem.prototype = {
    itemId: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    categoryColor: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
};
