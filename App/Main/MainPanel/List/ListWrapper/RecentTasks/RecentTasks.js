import React from "react";
import { Text, VStack } from "native-base";
import { useSelector } from "react-redux";

const RecentTasks = () => {
    const AllTasksCategories = useSelector((state) => state.tasks);
    const AllTasks = [];
    AllTasksCategories.forEach((cat) => {
        AllTasks.push(...cat.tasks);
    });
    const AllSorted = AllTasks.sort((a, b) => b.timeStamp - a.timeStamp);
    return (
        <VStack space={35}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Recent Tasks
            </Text>
            {/* {AllSorted.map((item) => {
                return <Text>{item.task}</Text>;
            })} */}
        </VStack>
    );
};

export default RecentTasks;
