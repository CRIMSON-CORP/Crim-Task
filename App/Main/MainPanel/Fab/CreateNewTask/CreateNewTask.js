import { View as MotiView } from "moti";
import PropTypes from "prop-types";
import { Box, Input, Text, useTheme, VStack } from "native-base";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import FabCTA from "../FabCTA";
import KeyboardViewAdjuster from "../../../../Reusables/KeyboardViewAdjuster";
import { createTask, editTask } from "../../../../../redux/tasks/components/task.reducer";

const indicatorTransition = {
    type: "spring",
    damping: 13,
};
function CreateNewTask({ flag }) {
    const EDIT_MODE = flag ? (flag.flag ? true : false) : false;
    const categories = useSelector((state) => state.tasks);

    const [subject, setSubject] = useState(EDIT_MODE ? flag.subject : "");
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
        EDIT_MODE ? categories.findIndex((cat) => cat.categoryId === flag.currentCategoryId) : 0
    );

    const { colors } = useTheme();
    const dispatch = useDispatch();

    const _createTask = useCallback(() => {
        let commonProperties = {
            subject: subject.trim(),
            categoryId: categories[selectedCategoryIndex].categoryId,
        };
        if (EDIT_MODE) {
            dispatch(
                editTask({
                    ...commonProperties,
                    itemId: flag.itemId,
                    currentCategoryId: flag.currentCategoryId,
                })
            );
        } else dispatch(createTask(commonProperties));
    }, [subject, selectedCategoryIndex]);

    const onChangeText = useCallback((text) => setSubject(text));

    useEffect(() => {
        return () => {
            setSubject("");
        };
    }, []);

    const PAGE_TITLE = EDIT_MODE ? "Edit Task" : "Create a new Task";
    const PAGE_CATEGORY_SUBTITLE = EDIT_MODE ? "Move to another Category" : "Select Task Category";
    const CTA_TEXT = EDIT_MODE ? "Edit Task" : "Create New Task";

    return (
        <KeyboardViewAdjuster>
            <VStack w="full" space={35}>
                <VStack w="full">
                    <Box w={"80%"}>
                        <AnimatedText delay={1000}>{PAGE_TITLE}</AnimatedText>
                    </Box>
                </VStack>
                <VStack space="30">
                    <Text fontSize="sm" opacity={0.7}>
                        Subject
                    </Text>
                    <Input
                        px="5"
                        size="xl"
                        isFullWidth
                        color="white"
                        value={subject}
                        variant="underlined"
                        borderBottomColor="white"
                        onChangeText={onChangeText}
                        underlineColorAndroid={"transparent"}
                        selectionColor={colors.primary.accent}
                    />
                </VStack>
                <VStack space="5">
                    <Text fontSize="sm" opacity={0.7}>
                        {PAGE_CATEGORY_SUBTITLE}
                    </Text>
                    <ChooseCategory
                        categories={categories}
                        selectedCategoryIndex={selectedCategoryIndex}
                        setSelectedCategoryIndex={setSelectedCategoryIndex}
                    />
                </VStack>
                <FabCTA title={CTA_TEXT} onClick={subject ? _createTask : null} />
            </VStack>
        </KeyboardViewAdjuster>
    );
}

CreateNewTask.propTypes = {
    flag: PropTypes.object,
};

export default CreateNewTask;

function ChooseCategory({ categories, selectedCategoryIndex, setSelectedCategoryIndex }) {
    const pillContainerRef = useRef();
    const [pillsDimensions, setPillsDimensions] = useState([]);

    const indicatorAnimatedStyle = useMemo(
        () => ({
            width: pillsDimensions[selectedCategoryIndex]?.width || 38,
            height: pillsDimensions[selectedCategoryIndex]?.height || 38,
            left: pillsDimensions[selectedCategoryIndex]?.pageX || 0,
            top: pillsDimensions[selectedCategoryIndex]?.pageY || 0,
        }),
        [pillsDimensions, selectedCategoryIndex]
    );

    useEffect(() => {
        return () => setPillsDimensions([]);
    }, []);

    return (
        <Box px={1} flexWrap="wrap" flexDirection="row" ref={pillContainerRef}>
            <MotiView
                style={styles.selectCategoryIndicator}
                animate={indicatorAnimatedStyle}
                transition={indicatorTransition}
            />
            {categories.map(({ categoryTitle, categoryId }, index) => (
                <Pill
                    index={index}
                    key={categoryId}
                    categoryTitle={categoryTitle}
                    containerRef={pillContainerRef}
                    setPillsDimensions={setPillsDimensions}
                    setSelectedCategoryIndex={setSelectedCategoryIndex}
                />
            ))}
        </Box>
    );
}

ChooseCategory.propTypes = {
    categories: PropTypes.array,
    selectedCategoryIndex: PropTypes.number,
    setSelectedCategoryIndex: PropTypes.func,
};

function Pill({
    index,
    containerRef,
    categoryTitle,
    setPillsDimensions,
    setSelectedCategoryIndex,
}) {
    const pillRef = useRef();

    const setIndex = useCallback(() => setSelectedCategoryIndex(index), [index]);

    useEffect(() => {
        pillRef.current.measureLayout(containerRef.current, (pageX, pageY, width, height) => {
            setPillsDimensions((prev) => [...prev, { width, height, pageX, pageY }]);
        });
    }, []);
    return (
        <AnimatedPressable onPress={setIndex}>
            <MotiView ref={pillRef} style={styles.pillStyles}>
                <Text fontWeight="600" lineHeight={18}>
                    {categoryTitle}
                </Text>
            </MotiView>
        </AnimatedPressable>
    );
}

Pill.propTypes = {
    index: PropTypes.number,
    containerRef: PropTypes.object,
    categoryTitle: PropTypes.string,
    setPillsDimensions: PropTypes.func,
    setSelectedCategoryIndex: PropTypes.func,
};

const styles = StyleSheet.create({
    selectCategoryIndicator: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "white",
        position: "absolute",
    },
    pillStyles: {
        backgroundColor: "#ffffff20",
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 16,
        borderRadius: 15,
        marginBottom: 15,
    },
});
