/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Box, Heading, Text } from "native-base";
import { useEffect } from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { useMemo } from "react";

const AnimatedHeadingComponent = Animated.createAnimatedComponent(Heading);
let index = 0;

/**
 * @typedef AnimatedTextProps
 * @property {string} children - Must be a `string`, this is the text to be animated
 * @property {number} delay - Time delay before the animation starts, default is `0`
 * @property {number} duration - Time duration for how long each character takes to animate in, default is `450`
 * @property {number} stagger - Time delay between each character animating in, defualt is `35`
 *
 * @typedef EachWordProps
 * @property {string} word
 * @property {number} wordIndex
 * @property {number} delay
 */

/**
 * @param {AnimatedTextProps} AnimatedTextProps
 * @returns {JSX.Element}
 */

function AnimatedText({ children, delay, duration, stagger }) {
    const TextArray = children.split(" ");
    const TextJSX = useMemo(
        () =>
            TextArray.map((word, index) => {
                return (
                    <Box key={index} overflow="hidden" flexDirection="row">
                        <EachWord
                            word={word}
                            index={index}
                            wordIndex={index}
                            delay={delay}
                            duration={duration}
                            stagger={stagger}
                        />
                        <Text>{index === TextArray.length - 1 ? "" : "   "}</Text>
                    </Box>
                );
            }),
        [children, delay, duration, stagger]
    );

    useEffect(() => {
        return () => {
            index = 0;
        };
    }, []);

    return (
        <Box flexWrap="wrap" flexDirection={"row"}>
            {TextJSX}
        </Box>
    );
}

export default AnimatedText;

/**
 * @param {EachWordProps} EachWordProps
 * @returns {JSX.Element}
 */

function EachWord({ word, wordIndex, delay, duration, stagger }) {
    const EachChar = word.split("");
    const TextJSX = EachChar.map((t, index) => {
        return (
            <Box key={index} overflow="hidden" flexDirection="row">
                <EachLetter
                    char={t}
                    index={index}
                    wordIndex={wordIndex}
                    delay={delay}
                    duration={duration}
                    stagger={stagger}
                />
            </Box>
        );
    });
    return <Box flexDirection={"row"}>{TextJSX}</Box>;
}
function EachLetter({ char, delay, duration, stagger }) {
    const transition = useSharedValue(50);
    const styles = useAnimatedStyle(() => ({
        transform: [{ translateY: transition.value }],
    }));
    useEffect(() => {
        transition.value = withDelay(
            delay + index * stagger,
            withTiming(0, {
                duration: duration + index * 20,
                easing: Easing.bezier(0.2, 0.65, 0.3, 1.125),
            })
        );
        index++;
    }, []);
    return <AnimatedHeadingComponent style={styles}>{char}</AnimatedHeadingComponent>;
}

AnimatedText.defaultProps = {
    delay: 0,
    duration: 450,
    stagger: 35,
};

AnimatedText.propTypes = {
    children: PropTypes.string,
    delay: PropTypes.number,
};

EachWord.propTypes = {
    word: PropTypes.string,
    wordIndex: PropTypes.number,
    delay: PropTypes.number,
};

EachLetter.propTypes = {
    char: PropTypes.string,
    index: PropTypes.number,
    wordIndex: PropTypes.number,
    delay: PropTypes.number,
};
