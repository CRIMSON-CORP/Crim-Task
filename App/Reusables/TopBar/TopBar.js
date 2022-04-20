import { Box, HStack, useTheme } from "native-base";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { SharedElement } from "react-navigation-shared-element";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContext, useFab, useSearch } from "../../../utils/context";
import { AnimatePresence, View as MotiView } from "moti";
import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import SearchBar from "./Search/SearchBar/SearchBar";
import SearchResults from "./Search/SearchResults";
import MenuBackButton from "./MenuBackButton";
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
