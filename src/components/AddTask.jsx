import CustomForm from "../custom/CustomForm";

// eslint-disable-next-line react/prop-types
const AddTask = ({ onAddHandler }) => {
    return (
        <div>
            <CustomForm isMode="add" handler={onAddHandler} />
        </div>
    );
};

export default AddTask;
