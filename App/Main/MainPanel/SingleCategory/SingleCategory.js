import { AnimatePresence, View as MotiView } from "moti";
import { Box, useTheme, VStack } from "native-base";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Easing } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { useSelector } from "react-redux";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import TaskItem from "../../../Reusables/TaskItem/TaskItem";
import TopBar from "../../../Reusables/TopBar";
const SingleCategory = ({ route }) => {
    const { categoryId, categoryTitle } = route.params;
    const categories = useSelector((state) => state.tasks);
    const selectedCategory = categories.find((cat) => cat.categoryId === categoryId);
    let tasks = selectedCategory && (selectedCategory.tasks || []);
    const taskCount = tasks.length;
    tasks = tasks.map((t) => ({ ...t, categoryColor: selectedCategory.categoryColor, categoryId }));
    tasks = tasks.sort((a, b) => b.timeStamp - a.timeStamp);
    const {
        colors: { primary },
    } = useTheme();
    const ScrollRef = useRef(null);
    return (
        <Box style={StyleSheet.absoluteFillObject}>
            <SharedElement id={`item.${categoryId}.bg`} style={StyleSheet.absoluteFillObject}>
                <View style={[{ backgroundColor: primary[300] }, StyleSheet.absoluteFillObject]} />
            </SharedElement>
            <ScreenPaddingWrapper noFlex>
                <VStack space="10">
                    <TopBar back />
                    <VStack>
                        <SharedElement
                            id={`item.${categoryId}.title`}
                            style={{
                                position: "absolute",
                            }}
                        >
                            <Text
                                style={{
                                    textAlignVertical: "center",
                                    left: 0,
                                    top: 0,
                                    position: "absolute",
                                    fontSize: 40,
                                    fontFamily: "Raleway-Bold",
                                    lineHeight: 40,
                                    color: "white",
                                }}
                            >
                                {categoryTitle}
                            </Text>
                        </SharedElement>
                        <SharedElement
                            id={`item.${categoryId}.tasks`}
                            style={{
                                position: "absolute",
                            }}
                        >
                            <Text
                                style={{
                                    textAlignVertical: "center",
                                    left: 0,
                                    top: 60,
                                    color: "white",
                                    opacity: 0.7,
                                    position: "absolute",
                                    fontFamily: "Raleway-Bold",
                                    fontSize: 18,
                                }}
                            >
                                {taskCount} Tasks
                            </Text>
                        </SharedElement>
                    </VStack>
                </VStack>
            </ScreenPaddingWrapper>
            <Box w="full" style={{ marginTop: 100 }} flex={1}>
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        flexGrow: 1,
                    }}
                    ref={ScrollRef}
                >
                    <AnimatePresence>
                        {tasks.map((item, index) => {
                            return (
                                <MotiView
                                    from={{
                                        transform: [{ translateY: 400 }],
                                        opacity: 0,
                                    }}
                                    transition={{
                                        transform: {
                                            delay: 700 + index * 100,
                                            type: "timing",
                                            duration: 700,
                                            easing: Easing.out(Easing.quad),
                                        },
                                        opacity: {
                                            delay: 900,
                                            duration: 100,
                                        },
                                    }}
                                    animate={{
                                        transform: [{ translateY: 0 }],
                                        opacity: 1,
                                    }}
                                    key={item.id}
                                >
                                    <TaskItem
                                        key={item.id}
                                        itemId={item.id}
                                        task={item.task}
                                        completed={item.completed}
                                        categoryColor={item.categoryColor}
                                        categoryId={item.categoryId}
                                        index={index}
                                        dark
                                        simultaneousHandlers={ScrollRef}
                                    />
                                </MotiView>
                            );
                        })}
                    </AnimatePresence>
                </ScrollView>
            </Box>
        </Box>
    );
};

SingleCategory.sharedElements = ({ route }) => {
    const { categoryId } = route.params;
    return [
        { id: `item.${categoryId}.bg`, resize: "clip" },
        { id: `item.${categoryId}.tasks` },
        { id: `item.${categoryId}.title` },
        { id: "item.menu", animation: "fade" },
        { id: "item.back", animation: "fade" },
        { id: "item.search" },
        { id: "item.bell" },
    ];
};

export default SingleCategory;
