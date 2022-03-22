import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Box, useTheme, VStack } from "native-base";
import { SharedElement } from "react-navigation-shared-element";
import ScreenPaddingWrapper from "../../../Reusables/ScreenPaddingWrapper";
import TopBar from "../../../Reusables/TopBar";
import { useSelector } from "react-redux";
import { AnimatePresence } from "moti";
import TaskItem from "../../../Reusables/TaskItem/TaskItem";
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
    return (
        <Box style={StyleSheet.absoluteFillObject}>
            <ScreenPaddingWrapper>
                <SharedElement id={`item.${categoryId}.bg`} style={StyleSheet.absoluteFillObject}>
                    <View
                        style={[{ backgroundColor: primary[300] }, StyleSheet.absoluteFillObject]}
                    />
                </SharedElement>
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

                        <Box position="absolute" w="full" style={{ top: 123 }}>
                            <AnimatePresence>
                                {tasks.map((item, index) => {
                                    return (
                                        <TaskItem
                                            key={item.id}
                                            itemId={item.id}
                                            task={item.task}
                                            completed={item.completed}
                                            categoryColor={item.categoryColor}
                                            categoryId={item.categoryId}
                                            index={index}
                                            dark
                                        />
                                    );
                                })}
                            </AnimatePresence>
                        </Box>
                    </VStack>
                </VStack>
            </ScreenPaddingWrapper>
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
