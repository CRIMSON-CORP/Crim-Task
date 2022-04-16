import { Box, HStack, Input, useTheme, Image, VStack, Text } from "native-base";
import Menu from "./TopBarIcons/Menu";
import Search from "./TopBarIcons/Search";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_SIDE } from "../../../redux/ui/components/ui.actions";
import BackArrow from "./TopBarIcons/BackArrow";
import { SharedElement } from "react-navigation-shared-element";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContext, useFab, useSearch } from "../../../utils/context";
import { AnimatePresence, View as MotiView } from "moti";
import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TaskItem from "../TaskItem";
import { debounce } from "../../../utils/utils";
import Waiting from "./SearchImages/waiting_search.png";
import NothingFound from "./SearchImages/no_items_found.png";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    interpolate,
} from "react-native-reanimated";
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
    const dispath = useDispatch();
    const bgShared = useSharedValue(0);
    const ContentShared = useSharedValue(0);
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

    const contentStyles = useAnimatedStyle(() => ({
        opacity: ContentShared.value,
        zIndex: 998,
        transform: [{ translateY: interpolate(ContentShared.value, [0, 1], [50, 0]) }],
    }));

    useEffect(() => {
        if (OpenSearch) {
            bgShared.value = withTiming(1);
            ContentShared.value = withDelay(500, withTiming(1));
            setShowFab(false);
        } else {
            bgShared.value = withDelay(500, withTiming(0));
            ContentShared.value = withTiming(0);
            setShowFab(true);
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
            <AnimatedBox style={contentStyles}>
                {OpenSearch && (
                    <Box style={fullScreen}>
                        <SearchResultList value={value} setValue={setValue} />
                    </Box>
                )}
            </AnimatedBox>
            <HStack justifyContent={"space-between"} zIndex={998} position="absolute" w="full">
                <AnimatePresence>
                    {!OpenSearch && (
                        <MotiView>
                            <AnimatedPressable
                                onPress={() => {
                                    if (NavigationRef.canGoBack()) {
                                        NavigationRef.goBack();
                                    } else {
                                        dispath({ type: OPEN_SIDE });
                                    }
                                }}
                            >
                                {back ? (
                                    <SharedElement id="item.back">
                                        <BackArrow />
                                    </SharedElement>
                                ) : (
                                    <SharedElement id="item.menu">
                                        <Menu />
                                    </SharedElement>
                                )}
                            </AnimatedPressable>
                        </MotiView>
                    )}
                </AnimatePresence>
                <HStack space="5" left={0} zIndex={999}>
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

function SearchResultList({ value, setValue }) {
    const [results, setResults] = useState([]);
    const categories = useSelector((state) => state.tasks);
    const FindResults = useCallback(() => {
        let res = [];
        if (!value) return setResults([]);
        categories.forEach((cat) => {
            cat.tasks.forEach((t) => {
                t.task.toLowerCase().match(value.toLowerCase()) &&
                    res.push({
                        ...t,
                        categoryId: cat.categoryId,
                        categoryColor: cat.categoryColor,
                    });
            });
        });
        setResults(res);
    }, [value, categories]);

    useEffect(() => {
        if (value.length > 2) debounce(FindResults(), 1000);
        else setResults([]);
    }, [value, categories]);
    useEffect(() => {
        return () => {
            setResults([]);
            setValue("");
        };
    }, []);
    const animation = {
        from: {
            opacity: 0,
            transform: [{ translateY: 50 }],
        },
        animate: {
            opacity: 1,
            transform: [{ translateY: 0 }],
        },
    };
    return (
        <Box pt="40" p="5">
            <AnimatePresence>
                {value.length && results.length && (
                    <MotiView {...animation} key="list">
                        <AnimatePresence>
                            {results.map((item, index) => {
                                return (
                                    <TaskItem
                                        key={item.id}
                                        itemId={item.id}
                                        task={item.task}
                                        completed={item.completed}
                                        categoryColor={item.categoryColor}
                                        categoryId={item.categoryId}
                                        index={index}
                                        dark
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </MotiView>
                )}
                {value.length < 3 && !results.length && (
                    <MotiView {...animation} key="waiting">
                        <VStack alignItems="center" justifyContent="flex-start" space="5">
                            <Image
                                source={Waiting}
                                w="100%"
                                h={140}
                                resizeMode="contain"
                                alt="waiting"
                            />
                            <Text fontSize={12} opacity={40}>
                                {value.length == 0
                                    ? "Waiting to Search..."
                                    : "Please write up to 3 Characters for search"}
                            </Text>
                        </VStack>
                    </MotiView>
                )}

                {value.length > 2 && !results.length && (
                    <MotiView {...animation} key="nothing_found">
                        <VStack alignItems="center" justifyContent="flex-start" space="5">
                            <Image
                                source={NothingFound}
                                w="100%"
                                h={140}
                                resizeMode="contain"
                                alt="nothing found"
                            />
                            <Text fontSize={12} opacity={40}>
                                No Task matched your search
                            </Text>
                        </VStack>
                    </MotiView>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default TopBar;

function SearchBar({ setOpenSearch, OpenSearch, value, setValue }) {
    const { colors } = useTheme();
    return (
        <Box zIndex={999}>
            <MotiView
                animate={{
                    width: OpenSearch ? width - 140 : 30,
                }}
                transition={{
                    type: "timing",
                    duration: 500,
                }}
            >
                <HStack w="full" alignItems={"center"} mt={OpenSearch ? -2 : 0}>
                    <AnimatePresence>
                        {OpenSearch && (
                            <MotiView
                                from={{
                                    width: 30,
                                }}
                                animate={{
                                    width: width - 140,
                                }}
                                exit={{
                                    width: 30,
                                }}
                                transition={{
                                    type: "timing",
                                    duration: 500,
                                }}
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: -5,
                                }}
                            >
                                <Box
                                    w="100%"
                                    h={44}
                                    p="5"
                                    bottom={0}
                                    bg="primary.200"
                                    rounded={10}
                                    position={"absolute"}
                                />
                            </MotiView>
                        )}
                    </AnimatePresence>
                    <AnimatedPressable onPress={() => setOpenSearch((prev) => !prev)}>
                        <Search />
                    </AnimatedPressable>
                    <AnimatePresence>
                        {OpenSearch && (
                            <MotiView>
                                <Input
                                    variant="unstyled"
                                    size={"md"}
                                    autoFocus
                                    selectionColor={colors.primary.accent}
                                    color="white"
                                    value={value}
                                    onChangeText={(text) => setValue(text.trim())}
                                    w={width - 180}
                                    placeholder="Search Tasks..."
                                />
                            </MotiView>
                        )}
                    </AnimatePresence>
                </HStack>
            </MotiView>
        </Box>
    );
}
