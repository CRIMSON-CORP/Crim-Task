import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { CRIM_TASK_STORAGE_KEY } from "../../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = [];

export const getAsyncTasksData = createAsyncThunk("get-task-data", async () => {
    try {
        const data = await AsyncStorage.getItem(CRIM_TASK_STORAGE_KEY);
        if (data) {
            const result = await JSON.parse(data).account;
            return result;
        } else return initialState;
    } catch (error) {
        return initialState;
    }
});

const taskReducer = createSlice({
    name: "tasks",
    initialState,
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
                categoryId: nanoid(6),
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
                id: nanoid(6),
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

export const {
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
