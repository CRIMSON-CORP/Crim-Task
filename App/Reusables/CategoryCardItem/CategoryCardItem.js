import { VStack, Text, Box } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { Shadow } from "react-native-shadow-2";
const { width } = Dimensions.get("window");
const CategoryCardItem = ({
    tasks = [],
    categoryTitle = "Grocery",
    categoryColor = "#DB00FF",
    ...props
}) => {
    const taskCount = tasks.length;
    const taskCompletedCount = tasks.filter((item) => item.completed).length;
    let progress = (taskCompletedCount / taskCount) * 100;
    return (
        <VStack p="5" bg="primary.300" rounded="15" w={width * 0.6} space={15} {...props}>
            <Text opacity={0.7}>{taskCount} Tasks</Text>
            <Text
                fontSize="md"
                fontWeight="bold"
                alignItems={"center"}
                lineHeight={28}
                style={{
                    textAlignVertical: "center",
                }}
            >
                {categoryTitle}
            </Text>
            <Box bg="gray.600" w="full" h={0.5} rounded="full">
                {progress == 0 ? null : (
                    <Shadow
                        viewStyle={{
                            width: `${progress}%`,
                        }}
                        startColor={categoryColor + "35"}
                        finalColor="#ffffff00"
                    >
                        <Box position="absolute" bg={categoryColor} w={"full"} h={0.5} />
                    </Shadow>
                )}
            </Box>
        </VStack>
    );
};

export default CategoryCardItem;
