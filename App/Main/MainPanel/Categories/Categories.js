import { AnimatePresence, View as MotiView } from "moti";
import { Box, Image, Text, VStack } from "native-base";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import IdleCategory from "../../../../assets/crim-task/idle/idle_category.png";
import CategoryListItem from "../../../Reusables/CategoryListItem";
import SwipableView from "../../../Reusables/SwipableView";
import TopBar from "../../../Reusables/TopBar";
import { Layout } from "react-native-reanimated";
import { useCallback } from "react";
import { deleteCategory } from "../../../../redux/tasks/components/task.reducer";
import AnimatedText from "../../../Reusables/AnimatedText/AnimatedText";

function Categories() {
    const categories = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const swipetoDelete = useCallback((id) => dispatch(deleteCategory(id)), []);
    return (
        <Box flex={1}>
            <SafeAreaView style={styles.flex}>
                <VStack space="16" p="5">
                    <TopBar back />
                    <VStack space="10">
                        <AnimatedText delay={600} stagger={50}>
                            Categories
                        </AnimatedText>
                    </VStack>
                </VStack>
                <Box pt="10" flex={1}>
                    {categories.length ? (
                        <ScrollView
                            ref={scrollRef}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.ScrollViewContainerStyles}
                        >
                            <AnimatePresence>
                                {categories.map((item) => (
                                    <MotiView
                                        key={item.categoryId}
                                        layout={Layout.springify()}
                                        style={styles.categoryCardMotiWrapperStyle}
                                    >
                                        <SwipableView
                                            simultaneousHandlers={scrollRef}
                                            swipeExe={() => swipetoDelete(item.categoryId)}
                                        >
                                            <CategoryListItem
                                                mr="5"
                                                shadow="7"
                                                fwidth={true}
                                                tasks={item.tasks}
                                                categoryId={item.categoryId}
                                                categoryColor={item.categoryColor}
                                                categoryTitle={item.categoryTitle}
                                            />
                                        </SwipableView>
                                    </MotiView>
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
}

const styles = StyleSheet.create({
    flex: {
        flexGrow: 1,
    },
    ScrollViewContainerStyles: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    categoryCardMotiWrapperStyle: {
        marginBottom: 40,
    },
});

export default Categories;
