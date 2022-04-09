import { VStack, Box, Pressable, useTheme } from "native-base";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Shadow } from "react-native-shadow-2";
import PropTypes from "prop-types";
import { SharedElement } from "react-navigation-shared-element";
import { View } from "react-native";
import { NavigationContext, useFab } from "../../../utils/context";
const CategoryListItem = ({
    tasks = [],
    categoryTitle = "Grocery",
    categoryColor = "#DB00FF",
    categoryId,
    fwidth,
    ...props
}) => {
    const taskCount = tasks.length;
    const taskCompletedCount = tasks.filter((item) => item.completed).length;
    let progress = (taskCompletedCount / taskCount) * 100 || 0;
    const { NavigationRef } = useContext(NavigationContext);
    const {
        colors: { primary },
    } = useTheme();
    const { setFlag, ToggleOpenFab } = useFab();
    return (
        <Pressable
            onPress={() =>
                NavigationRef.navigate("singleCategory", {
                    categoryId,
                    taskCount,
                    categoryTitle,
                })
            }
            onLongPress={() => {
                setFlag({
                    flag: "EDIT_CATEGORY",
                    title: categoryTitle,
                    color: categoryColor,
                    categoryId,
                });
                ToggleOpenFab(true);
            }}
        >
            <Box {...props} bg="primary.300" rounded="15" overflow={"hidden"} w="full" h={120}>
                <SharedElement id={`item.${categoryId}.bg`} style={StyleSheet.absoluteFillObject}>
                    <View
                        style={[
                            {
                                backgroundColor: primary[300],
                                borderRadius: 15,
                                top: 5,
                                left: 5,
                                bottom: 5,
                                right: 5,
                            },
                            customStyles.absolute,
                        ]}
                    />
                </SharedElement>
                <VStack p="5" w="full" space={15}>
                    <SharedElement id={`item.${categoryId}.tasks`} style={customStyles.absolute}>
                        <Text
                            style={[
                                {
                                    left: 20,
                                    top: 20,
                                    opacity: 0.7,
                                    fontFamily: "Raleway-Medium",
                                    fontSize: 18,
                                },
                                customStyles.absolute,
                                customStyles.textStyles,
                            ]}
                        >
                            {taskCount} Tasks
                        </Text>
                    </SharedElement>
                    <SharedElement id={`item.${categoryId}.title`} style={customStyles.absolute}>
                        <Text
                            style={[
                                {
                                    left: 20,
                                    top: 55,
                                    fontSize: 28,
                                    fontFamily: "Raleway-Bold",
                                    lineHeight: 28,
                                    color: "white",
                                },
                                customStyles.absolute,
                            ]}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                        >
                            {categoryTitle}
                        </Text>
                    </SharedElement>
                    <Box
                        bg="gray.600"
                        h={0.5}
                        rounded="full"
                        style={[
                            {
                                top: 95,
                                left: 20,
                            },
                            customStyles.fwidthAbsolute,
                        ]}
                    >
                        <Box style={{ width: progress + "%", opacity: progress ? 1 : 0 }}>
                            <Shadow
                                viewStyle={customStyles.fwidth}
                                startColor={categoryColor + "35"}
                                finalColor="#ffffff00"
                            >
                                <Box
                                    style={customStyles.fwidthAbsolute}
                                    bg={categoryColor}
                                    h={0.5}
                                />
                            </Shadow>
                        </Box>
                        <Box style={{ width: progress + "%", opacity: progress ? 1 : 0 }}>
                            <Shadow
                                viewStyle={customStyles.fwidth}
                                startColor={categoryColor + "65"}
                                distance={15}
                                finalColor="#ffffff00"
                            >
                                <Box
                                    style={customStyles.fwidthAbsolute}
                                    bg={categoryColor}
                                    h={0.5}
                                />
                            </Shadow>
                        </Box>
                    </Box>
                </VStack>
            </Box>
        </Pressable>
    );
};
CategoryListItem.propTypes = {
    tasks: PropTypes.array.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    fwidth: PropTypes.bool,
};

const customStyles = StyleSheet.create({
    absolute: {
        position: "absolute",
    },
    fwidthAbsolute: {
        width: "100%",
        position: "absolute",
    },
    textStyles: {
        color: "white",
    },
    fwidth: {
        width: "100%",
    },
});

export default CategoryListItem;
