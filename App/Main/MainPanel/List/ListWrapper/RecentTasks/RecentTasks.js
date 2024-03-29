import { AnimatePresence } from "moti";
import { Image, Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import { MotiView } from "moti";
import { Layout } from "react-native-reanimated";
import { useMemo } from "react";
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

const noTaskImageAnimationConfig = {
    from: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
    exitTransition: {
        delay: 0,
        duration: 200,
    },
    transition: {
        delay: 1000,
        duration: 700,
    },
    style: { position: "absolute", top: 40 },
};

function RecentTasks() {
    let categories = useSelector((state) => state.tasks);

    const recentTasks = useMemo(() => {
        let AllTasks = [];

        categories.forEach((cat) => {
            cat.tasks.forEach((task) => {
                AllTasks.push({
                    ...task,
                    categoryColor: cat.categoryColor,
                    categoryId: cat.categoryId,
                });
            });
        });

        let AllSorted = AllTasks.sort((a, b) => b.timeStamp - a.timeStamp)
            .filter((item) => !item.completed)
            .slice(0, 3);
        return AllSorted;
    }, [categories]);

    return (
        <VStack space={30} position="relative">
            <Text fontWeight={"bold"} opacity={0.7}>
                Recent Tasks
            </Text>
            <AnimatePresence>
                {recentTasks.map((item, index) => {
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
            <AnimatePresence>
                {recentTasks.length === 0 && (
                    <MotiView {...noTaskImageAnimationConfig}>
                        <VStack justifyContent="flex-start" h={120} p={5} space="2">
                            <Image
                                source={IdleTask}
                                resizeMode="contain"
                                h="full"
                                alt="idle Task"
                            />
                            <Text textAlign={"center"} fontSize={10}>
                                {categories.length
                                    ? "You currently do not have any uncompleted Task!"
                                    : 'You have no Tasks, press the "+" button to add a new Task when you have a category'}
                            </Text>
                        </VStack>
                    </MotiView>
                )}
            </AnimatePresence>
        </VStack>
    );
}

export default RecentTasks;
