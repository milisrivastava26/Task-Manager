import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import { useDispatch, useSelector } from "react-redux";
import { addTask, resetResponseforAdd } from "../store/add-task-slice";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTaskPage = () => {
    // Extract relevant states from the Redux store
    const { isLoading, isError, taskData } = useSelector((state) => state.addTask);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handler function for adding a new task
    const taskAddHandler = (data) => {
        console.log(data); 
        dispatch(addTask(data)); 
    };

    // Log current state for debugging
    console.log(isLoading, isError, taskData);

    // Handle redirect and toast notification after adding a task
    useEffect(() => {
        if (isLoading && taskData) {
            toast.success("Task Added Successfully"); 
            setTimeout(() => {
                dispatch(resetResponseforAdd()); 
                navigate("/"); // Navigate to home page
            }, 2000); 
        }
    }, [taskData, isError, isLoading, navigate, dispatch]);

    return (
        <div className="text-center">
            <AddTask onAddHandler={taskAddHandler} /> 
            <ToastContainer /> 
        </div>
    );
};

export default AddTaskPage;
