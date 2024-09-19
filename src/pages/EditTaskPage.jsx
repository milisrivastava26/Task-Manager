import { useDispatch, useSelector } from "react-redux";
import EditTask from "../components/EditTask";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetResponseForUpdateTask,
  updateTask,
} from "../store/update-task-slice";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTaskById } from "../store/get-task-data-by-id";

const EditTaskPage = () => {
  // Extract relevant states from the Redux store
  const { isLoading, isError, updatedTaskData } = useSelector((state) => state.updateTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the task ID from the URL parameters


  useEffect(() => {
    dispatch(resetResponseForUpdateTask()); // Reset previous update response
    dispatch(getTaskById(id)); // Fetch task data by ID
  }, [id, dispatch]);

  // Handler for updating the task
  const taskUpdateHandler = (data) => {
    console.log("Updating task with data:", data);
    dispatch(updateTask({ taskId: id, updatedTaskData: data }));
  };

  // Show success message and navigate to home page after update
  useEffect(() => {
    if (!isLoading && updatedTaskData) {
      toast.success("Task Updated Successfully");
      setTimeout(() => {
        dispatch(resetResponseForUpdateTask()); // Reset the state
        navigate("/"); // Navigate to the home page
      }, 2000);
    }
  }, [updatedTaskData, isError, isLoading, navigate, dispatch]);

  return (
    <div>
      <EditTask taskUpdateHandler={taskUpdateHandler} />
      {/* Render toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default EditTaskPage;
