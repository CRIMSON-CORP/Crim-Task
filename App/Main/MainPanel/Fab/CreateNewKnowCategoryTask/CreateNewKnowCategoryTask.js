import { Box, Input, Text, useTheme, VStack } from "native-base";
import { useContext, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../../../redux/tasks/components/task.reducer";
import { NavigationContext } from "../../../../../utils/context";
import AnimatedText from "../../../../Reusables/AnimatedText/AnimatedText";
import KeyboardViewAdjuster from "../../../../Reusables/KeyboardViewAdjuster/KeyboardViewAdjuster";

import FabCTA from "../FabCTA";
function CreateNewKnowCategoryTask() {
    const { NavigationRef } = useContext(NavigationContext);
    const [subject, setSubject] = useState("");

    const { colors } = useTheme();
    const dispatch = useDispatch();
    const currentCategoryId = NavigationRef.getCurrentRoute().params.categoryId;

    const _createTask = useCallback(() => {
        if (subject) {
            dispatch(
                createTask({
                    subject: subject.trim(),
                    categoryId: currentCategoryId,
                })
            );
        }
    }, []);

    return (
        <KeyboardViewAdjuster>
            <VStack w="full" space={35}>
                <VStack w="full">
                    <Box w={"80%"}>
                        <AnimatedText delay={1000}>Create a new Task</AnimatedText>
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
                        underlineColorAndroid={"transparent"}
                        selectionColor={colors.primary.accent}
                        onChangeText={(text) => setSubject(text)}
                    />
                </VStack>
                <FabCTA title="Create New Task" onClick={subject ? _createTask : null} />
            </VStack>
        </KeyboardViewAdjuster>
    );
}

export default CreateNewKnowCategoryTask;
