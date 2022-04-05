import * as ACTIONS from "./task.actions";
import { generate } from "shortid";

function taskReducer(state = [], ACTION) {
    switch (ACTION.type) {
        case ACTIONS.SET_INITIAL_STATE:
            return [...ACTION.payload.data];
        case ACTIONS.UPDATE_TASK: {
            const categoryIndex = state.findIndex(
                (cat) => cat.categoryId === ACTION.payload.categoryId
            );
            const taskIndex = state[categoryIndex].tasks.findIndex(
                (item) => item.id === ACTION.payload.itemId
            );
            const props = state[categoryIndex].tasks[taskIndex];
            let newProps = {
                ...props,
                completed: !props.completed,
            };
            state[categoryIndex].tasks[taskIndex] = newProps;
            return [...state];
        }
        case ACTIONS.DELETE_TASK:
            const categoryIndex = state.findIndex(
                (cat) => cat.categoryId === ACTION.payload.categoryId
            );
            const taskIndex = state[categoryIndex].tasks.findIndex(
                (item) => item.id === ACTION.payload.itemId
            );
            state[categoryIndex].tasks.splice(taskIndex, 1);
            return [...state];
        case ACTIONS.DELETE_CATEGORY:
            return [...state.filter((cat) => cat.categoryId !== ACTION.payload.id)];
        case ACTIONS.CREATE_CATEGORY:
            const newCategory = {
                categoryId: generate(),
                categoryTitle: ACTION.payload.title,
                categoryColor: ACTION.payload.color,
                tasks: [],
            };
            return [newCategory, ...state];
        case ACTIONS.CREATE_CATEGORY_TASK:
            let category_index = state.findIndex(
                (cat) => cat.categoryId === ACTION.payload.categoryId
            );
            const newTask = {
                id: generate(),
                task: ACTION.payload.subject,
                completed: false,
                timeStamp: Date.now(),
            };
            state[category_index].tasks.unshift(newTask);
            return [...state];
        case "CLEAR_ALL_DATA":
            return [];
        default:
            return state;
    }
}
export default taskReducer;
