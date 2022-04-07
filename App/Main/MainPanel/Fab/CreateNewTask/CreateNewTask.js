import { Box, Text, VStack, Input } from "native-base";
import { useState } from "react";
import AnimatedPressable from "../../../../Reusables/AnimatedPressable";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_CATEGORY_TASK } from "../../../../../redux/tasks/components/task.actions";
import FabCTA from "../FabCTA";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import { View as MotiView } from "moti";
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
                                subject: subject.trim(),
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
    return (
        <AnimatedPressable onPress={() => setActiveCategoryId(categoryId)}>
            <MotiView
                style={{
                    borderRadius: 15,
                    borderWidth: 2,
                    backgroundColor: "#ffffff20",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    marginRight: 16,
                    borderColor: ActiveCategoryId === categoryId ? "white" : "transparent",
                }}
            >
                <Text fontWeight="600" lineHeight={18}>
                    {categoryTitle}
                </Text>
            </MotiView>
        </AnimatedPressable>
    );
}
