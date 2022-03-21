import { Pressable } from "native-base";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);
const AnimatedPressable = ({ children, onPress, style }) => {
    const AnimatedPressableScaleShared = useSharedValue(1);
    const AnimatedPressableStyle = useAnimatedStyle(() => ({
        transform: [{ scale: AnimatedPressableScaleShared.value }],
    }));

    function onPressIn() {
        AnimatedPressableScaleShared.value = withTiming(0.9);
    }
    function onPressOut() {
        AnimatedPressableScaleShared.value = withSpring(1);
    }
    return (
        <AnimatedPressableWrapper
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => onPress && onPress()}
            onLongPress={() => null}
            style={[style, AnimatedPressableStyle]}
        >
            {children}
        </AnimatedPressableWrapper>
    );
};

export default AnimatedPressable;
