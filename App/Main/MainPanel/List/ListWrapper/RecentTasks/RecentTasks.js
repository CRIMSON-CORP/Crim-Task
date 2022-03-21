import React from "react";
import { Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import TaskItem from "../../../../../Reusables/TaskItem/TaskItem";
import { AnimatePresence } from "moti";

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
    AllSorted.length = 3;
    return (
        <VStack space={30}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Recent Tasks
            </Text>
            <AnimatePresence>
                {AllSorted.map((item, index) => {
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
                })}
            </AnimatePresence>
        </VStack>
    );
};

export default RecentTasks;
