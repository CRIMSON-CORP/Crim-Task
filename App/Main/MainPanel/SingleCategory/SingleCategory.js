import PropTypes from "prop-types";
import { AnimatePresence, View as MotiView } from "moti";
import { Box, Image, Text, useTheme, VStack } from "native-base";
import { useRef } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
import { useSelector } from "react-redux";
import IdleTask from "../../../../assets/crim-task/idle/idle_task.png";
import { TopBarSharedElements } from "../../../../utils/utils";
import TaskItem from "../../../Reusables/TaskItem/TaskItem";
import TopBar from "../../../Reusables/TopBar";

function SingleCategory({ route }) {
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
            <Box p="5" style={styles.boxContainer}>
                <VStack space="16">
                    <TopBar back />
                    <VStack>
                        <SharedElement id={`item.${categoryId}.title`} style={styles.absolute}>
                            <Text style={[styles.title, styles.absolute, styles.textStyles]}>
                                {categoryTitle}
                            </Text>
                        </SharedElement>
                        <SharedElement id={`item.${categoryId}.tasks`} style={styles.absolute}>
                            <Text style={[styles.subTitle, styles.absolute, styles.textStyles]}>
                                {taskCount} Tasks
                            </Text>
                        </SharedElement>
                    </VStack>
                </VStack>
            </Box>
            <Box w="full" style={styles.listContainer} flex={1}>
                {tasks.length ? (
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
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
}

SingleCategory.propTypes = {
    route: PropTypes.object,
};

SingleCategory.sharedElements = ({ route }) => {
    const { categoryId } = route.params;
    return [
        { id: `item.${categoryId}.bg`, resize: "clip" },
        { id: `item.${categoryId}.tasks` },
        { id: `item.${categoryId}.title` },
        ...TopBarSharedElements,
    ];
};
const styles = StyleSheet.create({
    boxContainer: {
        paddingTop: StatusBar.currentHeight + 20,
    },
    textStyles: {
        textAlignVertical: "center",
        left: 0,
        color: "white",
        fontFamily: "Raleway-Bold",
    },
    absolute: {
        position: "absolute",
    },
    title: {
        top: 0,
        fontSize: 40,
        lineHeight: 40,
    },
    subTitle: {
        top: 60,
        opacity: 0.7,
        fontSize: 18,
    },
    listContainer: {
        marginTop: 100,
    },
    scrollView: {
        padding: 20,
        flexGrow: 1,
    },
});

export default SingleCategory;
