import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, Center, useTheme } from "native-base";
import { useCallback, useEffect, useRef, useMemo } from "react";
import { BackHandler, Dimensions, StyleSheet } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useFab } from "../../../../utils/contexts/fabContext";
import { useNavigation } from "../../../../utils/contexts/navigationContext";
import AnimatedPressable from "../../../Reusables/AnimatedPressable";
import CreateNewCategory from "./CreateNewCategory";
import CreateNewKnowCategoryTask from "./CreateNewKnowCategoryTask";
import CreateNewTask from "./CreateNewTask";

const { width, height } = Dimensions.get("screen");
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
    const canPress = useRef(true);

    const { showFab, setShowFab, fabPanelOpen, setFabPanelOpen } = useFab();
    const { NavigationRef } = useNavigation();

    useEffect(() => {
        const noFabScreens = ["notifications", "settings", "how_to_use"];
        const unsub = NavigationRef.addListener("state", () => {
            let routename = NavigationRef.getCurrentRoute().name;
            setShowFab(!noFabScreens.includes(routename));
        });

        return unsub;
    }, []);

    const plusAnimateStyles = useMemo(
        () => ({
            transform: [{ rotate: fabPanelOpen ? `${405}deg` : `${0}deg` }],
        }),
        [fabPanelOpen]
    );

    const fabOpenToggler = useCallback(() => {
        if (canPress.current) {
            setFabPanelOpen(!fabPanelOpen);
            canPress.current = false;
            setTimeout(() => {
                canPress.current = true;
            }, 1000);
        }
    }, [fabPanelOpen, canPress.current]);

    return (
        <Box justifyContent={"center"}>
            <BackDrop fabPanelOpen={fabPanelOpen} />
            <AnimatedBackground fabPanelOpen={fabPanelOpen} setFabPanelOpen={setFabPanelOpen} />
            <AnimatePresence>
                {fabPanelOpen && (
                    <ContentAnimatedWrapper>
                        <Center p="5" h="full">
                            <FabScreen />
                        </Center>
                    </ContentAnimatedWrapper>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showFab && (
                    <AnimatedPressable onPress={fabOpenToggler} style={styles.fabPressableStyles}>
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
                    </AnimatedPressable>
                )}
            </AnimatePresence>
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

function BackDrop({ fabPanelOpen }) {
    const backDropAimationStyles = useMemo(
        () => ({
            opacity: fabPanelOpen ? 1 : 0,
        }),
        [fabPanelOpen]
    );
    const backDropAimationTransition = useMemo(
        () => ({
            delay: fabPanelOpen ? 0 : 1000,
            type: "timing",
        }),
        [fabPanelOpen]
    );
    return (
        <MotiView
            pointerEvents="none"
            style={styles.fabBackDropStyles}
            animate={backDropAimationStyles}
            transition={backDropAimationTransition}
        />
    );
}
BackDrop.propTypes = {
    fabPanelOpen: PropTypes.bool,
};
function AnimatedBackground({ fabPanelOpen, setFabPanelOpen }) {
    const { colors } = useTheme();

    useEffect(() => {
        function backPress() {
            if (fabPanelOpen) {
                setFabPanelOpen(false);
                return true;
            } else {
                return false;
            }
        }
        const backEvt = BackHandler.addEventListener("hardwareBackPress", backPress);
        return () => backEvt.remove();
    }, [fabPanelOpen]);

    const backgroundStyles = useMemo(
        () => ({
            width: 10,
            height: 10,
            borderRadius: 99999,
            bottom: 65 / 4 + 20,
            right: 65 / 4 + 20,
            position: "absolute",
            backgroundColor: colors.primary[200],
        }),
        []
    );
    const backgroundTransition = useMemo(
        () => ({
            type: "timing",
            duration: 600,
            delay: fabPanelOpen ? 0 : 500,
            easing: Easing.out(Easing.quad),
        }),
        [fabPanelOpen]
    );

    const coverScreenSize = (Math.sqrt(width ** 2 + height ** 2) / 10) * 2;

    const backgroundAnimatedStyles = useMemo(
        () => ({ scale: fabPanelOpen ? coverScreenSize : 0 }),
        [fabPanelOpen]
    );

    return (
        <MotiView
            style={backgroundStyles}
            transition={backgroundTransition}
            animate={backgroundAnimatedStyles}
        />
    );
}
AnimatedBackground.propTypes = {
    fabPanelOpen: PropTypes.bool,
    setFabPanelOpen: PropTypes.func,
};

const contentAnimation = {
    from: { opacity: 0, translateY: 200 },
    animate: {
        opacity: 1,
        translateY: 0,
    },
    exitTransition: {
        delay: 0,
        duration: 300,
    },
    transition: {
        type: "timing",
        duration: 600,
        delay: 700,
        easing: Easing.out(Easing.quad),
    },
};
function ContentAnimatedWrapper({ children }) {
    return (
        <MotiView
            style={styles.fabContetStyles}
            from={contentAnimation.from}
            animate={contentAnimation.animate}
            exit={contentAnimation.from}
            exitTransition={contentAnimation.exitTransition}
            transition={contentAnimation.transition}
        >
            {children}
        </MotiView>
    );
}

ContentAnimatedWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

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
    fabContetStyles: {
        width,
        height,
        top: -height,
        position: "absolute",
    },
});
