import { Box, Center } from "native-base";
import { useState, useContext, useEffect, useRef } from "react";
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import { Dimensions } from "react-native";
import { AnimatePresence, View as MotiView } from "moti";
import CreateNewCategory from "./CreateNewCategory";
import CreateNewTask from "./CreateNewTask";
import { FabButtonContext, NavigationContext } from "../../../../utils/context";
import CreateNewKnowCategoryTask from "./CreateNewKnowCategoryTask/CreateNewKnowCategoryTask";
import { useSelector } from "react-redux";
const { width: w, height: h } = Dimensions.get("screen");
export const AnimatedBox = Animated.createAnimatedComponent(Box);

const Fab = () => {
    const rad = useSharedValue(0);
    const content = useSharedValue(200);
    const [canPress, setCanPress] = useState(true);
    const [open, setOpen] = useState(false);
    const [backDropOpen, setBackDropOpen] = useState(false);
    const [AnimateOpen, setAnimateOPen] = useState(false);
    const [showFab, setShowFab] = useState(true);
    const Styles = useAnimatedStyle(() => ({
        transform: [{ scale: rad.value }],
    }));
    const ContentStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: content.value }],
        opacity: interpolate(content.value, [0, 200], [1, 0]),
    }));

    const { NavigationRef } = useContext(NavigationContext);
    useEffect(() => {
        const unsub = NavigationRef.addListener("state", (e) => {
            setShowFab(NavigationRef.getCurrentRoute().name !== "settings");
        });

        return unsub;
    }, []);
    function ToggleOpenFab(toggle) {
        ("worklet");
        if (toggle) {
            runOnJS(setAnimateOPen)(true);
            if (canPress) {
                runOnJS(setBackDropOpen)(true);
                runOnJS(setCanPress)(false);
                rad.value = withTiming(
                    40,
                    { duration: 700, easing: Easing.out(Easing.quad) },
                    () => {
                        runOnJS(setCanPress)(true);
                    }
                );
                setTimeout(() => {
                    runOnJS(setOpen)(true);
                    content.value = withDelay(200, withTiming(0, { duration: 700 }));
                }, 200);
            }
        } else {
            if (canPress) {
                runOnJS(setCanPress)(false);
                runOnJS(setAnimateOPen)(false);
                content.value = withTiming(200, {}, () => runOnJS(setOpen)(false));
                rad.value = withDelay(
                    500,
                    withTiming(0, { duration: 500, easing: Easing.out(Easing.quad) }, () => {
                        runOnJS(setCanPress)(true);
                        runOnJS(setBackDropOpen)(false);
                    })
                );
            }
        }
    }

    return (
        <Box justifyContent={"center"}>
            <MotiView
                style={[
                    {
                        backgroundColor: "#00000040",
                        width: w,
                        height: h,
                        position: "absolute",
                        bottom: 0,
                    },
                ]}
                animate={{
                    opacity: backDropOpen ? 1 : 0,
                }}
                pointerEvents="none"
            />
            <AnimatedBox
                width={10}
                height={10}
                bg={"primary.200"}
                rounded="full"
                position={"absolute"}
                pointerEvents={open ? "auto" : "none"}
                bottom={65 / 4 + 20}
                right={65 / 4 + 20}
                style={[Styles]}
            />
            <FabButtonContext.Provider value={{ ToggleOpenFab }}>
                <AnimatedBox style={ContentStyles}>
                    {open && (
                        <Center p="5" h="full">
                            <FabScreen />
                        </Center>
                    )}
                </AnimatedBox>
            </FabButtonContext.Provider>
            <AnimatedPressable
                onPress={() => {
                    ToggleOpenFab(!open);
                }}
                style={{ position: "absolute", bottom: 20, right: 20 }}
            >
                <AnimatePresence>
                    {showFab && (
                        <MotiView
                            from={{ opacity: 0, transform: [{ scale: 0.4 }] }}
                            animate={{ opacity: 1, transform: [{ scale: 1 }] }}
                            exit={{ opacity: 0, transform: [{ scale: 0.4 }] }}
                        >
                            <Center
                                size={65}
                                bg="primary.accent"
                                rounded="full"
                                shadow={6}
                                zIndex={999}
                            >
                                <MotiView
                                    transition={{
                                        mass: 3,
                                        damping: 20,
                                    }}
                                    animate={{
                                        transform: [
                                            { rotate: AnimateOpen ? `${405}deg` : `${0}deg` },
                                        ],
                                    }}
                                >
                                    <AntDesign
                                        name="plus"
                                        color="#ffffff"
                                        style={{
                                            textShadowOffset: {
                                                width: 0,
                                                height: 3,
                                            },
                                            textShadowColor: "#00000060",
                                            textShadowRadius: 10,
                                        }}
                                        size={30}
                                    />
                                </MotiView>
                            </Center>
                        </MotiView>
                    )}
                </AnimatePresence>
            </AnimatedPressable>
        </Box>
    );
};

export default Fab;

function FabScreen() {
    const { NavigationRef } = useContext(NavigationContext);
    const currentRoute = NavigationRef.getCurrentRoute().name;
    const categories = useSelector((state) => state.tasks);
    const catRef = useRef(categories.length);
    switch (currentRoute) {
        case "lists":
            if (catRef.current) return <CreateNewTask />;
            return <CreateNewCategory />;
        case "categories":
            return <CreateNewCategory />;
        case "singleCategory":
            return <CreateNewKnowCategoryTask />;
        default:
            return <CreateNewTask />;
    }
}
