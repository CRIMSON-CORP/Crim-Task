import { Box, Text } from "native-base";
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
const AnimatedTaskText = ({ task, completed }) => {
    const AnimatedTextOpacityShared = useSharedValue(1);
    const AnimatedTextTranslateShared = useSharedValue(0);
    const AnimatedStrokeShared = useSharedValue(0);
    const AnimatedTextStyles = useAnimatedStyle(() => ({
        opacity: AnimatedTextOpacityShared.value,
        transform: [{ translateX: AnimatedTextTranslateShared.value }],
    }));
    const AnimatedStrokeStyles = useAnimatedStyle(() => ({
        width: AnimatedStrokeShared.value + "%",
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

    return (
        <Box justifyContent={"center"}>
            <AnimatedText
                style={AnimatedTextStyles}
                fontWeight={400}
                lineHeight={20}
                fontSize="sm"
                numberOfLines={1}
                w="full"
                flexWrap="wrap"
            >
                {task}
            </AnimatedText>
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
};

AnimatedTaskText.propTypes = {
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

export default AnimatedTaskText;
