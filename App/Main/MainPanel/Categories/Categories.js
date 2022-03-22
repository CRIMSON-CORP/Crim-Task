import React from "react";
import ScreenAnimatePrescence from "../../../Reusables/ScreenAnimatePrescence";
import { Heading, VStack } from "native-base";
import TopBar from "../../../Reusables/TopBar";
import { useDispatch, useSelector } from "react-redux";
import CategoryCardItem from "../../../Reusables/CategoryCardItem/CategoryCardItem";
import SwipableView from "../../../Reusables/SwipableView";
import { DELETE_CATEGORY } from "../../../../redux/tasks/components/task.actions";
import { AnimatePresence } from "moti";
import ListAnimatePrescence from "../../../Reusables/ListAnimatePrescence";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
const Categories = () => {
    const categories = useSelector((state) => state.tasks);
    const dispath = useDispatch();
    return (
        <ScreenPaddingWrapper>
            <ScreenAnimatePrescence>
                <VStack space="10">
                    <TopBar back />
                    <VStack space="10">
                        <Heading>Categories</Heading>
                        <AnimatePresence>
                            {categories.map((item) => (
                                <ListAnimatePrescence
                                    key={item.categoryId}
                                    spacing={40}
                                    height={120}
                                >
                                    <SwipableView
                                        swipeExe={() =>
                                            dispath({
                                                type: DELETE_CATEGORY,
                                                payload: { id: item.categoryId },
                                            })
                                        }
                                    >
                                        <CategoryCardItem
                                            categoryColor={item.categoryColor}
                                            categoryTitle={item.categoryTitle}
                                            categoryId={item.categoryId}
                                            tasks={item.tasks}
                                            mr="5"
                                            shadow="7"
                                            fwidth={true}
                                        />
                                    </SwipableView>
                                </ListAnimatePrescence>
                            ))}
                        </AnimatePresence>
                    </VStack>
                </VStack>
            </ScreenAnimatePrescence>
        </ScreenPaddingWrapper>
    );
};

export default Categories;
