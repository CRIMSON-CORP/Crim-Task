import React from "react";
import ScreenAnimatePrescence from "../../../Reusables/ScreenAnimatePrescence";
import { Heading, VStack } from "native-base";
import TopBar from "../../../Reusables/TopBar";
import { useSelector } from "react-redux";
import CategoryCardItem from "../../../Reusables/CategoryCardItem/CategoryCardItem";

const Categories = () => {
    const categories = useSelector((state) => state.tasks);
    return (
        <ScreenAnimatePrescence>
            <VStack space="10">
                <TopBar back />
                <VStack space="10">
                    <Heading>Categories</Heading>
                    {categories.map((item) => (
                        <CategoryCardItem
                            categoryColor={item.categoryColor}
                            categoryTitle={item.categoryTitle}
                            tasks={item.tasks}
                            key={item.categoryId}
                            mr="5"
                            shadow="7"
                            fwidth={true}
                        />
                    ))}
                </VStack>
            </VStack>
        </ScreenAnimatePrescence>
    );
};

export default Categories;
