import { configureStore } from "@reduxjs/toolkit";
import { getTasksReducer } from "./get-tasks-slice";
import { addTaskReducer } from "./add-task-slice";
import { updateTaskReducer } from "./update-task-slice";
import { getTaskDataByIdReducer } from "./get-task-data-by-id";



const store = configureStore({
    reducer: {
        getTasks: getTasksReducer,
        addTask: addTaskReducer,
        updateTask: updateTaskReducer,
        getTaskByIdSlice: getTaskDataByIdReducer,
    },
});

export default store;
