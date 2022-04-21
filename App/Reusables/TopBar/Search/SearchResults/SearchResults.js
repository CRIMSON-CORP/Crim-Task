import { AnimatePresence, View as MotiView } from "moti";
import { Box, Image, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, StatusBar } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useFab } from "../../../../../utils/context";
import { debounce } from "../../../../../utils/utils";
import TaskItem from "../../../TaskItem";
import NothingFound from "./SearchResultImages/no_items_found.png";
import Waiting from "./SearchResultImages/waiting_search.png";

const { width, height } = Dimensions.get("screen");
const AnimatedBox = Animated.createAnimatedComponent(Box);
function SearchResults({ value, OpenSearch }) {
    const [results, setResults] = useState([]);
    const categories = useSelector((state) => state.tasks);
    const ContentShared = useSharedValue(0);
    const { setShowFab } = useFab();
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
    const contentStyles = useAnimatedStyle(() => ({
        opacity: ContentShared.value,
        zIndex: 998,
        transform: [{ translateY: interpolate(ContentShared.value, [0, 1], [50, 0]) }],
    }));
    useEffect(() => {
        if (value.length > 2) debounce(FindResults(), 1000);
        else setResults([]);
    }, [value, categories]);

    useEffect(() => {
        if (OpenSearch) {
            ContentShared.value = withDelay(500, withTiming(1));
            setShowFab(false);
        } else {
            ContentShared.value = withTiming(0);
            setShowFab(true);
        }
    }, [OpenSearch]);

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
    const fullScreen = {
        width,
        height,
        left: -20,
        top: -StatusBar.currentHeight - 20,
    };
    return (
        <AnimatedBox style={contentStyles}>
            {OpenSearch && (
                <Box style={fullScreen}>
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
                                    <VStack
                                        alignItems="center"
                                        justifyContent="flex-start"
                                        space="5"
                                    >
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
                                    <VStack
                                        alignItems="center"
                                        justifyContent="flex-start"
                                        space="5"
                                    >
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
                </Box>
            )}
        </AnimatedBox>
    );
}

SearchResults.propTypes = {
    value: PropTypes.string,
    OpenSearch: PropTypes.bool,
};
export default SearchResults;
