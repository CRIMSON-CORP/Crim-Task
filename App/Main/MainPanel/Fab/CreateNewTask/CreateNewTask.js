import { View as MotiView } from "moti";
import { Box, Input, Text, useTheme, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CREATE_CATEGORY_TASK,
    EDIT_TASK,
} from "../../../../../redux/tasks/components/task.actions";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import FabCTA from "../FabCTA";
function CreateNewTask({ flag }) {
    const state_categories = useSelector((state) => state.tasks);
    const categories = state_categories.map((cat) => ({
        categoryId: cat.categoryId,
        categoryTitle: cat.categoryTitle,
    }));
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
    useEffect(() => {
        setActiveIndexIndicator(categories.findIndex((cat) => cat.categoryId === ActiveCategoryId));
    }, [ActiveCategoryId]);
    return (
        <VStack w="full" space={35}>
            <VStack w="full">
                <Box w={"80%"}>
                    <AnimatedText text={`${flag ? "Edit Task" : "Create a new Task"}`} />
                </Box>
            </VStack>
            <VStack space="30">
                <Text fontSize="sm" opacity={0.7}>
                    Subject
                </Text>
                <Input
                    size="xl"
                    variant="underlined"
                    color="white"
                    isFullWidth
                    selectionColor={colors.primary.accent}
                    borderBottomColor="white"
                    underlineColorAndroid={"transparent"}
                    px="5"
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
                />
            </VStack>
            <VStack space="5">
                <Text fontSize="sm" opacity={0.7}>
                    {flag ? "Move to another Category" : "Select Task Category"}
                </Text>
                <Box px={1} flexWrap="wrap" flexDirection="row" ref={pillContainerRef}>
                    <MotiView
                        style={{
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: "white",
                            position: "absolute",
                        }}
                        animate={{
                            width: pillsDimensions[ActiveIndexIndicator]?.width || 38,
                            height: pillsDimensions[ActiveIndexIndicator]?.height || 38,
                            left: pillsDimensions[ActiveIndexIndicator]?.pageX || 0,
                            top: pillsDimensions[ActiveIndexIndicator]?.pageY || 0,
                        }}
                        transition={{
                            type: "spring",
                            damping: 13,
                        }}
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
            <FabCTA
                title={`${flag ? "Edit Task" : "Create New Task"}`}
                onClick={
                    subject &&
                    (() => {
                        dispatch({
                            type: flag ? EDIT_TASK : CREATE_CATEGORY_TASK,
                            payload: {
                                subject: subject.trim(),
                                categoryId: ActiveCategoryId,
                                ...(flag && {
                                    itemId: flag.itemId,
                                    currentCategoryId: flag.currentCategoryId,
                                }),
                            },
                        });
                    })
                }
            />
        </VStack>
    );
}

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
            <MotiView
                style={{
                    backgroundColor: "#ffffff20",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    marginRight: 16,
                    borderRadius: 15,
                    marginBottom: 15,
                }}
                ref={pillRef}
            >
                <Text fontWeight="600" lineHeight={18}>
                    {categoryTitle}
                </Text>
            </MotiView>
        </AnimatedPressable>
    );
}
