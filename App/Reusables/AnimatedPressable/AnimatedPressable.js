import PropTypes from "prop-types";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";

const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

/**
 * @typedef AnimatedPressableProps
 * @property {string | JSX.Element} children
 * @property {():void} onPress
 * @property {React.CSSProperties} style
 */

/**
 *
 * @param {AnimatedPressableProps} AnimatedPressableProps
 * @returns {JSX.Element}
 */

function AnimatedPressable({ children, onPress, style }) {
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
}
AnimatedPressable.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.element.isRequired,
};

export default AnimatedPressable;
