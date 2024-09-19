import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../services/firebase.config";
import { collection, getDocs } from "firebase/firestore";

// Initial state for the tasks slice
const initialState = {
    responseTaskData: [], 
    isLoading: true,
    isError: null, 
};

// Async thunk to fetch tasks from Firestore
export const getTasksData = createAsyncThunk(
    "getTasks",
    async (_, { rejectWithValue }) => {
        try {
            const collectionRef = collection(db, 'tasks'); // Reference to the tasks collection
            const taskSnapshot = await getDocs(collectionRef); // Fetch documents
            const tasksData = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Map documents to data
            return tasksData;
        } catch (error) {
            console.log(error.message); // Log error message
            return rejectWithValue(error.message); // Pass error to rejected case
        }
    }
);

// Slice for handling task fetching
const getTasksSlice = createSlice({
    name: "getTasks",
    initialState,
    reducers: {}, // No reducers for this slice
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(getTasksData.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            // Handle fulfilled state
            .addCase(getTasksData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.responseTaskData = action.payload; // Store fetched tasks
            })
            // Handle rejected state
            .addCase(getTasksData.rejected, (state, action) => {
                state.isError = action.error.message || "An error occurred while fetching the tasks data"; // Set error message
                state.isLoading = false;
            });
    }
});

// Export reducer for use in the store
export const getTasksReducer = getTasksSlice.reducer;
