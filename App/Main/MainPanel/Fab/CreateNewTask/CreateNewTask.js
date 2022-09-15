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
import { createTask } from "../../../../../redux/tasks/components/task.reducer";

const indicatorTransition = {
    type: "spring",
    damping: 13,
};
function CreateNewTask({ flag }) {
    const categories = useSelector((state) => state.tasks);
    const [ActiveCategoryId, setActiveCategoryId] = useState(
        flag
            ? categories.find((cat) => cat.categoryId === flag.currentCategoryId).categoryId
            : categories[0].categoryId
    );
    const [subject, setSubject] = useState(flag ? flag.subject : "");
    const [pillsDimensions, setPillsDimensions] = useState([]);
    const [ActiveIndexIndicator, setActiveIndexIndicator] = useState(
        flag ? categories.findIndex((cat) => cat.id === flag.currentCategoryId).categoryId : 0
    );
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const pillContainerRef = useRef();

    const indicatorAnimatedStyle = useMemo(
        () => ({
            width: pillsDimensions[ActiveIndexIndicator]?.width || 38,
            height: pillsDimensions[ActiveIndexIndicator]?.height || 38,
            left: pillsDimensions[ActiveIndexIndicator]?.pageX || 0,
            top: pillsDimensions[ActiveIndexIndicator]?.pageY || 0,
        }),
        [pillsDimensions, ActiveIndexIndicator]
    );

    const _createTask = useCallback(() => {
        let commonProperties = {
            subject: subject.trim(),
            categoryId: ActiveCategoryId,
        };
        if (flag) {
            dispatch(
                createTask({
                    ...commonProperties,
                    itemId: flag.itemId,
                    currentCategoryId: flag.currentCategoryId,
                })
            );
        }
        dispatch(createTask(commonProperties));
    }, [flag, subject, ActiveCategoryId]);

    useEffect(() => {
        setActiveIndexIndicator(categories.findIndex((cat) => cat.categoryId === ActiveCategoryId));
    }, [ActiveCategoryId]);

    const PAGE_TITLE = flag ? "Edit Task" : "Create a new Task";
    const PAGE_CATEGORY_SUBTITLE = flag ? "Move to another Category" : "Select Task Category";
    const CTA_TEXT = flag ? "Edit Task" : "Create New Task";

    return (
        <KeyboardViewAdjuster>
            <VStack w="full" space={35}>
                <VStack w="full">
                    <Box w={"80%"}>
                        <AnimatedText text={PAGE_TITLE} />
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
                        selectionColor={colors.primary.accent}
                        underlineColorAndroid={"transparent"}
                        onChangeText={(text) => setSubject(text)}
                    />
                </VStack>
                <VStack space="5">
                    <Text fontSize="sm" opacity={0.7}>
                        {PAGE_CATEGORY_SUBTITLE}
                    </Text>
                    <Box px={1} flexWrap="wrap" flexDirection="row" ref={pillContainerRef}>
                        <MotiView
                            style={styles.selectCategoryIndicator}
                            animate={indicatorAnimatedStyle}
                            transition={indicatorTransition}
                        />
                        {categories.map(({ categoryTitle, categoryId }) => (
                            <Pill
                                key={categoryId}
                                categoryId={categoryId}
                                categoryTitle={categoryTitle}
                                setActiveCategoryId={setActiveCategoryId}
                                setPillsDimensions={setPillsDimensions}
                                containerRef={pillContainerRef}
                            />
                        ))}
                    </Box>
                </VStack>
                <FabCTA title={CTA_TEXT} onClick={subject && _createTask} />
            </VStack>
        </KeyboardViewAdjuster>
    );
}

CreateNewTask.propTypes = {
    flag: PropTypes.object,
};

export default CreateNewTask;

function Pill({
    categoryId,
    categoryTitle,
    setActiveCategoryId,
    setPillsDimensions,
    containerRef,
}) {
    const pillRef = useRef();

    useEffect(() => {
        pillRef.current.measureLayout(containerRef.current, (pageX, pageY, width, height) => {
            setPillsDimensions((prev) => [...prev, { width, height, pageX, pageY }]);
        });
    }, []);
    return (
        <AnimatedPressable onPress={() => setActiveCategoryId(categoryId)}>
            <MotiView ref={pillRef} style={styles.pillStyles}>
                <Text fontWeight="600" lineHeight={18}>
                    {categoryTitle}
                </Text>
            </MotiView>
        </AnimatedPressable>
    );
}

Pill.propTypes = {
    categoryId: PropTypes.string,
    categoryTitle: PropTypes.string,
    setActiveCategoryId: PropTypes.string,
    setPillsDimensions: PropTypes.func,
    containerRef: PropTypes.object,
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
