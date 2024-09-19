import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Initial state for the addTask slice
const initialState = {
    taskData: {},
    isLoading: false,
    isError: null,
    isRun: uuidv4(),
};

// Async thunk to add a new task
export const addTask = createAsyncThunk(
    "addTask",
    async (taskData, { rejectWithValue }) => {
        console.log(taskData); // Log the task data for debugging
        try {
            // Make a POST request to add a new task
            const response = await axios.post(
                "https://firestore.googleapis.com/v1/projects/task-manager-378d1/databases/(default)/documents/tasks",
                {
                    fields: {
                        taskName: { stringValue: taskData.taskName },
                        description: { stringValue: taskData.description },
                        status: { stringValue: taskData.status },
                        remarks: { stringValue: taskData.remarks },
                    },
                }
            );
            return response.data; // Return the response data
        } catch (error) {
            return rejectWithValue(error.message); // Handle errors
        }
    }
);

// Slice for handling task addition
const addTaskSlice = createSlice({
    name: "addTask",
    initialState,
    reducers: {
        // Reducer to reset the taskData state
        resetResponseforAdd: (state) => {
            state.taskData = {};
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(addTask.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            // Handle fulfilled state
            .addCase(addTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.taskData = action.payload; // Store the added task data
                state.isRun = uuidv4(); // Generate a new unique identifier
            })
            // Handle rejected state
            .addCase(addTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload; // Store the error message
            });
    }
});

// Export the reset action and the reducer
export const { resetResponseforAdd } = addTaskSlice.actions;
export const addTaskReducer = addTaskSlice.reducer;
