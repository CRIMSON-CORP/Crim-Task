import { Box, HStack, Input, useTheme } from "native-base";
import Menu from "./TopBarIcons/Menu";
import Search from "./TopBarIcons/Search";
import Bell from "./TopBarIcons/Bell";
import AnimatedPressable from "../AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_SIDE } from "../../../redux/ui/components/ui.actions";
import BackArrow from "./TopBarIcons/BackArrow";
import { SharedElement } from "react-navigation-shared-element";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContext, useSearch } from "../../../utils/context";
import { AnimatePresence, View as MotiView } from "moti";
import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TaskItem from "../TaskItem";
import { debounce } from "../../../utils/utils";
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
    const { NavigationRef } = useContext(NavigationContext);
    const { OpenSearch, setOpenSearch, value, setValue, FindResults } = useSearch();
    useEffect(() => {
        const unsub = NavigationRef.addListener("state", (e) => {
            if (!NavigationRef.getCurrentRoute().name === "search") {
                setOpenSearch(false);
            }
        });
        return unsub;
    }, []);

    return (
        <Box zIndex={999}>
            <HStack justifyContent={"space-between"}>
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
                            FindResults={FindResults}
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
                                            NavigationRef.goBack();
                                            setOpenSearch(false);
                                        }}
                                    >
                                        <AntDesign name="close" size={30} color="white" />
                                    </AnimatedPressable>
                                </MotiView>
                            ) : (
                                <MotiView key={1}>
                                    <AnimatedPressable>
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

function SearchBar({ setOpenSearch, OpenSearch, value, setValue }) {
    const { colors } = useTheme();
    const { NavigationRef } = useContext(NavigationContext);
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
                    <AnimatedPressable
                        onPress={() =>
                            setOpenSearch((prev) => {
                                !prev ? NavigationRef.navigate("search") : NavigationRef.goBack();
                                return !prev;
                            })
                        }
                    >
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
