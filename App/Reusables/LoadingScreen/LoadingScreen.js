import { Box, Center } from "native-base";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const AnimatedView = Animated.createAnimatedComponent(Box);

function LoadingScreen() {
    const translate = useSharedValue(30);

    useEffect(() => {
        translate.value = withRepeat(
            withSequence(
                withTiming(30, { duration: 400, easing: Easing.in(Easing.quad) }),
                withTiming(-30, { duration: 400, easing: Easing.out(Easing.quad) })
            ),
            Infinity,
            true
        );
    }, []);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: translate.value,
            },
        ],
    }));

    return (
        <Center zIndex={0} w={width} h={height} bg="primary.500">
            <AnimatedView
                w={35}
                h={35}
                borderWidth={5}
                borderColor="primary.accent"
                rounded="full"
                style={animatedStyles}
            />
        </Center>
    );
}

export default LoadingScreen;
