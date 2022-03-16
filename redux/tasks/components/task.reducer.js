import * as ACTIONS from "./task.actions";
import { generate } from "shortid";
const taskStore = [
    {
        id: 1,
        task: "Going out",
        completed: false,
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
