import * as ACTIONS from "./task.actions";
import { generate } from "shortid";
const taskStore = [
    {
        categoryId: generate(),
        categoryTitle: "Grocery",
        categoryColor: "#DB00FF",
        tasks: [
            {
                id: generate(),
                task: "Take out trash",
                completed: true,
                timeStamp: 1647735565233,
            },
            {
                id: generate(),
                task: "iron tomorrow's clothes",
                completed: false,
                timeStamp: 1647735565232,
            },
        ],
    },
    {
        categoryId: generate(),
        categoryTitle: "Study",
        categoryColor: "#E91E63",
        tasks: [
            {
                id: generate(),
                task: "Solve calculus",
                completed: false,
                timeStamp: 1647735565237,
            },
            {
                id: generate(),
                task: "Backest",
                completed: false,
                timeStamp: 1647735565230,
            },
            {
                id: generate(),
                task: "Work on project",
                completed: true,
                timeStamp: 1647735565234,
            },
        ],
    },
];
function taskReducer(state = taskStore, ACTION) {
    switch (ACTION.type) {
        case ACTIONS.ADD_TASK:
            const task = {
                id: generate(),
                task: ACTION.payload.description,
                completed: false,
            };
            return [...state, task];
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
        default:
            return state;
    }
}
export default taskReducer;
