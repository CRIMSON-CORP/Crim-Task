import { AntDesign } from "@expo/vector-icons";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, Center } from "native-base";
import { useCallback } from "react";
import { useEffect, useRef, useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useFab } from "../../../../utils/contexts/fabContext";
import { useNavigation } from "../../../../utils/contexts/navigationContext";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import CreateNewCategory from "./CreateNewCategory";
import CreateNewKnowCategoryTask from "./CreateNewKnowCategoryTask/CreateNewKnowCategoryTask";
import CreateNewTask from "./CreateNewTask";

export const AnimatedBox = Animated.createAnimatedComponent(Box);

const fabAnimationStyles = {
    initial: {
        opacity: 0,
        transform: [{ scale: 0.4 }],
    },
    animate: {
        opacity: 1,
        transform: [{ scale: 1 }],
    },
};

const fabPlusAnimationTransition = {
    mass: 3,
    damping: 20,
};

function Fab() {
    const { rad, content, backDropOpen, open, ToggleOpenFab, showFab, AnimateOpen, setShowFab } =
        useFab();

    const Styles = useAnimatedStyle(() => ({
        transform: [{ scale: rad.value }],
    }));

    const ContentStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: content.value }],
        opacity: interpolate(content.value, [0, 200], [1, 0]),
    }));

    const { NavigationRef } = useNavigation();

    useEffect(() => {
        const noFabScreens = ["notifications", "settings", "how_to_use"];
        const unsub = NavigationRef.addListener("state", () => {
            let routename = NavigationRef.getCurrentRoute().name;
            setShowFab(!noFabScreens.includes(routename));
        });

        return unsub;
    }, []);

    const backDropAimationStyles = useMemo(
        () => ({
            opacity: backDropOpen ? 1 : 0,
        }),
        [backDropOpen]
    );

    const plusAnimateStyles = useMemo(
        () => ({
            transform: [{ rotate: AnimateOpen ? `${405}deg` : `${0}deg` }],
        }),
        [AnimateOpen]
    );

    const fabOpenToggler = useCallback(() => {
        console.log("toggle", open);
        ToggleOpenFab(!open);
    }, [open]);

    return (
        <Box justifyContent={"center"}>
            <MotiView
                pointerEvents="none"
                style={styles.fabBackDropStyles}
                animate={backDropAimationStyles}
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
            <AnimatedBox style={ContentStyles}>
                {open && (
                    <Center p="5" h="full">
                        <FabScreen />
                    </Center>
                )}
            </AnimatedBox>
            <AnimatedPressable onPress={fabOpenToggler} style={styles.fabPressableStyles}>
                <AnimatePresence>
                    {showFab && (
                        <MotiView
                            from={fabAnimationStyles.initial}
                            animate={fabAnimationStyles.animate}
                            exit={fabAnimationStyles.initial}
                        >
                            <Center
                                size={65}
                                bg="primary.accent"
                                rounded="full"
                                shadow={6}
                                zIndex={999}
                            >
                                <MotiView
                                    animate={plusAnimateStyles}
                                    transition={fabPlusAnimationTransition}
                                >
                                    <AntDesign
                                        size={30}
                                        name="plus"
                                        color="#ffffff"
                                        style={styles.fabPlusIconStyles}
                                    />
                                </MotiView>
                            </Center>
                        </MotiView>
                    )}
                </AnimatePresence>
            </AnimatedPressable>
        </Box>
    );
}

export default Fab;

function FabScreen() {
    const { NavigationRef } = useNavigation();
    const currentRoute = NavigationRef.getCurrentRoute().name;
    const categories = useSelector((state) => state.tasks);
    const catRef = useRef(categories.length);
    const { flag } = useFab();
    if (flag.flag) {
        switch (flag.flag) {
            case "EDIT_CATEGORY":
                return <CreateNewCategory flag={flag} />;
            case "EDIT_TASK":
                return <CreateNewTask flag={flag} />;
        }
    } else {
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
}

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    fabBackDropStyles: {
        width,
        height,
        bottom: 0,
        position: "absolute",
        backgroundColor: "#00000040",
    },
    fabPressableStyles: { position: "absolute", bottom: 20, right: 20 },
    fabPlusIconStyles: {
        textShadowOffset: {
            width: 0,
            height: 3,
        },
        textShadowColor: "#00000060",
        textShadowRadius: 10,
    },
});
