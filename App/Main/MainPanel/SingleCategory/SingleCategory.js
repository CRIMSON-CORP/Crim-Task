import { AnimatePresence, View as MotiView } from "moti";
import { Box, Image, useTheme, VStack, Text } from "native-base";
import { useRef } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { useSelector } from "react-redux";
import TaskItem from "../../../Reusables/TaskItem/TaskItem";
import TopBar from "../../../Reusables/TopBar";
import IdleTask from "../../../../assets/crim-task/idle/idle_task.png";

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
            <Box p="5" style={{ paddingTop: StatusBar.currentHeight + 20 }}>
                <VStack space="10">
                    <TopBar back />
                    <VStack>
                        <SharedElement
                            id={`item.${categoryId}.title`}
                            style={customStyles.absolute}
                        >
                            <Text
                                style={[
                                    {
                                        top: 0,
                                        fontSize: 40,
                                        lineHeight: 40,
                                    },
                                    customStyles.absolute,
                                    customStyles.textStyles,
                                ]}
                            >
                                {categoryTitle}
                            </Text>
                        </SharedElement>
                        <SharedElement
                            id={`item.${categoryId}.tasks`}
                            style={customStyles.absolute}
                        >
                            <Text
                                style={[
                                    {
                                        top: 60,
                                        opacity: 0.7,
                                        fontSize: 18,
                                    },
                                    customStyles.absolute,
                                    customStyles.textStyles,
                                ]}
                            >
                                {taskCount} Tasks
                            </Text>
                        </SharedElement>
                    </VStack>
                </VStack>
            </Box>
            <Box w="full" style={{ marginTop: 100 }} flex={1}>
                {tasks.length ? (
                    <ScrollView
                        contentContainerStyle={{
                            padding: 20,
                            flexGrow: 1,
                        }}
                        ref={ScrollRef}
                        showsVerticalScrollIndicator={false}
                    >
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
                                        simultaneousHandlers={ScrollRef}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </ScrollView>
                ) : (
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1500 }}
                    >
                        <VStack justifyContent="flex-start" h={160} p={5} space="2">
                            <Image
                                source={IdleTask}
                                resizeMode="contain"
                                h="full"
                                alt="idle Task"
                            />
                            <Text textAlign={"center"} fontSize={10}>
                                You have no Tasks, press the "+" button to add a new Task
                            </Text>
                        </VStack>
                    </MotiView>
                )}
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
const customStyles = StyleSheet.create({
    textStyles: {
        textAlignVertical: "center",
        left: 0,
        color: "white",
        fontFamily: "Raleway-Bold",
    },
    absolute: {
        position: "absolute",
    },
});

export default SingleCategory;
