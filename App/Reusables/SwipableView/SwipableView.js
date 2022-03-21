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
import { Dimensions } from "react-native";
const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width } = Dimensions.get("window");
const SWIPE_LIMIT = -120;
const SwipableView = ({ children, swipeExe }) => {
    const scaleShared = useSharedValue(1);
    const transitionX = useSharedValue(0);
    const gesture = useAnimatedGestureHandler({
        onStart: () => {
            scaleShared.value = withTiming(0.95, { duration: 200 });
        },
        onActive: (e) => {
            transitionX.value = Math.min(0, Math.max(SWIPE_LIMIT, e.translationX));
        },
        onFinish: () => {
            scaleShared.value = withSpring(1, { damping: 1 });
            if (transitionX.value < -80) {
                transitionX.value = withTiming(-width, {}, () => {
                    swipeExe && runOnJS(swipeExe)();
                });
            } else {
                transitionX.value = withSpring(0);
            }
        },
    });
    const AnimatedHSTackStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scaleShared.value }, { translateX: transitionX.value }],
    }));
    return (
        <PanGestureHandler onGestureEvent={gesture}>
            <AnimatedBox style={AnimatedHSTackStyles}>{children}</AnimatedBox>
        </PanGestureHandler>
    );
};

export default SwipableView;
