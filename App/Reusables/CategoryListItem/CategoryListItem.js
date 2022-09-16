import { useCallback, useMemo } from "react";
import { Box, Pressable, useTheme, VStack } from "native-base";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { SharedElement } from "react-navigation-shared-element";
import { useFab } from "../../../utils/contexts/fabContext";
import { useNavigation } from "../../../utils/contexts/navigationContext";

function CategoryListItem({
    tasks = [],
    categoryTitle = "Grocery",
    categoryColor = "#DB00FF",
    categoryId,
    ...props
}) {
    const taskCount = tasks.length;
    const taskCompletedCount = tasks.filter((item) => item.completed).length;
    let progress = (taskCompletedCount / taskCount) * 100 || 0;
    const { NavigationRef } = useNavigation();

    const {
        colors: { primary },
    } = useTheme();
    const { setFlag, setFabPanelOpen } = useFab();

    const backgroundStyles = useMemo(
        () => ({
            backgroundColor: primary[300],
            ...styles.background,
        }),
        [primary[300]]
    );

    const shadowWidthStyle = useMemo(
        () => ({ width: progress + "%", opacity: progress ? 1 : 0 }),
        [progress]
    );

    const onPress = useCallback(() => {
        NavigationRef.navigate("singleCategory", {
            categoryId,
            taskCount,
            categoryTitle,
        });
    }, []);

    const onLongPress = useCallback(() => {
        setFlag({
            flag: "EDIT_CATEGORY",
            title: categoryTitle,
            color: categoryColor,
            categoryId,
        });
        setFabPanelOpen(true);
    }, []);

    const BACKGROUND_SHARED = `item.${categoryId}.bg`;
    const TASK_SHARED = `item.${categoryId}.tasks`;
    const TITLE_SHARED = `item.${categoryId}.title`;

    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <Box {...props} bg="primary.300" rounded="15" overflow={"hidden"} w="full" h={120}>
                <SharedElement id={BACKGROUND_SHARED} style={StyleSheet.absoluteFillObject}>
                    <View style={backgroundStyles} />
                </SharedElement>
                <VStack p="5" w="full" space={15}>
                    <SharedElement id={TASK_SHARED} style={styles.absolute}>
                        <Text style={styles.taskCount}>{taskCount} Tasks</Text>
                    </SharedElement>
                    <SharedElement id={TITLE_SHARED} style={styles.absolute}>
                        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
                            {categoryTitle}
                        </Text>
                    </SharedElement>
                    <Box bg="gray.600" h={0.5} rounded="full" style={styles.progress}>
                        <Box style={shadowWidthStyle}>
                            <Shadow
                                viewStyle={styles.fwidth}
                                startColor={categoryColor + "35"}
                                finalColor="#ffffff00"
                            >
                                <Box style={styles.fwidthAbsolute} bg={categoryColor} h={0.5} />
                            </Shadow>
                        </Box>
                        <Box style={shadowWidthStyle}>
                            <Shadow
                                viewStyle={styles.fwidth}
                                startColor={categoryColor + "65"}
                                distance={15}
                                finalColor="#ffffff00"
                            >
                                <Box style={styles.fwidthAbsolute} bg={categoryColor} h={0.5} />
                            </Shadow>
                        </Box>
                    </Box>
                </VStack>
            </Box>
        </Pressable>
    );
}
CategoryListItem.propTypes = {
    tasks: PropTypes.array.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    fwidth: PropTypes.bool,
    categoryId: PropTypes.string,
};

const styles = StyleSheet.create({
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
    background: {
        position: "absolute",
        borderRadius: 15,
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
    },
    taskCount: {
        left: 20,
        top: 20,
        opacity: 0.7,
        fontFamily: "Raleway-Medium",
        fontSize: 18,
        position: "absolute",
        color: "white",
    },
    title: {
        left: 20,
        top: 55,
        fontSize: 28,
        fontFamily: "Raleway-Bold",
        lineHeight: 28,
        color: "white",
        position: "absolute",
    },
    progress: {
        top: 95,
        left: 20,
        width: "100%",
        position: "absolute",
    },
});

export default CategoryListItem;
