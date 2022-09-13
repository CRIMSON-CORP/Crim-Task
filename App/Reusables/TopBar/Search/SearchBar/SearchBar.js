import { AnimatePresence, View as MotiView } from "moti";
import { Box, HStack, Input, useTheme } from "native-base";
import { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { NavigationContext } from "../../../../../utils/context";
import { useNavigation } from "../../../../../utils/contexts/navigationContext";
import AnimatedPressable from "../../../AnimatedPressable";
import Search from "../../TopBarIcons/Search";
const { width } = Dimensions.get("screen");
function SearchBar({ setOpenSearch, OpenSearch, value, setValue }) {
    const { colors } = useTheme();
    const [openSearchIcon, setOpenSearchIcon] = useState(true);
    const { NavigationRef } = useNavigation();
    useEffect(() => {
        const unsub = NavigationRef.addListener("state", (e) => {
            let routename = NavigationRef.getCurrentRoute().name;
            setOpenSearchIcon(!["settings", "how_to_use", "notifications"].includes(routename));
        });

        return unsub;
    }, []);
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
                <HStack w="full" alignItems={"center"}>
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
                                    left: -5,
                                    height: 45,
                                    borderRadius: 10,
                                    backgroundColor: colors.primary[200],
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <MotiView
                        animate={{
                            opacity: openSearchIcon ? 1 : 0,
                            scale: openSearchIcon ? 1 : 0.5,
                        }}
                        transition={{ type: "spring", damping: openSearchIcon ? 4 : 10 }}
                        pointerEvents={openSearchIcon ? "auto" : "none"}
                    >
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

export default SearchBar;
