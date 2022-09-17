import { AnimatePresence } from "moti";
import { Image, Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import { MotiView } from "moti";
import { Layout } from "react-native-reanimated";
import IdleTask from "../../../../../../assets/crim-task/idle/idle_task.png";
import TaskItem from "../../../../../Reusables/TaskItem/TaskItem";

const AnimationConfig = {
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.5,
    },
    layout: Layout.springify(),
};

function RecentTasks() {
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

    let AllSorted = AllTasks.sort((a, b) => b.timeStamp - a.timeStamp)
        .slice(0, 3)
        .filter((item) => !item.completed);

    return (
        <VStack space={30}>
            <Text fontWeight={"bold"} opacity={0.7}>
                Recent Tasks
            </Text>

            <AnimatePresence>
                {AllSorted.length ? (
                    <AnimatePresence>
                        {AllSorted.map((item, index) => {
                            return (
                                <MotiView key={item.id} {...AnimationConfig}>
                                    <TaskItem
                                        itemId={item.id}
                                        task={item.task}
                                        completed={item.completed}
                                        categoryColor={item.categoryColor}
                                        categoryId={item.categoryId}
                                        index={index}
                                    />
                                </MotiView>
                            );
                        })}
                    </AnimatePresence>
                ) : (
                    <VStack justifyContent="flex-start" h={120} p={5} space="2">
                        <Image source={IdleTask} resizeMode="contain" h="full" alt="idle Task" />
                        <Text textAlign={"center"} fontSize={10}>
                            {AllTasksCategories.length
                                ? 'You have no Tasks, press the "+" button to add a new Task when you have a category'
                                : "You currently do not have any uncompleted Task!"}
                        </Text>
                    </VStack>
                )}
            </AnimatePresence>
        </VStack>
    );
}

export default RecentTasks;
