import { Box, Input, Text, useTheme, VStack } from "native-base";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_CATEGORY_TASK } from "../../../../../redux/tasks/components/task.actions";
import { NavigationContext } from "../../../../../utils/context";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import FabCTA from "../FabCTA";
function CreateNewKnowCategoryTask() {
    const { NavigationRef } = useContext(NavigationContext);
    const currentCategoryId = NavigationRef.getCurrentRoute().params.categoryId;
    const [subject, setSubject] = useState("");
    const dispatch = useDispatch();
    const { colors } = useTheme();
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
                    selectionColor={colors.primary.accent}
                    borderBottomColor="white"
                    underlineColorAndroid={"transparent"}
                    maxLength={35}
                    numberOfLines={1}
                    px="5"
                    value={subject}
                    onChangeText={(text) => setSubject(text)}
                />
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
                                categoryId: currentCategoryId,
                            },
                        }))
                }
            />
        </VStack>
    );
}

export default CreateNewKnowCategoryTask;
