import { Box, VStack } from "native-base";
import { useEffect } from "react";
import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    Easing,
    FadeIn,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_SIDE, OPEN_SIDE } from "../../../redux/ui/components/ui.actions";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import List from "./List";
const { width } = Dimensions.get("window");
const AnimatedMainpanel = Animated.createAnimatedComponent(Box);
const SharedStack = createSharedElementStackNavigator();

const MainPanel = () => {
    const side_panel_opened = useSelector((state) => state.ui.side_panel_opened);
    const AnimatedPanelSharedValue = useSharedValue(0);
    const AnimatedPanelGestureStartSharedValue = useSharedValue(0);
    const dispath = useDispatch();
    useEffect(() => {
        AnimatedPanelSharedValue.value = withSpring(side_panel_opened ? 1 : 0, {
            damping: 8,
            restDisplacementThreshold: 0.001,
        });
        if (side_panel_opened) {
            AnimatedPanelSharedValue.value = withSpring(1, { damping: 11 });
        } else {
            AnimatedPanelSharedValue.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.quad),
            });
        }
    }, [side_panel_opened]);

    const AnimatedMainPanelStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(AnimatedPanelSharedValue.value, [0, 1], [0, width - 140]) },
            { scale: interpolate(AnimatedPanelSharedValue.value, [0, 1], [1, 0.75]) },
        ],
    }));

    const gesture = useAnimatedGestureHandler({
        onStart: (e) => {
            AnimatedPanelGestureStartSharedValue.value = e.x;
            if (AnimatedPanelGestureStartSharedValue.value <= 40) {
                AnimatedPanelSharedValue.value = withTiming(
                    interpolate(e.absoluteX, [0, width], [0, 1]),
                    { duration: 100 }
                );
            }
        },
        onActive: (e) => {
            if (AnimatedPanelGestureStartSharedValue.value <= 40) {
                AnimatedPanelSharedValue.value = interpolate(e.absoluteX, [0, width], [0, 1]);
            }
        },
        onFinish: (e) => {
            if (AnimatedPanelGestureStartSharedValue.value <= 40) {
                if (width - e.absoluteX <= width * 0.5) {
                    AnimatedPanelSharedValue.value = withSpring(
                        1,
                        {
                            damping: 8,
                            restDisplacementThreshold: 0.001,
                        },
                        () => runOnJS(dispath)({ type: OPEN_SIDE })
                    );
                } else {
                    AnimatedPanelSharedValue.value = withTiming(
                        0,
                        {
                            duration: 500,
                            easing: Easing.out(Easing.quad),
                        },
                        () => runOnJS(dispath)({ type: CLOSE_SIDE })
                    );
                }
            }
        },
    });

    return (
        <PanGestureHandler onGestureEvent={gesture} minDist={40}>
            <AnimatedMainpanel
                position="absolute"
                flex={1}
                bg={"primary.200"}
                p={5}
                entering={FadeIn}
                overflow="hidden"
                style={[
                    {
                        paddingTop: StatusBar.currentHeight + 10,
                        borderRadius: 30,
                    },
                    StyleSheet.absoluteFill,
                    AnimatedMainPanelStyles,
                ]}
            >
                <SharedStack.Navigator
                    initialRouteName="list"
                    screenOptions={{
                        headerMode: "none",
                        cardStyle: {
                            overflow: "visible",
                        },
                    }}
                >
                    <SharedStack.Screen name="list" component={List} />
                </SharedStack.Navigator>
            </AnimatedMainpanel>
        </PanGestureHandler>
    );
};

export default MainPanel;
