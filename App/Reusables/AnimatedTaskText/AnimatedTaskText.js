import { Box, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBox = Animated.createAnimatedComponent(Box);

/**
 * @typedef AnimatedTaskTextProps
 * @property {string} task
 * @property {boolean} completed
 *
 * @typedef AnimatedStrokeProps
 * @property {number} max
 * @property {boolean} completed
 * @property {number} index

 */

/**
 * @param {AnimatedTaskTextProps} AnimatedTaskTextProps
 * @returns {JSX.Element}
 */

function AnimatedTaskText({ task, completed }) {
    const AnimatedTextOpacityShared = useSharedValue(1);
    const AnimatedTextTranslateShared = useSharedValue(0);

    const AnimatedTextStyles = useAnimatedStyle(() => ({
        opacity: AnimatedTextOpacityShared.value,
        transform: [{ translateX: AnimatedTextTranslateShared.value }],
    }));

    useEffect(() => {
        if (completed) {
            AnimatedTextTranslateShared.value = withSequence(
                withTiming(6, { duration: 400 }),
                withTiming(0, { duration: 300 }, () => {
                    AnimatedTextOpacityShared.value = withDelay(400, withTiming(0.5));
                })
            );
        } else {
            AnimatedTextOpacityShared.value = withTiming(1);
        }
    }, [completed]);

    task = task.match(/.{1,35}/g);

    return (
        <VStack alignItems="flex-start">
            {task.map((t, i) => {
                return (
                    <Box justifyContent={"center"} key={i}>
                        <AnimatedText
                            style={AnimatedTextStyles}
                            fontWeight={400}
                            lineHeight={20}
                            fontSize="sm"
                        >
                            {t}
                        </AnimatedText>
                        <AnimatedStroke index={i} completed={completed} max={task.length} />
                    </Box>
                );
            })}
        </VStack>
    );
}

/**
 * @param {AnimatedStrokeProps} AnimatedStrokeProps
 * @returns
 */

function AnimatedStroke({ max, completed, index }) {
    const AnimatedStrokeShared = useSharedValue(0);
    const AnimatedStrokeStyles = useAnimatedStyle(() => ({
        width: AnimatedStrokeShared.value + "%",
    }));
    useEffect(() => {
        if (completed) {
            AnimatedStrokeShared.value = withDelay(
                800 + index * 400,
                withTiming(100, { duration: 700 })
            );
        } else {
            AnimatedStrokeShared.value = withDelay(
                (max - index) * 400,
                withTiming(0, { duration: 500 })
            );
        }
    }, [completed]);
    return (
        <Box style={{ transform: [{ translateY: -8 }] }}>
            <AnimatedBox
                style={[
                    AnimatedStrokeStyles,
                    {
                        left: 0,
                        height: 1,
                    },
                ]}
                position="absolute"
                bg="gray.400"
            />
        </Box>
    );
}

AnimatedTaskText.propTypes = {
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

AnimatedStroke.propTypes = {
    max: PropTypes.number,
    completed: PropTypes.bool,
    index: PropTypes.number,
};

export default AnimatedTaskText;
