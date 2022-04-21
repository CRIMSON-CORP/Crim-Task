import { AnimatePresence } from "moti";
import { Box, Heading, Image, Text, VStack } from "native-base";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import IdleCategory from "../../../../assets/crim-task/idle/idle_category.png";
import { DELETE_CATEGORY } from "../../../../redux/tasks/components/task.actions";
import CategoryListItem from "../../../Reusables/CategoryListItem";
import ListAnimatePrescence from "../../../Reusables/ListAnimatePrescence";
import SwipableView from "../../../Reusables/SwipableView";
import TopBar from "../../../Reusables/TopBar";
const Categories = () => {
    const categories = useSelector((state) => state.tasks);
    const dispath = useDispatch();
    const scrollRef = useRef();
    return (
        <Box flex={1}>
            <SafeAreaView style={customStyles.flex}>
                <VStack space="16" p="5">
                    <TopBar back />
                    <VStack space="10">
                        <Heading>Categories</Heading>
                    </VStack>
                </VStack>
                <Box pt="10" flex={1}>
                    {categories.length ? (
                        <ScrollView
                            ref={scrollRef}
                            contentContainerStyle={{
                                ...customStyles.flex,
                                paddingHorizontal: 20,
                            }}
                            showsVerticalScrollIndicator={false}
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
                                            simultaneousHandlers={scrollRef}
                                        >
                                            <CategoryListItem
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
                            <Image
                                source={IdleCategory}
                                resizeMode="contain"
                                h="full"
                                alt="idle category"
                            />
                            <Text textAlign={"center"} fontSize={11}>
                                You have no Categories, press the "+" button to add a new Category
                            </Text>
                        </Box>
                    )}
                </Box>
            </SafeAreaView>
        </Box>
    );
};

const customStyles = StyleSheet.create({
    flex: {
        flexGrow: 1,
    },
});

export default Categories;
