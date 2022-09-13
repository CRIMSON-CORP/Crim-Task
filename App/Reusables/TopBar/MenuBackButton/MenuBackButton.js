import React from "react";
import { Box } from "native-base";
import PropTypes from "prop-types";
import { memo, useContext, useEffect, useRef } from "react";
import { BackHandler } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationContext } from "../../../../utils/context";
import AnimatedPressable from "../../AnimatedPressable";
import BackArrow from "../TopBarIcons/BackArrow";
import Menu from "../TopBarIcons/Menu";
import { useSidePanel } from "../../../../utils/contexts/sidePanelOpenedContext";
const AnimatedBox = Animated.createAnimatedComponent(Box);

/**
 * @typedef MenuBackButtonParams
 * @property {boolean} back
 * @property {boolean} openSearch
 */

/**
 * @param {MenuBackButtonParams}
 * @returns {JSX.Element}
 */
function MenuBackButton({ back, OpenSearch }) {
    const AnimatedBoxShared = useSharedValue(1);
    const { NavigationRef } = useContext(NavigationContext);
    const shouldAnimate = useRef(false);
    const { sidePanelOpened, setSidePanelOpened } = useSidePanel();
    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        opacity: AnimatedBoxShared.value,
        transform: [{ scale: interpolate(AnimatedBoxShared.value, [0, 1], [0.5, 1]) }],
    }));

    useEffect(() => {
        if (OpenSearch && shouldAnimate.current) AnimatedBoxShared.value = withTiming(0);
        else AnimatedBoxShared.value = withSpring(1);
        shouldAnimate.current = true;
    }, [OpenSearch]);

    useEffect(() => {
        const sideClose = () => {
            if (sidePanelOpened) {
                setSidePanelOpened(false);
                return true;
            } else return false;
        };
        const BackEvnt = BackHandler.addEventListener("hardwareBackPress", sideClose);
        return () => BackEvnt.remove();
    }, [sidePanelOpened]);

    return (
        <AnimatedBox style={AnimatedBoxStyles}>
            <AnimatedPressable
                onPress={() => {
                    if (NavigationRef.canGoBack()) {
                        NavigationRef.goBack();
                    } else {
                        setSidePanelOpened(true);
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
}

MenuBackButton.propTypes = {
    back: PropTypes.bool,
    OpenSearch: PropTypes.bool,
};

export default memo(MenuBackButton);
