import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the getTaskById slice
const initialState = {
    taskId: null, 
    isError: null, 
    isLoading: false, 
    responseTaskData: {},
};

// Async thunk to fetch a task by its ID
export const getTaskById = createAsyncThunk(
    "getTaskById",
    async (taskId, { rejectWithValue }) => {
        try {
            // Fetch the task data from Firestore
            const response = await axios.get(
                `https://firestore.googleapis.com/v1/projects/task-manager-378d1/databases/(default)/documents/tasks/${taskId}`
            );
            const taskData = response.data; // Get the full response data

            // Return the task data with the taskId included
            return {
                id: taskId,
                ...taskData.fields
            };
        } catch (error) {
            console.log(error.message); // Log error message
            return rejectWithValue(error.message); // Pass error to rejected case
        }
    }
);

// Slice for handling task fetching by ID
const getTaskByIdSlice = createSlice({
    name: "getTaskByIdSlice",
    initialState,
    reducers: {
        resetResponseForGetTaskById: (state) => {
            state.responseTaskData = {}; // Reset the task data to an empty object
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(getTaskById.pending, (state) => {
                state.isError = null;
                state.isLoading = true;
            })
            // Handle fulfilled state
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.isError = null;
                state.isLoading = false;
                state.responseTaskData = action.payload; // Store the fetched task data
            })
            // Handle rejected state
            .addCase(getTaskById.rejected, (state, action) => {
                state.isError = action.error.message; // Set the error message
                state.isLoading = false;
            });
    },
});

// Export the reducer and action for use in the store and components
export const getTaskDataByIdReducer = getTaskByIdSlice.reducer;
export const { resetResponseForGetTaskById } = getTaskByIdSlice.actions;
