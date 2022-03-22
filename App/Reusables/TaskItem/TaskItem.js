import { HStack, Pressable } from "native-base";
import AnimatedCheckBox from "./AnimatedCheckBox/";
import PropTypes from "prop-types";
import { UPDATE_TASK, DELETE_TASK } from "../../../redux/tasks/components/task.actions";
import { useDispatch } from "react-redux";
import SwipableView from "../SwipableView";
import AnimatedTaskText from "../AnimatedTaaskText/AnimatedTaskText";
import ListAnimatePrescence from "../ListAnimatePrescence";

const TaskItem = ({ task, completed, categoryColor, categoryId, itemId, dark }) => {
    const dispath = useDispatch();

    return (
        <ListAnimatePrescence spacing={30} height={60}>
            <SwipableView
                swipeExe={() =>
                    dispath({
                        type: DELETE_TASK,
                        payload: {
                            categoryId,
                            itemId,
                        },
                    })
                }
            >
                <Pressable
                    onLongPress={() => null}
                    onPress={() => {
                        dispath({
                            type: UPDATE_TASK,
                            payload: {
                                categoryId,
                                itemId,
                            },
                        });
                    }}
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
        </ListAnimatePrescence>
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
export default TaskItem;
