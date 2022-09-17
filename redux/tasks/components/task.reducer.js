import { createSlice, nanoid } from "@reduxjs/toolkit";

/**
 * @typedef TaskItem
 * @property {string} id - Identity of each Task created
 * @property {string} task - subject of each Task created
 * @property {boolean} completed - Wether a task has been marked as completed or not
 * @property {DateConstructor} timestamp - a time marker for when a task was created
 */

/**
 * @typedef CategoryItem
 * @property {string} categoryId - Identity of each Category created
 * @property {string} categoryColor - Theme color of each Category created, this is also used by each Task item
 * @property {TaskItem[]} tasks
 */

/**
 * @type {CategoryItem[]}
 */
const initialState = [];

const taskReducer = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setInitialState(state, action) {
            state = action.payload.data;
        },
        updateTask(state, action) {
            const category = state.find((cat) => cat.categoryId === action.payload.categoryId);
            if (category) {
                const task = category.tasks.find((item) => item.id === action.payload.itemId);
                if (task) {
                    task.completed = !task.completed;
                }
            }
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
        deleteCategory(state, { payload }) {
            const categoryIndex = state.findIndex((cat) => cat.categoryId === payload);
            state.splice(categoryIndex, 1);
        },
        createCategory(state, action) {
            state.unshift({
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
        resetTasks: () => initialState,
    },
});

export const {
    createTask,
    editTask,
    updateTask,
    deleteTask,
    createCategory,
    editCategory,
    deleteCategory,
    resetTasks,
} = taskReducer.actions;
export default taskReducer.reducer;
