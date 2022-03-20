import { Box } from "native-base";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedPressable = ({ children, onPress, style }) => {
    const transformShared = useSharedValue(1);
    const opacityShared = useSharedValue(1);
    const gesture = useAnimatedGestureHandler({
        onStart: () => {
            transformShared.value = withTiming(0.7);
            opacityShared.value = withTiming(0.7);
        },
        onFinish: () => {
            transformShared.value = withSpring(1, { damping: 6 });
            opacityShared.value = withTiming(1);
            onPress && runOnJS(onPress)();
        },
    });
    const AimatedBoxStyle = useAnimatedStyle(() => ({
        opacity: opacityShared.value,
        transform: [{ scale: transformShared.value }],
    }));
    return (
        <PanGestureHandler onGestureEvent={gesture}>
            <AnimatedBox style={[{ ...style }, AimatedBoxStyle]}>{children}</AnimatedBox>
        </PanGestureHandler>
    );
};

export default AnimatedPressable;
