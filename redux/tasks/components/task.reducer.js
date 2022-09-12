import * as ACTIONS from "./task.actions";
import { generate } from "shortid";
import { createSlice } from "@reduxjs/toolkit";

const taskReducer = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        setInitialState(state, action) {
            state = action.payload.data;
        },
        updateTask(state, action) {
            const categoryIndex = state.findIndex(
                (cat) => cat.categoryId === action.payload.categoryId
            );
            const taskIndex = state[categoryIndex].tasks.findIndex(
                (item) => item.id === action.payload.itemId
            );
            state[categoryIndex].tasks[taskIndex] = !state[categoryIndex].tasks[taskIndex];
        },
        deleteTask(state, action) {
            const categoryIndex = state.findIndex(
                (cat) => cat.categoryId === action.payload.categoryId
            );
            const taskIndex = state[categoryIndex].tasks.findIndex(
                (item) => item.id === action.payload.itemId
            );
            state[categoryIndex].tasks.splice(taskIndex, 1);
        },
        deleteCategory(state, action) {
            const categoryIndex = state.findIndex((cat) => cat.categoryId === action.payload.id);
            state.splice(categoryIndex, 1);
        },
        createCategory(state, action) {
            state.push({
                categoryId: generate(),
                categoryTitle: action.payload.title,
                categoryColor: action.payload.color,
                tasks: [],
            });
        },
        createTask(state, action) {
            let category_index = state.findIndex(
                (cat) => cat.categoryId === action.payload.categoryId
            );
            const newTask = {
                id: generate(),
                task: action.payload.subject,
                completed: false,
                timeStamp: Date.now(),
            };
            state[category_index].tasks.unshift(newTask);
        },
        editCategory(state, action) {
            let category__index = state.findIndex(
                (cat) => cat.categoryId === action.payload.categoryId
            );
            const props = state[category__index];

            const newProps = {
                ...props,
                categoryTitle: action.payload.title,
                categoryColor: action.payload.color,
            };
            state[category__index] = newProps;
        },
        editTask(state, action) {
            //get category index in which task exist
            const categoryIndex = state.findIndex(
                (cat) => cat.categoryId === action.payload.currentCategoryId
            );

            // get task index from category
            const taskIndex = state[categoryIndex].tasks.findIndex(
                (item) => item.id === action.payload.itemId
            );

            const props = state[categoryIndex].tasks[taskIndex];

            // edit task
            let newProps = {
                ...props,
                task: action.payload.subject,
            };

            // basically, if task has been moved to another category
            if (action.payload.categoryId === action.payload.currentCategoryId) {
                //just update the task
                state[categoryIndex].tasks[taskIndex] = newProps;
            } else {
                const newCategoryindex = state.findIndex(
                    (cat) => cat.categoryId === action.payload.categoryId
                );
                // remove task from former category
                state[categoryIndex].tasks.splice(taskIndex, 1);
                //  Add item to new category
                state[newCategoryindex].tasks.push(newProps);
            }
        },
        resetTasks(state) {
            state = [];
        },
    },
});

// function taskReducer(state = [], ACTION) {
//     switch (ACTION.type) {
//         case ACTIONS.SET_INITIAL_STATE:
//             return [...ACTION.payload.data];
//         case ACTIONS.UPDATE_TASK: {
//             const categoryIndex = state.findIndex(
//                 (cat) => cat.categoryId === ACTION.payload.categoryId
//             );
//             const taskIndex = state[categoryIndex].tasks.findIndex(
//                 (item) => item.id === ACTION.payload.itemId
//             );
//             const props = state[categoryIndex].tasks[taskIndex];
//             let newProps = {
//                 ...props,
//                 completed: !props.completed,
//             };
//             state[categoryIndex].tasks[taskIndex] = newProps;
//             return [...state];
//         }
//         case ACTIONS.DELETE_TASK:
//             const categoryIndex = state.findIndex(
//                 (cat) => cat.categoryId === ACTION.payload.categoryId
//             );
//             const taskIndex = state[categoryIndex].tasks.findIndex(
//                 (item) => item.id === ACTION.payload.itemId
//             );
//             state[categoryIndex].tasks.splice(taskIndex, 1);
//             return [...state];
//         case ACTIONS.DELETE_CATEGORY:
//             return [...state.filter((cat) => cat.categoryId !== ACTION.payload.id)];
//         case ACTIONS.CREATE_CATEGORY:
//             const newCategory = {
//                 categoryId: generate(),
//                 categoryTitle: ACTION.payload.title,
//                 categoryColor: ACTION.payload.color,
//                 tasks: [],
//             };
//             return [newCategory, ...state];
//         case ACTIONS.CREATE_CATEGORY_TASK:
//             let category_index = state.findIndex(
//                 (cat) => cat.categoryId === ACTION.payload.categoryId
//             );
//             const newTask = {
//                 id: generate(),
//                 task: ACTION.payload.subject,
//                 completed: false,
//                 timeStamp: Date.now(),
//             };
//             state[category_index].tasks.unshift(newTask);
//             return [...state];
//         case ACTIONS.EDIT_CATEGORY:
//             let category__index = state.findIndex(
//                 (cat) => cat.categoryId === ACTION.payload.categoryId
//             );
//             const props = state[category__index];

//             const newProps = {
//                 ...props,
//                 categoryTitle: ACTION.payload.title,
//                 categoryColor: ACTION.payload.color,
//             };
//             state[category__index] = newProps;
//             return [...state];
//         case ACTIONS.EDIT_TASK: {
//             const categoryIndex = state.findIndex(
//                 (cat) => cat.categoryId === ACTION.payload.currentCategoryId
//             );
//             const taskIndex = state[categoryIndex].tasks.findIndex(
//                 (item) => item.id === ACTION.payload.itemId
//             );

//             const props = state[categoryIndex].tasks[taskIndex];

//             // edit task
//             let newProps = {
//                 ...props,
//                 task: ACTION.payload.subject,
//             };
//             if (ACTION.payload.categoryId === ACTION.payload.currentCategoryId) {
//                 state[categoryIndex].tasks[taskIndex] = newProps;
//             } else {
//                 const newCategoryindex = state.findIndex(
//                     (cat) => cat.categoryId === ACTION.payload.categoryId
//                 );
//                 // remove task from former category
//                 state[categoryIndex].tasks.splice(taskIndex, 1);
//                 //  Add item to new category
//                 state[newCategoryindex].tasks.push(newProps);
//             }
//             return [...state];
//         }
//         case "CLEAR_ALL_DATA":
//             return [];
//         default:
//             return state;
//     }
// }

export const {
    setInitialState,
    updateTask,
    deleteTask,
    deleteCategory,
    createCategory,
    createTask,
    editCategory,
    editTask,
    resetTasks,
} = taskReducer.actions;
export default taskReducer.reducer;
