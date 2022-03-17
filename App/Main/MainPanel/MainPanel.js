import { StyleSheet, StatusBar, Dimensions } from "react-native";
import { Box } from "native-base";
import { useSelector } from "react-redux";
import TopBar from "./TopBar";
import Animated, {
    FadeIn,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
const { width } = Dimensions.get("window");
const AnimatedMainpanel = Animated.createAnimatedComponent(Box);
const MainPanel = () => {
    const side_panel_opened = useSelector((state) => state.uiReducer.side_panel_opened);
    const AnimatedPanelSharedValue = useSharedValue(0);

    useEffect(() => {
        AnimatedPanelSharedValue.value = withSpring(side_panel_opened ? 1 : 0, {
            damping: 1,
            overshootClamping: true,
        });

        if (side_panel_opened) {
            AnimatedPanelSharedValue.value = withSpring(1, { damping: 11 });
        } else {
            AnimatedPanelSharedValue.value = withTiming(0, { duration: 600 });
        }
    }, [side_panel_opened]);

    const AnimatedMainPanelStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(AnimatedPanelSharedValue.value, [0, 1], [0, width - 140]) },
            { scale: interpolate(AnimatedPanelSharedValue.value, [0, 1], [1, 0.75]) },
        ],
    }));
    return (
        <AnimatedMainpanel
            position="absolute"
            flex={1}
            bg={"primary.300"}
            p={30}
            entering={FadeIn}
            style={[
                {
                    paddingTop: StatusBar.currentHeight,
                    borderRadius: 30,
                },
                StyleSheet.absoluteFill,
                AnimatedMainPanelStyles,
            ]}
        >
            <TopBar />
        </AnimatedMainpanel>
    );
};

export default MainPanel;
