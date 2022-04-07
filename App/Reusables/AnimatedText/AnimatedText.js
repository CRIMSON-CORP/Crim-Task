import { Box, Heading, Text } from "native-base";
import { memo, useEffect } from "react";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
const AnimatedHeadingComponent = Animated.createAnimatedComponent(Heading);
const AnimatedText = ({ text = "" }) => {
    const TextArray = text.split(" ");
    const TextJSX = TextArray.map((word, index) => {
        return (
            <Box key={index} overflow="hidden" flexDirection="row">
                <EachWord word={word} index={index} wordIndex={index} />
                <Text>{index === TextArray.length - 1 ? "" : "   "}</Text>
            </Box>
        );
    });
    return (
        <Box flexWrap="wrap" flexDirection={"row"}>
            {TextJSX}
        </Box>
    );
};

export default memo(AnimatedText);

function EachWord({ word, wordIndex }) {
    const EachChar = word.split("");
    const TextJSX = EachChar.map((t, index) => {
        return (
            <Box key={index} overflow="hidden" flexDirection="row">
                <EachLetter char={t} index={index} wordIndex={wordIndex} />
            </Box>
        );
    });
    return <Box flexDirection={"row"}>{TextJSX}</Box>;
}

function EachLetter({ char, index, wordIndex }) {
    const transition = useSharedValue(0);
    const styles = useAnimatedStyle(() => ({
        opacity: transition.value,
        transform: [{ translateY: interpolate(transition.value, [0, 1], [30, 0]) }],
    }));
    useEffect(() => {
        transition.value = withDelay(
            1000 + wordIndex * 100 + index * 50,
            withTiming(1, {
                duration: 100 + wordIndex * 50 + index * 50,
                easing: Easing.out(Easing.quad),
            })
        );
    }, []);
    return <AnimatedHeadingComponent style={styles}>{char}</AnimatedHeadingComponent>;
}
