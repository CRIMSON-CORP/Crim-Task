import * as ACTIONS from "./task.actions";
import { generate } from "shortid";
const taskStore = [
    {
        categoryId: generate(),
        categoryTitle: "Grocery",
        categoryColor: "#DB00FF",
        tasks: [
            {
                id: 1,
                task: "Going out",
                completed: true,
                timeStamp: 1647735565233,
            },
            {
                id: 1,
                task: "Going out",
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
                id: 1,
                task: "Latest",
                completed: false,
                timeStamp: 1647735565237,
            },
            {
                id: 1,
                task: "Backest",
                completed: false,
                timeStamp: 1647735565230,
            },
            {
                id: 1,
                task: "Going out",
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
        case ACTIONS.UPDATE_TASK:
            return [
                ...state.map((task) => {
                    if (task.id == ACTION.payload.id) {
                        task.completed = !task.completed;
                    }
                    return task;
                }),
            ];
        case ACTIONS.DELETE_TASK:
            return [...state.filter(({ id }) => id !== ACTION.payload.id)];

        default:
            return state;
    }
}
export default taskReducer;
