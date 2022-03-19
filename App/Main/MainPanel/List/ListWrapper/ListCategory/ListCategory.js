import { Box, FlatList, HStack, Text } from "native-base";
import React from "react";
import { VStack } from "native-base";
import CategoryCardItem from "../../../../../Reusables/CategoryCardItem/CategoryCardItem";
import { useSelector } from "react-redux";

const ListCategory = () => {
    const categories = useSelector((state) => state.tasks);
    return (
        <VStack space={35}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Categories
            </Text>
            <HStack>
                {categories.map((item) => (
                    <CategoryCardItem
                        categoryColor={item.categoryColor}
                        categoryTitle={item.categoryTitle}
                        tasks={item.tasks}
                        key={item.categoryId}
                        mr="5"
                        shadow="7"
                    />
                ))}
            </HStack>
        </VStack>
    );
};

export default ListCategory;
