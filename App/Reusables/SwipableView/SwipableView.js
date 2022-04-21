import { Box } from "native-base";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
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
const { width } = Dimensions.get("window");
const SWIPE_LIMIT = -180;
const SwipableView = ({ children, swipeExe, simultaneousHandlers }) => {
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
            if (transitionX.value < -140) {
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
        <PanGestureHandler
            failOffsetY={[-5, 5]}
            activeOffsetX={[-5, 5]}
            onGestureEvent={gesture}
            simultaneousHandlers={simultaneousHandlers}
        >
            <AnimatedBox style={AnimatedHSTackStyles}>{children}</AnimatedBox>
        </PanGestureHandler>
    );
};
SwipableView.propTypes = {
    swipeExe: PropTypes.func,
    children: PropTypes.element.isRequired,
};

export default SwipableView;
