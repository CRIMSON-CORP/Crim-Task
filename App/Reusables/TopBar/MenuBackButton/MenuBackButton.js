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
import { useDispatch, useSelector } from "react-redux";
import { closeSide, openSide } from "../../../../redux/ui/components/ui.reducer";
import { NavigationContext } from "../../../../utils/context";
import AnimatedPressable from "../../AnimatedPressable";
import BackArrow from "../TopBarIcons/BackArrow";
import Menu from "../TopBarIcons/Menu";
import { getAsyncAccountData } from "../../../../redux/account/account.reducer";
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
    const { side_panel_opened } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
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

    useEffect(() => {
        const sideClose = () => {
            if (side_panel_opened) {
                dispatch(closeSide());
                return true;
            } else return false;
        };
        const BackEvnt = BackHandler.addEventListener("hardwareBackPress", sideClose);
        return () => BackEvnt.remove();
    }, [side_panel_opened]);

    return (
        <AnimatedBox style={AnimatedBoxStyles}>
            <AnimatedPressable
                onPress={() => {
                    if (NavigationRef.canGoBack()) {
                        NavigationRef.goBack();
                    } else {
                        dispatch(openSide());
                        dispatch(getAsyncAccountData());
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
