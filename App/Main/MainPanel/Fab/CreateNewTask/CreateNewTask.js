import { Box, Text, VStack, Input } from "native-base";
import { createContext, useEffect, useRef, useState } from "react";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CATEGORY_TASK } from "../../../../../redux/tasks/components/task.actions";
import FabCTA from "../FabCTA";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import { View as MotiView } from "moti";
import Animated from "react-native-reanimated";
import { Dimensions } from "react-native";
const { height } = Dimensions.get("screen");
function CreateNewTask() {
    const state_categories = useSelector((state) => state.tasks);
    const categories = state_categories.map((cat) => ({
        categoryId: cat.categoryId,
        categoryTitle: cat.categoryTitle,
    }));
    const [ActiveCategoryId, setActiveCategoryId] = useState(categories[0].categoryId);
    const [subject, setSubject] = useState("");
    const [pillsDimensions, setPillsDimensions] = useState([]);
    const [ActiveIndexIndicator, setActiveIndexIndicator] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setActiveIndexIndicator(categories.findIndex((cat) => cat.categoryId === ActiveCategoryId));
    }, [ActiveCategoryId]);
    return (
        <VStack w="full" space={35}>
            <VStack w="full">
                <Box w={"80%"}>
                    <AnimatedText text="Create a new Task" />
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
                    selectionColor="white"
                    borderBottomColor="white"
                    underlineColorAndroid={"transparent"}
                    maxLength={35}
                    numberOfLines={1}
                    px="5"
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
                />
            </VStack>
            <VStack space="5">
                <Text fontSize="sm" opacity={0.7}>
                    Task Category
                </Text>
                <Box px={1} flexWrap="wrap" flexDirection="row">
                    <MotiView
                        style={{
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: "white",
                            position: "absolute",
                        }}
                        animate={{
                            width: pillsDimensions[ActiveIndexIndicator]?.width || 50,
                            height: pillsDimensions[ActiveIndexIndicator]?.height || 50,
                            left: pillsDimensions[ActiveIndexIndicator]?.pageX
                                ? pillsDimensions[ActiveIndexIndicator].pageX - 20
                                : 0,
                            top: pillsDimensions[ActiveIndexIndicator]?.pageY
                                ? pillsDimensions[ActiveIndexIndicator].pageY - 663.5
                                : 0,
                        }}
                        transition={{
                            type: "spring",
                            damping: 15,
                        }}
                    />
                    {categories.map(({ categoryTitle, categoryId }) => (
                        <Pill
                            key={categoryId}
                            categoryId={categoryId}
                            categoryTitle={categoryTitle}
                            setActiveCategoryId={setActiveCategoryId}
                            setPillsDimensions={setPillsDimensions}
                        />
                    ))}
                </Box>
            </VStack>
            <FabCTA
                title="Create New Task"
                onClick={
                    subject &&
                    (() => {
                        dispatch({
                            type: CREATE_CATEGORY_TASK,
                            payload: {
                                subject: subject.trim(),
                                categoryId: ActiveCategoryId,
                            },
                        });
                    })
                }
            />
        </VStack>
    );
}

export default CreateNewTask;

function Pill({ categoryId, categoryTitle, setActiveCategoryId, setPillsDimensions }) {
    const pillRef = useRef();

    useEffect(() => {
        pillRef.current.measure((_, __, width, height, pageX, pageY) => {
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
