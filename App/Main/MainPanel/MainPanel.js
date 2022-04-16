import { Box } from "native-base";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
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
import List from "./List";
import Categories from "./Categories";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import SingleCategory from "./SingleCategory";
import Fab from "./Fab";
import Settings from "./Settings";
import { FabContextProvider } from "../../../utils/context";
import Notification from "./Notification";
import HowToUse from "./HowToUse/HowToUse";
const { width } = Dimensions.get("window");
const AnimatedMainpanel = Animated.createAnimatedComponent(Box);
const SharedStack = createSharedElementStackNavigator();

const MainPanel = () => {
    const { side_panel_opened } = useSelector((state) => state.ui);
    const { roundedPanelCorners } = useSelector((state) => state.account);
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
            if (AnimatedPanelGestureStartSharedValue.value <= 40 && e.y >= 120) {
                AnimatedPanelSharedValue.value = withTiming(
                    interpolate(e.absoluteX, [0, width], [0, 1]),
                    { duration: 100 }
                );
            }
        },
        onActive: (e) => {
            if (
                (AnimatedPanelGestureStartSharedValue.value <= 40 || side_panel_opened) &&
                e.absoluteY >= 120
            ) {
                AnimatedPanelSharedValue.value = interpolate(e.absoluteX, [0, width], [0, 1]);
            }
        },
        onFinish: (e) => {
            if (AnimatedPanelGestureStartSharedValue.value <= 40 || side_panel_opened) {
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
        <PanGestureHandler onGestureEvent={gesture}>
            <AnimatedMainpanel
                flex={1}
                bg={"primary.200"}
                entering={FadeIn}
                overflow="hidden"
                style={[
                    {
                        borderRadius: roundedPanelCorners ? 30 : 0,
                    },
                    StyleSheet.absoluteFill,
                    AnimatedMainPanelStyles,
                ]}
            >
                <FabContextProvider>
                    <SharedStack.Navigator
                        screenOptions={{
                            headerMode: "none",
                            cardStyle: {
                                overflow: "visible",
                            },
                        }}
                    >
                        <SharedStack.Screen name="lists" component={List} />
                        <SharedStack.Screen name="categories" component={Categories} />
                        <SharedStack.Screen name="singleCategory" component={SingleCategory} />
                        <SharedStack.Screen name="settings" component={Settings} />
                        <SharedStack.Screen name="notifications" component={Notification} />
                        <SharedStack.Screen name="how_to_use" component={HowToUse} />
                    </SharedStack.Navigator>
                    <Fab />
                </FabContextProvider>
            </AnimatedMainpanel>
        </PanGestureHandler>
    );
};

export default MainPanel;
