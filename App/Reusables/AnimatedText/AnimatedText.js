import { Box, Heading, Text } from "native-base";
import { useEffect, useMemo } from "react";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
const AnimatedTextComponent = Animated.createAnimatedComponent(Text);
const AnimatedHeadingComponent = Animated.createAnimatedComponent(Heading);
const AnimatedText = ({ text = "", type }) => {
    const TextJSX = useMemo(() => {
        if (text.trim()) {
            const TextArray = text.split(" ");
            return TextArray.map((t, index) => {
                return (
                    <Box key={index} overflow="hidden" flexDirection="row">
                        <EachCharater char={t} index={index} type={type} wordIndex={index} />
                        <Text>{index === TextArray.length - 1 ? "" : "   "}</Text>
                    </Box>
                );
            });
        }
        return null;
    }, [text, type]);
    return (
        <Box flexWrap="wrap" flexDirection={"row"}>
            {TextJSX}
        </Box>
    );
};

export default AnimatedText;

function EachCharater({ char, type, wordIndex }) {
    const EachChar = char.split("");
    const TextJSX = useMemo(() => {
        return EachChar.map((t, index) => {
            return (
                <Box key={index} overflow="hidden" flexDirection="row">
                    <EachLetter char={t} index={index} type={type} wordIndex={wordIndex} />
                </Box>
            );
        });
    }, [char, type]);
    return <Box flexDirection={"row"}>{TextJSX}</Box>;
}

function EachLetter({ char, type, index, wordIndex }) {
    const transition = useSharedValue(0);
    const styles = useAnimatedStyle(() => ({
        opacity: transition.value,
        transform: [{ translateY: interpolate(transition.value, [0, 1], [30, 0]) }],
    }));
    useEffect(() => {
        transition.value = withDelay(
            700 + wordIndex * 100 + index * 50,
            withTiming(1, {
                duration: 100 + wordIndex * 50 + index * 50,
                easing: Easing.out(Easing.quad),
            })
        );
    }, []);
    if (type === "Heading")
        return <AnimatedHeadingComponent style={styles}>{char}</AnimatedHeadingComponent>;
    return <AnimatedTextComponent style={styles}>{char}</AnimatedTextComponent>;
}
