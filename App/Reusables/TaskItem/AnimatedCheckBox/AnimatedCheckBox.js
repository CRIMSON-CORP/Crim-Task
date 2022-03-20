import { Svg, Circle, Path } from "react-native-svg";
import Animated, {
    Easing,
    interpolate,
    useAnimatedProps,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import PropTypes from "prop-types";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedCheckBox = ({ completed, color }) => {
    const circleStrokeShared = useSharedValue(0);
    const pathStrokeShared = useSharedValue(0);
    useEffect(() => {
        if (completed) {
            circleStrokeShared.value = withTiming(1, {
                duration: 1000,
                easing: Easing.out(Easing.quad),
            });
            pathStrokeShared.value = withDelay(500, withTiming(1, { duration: 400 }));
        } else {
            circleStrokeShared.value = withTiming(0, { duration: 400 });
            pathStrokeShared.value = withTiming(0, { duration: 400 });
        }
    }, [completed]);
    const AnimatedCircleProps = useAnimatedProps(() => ({
        strokeDashoffset: interpolate(circleStrokeShared.value, [0, 1], [60, 0]),
    }));
    const AnimatedPathProps = useAnimatedProps(() => ({
        strokeDashoffset: interpolate(pathStrokeShared.value, [0, 1], [15.032623291015625, 0]),
    }));
    return (
        <Svg width={20} height={20} viewBox="0 0 20 20">
            <Circle cx="10" cy="10" r="9.5" stroke={color + "80"} strokeWidth={1} />
            <AnimatedCircle
                cx="10"
                cy="10"
                r="9.5"
                stroke={color}
                strokeWidth={1}
                strokeDasharray={60}
                animatedProps={AnimatedCircleProps}
            />
            <AnimatedPath
                d="M5 9.88889L8.07692 13L15 6"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={15.032623291015625}
                animatedProps={AnimatedPathProps}
            />
        </Svg>
    );
};

export default AnimatedCheckBox;

AnimatedCheckBox.prototype = {
    completed: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
};
