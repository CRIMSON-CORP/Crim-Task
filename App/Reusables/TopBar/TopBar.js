import { AntDesign } from "@expo/vector-icons";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, HStack, useTheme } from "native-base";
import { useContext, useEffect, useState } from "react";
import { BackHandler, Dimensions, StatusBar, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationContext, useFab } from "../../../utils/context";
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

const TopBar = ({ back }) => {
    const bgShared = useSharedValue(0);
    const { NavigationRef } = useContext(NavigationContext);
    const [OpenSearch, setOpenSearch] = useState(false);
    const [value, setValue] = useState("");
    const { colors } = useTheme();
    const { setShowFab } = useFab();
    const bgStyles = useAnimatedStyle(() => ({
        backgroundColor: colors.primary[300],
        opacity: bgShared.value,
        zIndex: 997,
    }));

    useEffect(() => {
        if (OpenSearch) {
            bgShared.value = withTiming(1);
            setShowFab(false);
        } else {
            bgShared.value = withDelay(500, withTiming(0));
            setShowFab(true);
            setValue("");
        }
    }, [OpenSearch]);

    useEffect(() => {
        const backHandler = () => {
            if (OpenSearch) {
                setOpenSearch(false);
                return true;
            } else return false;
        };

        const backEnvt = BackHandler.addEventListener("hadwarebackPress", backHandler);
        return () => backEnvt.remove();
    }, [OpenSearch]);

    const fullScreen = {
        width,
        height,
        left: -20,
        top: -StatusBar.currentHeight - 20,
    };
    return (
        <Box>
            <AnimatedBox
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, bgStyles, fullScreen]}
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
                                    <AnimatedPressable
                                        onPress={() => {
                                            setOpenSearch(false);
                                        }}
                                    >
                                        <AntDesign name="close" size={30} color="white" />
                                    </AnimatedPressable>
                                </MotiView>
                            ) : (
                                <MotiView key={1}>
                                    <AnimatedPressable
                                        onPress={() => NavigationRef.navigate("notifications")}
                                    >
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
};

export default TopBar;
