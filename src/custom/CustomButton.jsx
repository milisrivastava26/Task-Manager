const CustomButton = ({ isMode, handler }) => {
    return (
        <button
            type="submit"
            onClick={handler}
            className="mt-8 w-fit bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-10 mx-auto flex rounded"
        >
            {isMode === "add" ? "Add Task" : "Edit Task"}
        </button>
    );
};

export default CustomButton;
