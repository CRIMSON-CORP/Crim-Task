import { Box, Center } from "native-base";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const AnimatedBoxOuter = Animated.createAnimatedComponent(Box);
const AnimatedBoxInner = Animated.createAnimatedComponent(Box);

function LoadingScreen() {
    const rotate = useSharedValue(0);

    useEffect(() => {
        rotate.value = withRepeat(
            withTiming(360, { duration: 1000, easing: Easing.out(Easing.cubic) }),
            Infinity
        );

        return () => {
            rotate.value = 0;
        };
    }, []);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        <Center zIndex={0} w={width} h={height} bg="primary.500">
            <AnimatedBoxOuter
                w={35}
                h={35}
                p={1.5}
                rounded="full"
                borderWidth={4}
                style={animatedStyles}
                borderColor="primary.accent"
            >
                <AnimatedBoxInner w={2} h={2} bg="primary.accent" rounded="full" />
            </AnimatedBoxOuter>
        </Center>
    );
}

export default LoadingScreen;
