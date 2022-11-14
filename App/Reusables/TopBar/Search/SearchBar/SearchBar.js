import PropTypes from "prop-types";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, HStack, Input, useTheme } from "native-base";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "../../../../../utils/contexts/navigationContext";
import AnimatedPressable from "../../../AnimatedPressable";
import Search from "../../TopBarIcons/Search";

const { width } = Dimensions.get("screen");
const transition = { type: "timing", duration: 500 };
function SearchBar({ setOpenSearch, OpenSearch, value, setValue }) {
    const [openSearchIcon, setOpenSearchIcon] = useState(true);

    const { colors } = useTheme();
    const { NavigationRef } = useNavigation();

    const searchBarContainerProps = useMemo(
        () => ({
            animate: {
                width: OpenSearch ? width - 140 : 30,
            },
            transition,
        }),
        [OpenSearch]
    );
    const searchBarBgProps = useMemo(
        () => ({
            from: {
                width: 30,
            },
            animate: {
                width: width - 140,
            },
            exit: {
                width: 30,
            },
            transition,
            style: {
                ...styles.searchBg,
                backgroundColor: colors.primary[200],
            },
        }),
        []
    );

    const searchIconProps = useMemo(
        () => ({
            animate: {
                opacity: openSearchIcon ? 1 : 0,
                scale: openSearchIcon ? 1 : 0.5,
            },
            transition: { type: "spring", damping: openSearchIcon ? 4 : 10 },
            pointerEvents: openSearchIcon ? "auto" : "none",
        }),
        [openSearchIcon]
    );

    const onChangeText = useCallback((text) => setValue(text), []);

    useEffect(() => {
        const unsub = NavigationRef.addListener("state", () => {
            let routename = NavigationRef.getCurrentRoute().name;
            setOpenSearchIcon(!["settings", "how_to_use", "notifications"].includes(routename));
        });

        return () => {
            unsub();
            setOpenSearchIcon(true);
        };
    }, []);
    return (
        <Box zIndex={999}>
            <MotiView {...searchBarContainerProps}>
                <HStack w="full" alignItems={"center"}>
                    <AnimatePresence>
                        {OpenSearch && <MotiView {...searchBarBgProps} />}
                    </AnimatePresence>
                    <MotiView {...searchIconProps}>
                        <AnimatedPressable onPress={() => setOpenSearch((prev) => !prev)}>
                            <Search />
                        </AnimatedPressable>
                    </MotiView>
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
                                    onChangeText={onChangeText}
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

SearchBar.propTypes = {
    setOpenSearch: PropTypes.func,
    OpenSearch: PropTypes.bool,
    value: PropTypes.string,
    setValue: PropTypes.func,
};

export default SearchBar;

const styles = StyleSheet.create({
    searchBg: {
        position: "absolute",
        left: -5,
        height: 45,
        borderRadius: 10,
    },
});
