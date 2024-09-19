/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import CustomForm from "../custom/CustomForm";

const EditTask = ({ taskUpdateHandler }) => {

  const { isLoading, responseTaskData } = useSelector((state) => state.getTaskByIdSlice);

  // Display loading message while fetching data
  if (isLoading) return <div>Loading...</div>;

  // Display message if no task data is available
  if (!responseTaskData || typeof responseTaskData !== 'object') return <div>No Task Data Available</div>;

 
  return (
    <div>
      <CustomForm
        isMode="edit" 
        handler={taskUpdateHandler} // Function to handle form submission
        initialValue={responseTaskData} // Pre-fill the form with task data
      />
    </div>
  );
};

export default EditTask;
