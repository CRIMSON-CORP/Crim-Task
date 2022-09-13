import React from "react";
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
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useSelector } from "react-redux";
import { FabContextProvider } from "../../../utils/context";
import Categories from "./Categories";
import Fab from "./Fab";
import HowToUse from "./HowToUse/HowToUse";
import List from "./List";
import Notification from "./Notification";
import Settings from "./Settings";
import SingleCategory from "./SingleCategory";
import { useSidePanel } from "../../../utils/contexts/sidePanelOpenedContext";

const { width } = Dimensions.get("window");
const AnimatedMainpanel = Animated.createAnimatedComponent(Box);
const SharedStack = createSharedElementStackNavigator();

const CLOSE_THRESHOLD = 40;
const OPEN_THRESHOLD = 120;

const MainPanel = () => {
    const { roundedPanelCorners } = useSelector((state) => state.account);

    const { sidePanelOpened, setSidePanelOpened } = useSidePanel();

    const AnimatedPanelSharedValue = useSharedValue(0);
    const AnimatedPanelGestureStartSharedValue = useSharedValue(0);

    useEffect(() => {
        AnimatedPanelSharedValue.value = withSpring(sidePanelOpened ? 1 : 0, {
            damping: 8,
            restDisplacementThreshold: 0.001,
        });
        if (sidePanelOpened) {
            AnimatedPanelSharedValue.value = withSpring(1, { damping: 11 });
        } else {
            AnimatedPanelSharedValue.value = withTiming(0, {
                duration: 500,
                easing: Easing.out(Easing.quad),
            });
        }
    }, [sidePanelOpened]);

    function _closeSide() {
        setSidePanelOpened(false);
    }
    function _openSide() {
        setSidePanelOpened(true);
    }

    const AnimatedMainPanelStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(AnimatedPanelSharedValue.value, [0, 1], [0, width - 140]) },
            { scale: interpolate(AnimatedPanelSharedValue.value, [0, 1], [1, 0.75]) },
        ],
    }));

    const gesture = useAnimatedGestureHandler({
        onStart: (e) => {
            AnimatedPanelGestureStartSharedValue.value = e.x;
            if (AnimatedPanelGestureStartSharedValue.value <= CLOSE_THRESHOLD && e.y >= 120) {
                AnimatedPanelSharedValue.value = withTiming(
                    interpolate(e.absoluteX, [0, width], [0, 1]),
                    { duration: 100 }
                );
            }
        },
        onActive: (e) => {
            if (
                (AnimatedPanelGestureStartSharedValue.value <= CLOSE_THRESHOLD ||
                    sidePanelOpened) &&
                e.absoluteY >= OPEN_THRESHOLD
            ) {
                AnimatedPanelSharedValue.value = interpolate(e.absoluteX, [0, width], [0, 1]);
            }
        },
        onFinish: (e) => {
            if (AnimatedPanelGestureStartSharedValue.value <= CLOSE_THRESHOLD || sidePanelOpened) {
                if (width - e.absoluteX <= width * 0.5) {
                    AnimatedPanelSharedValue.value = withSpring(
                        1,
                        {
                            damping: 8,
                            restDisplacementThreshold: 0.001,
                        },
                        () => runOnJS(_openSide)()
                    );
                } else {
                    AnimatedPanelSharedValue.value = withTiming(
                        0,
                        {
                            duration: 500,
                            easing: Easing.out(Easing.quad),
                        },
                        () => runOnJS(_closeSide)()
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
