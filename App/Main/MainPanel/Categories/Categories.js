import React, { useEffect, useRef, useState } from "react";
import ScreenAnimatePrescence from "../../../Reusables/ScreenAnimatePrescence";
import { Box, Heading, Text, VStack } from "native-base";
import TopBar from "../../../Reusables/TopBar";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import CategoryCardItem from "../../../Reusables/CategoryCardItem/CategoryCardItem";
import SwipableView from "../../../Reusables/SwipableView";
import { DELETE_CATEGORY } from "../../../../redux/tasks/components/task.actions";
import { AnimatePresence } from "moti";
import ListAnimatePrescence from "../../../Reusables/ListAnimatePrescence";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import IdleCategory from "../../../Reusables/IdleCategory";
const Categories = () => {
    const categories = useSelector((state) => state.tasks);
    const dispath = useDispatch();
    const [refState, setRefState] = useState();
    const scrollRef = useRef();
    useEffect(() => {
        setRefState(scrollRef);
    }, []);
    return (
        <Box flex={1}>
            <ScreenPaddingWrapper noFlex>
                <ScreenAnimatePrescence>
                    <VStack space="10">
                        <TopBar back />
                        <VStack space="10">
                            <Heading>Categories</Heading>
                        </VStack>
                    </VStack>
                </ScreenAnimatePrescence>
            </ScreenPaddingWrapper>
            <Box flex={1} pt="10">
                {categories.length ? (
                    <ScrollView
                        ref={scrollRef}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingHorizontal: 20,
                        }}
                    >
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
                                        simultaneousHandlers={refState}
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
                    </ScrollView>
                ) : (
                    <Box justifyContent="flex-start" h={250} p={5}>
                        <IdleCategory />
                        <Text textAlign={"center"} fontSize={11}>
                            You have no Categories, press the "+" button to add a new Category
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Categories;
