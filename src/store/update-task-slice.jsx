import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the update task slice
const initialState = {
    taskId: null, 
    isError: null, 
    isLoading: false, 
    updatedTaskData: null, 
};

// Async thunk for updating a task
export const updateTask = createAsyncThunk(
    "updateTask",
    async ({ taskId, updatedTaskData }, { rejectWithValue }) => {
        try {
            // Log the task data being updated
            console.log("Updating task with data:", updatedTaskData);

            // Make a PATCH request to update the task
            const response = await axios.patch(
                `https://firestore.googleapis.com/v1/projects/task-manager-378d1/databases/(default)/documents/tasks/${taskId}`,
                {
                    fields: {
                        taskName: { stringValue: updatedTaskData.taskName },
                        description: { stringValue: updatedTaskData.description },
                        status: { stringValue: updatedTaskData.status },
                        remarks: { stringValue: updatedTaskData.remarks },
                    },
                }
            );

            // Log the API response
            console.log("API response:", response.data);

            // Return the updated task fields from the response
            return response.data.fields;
        } catch (error) {
            // Log the error and return the error message
            console.error("Error updating task:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Slice for handling task updates
const updateTaskSlice = createSlice({
    name: "updateTask",
    initialState,
    reducers: {
        // Action to reset the response state
        resetResponseForUpdateTask: (state) => {
            state.updatedTaskData = null; // Reset updated task data
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state when the update request is in progress
            .addCase(updateTask.pending, (state) => {
                state.isError = null;
                state.isLoading = true;
            })
            // Handle fulfilled state when the update request is successful
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isError = null;
                state.isLoading = false;
                state.updatedTaskData = action.payload; // Store the updated task data
            })
            // Handle rejected state when the update request fails
            .addCase(updateTask.rejected, (state, action) => {
                state.isError = action.payload || action.error.message; // Set error message
                state.isLoading = false;
            });
    },
});

// Export actions and reducer
export const { resetResponseForUpdateTask } = updateTaskSlice.actions;
export const updateTaskReducer = updateTaskSlice.reducer;
