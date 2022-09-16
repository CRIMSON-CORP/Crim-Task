import { MotiView } from "moti";
import { HStack, Pressable } from "native-base";
import PropTypes from "prop-types";
import { memo, useCallback, useMemo } from "react";
import { Layout } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../../redux/tasks/components/task.reducer";
import { useFab } from "../../../utils/contexts/fabContext";
import AnimatedTaskText from "../AnimatedTaskText";
import SwipableView from "../SwipableView";
import AnimatedCheckBox from "./AnimatedCheckBox/";

function TaskItem({
    task,
    completed,
    categoryColor,
    categoryId,
    itemId,
    dark,
    simultaneousHandlers,
}) {
    const dispatch = useDispatch();
    const { setFlag, setFabPanelOpen } = useFab();

    const _deleteTask = useCallback(() => {
        dispatch(
            deleteTask({
                categoryId,
                itemId,
            })
        );
    }, [categoryId, itemId]);

    const openEditScreen = useCallback(() => {
        setFlag({
            flag: "EDIT_TASK",
            subject: task,
            currentCategoryId: categoryId,
            itemId,
        });
        setFabPanelOpen(true);
    }, [task, categoryId, itemId]);

    const _updateTask = useCallback(() => {
        dispatch(
            updateTask({
                categoryId,
                itemId,
            })
        );
    }, [categoryId, itemId]);

    const StackStyles = useMemo(
        () => ({
            p: "5",
            bg: dark ? "primary.400" : "primary.300",
            shadow: "5",
            space: "15",
            rounded: "15",
            alignItems: "center",
        }),
        [dark]
    );

    return (
        <MotiView layout={Layout.springify()}>
            <SwipableView swipeExe={_deleteTask} simultaneousHandlers={simultaneousHandlers}>
                <Pressable onLongPress={openEditScreen} onPress={_updateTask} mb={30}>
                    <HStack {...StackStyles}>
                        <AnimatedCheckBox completed={completed} color={categoryColor} />
                        <AnimatedTaskText task={task} completed={completed} />
                    </HStack>
                </Pressable>
            </SwipableView>
        </MotiView>
    );
}

TaskItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    categoryColor: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    dark: PropTypes.bool,
    simultaneousHandlers: PropTypes.object,
};
export default memo(TaskItem);
