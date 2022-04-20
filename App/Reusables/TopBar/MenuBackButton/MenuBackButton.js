import { AnimatePresence } from "moti";
import { memo, useContext, useEffect, useRef } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { useDispatch } from "react-redux";
import { NavigationContext } from "../../../../utils/context";
import AnimatedPressable from "../../AnimatedPressable";
import BackArrow from "../TopBarIcons/BackArrow";
import Menu from "../TopBarIcons/Menu";
import PropTypes from "prop-types";
import { OPEN_SIDE } from "../../../../redux/ui/components/ui.actions";
import Animated, {
    withTiming,
    withSpring,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
} from "react-native-reanimated";
import { Box } from "native-base";
const AnimatedBox = Animated.createAnimatedComponent(Box);
const MenuBackButton = ({ back, OpenSearch }) => {
    const AnimatedBoxShared = useSharedValue(1);
    const { NavigationRef } = useContext(NavigationContext);
    const dispath = useDispatch();
    const shouldAnimate = useRef(false);
    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        opacity: AnimatedBoxShared.value,
        transform: [{ scale: interpolate(AnimatedBoxShared.value, [0, 1], [0.5, 1]) }],
    }));

    useEffect(() => {
        if (OpenSearch && shouldAnimate.current) AnimatedBoxShared.value = withTiming(0);
        else AnimatedBoxShared.value = withSpring(1);
        shouldAnimate.current = true;
    }, [OpenSearch]);
    return (
        <AnimatedBox style={AnimatedBoxStyles}>
            <AnimatedPressable
                onPress={() => {
                    if (NavigationRef.canGoBack()) {
                        NavigationRef.goBack();
                    } else {
                        dispath({ type: OPEN_SIDE });
                    }
                }}
            >
                {back ? (
                    <SharedElement id="item.back">
                        <BackArrow />
                    </SharedElement>
                ) : (
                    <SharedElement id="item.menu">
                        <Menu />
                    </SharedElement>
                )}
            </AnimatedPressable>
        </AnimatedBox>
    );
};

MenuBackButton.propTypes = {
    back: PropTypes.bool,
    OpenSearch: PropTypes.bool,
};

export default memo(MenuBackButton);
