import { AnimatePresence, View as MotiView } from "moti";
import { Box, HStack, Input, useTheme } from "native-base";
import AnimatedPressable from "../../../AnimatedPressable";
import Search from "../../TopBarIcons/Search";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
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

export default SearchBar;
