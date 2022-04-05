import { Box, Text, VStack, Input } from "native-base";
import { useState, useEffect } from "react";
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CATEGORY_TASK } from "../../../../../redux/tasks/components/task.actions";
import FabCTA from "../FabCTA";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
const AnimatedBox = Animated.createAnimatedComponent(Box);
function CreateNewTask() {
    const state_categories = useSelector((state) => state.tasks);
    const categories = state_categories.map((cat) => ({
        categoryId: cat.categoryId,
        categoryTitle: cat.categoryTitle,
    }));
    const [ActiveCategoryId, setActiveCategoryId] = useState(categories[0].categoryId);
    const [subject, setSubject] = useState("");
    const dispatch = useDispatch();
    return (
        <VStack w="full" space={35}>
            <VStack w="full">
                <Box w={"80%"}>
                    <AnimatedText text="Create a new Task" type="Heading" />
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
                    maxLength={20}
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
                    {categories.map(({ categoryTitle, categoryId }) => (
                        <Pill
                            key={categoryId}
                            categoryId={categoryId}
                            ActiveCategoryId={ActiveCategoryId}
                            categoryTitle={categoryTitle}
                            setActiveCategoryId={setActiveCategoryId}
                        />
                    ))}
                </Box>
            </VStack>
            <FabCTA
                title="Create New Task"
                onClick={
                    subject &&
                    (() =>
                        dispatch({
                            type: CREATE_CATEGORY_TASK,
                            payload: {
                                subject,
                                categoryId: ActiveCategoryId,
                            },
                        }))
                }
            />
        </VStack>
    );
}

export default CreateNewTask;

function Pill({ categoryId, ActiveCategoryId, categoryTitle, setActiveCategoryId }) {
    const ActiveShared = useSharedValue(0);
    const styles = useAnimatedStyle(() => {
        let borderColor = interpolateColor(ActiveShared.value, [0, 1], ["#ff0000", "#ffffff"]);
        return {
            borderColor,
            transform: [{ scale: interpolate(ActiveShared.value, [0, 1], [1, 1.07]) }],
        };
    });
    useEffect(() => {
        if (ActiveCategoryId === categoryId) {
            ActiveShared.value = withSpring(1);
        } else {
            ActiveShared.value = withTiming(0);
        }
    }, [ActiveCategoryId]);

    return (
        <AnimatedPressable onPress={() => setActiveCategoryId(categoryId)}>
            <AnimatedBox
                style={styles}
                rounded={15}
                borderWidth={"2"}
                bg="#ffffff20"
                px="4"
                py="2.5"
                mr="4"
            >
                <Text fontWeight="600" lineHeight={18}>
                    {categoryTitle}
                </Text>
            </AnimatedBox>
        </AnimatedPressable>
    );
}
