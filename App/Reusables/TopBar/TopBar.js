import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, HStack, useTheme } from "native-base";
import { useEffect, useState, useCallback } from "react";
import { BackHandler, Dimensions, StatusBar, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { useFab } from "../../../utils/contexts/fabContext";
import { useNavigation } from "../../../utils/contexts/navigationContext";
import AnimatedPressable from "../AnimatedPressable";
import MenuBackButton from "./MenuBackButton";
import SearchBar from "./Search/SearchBar/SearchBar";
import SearchResults from "./Search/SearchResults";
import Bell from "./TopBarIcons/Bell";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const { width, height } = Dimensions.get("screen");

const scaleTransition = {
    from: {
        transform: [{ scale: 0 }],
    },
    animate: {
        transform: [{ scale: 1 }],
    },
    exit: {
        transform: [{ scale: 0 }],
    },
    transition: {
        type: "timing",
    },
};

function TopBar({ back }) {
    const bgShared = useSharedValue(0);

    const [value, setValue] = useState("");
    const [OpenSearch, setOpenSearch] = useState(false);

    const { NavigationRef } = useNavigation();
    const { colors } = useTheme();
    const { setShowFab } = useFab();

    const bgStyles = useAnimatedStyle(() => ({
        backgroundColor: colors.primary[300],
        opacity: bgShared.value,
    }));

    const closeSearch = useCallback(() => {
        setValue("");
        setOpenSearch(false);
    }, []);

    const goToNotifications = useCallback(() => NavigationRef.navigate("notifications"), []);

    useEffect(() => {
        if (OpenSearch) {
            bgShared.value = withTiming(1);
            setShowFab(false);
        } else {
            bgShared.value = withDelay(500, withTiming(0));
            setShowFab(true);
        }

        const backHandler = () => {
            if (OpenSearch) {
                setOpenSearch(false);
                return true;
            } else return false;
        };

        const backEnvt = BackHandler.addEventListener("hadwarebackPress", backHandler);
        return () => backEnvt.remove();
    }, [OpenSearch]);

    useEffect(() => {
        return () => {
            setValue("");
            setOpenSearch(false);
        };
    }, []);

    return (
        <Box>
            <AnimatedBox
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, bgStyles, styles.fullScreen]}
            />
            <SearchResults value={value} OpenSearch={OpenSearch} />
            <HStack
                justifyContent={"space-between"}
                zIndex={998}
                position="absolute"
                w="full"
                h={45}
                alignItems="center"
            >
                <MenuBackButton OpenSearch={OpenSearch} back={back} />
                <HStack space="5" left={0} zIndex={999} alignItems="center">
                    <SharedElement id="item.search">
                        <SearchBar
                            setOpenSearch={setOpenSearch}
                            OpenSearch={OpenSearch}
                            value={value}
                            setValue={setValue}
                        />
                    </SharedElement>
                    <SharedElement id="item.bell">
                        <AnimatePresence exitBeforeEnter>
                            {OpenSearch ? (
                                <MotiView {...scaleTransition} key={2}>
                                    <AnimatedPressable onPress={closeSearch}>
                                        <AntDesign name="close" size={30} color="white" />
                                    </AnimatedPressable>
                                </MotiView>
                            ) : (
                                <MotiView key={1}>
                                    <AnimatedPressable onPress={goToNotifications}>
                                        <Bell />
                                    </AnimatedPressable>
                                </MotiView>
                            )}
                        </AnimatePresence>
                    </SharedElement>
                </HStack>
            </HStack>
        </Box>
    );
}

TopBar.propTypes = {
    back: PropTypes.bool,
};

export default TopBar;

const styles = StyleSheet.create({
    fullScreen: {
        width,
        height,
        left: -20,
        zIndex: 997,
        top: -StatusBar.currentHeight - 20,
    },
});
