import React from "react";
import { Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import TaskItem from "../../../../../Reusables/TaskItem/TaskItem";
import { AnimatePresence } from "moti";
import IdleTask from "../../../../../Reusables/IdleTask/IdleTask";

const RecentTasks = () => {
    let AllTasksCategories = useSelector((state) => state.tasks);

    let AllTasks = [];
    AllTasksCategories.forEach((cat) => {
        cat.tasks.forEach((task) => {
            AllTasks.push({
                ...task,
                categoryColor: cat.categoryColor,
                categoryId: cat.categoryId,
            });
        });
    });
    let AllSorted = AllTasks.sort((a, b) => b.timeStamp - a.timeStamp);
    AllSorted.length = AllSorted.length > 4 ? 3 : AllSorted.length;
    return (
        <VStack space={30}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Recent Tasks
            </Text>

            <AnimatePresence>
                {AllSorted.length ? (
                    AllSorted.map((item, index) => {
                        return (
                            <TaskItem
                                key={item.id}
                                itemId={item.id}
                                task={item.task}
                                completed={item.completed}
                                categoryColor={item.categoryColor}
                                categoryId={item.categoryId}
                                index={index}
                            />
                        );
                    })
                ) : (
                    <VStack justifyContent="flex-start" h={120} p={5} space="2">
                        <IdleTask />
                        <Text textAlign={"center"} fontSize={10}>
                            You have no Tasks, press the "+" button to add a new Task when you have
                            a category
                        </Text>
                    </VStack>
                )}
            </AnimatePresence>
        </VStack>
    );
};

export default RecentTasks;
