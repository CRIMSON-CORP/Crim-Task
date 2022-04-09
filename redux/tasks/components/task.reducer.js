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
        case ACTIONS.EDIT_CATEGORY:
            let category__index = state.findIndex(
                (cat) => cat.categoryId === ACTION.payload.categoryId
            );
            const props = state[category__index];

            const newProps = {
                ...props,
                categoryTitle: ACTION.payload.title,
                categoryColor: ACTION.payload.color,
            };
            state[category__index] = newProps;
            return [...state];
        case ACTIONS.EDIT_TASK: {
            const categoryIndex = state.findIndex(
                (cat) => cat.categoryId === ACTION.payload.currentCategoryId
            );
            const taskIndex = state[categoryIndex].tasks.findIndex(
                (item) => item.id === ACTION.payload.itemId
            );

            const props = state[categoryIndex].tasks[taskIndex];

            // edit task
            let newProps = {
                ...props,
                task: ACTION.payload.subject,
            };
            if (ACTION.payload.categoryId === ACTION.payload.currentCategoryId) {
                state[categoryIndex].tasks[taskIndex] = newProps;
            } else {
                const newCategoryindex = state.findIndex(
                    (cat) => cat.categoryId === ACTION.payload.categoryId
                );
                // remove task from former category
                state[categoryIndex].tasks.splice(taskIndex, 1);
                //  Add item to new category
                state[newCategoryindex].tasks.push(newProps);
            }
            return [...state];
        }
        case "CLEAR_ALL_DATA":
            return [];
        default:
            return state;
    }
}
export default taskReducer;
