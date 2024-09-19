import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the deleteTask slice
const initialState = {
    taskId: null, 
    isError: null, 
    isLoading: true,
    response: "", 
};

// Async thunk to delete a task by its ID
export const deleteTask = createAsyncThunk(
    "deleteTask",
    async (taskId, { rejectWithValue }) => {
        try {
            // Perform the delete operation
            await axios.delete(
                `https://firestore.googleapis.com/v1/projects/task-manager-378d1/databases/(default)/documents/tasks/${taskId}`
            );
            return taskId; // Return the task ID for successful deletion
        } catch (error) {
            console.log(error.message); // Log the error message
            return rejectWithValue(error.message); // Pass the error message to the rejected case
        }
    }
);

// Slice for handling task deletion
const deleteTaskSlice = createSlice({
    name: "deleteTask",
    initialState,
    reducers: {}, // No reducers defined for this slice
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(deleteTask.pending, (state) => {
                state.isError = null;
                state.isLoading = true;
            })
            // Handle fulfilled state
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isError = null;
                state.isLoading = false;
                state.response = action.payload; // Store the task ID in response
            })
            // Handle rejected state
            .addCase(deleteTask.rejected, (state, action) => {
                state.isError = action.error.message; // Set the error message
                state.isLoading = false;
            });
    },
});

// Export the reducer for use in the store
export const deleteTaskReducer = deleteTaskSlice.reducer;
