import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksData } from '../store/get-tasks-slice';
import { deleteTask } from '../store/delete-task-slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';

// Define columns with handleDelete function
const columns = (handleDelete) => [
    { field: 'srNo', headerName: 'Sr.No.', width: 60 }, // Serial number column
    { field: 'id', headerName: 'Task ID', width: 130 },
    { field: 'taskName', headerName: 'Task Name', width: 160 },
    { field: 'description', headerName: 'Description', width: 500 },
    { field: 'status', headerName: 'Status', type: 'string', width: 130 },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 130,
        renderCell: (params) => {
            const { id } = params.row;
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingTop: "15px" }}>
                    {/* Edit Icon */}
                    <Link to={`/edit-task/${id}`}>
                        <FaPen style={{ cursor: 'pointer', width: '20px', height: '20px', color: 'blue' }} />
                    </Link>
                    {/* Delete Icon */}
                    <FaTrash
                        style={{ cursor: 'pointer', width: '20px', height: '20px', color: 'red' }}
                        onClick={() => handleDelete(id)}
                    />
                </div>
            );
        },
    },
];

function Table() {
    const dispatch = useDispatch();
    const { responseTaskData, isLoading, isError } = useSelector((state) => state.getTasks);

    // Local state for filters and search
    const [statusFilter, setStatusFilter] = useState('');
    const [searchText, setSearchText] = useState('');


    //use useEffect to get the tasks data
    useEffect(() => {
        dispatch(getTasksData());
    }, [dispatch]);


    // delete function to delete the tasks
    const handleDelete = async (taskId) => {
        try {
            toast.error("Deleting Your Task");
            await dispatch(deleteTask(taskId));
            await dispatch(getTasksData());
            toast.success("Deleted Successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    //function to handle status change for filter

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    //function to handle status change for search
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    // Filter rows based on status and search text
    const filteredRows = responseTaskData
        .filter(row =>
            (statusFilter ? row.status === statusFilter : true) &&
            (searchText ? row.taskName.toLowerCase().includes(searchText.toLowerCase()) || row.description.toLowerCase().includes(searchText.toLowerCase()) : true)
        )
        .map((row, index) => ({ ...row, srNo: index + 1 })); // map to Add serial number

    const paginationModel = { page: 0, pageSize: 5 };


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError}</div>;

    return (
        <div>
            <Paper sx={{ height: 640, width: '85%' }} className='grid px-5 mx-auto ml-[15%] pt-5'>
                <div className="flex gap-5">

                    {/*  material ui form for filter component */}

                    <FormControl style={{ marginBottom: '10px', minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={handleStatusChange}
                            label="Status"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                            <MenuItem value="In Processing">In Processing</MenuItem>
                            <MenuItem value="Not Done">Not Done</MenuItem>
                        </Select>
                    </FormControl>

                    {/* search component */}
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchText}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '10px' }}
                    />
                </div>
                {/* material ui table */}
                <DataGrid
                    rows={filteredRows}
                    columns={columns(handleDelete)}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 15]}
                    sx={{ border: 0 }}
                />
            </Paper>

            {/* using the toast for the notifications */}
            <ToastContainer />
        </div>
    );
}

export default Table;
