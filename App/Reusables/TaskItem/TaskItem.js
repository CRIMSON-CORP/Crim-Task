import React from "react";
import { MotiView } from "moti";
import { HStack, Pressable } from "native-base";
import PropTypes from "prop-types";
import { memo } from "react";
import { Layout } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { DELETE_TASK, UPDATE_TASK } from "../../../redux/tasks/components/task.actions";
import { deleteTask, updateTask } from "../../../redux/tasks/components/task.reducer";
import { useFab } from "../../../utils/context";
import AnimatedTaskText from "../AnimatedTaaskText/AnimatedTaskText";
import SwipableView from "../SwipableView";
import AnimatedCheckBox from "./AnimatedCheckBox/";

const TaskItem = ({
    task,
    completed,
    categoryColor,
    categoryId,
    itemId,
    dark,
    simultaneousHandlers,
}) => {
    // const dispath = useDispatch();
    const { setFlag, ToggleOpenFab } = useFab();
    return (
        <MotiView layout={Layout.springify()}>
            <SwipableView
                swipeExe={
                    () =>
                        deleteTask({
                            categoryId,
                            itemId,
                        })
                    // dispath({
                    //     type: DELETE_TASK,
                    //     payload: ,
                    // })
                }
                simultaneousHandlers={simultaneousHandlers}
            >
                <Pressable
                    onLongPress={() => {
                        setFlag({
                            flag: "EDIT_TASK",
                            subject: task,
                            currentCategoryId: categoryId,
                            itemId,
                        });
                        ToggleOpenFab(true);
                    }}
                    onPress={() => {
                        updateTask({
                            categoryId,
                            itemId,
                        });
                        // dispath({
                        //     type: UPDATE_TASK,
                        //     payload: ,
                        // });
                    }}
                    mb={30}
                >
                    <HStack
                        alignItems={"center"}
                        p="5"
                        bg={dark ? "primary.400" : "primary.300"}
                        rounded="15"
                        space="15"
                        shadow="5"
                    >
                        <AnimatedCheckBox completed={completed} color={categoryColor} />
                        <AnimatedTaskText task={task} completed={completed} />
                    </HStack>
                </Pressable>
            </SwipableView>
        </MotiView>
    );
};

TaskItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    categoryColor: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    dark: PropTypes.bool,
};
export default memo(TaskItem);
