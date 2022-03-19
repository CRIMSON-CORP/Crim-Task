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
            },
            {
                id: 1,
                task: "Going out",
                completed: false,
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
                task: "Going out",
                completed: false,
            },
            {
                id: 1,
                task: "Going out",
                completed: false,
            },
            {
                id: 1,
                task: "Going out",
                completed: true,
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
