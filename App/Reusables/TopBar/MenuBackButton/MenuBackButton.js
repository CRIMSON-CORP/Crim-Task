import { Box } from "native-base";
import PropTypes from "prop-types";
import { memo, useEffect, useRef, useCallback } from "react";
import { BackHandler } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import AnimatedPressable from "../../AnimatedPressable";
import BackArrow from "../TopBarIcons/BackArrow";
import Menu from "../TopBarIcons/Menu";
import { useSidePanel } from "../../../../utils/contexts/sidePanelOpenedContext";
import { useNavigation } from "../../../../utils/contexts/navigationContext";
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
    const shouldAnimate = useRef(false);

    const AnimatedBoxShared = useSharedValue(1);

    const { NavigationRef } = useNavigation();
    const { sidePanelOpened, setSidePanelOpened } = useSidePanel();

    const AnimatedBoxStyles = useAnimatedStyle(() => ({
        opacity: AnimatedBoxShared.value,
        transform: [{ scale: interpolate(AnimatedBoxShared.value, [0, 1], [0.5, 1]) }],
    }));

    const onPress = useCallback(() => {
        if (NavigationRef.canGoBack()) {
            NavigationRef.goBack();
        } else {
            setSidePanelOpened(true);
        }
    }, []);

    useEffect(() => {
        if (OpenSearch && shouldAnimate.current) AnimatedBoxShared.value = withTiming(0);
        else AnimatedBoxShared.value = withSpring(1);
        shouldAnimate.current = true;
    }, [OpenSearch]);

    useEffect(() => {
        function sideClose() {
            if (sidePanelOpened) {
                setSidePanelOpened(false);
                return true;
            } else return false;
        }
        const BackEvnt = BackHandler.addEventListener("hardwareBackPress", sideClose);
        return () => BackEvnt.remove();
    }, [sidePanelOpened]);

    return (
        <AnimatedBox style={AnimatedBoxStyles}>
            <AnimatedPressable onPress={onPress}>
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
